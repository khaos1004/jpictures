import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ContactForm from "@/components/ContactForm";
import LogoMark from "@/components/Logo";
import Rich from "@/components/Rich";
import { getDict, getWorks, isLocale, shared, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang: Locale = raw;
  const t = getDict(lang);
  const works = getWorks(lang);
  const { company } = shared;
  const strip = [...works, ...works, ...works];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <Header lang={lang} nav={t.nav} ui={t.ui} />
      <main id="top">
        {/* OUR IPs — 휠로 흐르는 가로 갤러리 */}
        <HeroCarousel works={works} ui={t.ui} />

        {/* IP 타이틀 띠 */}
        <div className="logos" aria-hidden>
          <div className="logos-track">
            {strip.map((w, i) => (
              <span key={i} className="logo-item">
                <b>{w.title}</b>
                <span>{w.en}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section className="sec" id="about">
          <div className="wrap split">
            <p className="label">{t.about.label}</p>
            <div className="split-body">
              <h2 className="statement">
                <Rich text={t.about.statement} />
              </h2>
              <div className="about-sub">
                <p className="lead">{t.about.lead}</p>
                <dl className="facts">
                  {t.about.facts.map((label, i) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{shared.facts[i]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <ul className="values">
                {t.about.values.map((v, i) => (
                  <li key={v.title}>
                    <small>{pad(i + 1)}</small>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* BUSINESS */}
        <section className="sec biz-sec" id="business">
          <div className="wrap split">
            <p className="label">{t.business.label}</p>
            <div className="split-body">
              <div className="sec-head">
                <h2 className="title">{t.business.title}</h2>
                <p className="lead">{t.business.lead}</p>
              </div>
              <ul className="biz">
                {t.business.items.map((s, i) => (
                  <li key={s.title}>
                    <span className="word" aria-hidden>
                      {shared.serviceWords[i]}
                    </span>
                    <h3>{s.title}</h3>
                    <div>
                      <p>{s.desc}</p>
                      <p className="tags">{s.tags.join(" · ")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PIPELINE */}
        <section className="sec" id="pipeline">
          <div className="wrap split">
            <p className="label">{t.pipeline.label}</p>
            <div className="split-body">
              <div className="sec-head">
                <h2 className="title">
                  <Rich text={t.pipeline.title} />
                </h2>
                <p className="lead">{t.pipeline.lead}</p>
              </div>
              <ol className="flow">
                {t.pipeline.steps.map((p, i) => (
                  <li key={p.title}>
                    <small>STEP {pad(i + 1)}</small>
                    <b>{p.title}</b>
                    <p>{p.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="sec contact-sec" id="contact">
          <div className="wrap split">
            <p className="label">{t.contact.label}</p>
            <div className="split-body contact">
              <div>
                <h2 className="title">
                  <Rich text={t.contact.title} />
                </h2>
                <p className="mail-big">{company.email}</p>
                <dl className="info">
                  <div>
                    <dt>{t.contact.tel}</dt>
                    <dd>{company.tel}</dd>
                  </div>
                  <div>
                    <dt>{t.contact.hours}</dt>
                    <dd>{t.company.hours}</dd>
                  </div>
                </dl>
              </div>
              <ContactForm t={t.contact} email={company.email} />
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-top">
            <a href="#top" className="logo">
              <LogoMark />
              <span className="wordmark">
                J <em>Pictures</em>
              </span>
            </a>
            <nav className="foot-links" aria-label="Footer">
              <a href="#about">{t.nav.about}</a>
              <a href="#ips">{t.nav.ips}</a>
              <a href="#business">{t.nav.business}</a>
              <a href="#contact">{t.nav.contact}</a>
            </nav>
          </div>
          <div className="foot-info">
            <span>
              <b>{t.footer.company}</b>
              {t.company.name}
            </span>
            <span>
              <b>{t.footer.email}</b>
              {company.email}
            </span>
            <span>
              <b>{t.footer.tel}</b>
              {company.tel} ({t.company.hours})
            </span>
          </div>
          <p className="copy">
            © {new Date().getFullYear()} J Pictures. {t.footer.rights}
          </p>
        </div>
      </footer>
    </>
  );
}
