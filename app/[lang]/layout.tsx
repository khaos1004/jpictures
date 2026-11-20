import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Noto_Sans_JP, Noto_Sans_KR, Sora } from "next/font/google";
import { getDict, isLocale, locales } from "@/lib/i18n";
import "../site.css";

const notoKR = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "500", "700", "800", "900"], variable: "--font-noto", display: "swap" });
const notoJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700", "800", "900"], variable: "--font-noto", display: "swap" });
const sora = Sora({ subsets: ["latin"], weight: ["300", "400", "600", "700"], variable: "--font-sora", display: "swap" });

// /ko /en /ja 세 가지 언어만 미리 만들고, 그 외 주소는 404
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const SITE = "https://jpictures.kr";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDict(lang);
  return {
    metadataBase: new URL(SITE),
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { ko: "/ko", en: "/en", ja: "/ja", "x-default": "/ko" },
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url: `/${lang}`,
      siteName: "J Pictures",
      type: "website",
      locale: { ko: "ko_KR", en: "en_US", ja: "ja_JP" }[lang],
      images: ["/works/01.jpg"],
    },
  };
}

export const viewport: Viewport = { themeColor: "#ffffff", viewportFit: "cover" };

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const noto = lang === "ja" ? notoJP : notoKR;
  return (
    <html lang={lang} className={`${noto.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
