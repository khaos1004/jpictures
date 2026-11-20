// ─────────────────────────────────────────────
// 사이트 내용은 이 파일만 고치면 됩니다. (아래 값은 모두 예시)
// ─────────────────────────────────────────────

export const company = {
  nameKo: "제이픽처스",
  nameEn: "J Pictures",
  ceo: "홍길동",
  bizNo: "000-00-00000",
  address: "서울특별시 마포구 월드컵북로 00, 0층",
  tel: "02-000-0000",
  email: "contact@jpictures.kr",
};

export const facts = [
  { value: "2026", label: "설립" },
  { value: "6", label: "개발 중인 오리지널 IP" },
  { value: "6", label: "AI 제작 공정 단계" },
  { value: "4", label: "사업 분야" },
];

export const values = [
  { title: "이야기 중심", desc: "기술은 도구일 뿐, 독자를 붙잡는 건 이야기입니다. 시즌 단위로 서사를 먼저 설계합니다." },
  { title: "AI 제작 파이프라인", desc: "AI 이미지 생성과 자체 워크플로로 기획에서 원고까지의 시간을 크게 줄입니다." },
  { title: "일관된 퀄리티", desc: "캐릭터 시트와 스타일 가이드로 화마다 같은 얼굴, 같은 톤을 유지하고 최종 컷은 직접 보정합니다." },
];

export const services = [
  { word: "Plan", title: "오리지널 IP 기획", desc: "세계관과 캐릭터, 시즌 구성까지 오리지널 웹툰 IP를 자체 기획합니다.", tags: ["장르 리서치", "시놉시스", "캐릭터 설계"] },
  { word: "Create", title: "AI 웹툰 제작", desc: "AI 이미지 생성 기반의 제작 공정으로 연재 원고를 빠르고 안정적으로 만듭니다.", tags: ["이미지 생성", "리터칭", "연출 편집", "식자"] },
  { word: "Design", title: "비주얼 개발", desc: "캐릭터 시트, 배경 콘셉트, 작품별 스타일 가이드를 구축합니다.", tags: ["캐릭터 시트", "스타일 가이드", "배경 콘셉트"] },
  { word: "Launch", title: "유통 · 해외 진출", desc: "국내 플랫폼 연재와 해외 현지화·유통을 진행합니다.", tags: ["플랫폼 런칭", "현지화", "AI 활용 표기 준수"] },
];

export const pipeline = [
  { title: "기획", desc: "시놉시스, 회차 구성, 캐릭터 설정" },
  { title: "콘티 · 프롬프트", desc: "컷 구성과 연출을 생성용 설계로 변환" },
  { title: "AI 이미지 생성", desc: "캐릭터 일관성을 유지하며 컷 생성" },
  { title: "리터칭 · 보정", desc: "표정·손·디테일을 사람이 직접 다듬기" },
  { title: "편집 · 식자", desc: "말풍선, 효과음, 세로 스크롤 연출" },
  { title: "검수 · 연재", desc: "품질·등급 검수 후 플랫폼 런칭" },
];

export type Work = {
  title: string;
  en: string;
  genre: string;
  status: "기획중" | "제작중" | "공개예정";
  colors: [string, string];
  image?: string; // public/works/ 안의 키비주얼 경로
  focus?: string; // 이미지에서 보여줄 기준점 (CSS background-position), 기본 "50% 25%"
};

// 메인 갤러리에 나오는 IP 목록 — 제목·장르는 예시이니 실제 작품명으로 바꿔 주세요
export const works: Work[] = [
  { title: "개같은 여과장이야", en: "Office Queen", genre: "오피스 드라마", status: "제작중", colors: ["#2a2a33", "#0b0b10"], image: "/works/01.jpg", focus: "50% 0%" },
  { title: "밤의 계약", en: "The Night Contract", genre: "로맨스", status: "제작중", colors: ["#3a2f8f", "#0d0b26"], image: "/works/02.jpg" },
  { title: "열대야", en: "Tropical Night", genre: "로맨스 코미디", status: "기획중", colors: ["#1f8a75", "#06201b"], image: "/works/03.jpg" },
  { title: "붉은 서재", en: "Scarlet Library", genre: "미스터리", status: "기획중", colors: ["#a8324a", "#1c0710"], image: "/works/04.jpg" },
  { title: "블랙 베일", en: "Black Veil", genre: "드라마", status: "기획중", colors: ["#4b4b5a", "#0b0b10"], image: "/works/05.jpg" },
  { title: "유리 정원", en: "Glass Garden", genre: "로맨스", status: "공개예정", colors: ["#c27a2c", "#221304"], image: "/works/06.jpg" },
];

export const history = [
  { year: "2026", items: ["J Pictures 설립", "AI 웹툰 제작 파이프라인 구축", "오리지널 IP 6종 개발 착수", "공식 홈페이지 오픈"] },
];
