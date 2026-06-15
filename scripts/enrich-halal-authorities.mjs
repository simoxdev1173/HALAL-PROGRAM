import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const dataPath = path.join(rootDir, "src", "data", "halal-sector-authorities.json");
const screenshotDir = path.join(rootDir, "public", "halal-sector-screenshots");
const fallbackValue = "غير متوفر";

const args = new Set(process.argv.slice(2));
const onlyId = process.argv.find((arg) => arg.startsWith("--only="))?.split("=")[1];
const skipScreenshots = args.has("--skip-screenshots");
const skipData = args.has("--skip-data");

function normalizeWebsite(website) {
  if (!website) return null;
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

function cleanText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/[<>]/g, "")
    .trim();
}

function unique(values) {
  return [...new Set(values.filter(Boolean).map(cleanText))];
}

function extractEmails(text) {
  return unique(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []).filter(
    (email) => !/\.(png|jpe?g|gif|svg|webp)$/i.test(email),
  );
}

function looksLikePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return false;
  if (/^(0123456789|1234567|12345678|123456789|12345678910)/.test(digits)) return false;
  if (/20(2[0-9]|1[0-9])/.test(digits) && digits.length < 10) return false;
  return true;
}

function extractPhones(text, telLinks = []) {
  const contactLines = text
    .split(/\n+/)
    .filter((line) => /(tel|phone|mobile|call|هاتف|الهاتف|جوال|فاكس|اتصل)/i.test(line))
    .join("\n");
  const source = contactLines || text;
  const matches = [...telLinks, ...(source.match(/(?:\+|00)?\d[\d\s().-]{6,}\d/g) || [])];
  return unique(matches)
    .map((phone) => phone.replace(/\s{2,}/g, " "))
    .filter(looksLikePhone)
    .slice(0, 3);
}

