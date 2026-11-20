// 말풍선 J 로고 — 테두리와 꼬리가 하나의 선으로 이어진 SVG
export default function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 40 36" aria-hidden="true">
      <path d="M20 3C29.4 3 37 9.3 37 17s-7.6 14-17 14c-2.4 0-4.7-.4-6.7-1.2L5.5 33l2.7-6.5C5 24 3 20.7 3 17 3 9.3 10.6 3 20 3Z" />
      <text x="20" y="22.5" textAnchor="middle">
        J
      </text>
    </svg>
  );
}
