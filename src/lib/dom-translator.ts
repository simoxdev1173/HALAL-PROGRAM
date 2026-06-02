import { useEffect } from "react";
import type { Lang } from "./i18n-routing";
import { localizePath, stripLanguagePrefix } from "./i18n-routing";

const textMap: Record<string, string> = {
  "عن البرنامج العربي للحلال": "About the Arab Halal Program",
  "عن": "About",
  "البرنامج العربي للحلال": "Arab Halal Program",
  "رسالة البرنامج": "Program Mission",
  "حماية المستهلك المسلم": "Protecting Muslim Consumers",
  "في جميع دول العالم": "Worldwide",
  "انتقل إلى تفاصيل البرنامج": "Continue to Program Details",
  "بعد التعريف العام، يمكن متابعة أهداف البرنامج أو استعراض مجالات تطبيقه المعتمدة.": "After the general definition, you can review the program objectives or explore its approved scope of application.",
  "أهداف البرنامج": "Program Objectives",
  "عرض أهداف البرنامج": "View Program Objectives",
  "تعرف على الأهداف الأساسية للبرنامج العربي للحلال ودوره في حماية المستهلك وتعزيز الثقة في شهادات الحلال.": "Learn about the program's core objectives and its role in protecting consumers and strengthening trust in Halal certificates.",
  "استعراض الأهداف": "Browse Objectives",
  "مجالات التطبيق": "Scope of Application",
  "استعرض المنتجات والقطاعات المشمولة ضمن مجال تطبيق البرنامج والمنظومة الفنية المعتمدة.": "Explore the products and sectors covered by the program and its approved technical system.",
  "عرض المجالات": "View Scope",
  "أهداف": "Objectives",
  "استكمل قراءة منظومة البرنامج": "Continue Reading the Program System",
  "عرض مجالات التطبيق": "View Scope of Application",
  "استعرض المنتجات والقطاعات المشمولة في مجال تطبيق البرنامج والمنظومة الفنية المعتمدة.": "Explore the products and sectors covered by the program and its approved technical system.",
  "التعريف بالبرنامج": "Program Definition",
  "العودة إلى التعريف": "Return to Definition",
  "عد إلى صفحة التعريف للاطلاع على الفكرة العامة للبرنامج وأساس منظومة الاعتراف المتعدد الأطراف.": "Return to the definition page to review the general concept and foundation of the multilateral recognition system.",
  "العودة للتعريف": "Back to Definition",
  "مجال تطبيق": "Program",
  "البرنامج": "Scope",
  "القطاعات المشمولة": "Covered Sectors",
  "بصورة عامة تكون أولوية المجالات الخاصة بتطبيق البرنامج العربي للحلال كالآتي:": "In general, the priority areas for applying the Arab Halal Program are:",
  "المعيار المرجعي": "Reference Standard",
  "المجالات ذات الأولوية": "Priority Fields",
  "8 مجالات": "8 Fields",
  "أساس التطبيق": "Application Basis",
  "أحكام الشريعة الإسلامية": "Islamic Sharia Provisions",
  "اللحوم ومنتجاتها": "Meat and Meat Products",
  "العصائر والمشروبات": "Juices and Beverages",
  "الأدوية": "Pharmaceuticals",
  "مستحضرات التجميل": "Cosmetics",
  "خدمات الحلال": "Halal Services",
  "المنتجات المحفوظة": "Shelf-stable Products",
  "المكملات الغذائية": "Dietary Supplements",
  "السياحة الحلال": "Halal Tourism",
  "ذبحاً وتصنيعاً والمنتجات الغذائية ذات الأصل الحيواني.": "Slaughtering, processing, and food products of animal origin.",
  "المشروبات والمنتجات السائلة المشمولة باشتراطات الحلال.": "Beverages and liquid products covered by Halal requirements.",
  "المنتجات الدوائية التي تتطلب تحققاً من المكونات والعمليات.": "Pharmaceutical products requiring verification of ingredients and processes.",
  "المنتجات التجميلية والعناية الشخصية ذات الصلة بالحلال.": "Cosmetic and personal care products related to Halal requirements.",
  "الخدمات المرتبطة بسلاسل القيمة والتشغيل الحلال.": "Services connected to Halal value chains and operations.",
  "المنتجات التي تحفظ في درجة حرارة الغرفة.": "Products preserved at room temperature.",
  "مكملات التغذية وما يتصل بها من مكونات وعمليات إنتاج.": "Nutritional supplements and related ingredients and production processes.",
  "الخدمات والأنشطة السياحية المطابقة لاشتراطات الحلال.": "Tourism activities and services compliant with Halal requirements.",
  "العودة إلى الأهداف": "Back to Objectives",
  "عد إلى صفحة الأهداف للاطلاع على الغايات الأساسية للبرنامج ودوره في دعم منظومة الحلال العربية.": "Return to the objectives page to review the program's main goals and its role in supporting the Arab Halal system.",
  "عرض الأهداف": "View Objectives",
  "شروط": "Joining",
  "الانضمام": "Requirements",
  "الانضمام للبرنامج": "Join the Program",
  "شروط الانضمام": "Joining Requirements",
  "من له الحق في الانضمام للبرنامج وكيف تتم عملية الانضمام.": "Who has the right to join the program and how the joining process works.",
  "من له الحق في الانضمام؟": "Who Has the Right to Join?",
  "كيف تتم عملية الانضمام": "How the Joining Process Works",
  "تقديم الطلب": "Submit the Request",
  "تقييم الملف": "File Assessment",
  "الرد الرسمي": "Official Response",
  "وثيقة التعاون الفني": "Technical Cooperation Document",
  "ملاحظة": "Note",
  "عرض الدول المنضمة": "View Joined Countries",
  "الجهات المعنية بقطاع الحلال": "Halal Sector Authorities",
  "الدول": "Joined",
  "المنضمة": "Countries",
  "الدول المنضمة": "Joined Countries",
  "هذه الصفحة مخصصة لعرض الدول التي تم اعتماد انضمامها رسمياً إلى البرنامج العربي للحلال.": "This page is dedicated to displaying countries whose joining has been officially approved under the Arab Halal Program.",
  "سيتم تحديثها قريباً": "Coming Soon",
  "لا توجد دول منضمة في المرحلة الحالية، وسيتم عرض الدول المنضمة هنا فور اعتماد انضمامها رسمياً إلى البرنامج العربي للحلال.": "There are no joined countries at the current stage. Joined countries will be displayed here as soon as their accession is officially approved.",
  "استكمل مسار الانضمام": "Continue the Joining Path",
  "انتقل إلى شروط الانضمام أو دليل الجهات المعنية بقطاع الحلال في الدول العربية.": "Move to joining requirements or the directory of Halal sector authorities in Arab countries.",
  "دليل الإنضمام": "Joining Guide",
  "دليل الانضمام": "Joining Guide",
  "دليل الجهات": "Authorities Directory",
  "عرض الجهات المعنية": "View Authorities",
  "استعرض الجهات المعنية بقطاع الحلال في الدول العربية وبياناتها التنظيمية.": "Explore Halal sector authorities in Arab countries and their regulatory information.",
  "دليل الدول العربية": "Arab Countries Directory",
  "الجهات المعنية بقطاع الحلال في": "Halal Sector Authorities in",
  "الدول العربية": "Arab Countries",
  "الجهة المعنية في الحلال": "Halal Sector Authority",
  "الهاتف": "Phone",
  "البريد": "Email",
  "معاينة الموقع": "Website Preview",
  "الموقع الرسمي": "Official Website",
  "تابع مسار الانضمام": "Continue the Joining Path",
  "عرض الشروط": "View Requirements",
  "عرض الدول": "View Countries",
  "الدليل الرقمي الموحد": "Unified Digital Directory",
  "إعدادات العرض": "Display Settings",
  "الكل": "All",
  "قاعدة البيانات لا تستجيب للطلب": "The Database Did Not Match the Request",
  "لم نتمكن من العثور على أي سجلات مطابقة للمعايير المدخلة.": "No records were found matching the entered criteria.",
  "إعادة تهيئة محرك البحث": "Reset Search Engine",
  "وثيقة حلال رسمية": "Official Halal Document",
  "تحتاج مساعدة فنية؟": "Need Technical Help?",
  "فريق التدقيق متاح للرد على أي استفسار.": "The audit team is available to answer inquiries.",
  "تحميل الوثيقة المعتمدة": "Download Approved Document",
  "طباعة التقرير": "Print Report",
  "هل تحتاج إلى مساعدة": "Do You Need Help",
  "في التحقق من البيانات؟": "Verifying Data?",
  "راسلنا الآن": "Email Us Now",
  "الدعم الفني": "Technical Support",
  "النماذج": "Forms",
  "والوثائق": "and Documents",
  "المستودع الرسمي للملفات": "Official File Repository",
  "النماذج والوثائق": "Forms and Documents",
  "استعراض الملفات": "Browse Files",
  "الملفات المتاحة": "Available Files",
  "مكتبة الملفات": "File Library",
  "كل الوثائق في مكان واحد": "All Documents in One Place",
  "كل الملفات": "All Files",
  "كيفية تقديم الطلبات": "How to Submit Applications",
  "معاينة": "Preview",
  "تحميل PDF": "Download PDF",
  "إغلاق المعاينة": "Close Preview",
  "إغلاق": "Close",
  "الرقم المرجعي": "Reference Number",
  "الجهة المستفيدة": "Beneficiary",
  "وصف الوثيقة": "Document Description",
  "العودة": "Back",
  "النماذج الرسمية": "Official Forms",
  "قوالب الشهادة والترخيص": "Certificate and License Templates",
  "دليل العلامة والهوية": "Mark and Identity Guide",
  "وثائق تشغيل البرنامج": "Program Operation Documents",
  "المواصفات والمراجع الفنية": "Standards and Technical References",
  "اللوائح والتشريعات": "Regulations and Legislation",
  "الدليل الإرشادي": "Guidance",
  "كيف يمكن لك الاستفادة من البرنامج؟": "How Can You Benefit from the Program?",
  "جهات التعيين الحكومية": "Government Designation Authorities",
  "الموردون والمنشآت": "Suppliers and Establishments",
  "التحقق من شهادة الحلال": "Halal Certificate Verification",
  "خدمات المنظومة": "Program Services",
  "القطاعات المستهدفة": "Target Sectors",
  "الإجراءات": "Procedure",
  "كيفية الانضمام": "How to Join",
  "للبرنامج؟": "the Program?",
  "تحميل دليل وثائق البرنامج": "Download Program Document Guide",
  "تقديم طلب الانضمام": "Submit Joining Request",
  "التقييم والقرار": "Assessment and Decision",
  "المرحلة الإجرائية": "Procedural Stage",
  "المراجعة الفنية": "Technical Review",
  "الاعتماد الرسمي": "Official Accreditation",
  "ملاحظة هامة": "Important Note",
  "تفويض القطاع الخاص والجهات غير الحكومية": "Delegating Private and Non-governmental Bodies",
  "الاطلاع على المتطلبات": "View Requirements",
  "بوابة التحقق الرسمية": "Official Verification Portal",
  "محرك البحث عن الشركات الحاصلة على": "Search Engine for Companies Holding the",
  "شهادة الحلال العربية": "Arab Halal Certificate",
  "رقم الترخيص": "License Number",
  "اسم الشركة": "Company Name",
  "دقة وموثوقية": "Accuracy and Reliability",
  "معايير معتمدة": "Accredited Standards",
  "تغطية شاملة": "Comprehensive Coverage",
  "دليل عالمي": "Global Directory",
  "الاعتراف والتعاون الدولي": "International Recognition & Cooperation",
  "تعرف على آلية الاستفادة من البرنامج": "Learn How to Benefit from the Program",
  "الوثائق الرسمية": "Official Documents",
  "الهوية البصرية": "Visual Identity",
  "والنماذج الرسمية": "and Official Models",
  "علامة رسمية مسجلة": "Registered Official Mark",
  "علامة الحلال العربية": "Arab Halal Mark",
  "المواصفات الفنية": "Technical Specifications",
  "الألوان المعتمدة (انقر للنسخ)": "Approved Colors (Click to Copy)",
  "الخطوط المعتمدة": "Approved Fonts",
  "فتح للتحقق": "Open to Verify",
  "الأهمية القانونية": "Legal Importance",
  "تحميل النموذج المعتمد": "Download Approved Model",
  "الأسئلة": "Frequently Asked",
  "الشائعة": "Questions",
  "لديك استفسارات أخرى؟": "Have Other Questions?",
  "راسلنا عبر البريد": "Email Us",
  "المساعد الذكي": "AI Assistant",
  "مساعد البرنامج": "Program Assistant",
  "متصل الآن": "Online Now",
  "إرسال": "Send",
};