async function getPageSnapshot(page) {
  return page.evaluate(() => {
    const meta = (selector) => document.querySelector(selector)?.getAttribute("content")?.trim() || "";
    const description =
      meta('meta[name="description"]') ||
      meta('meta[property="og:description"]') ||
      meta('meta[name="twitter:description"]');

    const anchors = [...document.querySelectorAll("a[href]")];
    const links = anchors
      .map((anchor) => ({
        href: anchor.href,
        text: (anchor.textContent || "").trim(),
      }))
      .filter((link) => /^https?:\/\//i.test(link.href));
    const telLinks = anchors
      .map((anchor) => anchor.getAttribute("href") || "")
      .filter((href) => href.toLowerCase().startsWith("tel:"))
      .map((href) => href.replace(/^tel:/i, ""));
    const mailLinks = anchors
      .map((anchor) => anchor.getAttribute("href") || "")
      .filter((href) => href.toLowerCase().startsWith("mailto:"))
      .map((href) => href.replace(/^mailto:/i, "").split("?")[0]);

    return {
      title: document.title || "",
      description,
      text: document.body?.innerText || "",
      html: document.documentElement?.innerHTML || "",
      links,
      telLinks,
      mailLinks,
    };
  });
}

function pickAboutLinks(snapshot, origin) {
  const aboutWords = [
    "about",
    "overview",
    "who-we-are",
    "من نحن",
    "عن الوزارة",
    "عن الهيئة",
    "عن المؤسسة",
    "نبذة",
    "تعريف",
  ];
  const contactWords = ["contact", "contacts", "اتصل", "تواصل", "راسل", "الدعم", "contact-us"];
  const wanted = [...aboutWords, ...contactWords];

  return unique(
    snapshot.links
      .filter((link) => {
        const haystack = `${decodeURIComponent(link.href)} ${link.text}`.toLowerCase();
        return wanted.some((word) => haystack.includes(word.toLowerCase()));
      })
      .map((link) => {
        try {
          const url = new URL(link.href);
          return url.origin === origin ? url.href : null;
        } catch {
          return null;
        }
      }),
  ).slice(0, 4);
}

function pickDescription(snapshots, currentIntro) {
  const candidates = [];

  for (const snapshot of snapshots) {
    candidates.push(snapshot.description);

    const paragraphs = snapshot.text
      .split(/\n+/)
      .map(cleanText)
      .filter((line) => line.length >= 90 && line.length <= 520)
      .filter((line) => !/(cookie|javascript|browser|copyright|all rights reserved)/i.test(line));

    candidates.push(...paragraphs.slice(0, 4));
  }

  const useful = unique(candidates).find((candidate) => {
    const normalized = candidate.toLowerCase();
    return (
      candidate.length >= 80 &&
      candidate.length <= 420 &&
      !normalized.includes("captcha") &&
      !normalized.includes("enable javascript")
    );
  });

  return useful || currentIntro;
}

async function enrichAuthority(browser, authority) {
  const website = normalizeWebsite(authority.website);
  if (!website) {
    return {
      ...authority,
      website: null,
      screenshot: null,
      sourceStatus: "missing-website",
      lastFetchedAt: new Date().toISOString(),
    };
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
    locale: "ar",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
  });
  const page = await context.newPage();
  const snapshots = [];

  try {
    await page.goto(website, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
    await page.addStyleTag({
      content: "*{scroll-behavior:auto!important} body{overflow-x:hidden!important}",
    }).catch(() => {});

    const homeSnapshot = await getPageSnapshot(page);
    snapshots.push(homeSnapshot);

    if (!skipScreenshots) {
      await fs.mkdir(screenshotDir, { recursive: true });
      await page.screenshot({
        path: path.join(screenshotDir, `${authority.id}.png`),
        fullPage: false,
        animations: "disabled",
      });
    }

    const origin = new URL(page.url()).origin;
    for (const link of pickAboutLinks(homeSnapshot, origin)) {
      const detail = await context.newPage();
      try {
        await detail.goto(link, { waitUntil: "domcontentloaded", timeout: 25000 });
        await detail.waitForLoadState("networkidle", { timeout: 6000 }).catch(() => {});
        snapshots.push(await getPageSnapshot(detail));
      } catch (error) {
        console.warn(`[warn] ${authority.id}: skipped detail page ${link} (${error.message})`);
      } finally {
        await detail.close().catch(() => {});
      }
    }

    const combinedText = snapshots.map((snapshot) => `${snapshot.text}\n${snapshot.html}`).join("\n");
    const emails = unique([...snapshots.flatMap((snapshot) => snapshot.mailLinks || []), ...extractEmails(combinedText)]);
    const phones = extractPhones(combinedText, snapshots.flatMap((snapshot) => snapshot.telLinks || []));
    const intro = skipData ? authority.intro : pickDescription(snapshots, authority.intro);

    return {
      ...authority,
      intro,
      phone: skipData ? authority.phone : phones[0] || authority.phone || fallbackValue,
      email: skipData ? authority.email : emails[0] || authority.email || fallbackValue,
      website: page.url() || website,
      screenshot: `/halal-sector-screenshots/${authority.id}.png`,
      sourceStatus: emails.length || phones.length || intro !== authority.intro ? "fetched" : "partial",
      lastFetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn(`[warn] ${authority.id}: ${error.message}`);
    return {
      ...authority,
      website,
      sourceStatus: "failed",
      lastFetchedAt: new Date().toISOString(),
    };
  } finally {
    await context.close().catch(() => {});
  }
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    throw new Error("Playwright is required. Run `npm install` and then `npx playwright install chromium`.");
  }

  const raw = await fs.readFile(dataPath, "utf8");
  const authorities = JSON.parse(raw);
  const selected = onlyId ? authorities.filter((authority) => authority.id === onlyId) : authorities;

  if (onlyId && selected.length === 0) {
    throw new Error(`No authority found for --only=${onlyId}`);
  }

  const browser = await chromium.launch({ headless: true });
  const updatedById = new Map();

  try {
    for (const authority of selected) {
      console.log(`[info] Enriching ${authority.id}`);
      updatedById.set(authority.id, await enrichAuthority(browser, authority));
    }
  } finally {
    await browser.close();
  }

  const merged = authorities.map((authority) => updatedById.get(authority.id) || authority);
  await fs.writeFile(dataPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  console.log(`[done] Updated ${updatedById.size} records in ${path.relative(rootDir, dataPath)}`);
}

main().catch((error) => {
  console.error(`[error] ${error.message}`);
  process.exitCode = 1;
});
