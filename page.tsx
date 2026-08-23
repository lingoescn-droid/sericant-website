import Link from "next/link";

const nav = [
  ["Product", "#product"],
  ["Technology", "#technology"],
  ["About", "#about"],
  ["Roadmap", "#roadmap"]
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <Link href="#" className="brand">SERICANT<span>.</span></Link>
        <nav>
          {nav.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
        </nav>
        <a className="navCta" href="mailto:hello@sericant.com">Contact</a>
      </header>

      <section className="hero">
        <div className="eyebrow">AI-POWERED ENTERPRISE DATA INTELLIGENCE</div>
        <h1>Making Chinese Enterprise Data <em>understandable.</em></h1>
        <p className="heroCopy">
          Sericant is building an AI-powered platform that transforms enterprise
          information from Mainland China and Hong Kong into accessible,
          understandable and actionable intelligence.
        </p>
        <div className="actions">
          <a className="button primary" href="#product">Explore the product <span>↗</span></a>
          <a className="button ghost" href="mailto:hello@sericant.com">Talk to us</a>
        </div>
        <div className="heroMeta">
          <span>HONG KONG</span><i /> <span>MAINLAND CHINA</span><i /> <span>GLOBAL</span>
        </div>
      </section>

      <section className="statement">
        <div className="sectionLabel">01 / THE OPPORTUNITY</div>
        <div>
          <h2>Enterprise information is abundant.<br />Understanding it shouldn’t be difficult.</h2>
          <p>
            China has one of the world’s largest and most extensive corporate
            ecosystems. Yet enterprise information can be fragmented, complex
            and difficult to interpret — especially for users outside Mainland China.
          </p>
        </div>
      </section>

      <section id="product" className="productSection">
        <div className="sectionLabel">02 / PRODUCT</div>
        <div className="productGrid">
          <div>
            <h2>From company data<br />to enterprise intelligence.</h2>
            <p>
              Our first capability is an AI Company Summary: enter a company name
              and generate a concise, structured overview from relevant enterprise information.
            </p>
            <div className="status"><b /> MVP / EARLY STAGE</div>
          </div>
          <div className="demo">
            <div className="demoTop"><span>AI COMPANY SUMMARY</span><span>01</span></div>
            <div className="search">Tencent Technology (Shenzhen) Co., Ltd.<span>⌕</span></div>
            <div className="result">
              <div className="resultTag">AI-GENERATED SUMMARY</div>
              <h3>Tencent Technology (Shenzhen) Co., Ltd.</h3>
              <p>
                A technology company profile generated from enterprise information,
                organised into a concise overview for faster research.
              </p>
              <div className="chips"><span>Corporate Profile</span><span>Business</span><span>AI Summary</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="technology" className="techSection">
        <div className="sectionLabel">03 / TECHNOLOGY</div>
        <h2>Data → Structure → AI → Intelligence</h2>
        <div className="steps">
          {[
            ["01", "DATA", "Enterprise information from Mainland China and Hong Kong."],
            ["02", "STRUCTURE", "Processing, normalisation and entity resolution."],
            ["03", "AI", "Extraction, summarisation and natural-language understanding."],
            ["04", "INTELLIGENCE", "Searchable, understandable and actionable enterprise intelligence."]
          ].map(([n, t, d]) => (
            <article key={n} className="step">
              <span>{n}</span><h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roadmap" className="roadmap">
        <div className="sectionLabel">04 / ROADMAP</div>
        <h2>Building the next generation<br />of enterprise intelligence.</h2>
        <div className="roadmapList">
          {[
            ["01", "AI Company Summary", "AVAILABLE", "Generate concise AI-powered company profiles."],
            ["02", "AI Enterprise Search", "IN DEVELOPMENT", "Search enterprise information using natural language."],
            ["03", "Enterprise Intelligence", "PLANNED", "Analyse relationships, changes and corporate context."],
            ["04", "AI Research Agent", "ROADMAP", "Automate multi-step enterprise research through AI agents."]
          ].map(([n, title, status, desc]) => (
            <div className="roadmapItem" key={n}>
              <span className="number">{n}</span><div><h3>{title}</h3><p>{desc}</p></div><span className="pill">{status}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <div className="sectionLabel">05 / FOUNDER</div>
        <div className="aboutGrid">
          <div><h2>Built from<br /><em>professional experience.</em></h2></div>
          <div>
            <h3>Wilson Franck</h3>
            <p className="role">Founder &amp; Director</p>
            <p>
              Wilson Franck is a Beijing-based lawyer with professional experience
              using Chinese enterprise information platforms. That experience led
              to a simple observation: vast amounts of corporate information are
              available, but users still spend significant time searching,
              interpreting and organising it.
            </p>
            <p>
              Sericant was established in Hong Kong to explore how AI can
              fundamentally improve this workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="hongkong">
        <div className="sectionLabel">06 / POSITIONING</div>
        <h2>Built in Hong Kong.<br />Connected to China.<br /><em>Designed for the world.</em></h2>
        <div className="locationCards">
          <div><strong>HONG KONG</strong><span>International business &amp; technology base</span></div>
          <div><strong>MAINLAND CHINA</strong><span>Enterprise data &amp; ecosystem connectivity</span></div>
          <div><strong>GLOBAL</strong><span>Enterprise intelligence for international users</span></div>
        </div>
      </section>

      <section className="brandStory">
        <div className="sectionLabel">07 / THE NAME</div>
        <h2>From Serica<br />to <em>Sericant.</em></h2>
        <p>
          Sericant is a coined name inspired by “Serica”, an ancient Western term
          associated with China and the land of silk. The name reflects our vision
          of building a modern bridge between Chinese enterprise information and
          the global business community.
        </p>
        <div className="brandLine">CONNECTING CHINESE ENTERPRISE INTELLIGENCE TO THE WORLD.</div>
      </section>

      <section className="contact">
        <div className="sectionLabel">08 / CONTACT</div>
        <h2>Let’s build the<br /><em>intelligence layer.</em></h2>
        <a href="mailto:hello@sericant.com" className="contactEmail">hello@sericant.com ↗</a>
        <p>Sericant Limited · Hong Kong</p>
      </section>

      <footer>
        <div className="brand">SERICANT<span>.</span></div>
        <div>AI-POWERED ENTERPRISE DATA INTELLIGENCE</div>
        <div>© 2026 Sericant Limited</div>
      </footer>
    </main>
  );
}