const attrMap: Record<string, string> = {
  "اسم المنشأة، رقم الترخيص، أو الموقع...": "Establishment name, license number, or location...",
  "أدخل رقم الترخيص الكامل...": "Enter the full license number...",
  "أدخل 4 أحرف على الأقل...": "Enter at least 4 characters...",
  "اكتب استفسارك هنا...": "Type your question here...",
  "مجال تطبيق البرنامج": "Program scope",
  "شروط الانضمام للبرنامج": "Program Joining Requirements",
  "الجهات المعنية بقطاع الحلال في الدول العربية": "Halal Sector Authorities in Arab Countries",
  "معايير الجودة والتقييس": "Quality and Standardization",
  "AI Assistant": "AI Assistant",
  "Logo": "Logo",
};

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

function translateText(value: string, lang: Lang) {
  if (lang === "ar") return value;
  const normalized = normalize(value);
  return textMap[normalized] ?? attrMap[normalized] ?? value;
}

function translateTextNode(node: Text, lang: Lang) {
  if (lang === "ar") return;
  const original = node.nodeValue ?? "";
  const translated = translateText(original, lang);
  if (translated !== original) node.nodeValue = translated;
}

function translateAttributes(element: Element, lang: Lang) {
  const attrs = ["placeholder", "aria-label", "title", "alt"];
  for (const attr of attrs) {
    const value = element.getAttribute(attr);
    if (!value) continue;

    const translated = translateText(value, lang);
    if (translated !== value) element.setAttribute(attr, translated);
  }
}

