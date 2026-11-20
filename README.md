# J Pictures (제이픽처스) 회사 홈페이지

Next.js 16 (App Router) · React 19 · TypeScript

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

최신 버전으로 맞추려면: `npm i next@latest react@latest react-dom@latest`

## 내용 수정

`lib/data.ts` 한 파일에 회사 정보, 수치, 사업분야, AI 제작 공정, IP 목록이 모두 있습니다. 현재 값은 전부 예시입니다.

- IP 키비주얼: `public/works/`의 이미지를 교체하거나 추가하고 `lib/data.ts`의 `works` 항목에서 `image`, `focus`(보여줄 기준점)를 지정하세요. 카드 아래 거울 반사는 같은 이미지로 자동 생성됩니다.
- 색상/폰트: `app/site.css` 상단 `:root` 토큰

## 구성

OUR IPs 가로 갤러리(휠·스크롤로 좌우 이동 + 카드 안 그림 패럴랙스) → IP 타이틀 띠 → ABOUT → BUSINESS → AI PIPELINE → CONTACT → 푸터

- 문의 폼은 메일 앱으로 연결(mailto). 서버 접수가 필요하면 Server Action으로 교체
- 데모: `public/demo.html` (배포 후 `/demo.html`)

## 배포

GitHub 저장소를 Vercel에 연결하면 그대로 배포됩니다.
