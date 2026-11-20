"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

export default function ContactForm({ t, email }: { t: Dict["contact"]; email: string }) {
  const [type, setType] = useState(t.types[0]);

  // 서버 없이 메일 앱으로 연결합니다. 접수 시스템이 필요하면 Server Action으로 교체하세요.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `[${type}] ${f.get("name")}`;
    const body = `${t.name}: ${f.get("name")}\n${t.email}: ${f.get("email")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="types">
        <legend className="sr">{t.legend}</legend>
        {t.types.map((x) => (
          <button type="button" key={x} aria-pressed={type === x} onClick={() => setType(x)}>
            {x}
          </button>
        ))}
      </fieldset>
      <input className="field" name="name" required placeholder={t.name} aria-label={t.name} autoComplete="name" />
      <input className="field" name="email" type="email" required placeholder={t.email} aria-label={t.email} autoComplete="email" />
      <textarea className="field" name="message" required rows={4} placeholder={t.message} aria-label={t.message} />
      <button type="submit" className="submit">
        {t.submit} →
      </button>
    </form>
  );
}
