import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ContactForm from "@/components/ContactForm";
import LogoMark from "@/components/Logo";
import { company, facts, pipeline, services, values, works } from "@/lib/data";

export default function Home() {
  const stripItems = [...works, ...works, ...works];

  return (
    <>
      <Header />
      <main id="top">
        {/* OUR IPs — 키비주얼 슬라이더 */}
        <HeroCarousel works={works} />

        {/* IP 타이틀 띠 */}
        <div className="logos" aria-hidden>
          <div className="logos-track">
            {stripItems.map((w, i) => (
              <span key={i} className="logo-item">
                <b>{w.title}</b>
                <span>{w.en}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section className="sec" id="about">
          <div className="wrap">
            <div className="about">
              <p className="label">About</p>
              <div>
                <h2 className="statement">
                  그림은 <em>AI가 빠르게</em>,
                  <br />
                  이야기와 연출은 <em>사람이 끝까지</em>.
                </h2>
                <div className="about-sub">
                  <p className="lead">
                    {company.nameEn}는 2026년 설립된 AI 웹툰 제작사입니다. AI 이미지 생성 기반의 제작 공정으로 오리지널
                    IP를 기획하고 만들어 국내외 플랫폼에 선보입니다.
                  </p>
                  <dl className="facts">
                    {facts.map((f) => (
                      <div key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <ul className="values">
                  {values.map((v, i) => (
                    <li key={v.title}>
                      <small>{String(i + 1).padStart(2, "0")}</small>
                      <h3>{v.title}</h3>
                      <p>{v.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BUSINESS */}
        <section className="sec biz-sec" id="business">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="label">Business</p>
                <h2 className="title">기획부터 유통까지</h2>
              </div>
              <p className="lead">하나의 IP가 태어나 독자를 만나기까지, 모든 과정을 J Pictures가 직접 합니다.</p>
            </div>
            <ul className="biz">
              {services.map((s) => (
                <li key={s.title}>
                  <span className="word">{s.word}</span>
                  <h3>{s.title}</h3>
                  <div>
                    <p>{s.desc}</p>
                    <p className="tags">{s.tags.join(" · ")}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PIPELINE */}
        <section className="sec" id="pipeline">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="label">AI Pipeline</p>
                <h2 className="title">AI로 그리고, 감각으로 완성합니다</h2>
              </div>
              <p className="lead">
                생성된 컷은 그대로 쓰지 않습니다. 연출과 디테일을 직접 다듬어 작품의 톤을 지킵니다.
              </p>
            </div>
            <ol className="flow">
              {pipeline.map((p, i) => (
                <li key={p.title}>
                  <small>STEP {String(i + 1).padStart(2, "0")}</small>
                  <b>{p.title}</b>
                  <p>{p.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACT */}
        <section className="sec contact-sec" id="contact">
          <div className="wrap contact">
            <div>
              <p className="label">Contact</p>
              <h2 className="title">
                다음 IP를
                <br />
                함께 만들어요
              </h2>
              <p className="mail-big">{company.email}</p>
              <dl className="info">
                <div><dt>전화</dt><dd>{company.tel}</dd></div>
                <div><dt>주소</dt><dd>{company.address}</dd></div>
              </dl>
            </div>
            <ContactForm />
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
            <nav className="foot-links" aria-label="하단 메뉴">
              <a href="#contact">찾아오시는 길</a>
              <a href="#top">개인정보 처리방침</a>
            </nav>
          </div>
          <div className="foot-info">
            <span><b>{company.nameKo}</b></span>
            <span><b>대표자명</b>{company.ceo}</span>
            <span><b>사업자등록번호</b>{company.bizNo}</span>
            <span><b>주소</b>{company.address}</span>
            <span><b>대표전화</b>{company.tel}</span>
            <span><b>이메일</b>{company.email}</span>
          </div>
          <p className="copy">Copyright {company.nameEn}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
