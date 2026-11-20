"use client";

import { useState } from "react";
import { company } from "@/lib/data";

const types = ["작품 제휴", "IP 라이선스", "협업 제안", "기타"];

export default function ContactForm() {
  const [type, setType] = useState(types[0]);

  // 서버 없이 메일 앱으로 연결합니다. 접수 시스템이 필요하면 Server Action으로 교체하세요.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `[${type}] ${f.get("name")}`;
    const body = `이름/회사: ${f.get("name")}\n연락처: ${f.get("email")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="types">
        <legend className="sr">문의 유형</legend>
        {types.map((t) => (
          <button type="button" key={t} aria-pressed={type === t} onClick={() => setType(t)}>
            {t}
          </button>
        ))}
      </fieldset>
      <input className="field" name="name" required placeholder="이름 / 회사명" />
      <input className="field" name="email" type="email" required placeholder="이메일" />
      <textarea className="field" name="message" required rows={4} placeholder="문의 내용" />
      <button type="submit" className="submit">
        문의 보내기 →
      </button>
    </form>
  );
}
