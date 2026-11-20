// ─────────────────────────────────────────────
// 다국어 설정
// 사이트 문구는 모두 lib/content.json 에 있습니다. (ko · en · ja)
// 문구 안의 *별표*는 강조색, \n 은 줄바꿈입니다.
// ─────────────────────────────────────────────
import content from "./content.json";

export const locales = ["ko", "en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export type Dict = (typeof content.locales)["ko"];

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export function getDict(lang: Locale): Dict {
  return content.locales[lang] as Dict;
}

export const shared = {
  company: content.company,
  facts: content.facts,
  serviceWords: content.serviceWords,
};

export type WorkView = {
  id: string;
  title: string;
  en: string;
  genre: string;
  status: string;
  image: string;
  focus: string;
  colors: string[];
};

export function getWorks(lang: Locale): WorkView[] {
  const d = getDict(lang);
  return content.works.map((w) => ({
    id: w.id,
    title: d.titles[w.id as keyof Dict["titles"]],
    en: w.en,
    genre: d.genres[w.genre as keyof Dict["genres"]],
    status: d.status[w.status as keyof Dict["status"]],
    image: w.image,
    focus: w.focus,
    colors: w.colors,
  }));
}

export const languageOptions = locales.map((l) => ({
  code: l,
  short: content.locales[l].short,
  name: content.locales[l].langName,
}));
