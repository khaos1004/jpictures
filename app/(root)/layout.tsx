import type { Metadata } from "next";

// 첫 주소(/)는 언어를 골라 /ko · /en · /ja 로 보내는 역할만 합니다.
export const metadata: Metadata = {
  title: "J Pictures",
  description: "J Pictures — AI Webtoon Studio",
};

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, background: "#fff" }}>{children}</body>
    </html>
  );
}
