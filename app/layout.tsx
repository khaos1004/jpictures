import type { Metadata } from "next";
import { Noto_Sans_KR, Sora } from "next/font/google";
import "./site.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-noto",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "J Pictures | 제이픽처스",
  description: "J Pictures(제이픽처스)는 AI 이미지 생성 기반으로 오리지널 웹툰 IP를 기획·제작·유통하는 웹툰 제작사입니다.",
  openGraph: {
    title: "J Pictures | 제이픽처스",
    description: "다음 화가 기다려지는 이야기를 만듭니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${noto.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
