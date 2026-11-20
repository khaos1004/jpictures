"use client";

import Link from "next/link";
import { languageOptions, type Locale } from "@/lib/i18n";

export const LANG_KEY = "jp-lang";

export default function LangSwitch({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  const remember = (code: Locale) => {
    try {
      localStorage.setItem(LANG_KEY, code);
    } catch {}
  };

  return (
    <nav className={`lang ${className}`} aria-label={label}>
      {languageOptions.map((o) => (
        <Link
          key={o.code}
          href={`/${o.code}`}
          hrefLang={o.code}
          lang={o.code}
          title={o.name}
          aria-current={o.code === lang ? "true" : undefined}
          onClick={() => remember(o.code)}
          scroll={false}
        >
          {o.short}
        </Link>
      ))}
    </nav>
  );
}
