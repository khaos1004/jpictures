"use client";

import { useEffect } from "react";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { LANG_KEY } from "@/components/LangSwitch";

/**
 * 언어 자동 선택
 * 1) 사용자가 전에 고른 언어 → 2) 브라우저 언어 → 3) 한국어
 * 정적 배포(Cloudflare Pages 등)에서도 동작하도록 브라우저에서 처리합니다.
 */
export default function RootRedirect() {
  useEffect(() => {
    let lang: string = defaultLocale;
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved && isLocale(saved)) lang = saved;
      else {
        const nav = (navigator.languages?.[0] || navigator.language || "").slice(0, 2).toLowerCase();
        if (isLocale(nav)) lang = nav;
      }
    } catch {}
    window.location.replace(`/${lang}${window.location.hash}`);
  }, []);

  return (
    <noscript>
      <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}`} />
      <a href={`/${defaultLocale}`}>J Pictures</a>
    </noscript>
  );
}
