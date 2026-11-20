# J Pictures (제이픽처스) 회사 홈페이지

Next.js 16 (App Router) · React 19 · TypeScript · 한국어 / English / 日本語

## 실행

```bash
npm install
npm run dev      # http://localhost:3000  → 자동으로 /ko · /en · /ja 로 이동
npm run build && npm start
```

최신 버전으로 맞추려면: `npm i next@latest react@latest react-dom@latest`

## 주소와 언어

| 주소 | 내용 |
| --- | --- |
| `/` | 전에 고른 언어 → 브라우저 언어 → 한국어 순으로 골라 이동 |
| `/ko` `/en` `/ja` | 언어별 페이지 (빌드 때 미리 만들어짐, 검색엔진용 hreflang 포함) |
| `/demo.html` | 서버 없이 보는 데모 (같은 디자인, 언어 전환 포함) |

헤더 오른쪽 `KO · EN · JA` 버튼으로 바꾸면 그 선택을 기억합니다.

## 내용 수정

- **모든 문구**: `lib/content.json` 한 파일 (`locales.ko` / `en` / `ja`)
  - `*별표*` 안의 글자는 강조색, `\n`은 줄바꿈
  - 연락처: `company` (이메일·전화), 응대 시간과 상호는 언어별 `company`
- **작품**: `content.json`의 `works` (이미지 `public/works/`, 제목은 언어별 `titles`)
- **색상/폰트**: `app/site.css` 상단 `:root`
- **파비콘**: `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`
- 데모 페이지를 다시 만들려면 Next 프로젝트 밖의 데모 빌드 스크립트로 `public/demo.html`을 갱신합니다

## 구성

OUR IPs 무한 갤러리(자동 회전 · 드래그 · 마우스 오버 카드 효과 · 패럴랙스 · 거울 바닥) → IP 타이틀 띠 → ABOUT → BUSINESS → AI PIPELINE → CONTACT → 푸터

- 모든 섹션은 `.wrap.split`(왼쪽 섹션 이름 / 오른쪽 본문) 한 가지 틀
- 반응형 점검: 320 · 375 · 390 · 768 · 1024 · 1280 · 1440 · 1920px, 가로 모드 폰까지 3개 언어 모두
- 일본어는 글자 단위 줄바꿈 + 금칙 처리, 제목은 구 단위 줄바꿈
- 문의 폼은 메일 앱으로 연결(mailto). 바로 보내지게 하려면 JcodeLab 사이트처럼 Cloudflare Email Routing을 붙이면 됩니다

## 배포

GitHub 저장소를 Vercel 또는 Cloudflare(OpenNext)에 연결해 배포합니다. 도메인: jpictures.kr
