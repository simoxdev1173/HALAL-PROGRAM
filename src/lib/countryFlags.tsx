import { countryIsoCode } from "./countryCodes";

export function CountryFlag({ country, className }: { country?: string; className?: string }) {
  const trimmed = (country ?? "").trim();
  if (!trimmed) return <span>—</span>;
  const code = countryIsoCode(trimmed);
  if (!code) return <span>{trimmed}</span>;
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <img
        src={`https://flagcdn.com/w20/${code}.png`}
        srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
        width={20}
        height={15}
        alt=""
        loading="lazy"
        onError={(event) => { event.currentTarget.style.display = "none"; }}
        className="inline-block shrink-0 rounded-[2px] ring-1 ring-black/10"
      />
      <span>{trimmed}</span>
    </span>
  );
}