function localizeDirections(root: ParentNode, lang: Lang) {
  if (lang !== "en") return;
  root.querySelectorAll<HTMLElement>("[dir='rtl']").forEach((element) => {
    element.setAttribute("dir", "ltr");
  });
}

function localizeAnchors(root: ParentNode, lang: Lang) {
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    if (lang === "en") {
      anchor.setAttribute("href", localizePath(href, "en"));
    } else if (href === "/en" || href.startsWith("/en/")) {
      anchor.setAttribute("href", stripLanguagePrefix(href));
    }
  });
}

function walkAndTranslate(root: ParentNode, lang: Lang) {
  if (lang === "ar") return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();

  while (current) {
    const textNode = current as Text;
    const parent = textNode.parentElement;
    if (parent && !["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) {
      translateTextNode(textNode, lang);
    }
    current = walker.nextNode();
  }

  root.querySelectorAll("*").forEach((element) => translateAttributes(element, lang));
  localizeDirections(root, lang);
  localizeAnchors(root, lang);
}

export function useDomTranslator(lang: Lang) {
  useEffect(() => {
    walkAndTranslate(document.body, lang);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            translateTextNode(node as Text, lang);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            translateAttributes(element, lang);
            walkAndTranslate(element, lang);
          }
        });

        if (mutation.type === "attributes" && mutation.target instanceof Element) {
          translateAttributes(mutation.target, lang);
        }
      }

      localizeDirections(document.body, lang);
      localizeAnchors(document.body, lang);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title", "alt", "href"],
    });

    return () => observer.disconnect();
  }, [lang]);
}
