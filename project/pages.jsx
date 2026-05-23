const { useState: useStateP } = React;

// ─────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────
const HomePage = ({ go }) => (
  <React.Fragment>
    {/* HERO — dark, centered, halo from bottom */}
    <section
      data-screen-label="Home / Hero"
      className="relative bg-[#0A0A0A] text-[#F7F4ED] -mt-[88px] md:-mt-[96px] pt-[110px] md:pt-[180px] pb-20 md:pb-48 overflow-hidden"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.45 }}
        src="uploads/room-interior-renovation-with-painting-supplies-an-2026-01-22-19-29-44-utc-1.mp4"
        autoPlay
        muted
        loop
        playsInline
      ></video>
      {/* Halo — sky-blue radial glow rising from bottom-center */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 bottom-0 h-[80%]"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 50% 100%, #AED8E6 0%, rgba(174,216,230,0.55) 25%, rgba(174,216,230,0.18) 55%, rgba(10,10,10,0) 80%)",
          }}
        />
        {/* outer vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.6) 100%)",
          }}
        />
      </div>

      {/* Decorative side tick marks */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1.5 text-[#F7F4ED]/30 text-[10px] tracking-[0.4em] font-mono">
        <span>|||||||||</span>
        <span className="self-end">○</span>
      </div>
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1.5 text-[#F7F4ED]/30 text-[10px] tracking-[0.4em] font-mono">
        <span>○</span>
        <span>|||||||||</span>
      </div>

      {/* Circuit tracery rising from bottom-center */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] max-w-full h-[420px] pointer-events-none opacity-50"
        viewBox="0 0 900 420"
        fill="none"
      >
        <defs>
          <linearGradient id="trace" x1="0" y1="420" x2="0" y2="0">
            <stop offset="0%" stopColor="#F7F4ED" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F7F4ED" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="url(#trace)" strokeWidth="1">
          <path d="M450 420 L450 280 L380 280 L380 200 L300 200 L300 120" />
          <path d="M450 420 L450 300 L520 300 L520 220 L600 220 L600 140" />
          <path d="M450 420 L450 250 L450 160" />
          <path d="M380 420 L380 350 L320 350 L320 280" />
          <path d="M520 420 L520 360 L580 360 L580 300" />
        </g>
        <g fill="#F7F4ED" opacity="0.7">
          <circle cx="300" cy="120" r="2" />
          <circle cx="600" cy="140" r="2" />
          <circle cx="450" cy="160" r="2" />
          <circle cx="320" cy="280" r="2" />
          <circle cx="580" cy="300" r="2" />
        </g>
      </svg>

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
        {/* Availability pill badge */}
        <div className="inline-flex items-center gap-2.5 bg-[#F7F4ED]/[0.08] backdrop-blur-sm ring-1 ring-[#F7F4ED]/15 rounded-full pl-1.5 pr-4 py-1.5 mb-10">
          <span className="bg-[#AED8E6] text-[#0A0A0A] text-[10px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full">
            2026
          </span>
          <span className="text-xs md:text-sm text-[#F7F4ED]/85 tracking-wide">
            Disponible pour vos nouveaux chantiers
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-['Fraunces'] text-[11vw] md:text-[7.5vw] lg:text-[6.5rem] leading-[0.95] tracking-[-0.025em] text-[#F7F4ED]">
          Votre partenaire{" "}
          <em className="italic font-light text-[#F7F4ED]/80">rénovation</em>
          <br />
          de la cave au{" "}
          <em className="italic font-normal text-[#AED8E6]">grenier</em>.
        </h1>

        {/* Subhead */}
        <p className="mt-6 md:mt-10 max-w-2xl mx-auto text-base md:text-lg text-[#F7F4ED]/65 leading-relaxed">
          Entreprise de rénovation en Belgique. De la salle de bain à la
          rénovation complète, nous coordonnons chaque corps de métier sous un
          seul interlocuteur — pour un chantier maîtrisé et un résultat soigné.
        </p>

        {/* CTA pill (light) */}
        <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => go("contact")}
            className="inline-flex items-center gap-2.5 bg-[#F7F4ED] text-[#0A0A0A] pl-5 pr-6 py-3.5 rounded-full text-sm tracking-wide hover:bg-[#AED8E6] transition group shadow-[0_10px_40px_rgba(174,216,230,0.35)]"
          >
            <span className="w-7 h-7 rounded-full bg-[#0A0A0A] text-[#AED8E6] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
            </span>
            Demander un devis gratuit
          </button>
          <button
            onClick={() => go("realisations")}
            className="inline-flex items-center gap-2 text-[#F7F4ED]/80 hover:text-[#F7F4ED] px-4 py-3 rounded-full text-sm tracking-wide transition group"
          >
            Voir nos chantiers
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition" />
          </button>
        </div>
      </div>
    </section>

    {/* Stats strip — modern bento cards */}
    <section className="relative bg-[#F7F4ED] border-y border-[#0A0A0A]/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[220px] rounded-full bg-[#AED8E6]/20 blur-3xl" />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            {
              count: 6,
              label: "domaines d'expertise",
              detail: "Salle de bain, façade, toiture, isolation, aménagement, rénovation.",
              Ic: Layers,
            },
            {
              text: "A→Z",
              label: "accompagnement complet",
              detail: "Un seul interlocuteur, de l'étude initiale jusqu'aux finitions.",
              Ic: Sparkles,
            },
            {
              count: 100,
              suffix: "%",
              label: "travail soigné",
              detail: "Matériaux de qualité, finitions au cordeau, garanties d'usage.",
              Ic: Check,
            },
            {
              text: "BE",
              label: "intervention Belgique",
              detail: "Bruxelles et toute la Belgique, devis gratuit sur place.",
              Ic: MapPin,
            },
          ].map((s, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className="group relative bg-[#FBFAF6] rounded-2xl ring-1 ring-[#0A0A0A]/[0.06] shadow-[0_4px_24px_-8px_rgba(10,10,10,0.06),0_24px_48px_-24px_rgba(10,10,10,0.12)] p-5 md:p-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(174,216,230,0.55),0_36px_60px_-28px_rgba(10,10,10,0.18)] transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <span className="font-['Fraunces'] italic text-xs text-[#0A0A0A]/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#AED8E6]/30 grid place-items-center group-hover:bg-[#AED8E6] transition-colors duration-500">
                  <s.Ic className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.5} />
                </div>
              </div>
              <div className="font-['Fraunces'] text-5xl md:text-6xl text-[#0A0A0A] leading-none mb-3 tracking-[-0.02em]">
                {s.count != null ? (
                  <CountUp to={s.count} suffix={s.suffix || ""} />
                ) : (
                  s.text
                )}
              </div>
              <div className="text-xs md:text-sm text-[#0A0A0A]/80 uppercase tracking-wider mb-2">
                {s.label}
              </div>
              <div className="hidden md:block text-xs text-[#0A0A0A]/55 leading-relaxed">
                {s.detail}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* PRÉSENTATION */}
    <section data-screen-label="Home / Presentation" className="bg-[#0A0A0A] text-[#F7F4ED] py-16 md:py-16 md:py-20 lg:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <SectionLabel n="01">Présentation</SectionLabel>
          <h2 className="font-['Fraunces'] text-4xl md:text-5xl leading-tight">
            Le savoir-faire au service de <em className="italic font-light">vos projets</em>.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-lg text-[#F7F4ED]/75 leading-relaxed">
          <p>
            Chez Bati Conception, nous mettons notre savoir-faire au service de vos projets
            de rénovation, qu'il s'agisse d'un simple aménagement intérieur ou d'une
            transformation complète de votre habitation.
          </p>
          <p>
            Notre objectif est simple : vous offrir un résultat <span className="text-[#AED8E6]">durable, esthétique
            et parfaitement adapté</span> à vos besoins. Nous travaillons avec des matériaux de
            qualité et coordonnons chaque étape du chantier pour garantir un travail soigné
            et sans mauvaise surprise.
          </p>
        </div>
      </div>
    </section>

    {/* SERVICES */}
    <section
      data-screen-label="Home / Services"
      className="relative py-16 md:py-16 md:py-20 lg:py-24 lg:py-32 bg-[#F7F4ED] overflow-hidden"
    >
      {/* Soft sky-blue ambient wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#AED8E6]/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#AED8E6]/15 blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 md:mb-20 gap-6">
          <div>
            <SectionLabel n="02">Nos services</SectionLabel>
            <h2 className="font-['Fraunces'] text-5xl md:text-6xl text-[#0A0A0A] leading-[1]">
              Six expertises,
              <br />
              <em className="italic font-light">une seule équipe</em>.
            </h2>
          </div>
          <p className="text-[#0A0A0A]/60 max-w-sm">
            Nous intervenons dans différents domaines de la rénovation, du chantier
            ponctuel à la transformation clé en main.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICE_KEYS.map((k, i) => {
            const s = SERVICES[k];
            const Ic = s.icon;
            const featured = k === "renovation-complete";
            return (
              <Reveal key={k} delay={i * 70} y={20}>
              <button
                onClick={() => go(k)}
                className={`group relative text-left w-full rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                  featured
                    ? "bg-[#0A0A0A] text-[#F7F4ED] ring-1 ring-[#0A0A0A] shadow-[0_8px_30px_-10px_rgba(10,10,10,0.4),0_40px_70px_-25px_rgba(10,10,10,0.3)] hover:shadow-[0_12px_40px_-12px_rgba(174,216,230,0.5),0_50px_90px_-30px_rgba(10,10,10,0.4)]"
                    : "bg-[#F7F4ED] ring-1 ring-[#0A0A0A]/8 shadow-[0_4px_24px_-8px_rgba(10,10,10,0.08),0_24px_50px_-20px_rgba(10,10,10,0.10)] hover:shadow-[0_8px_30px_-8px_rgba(174,216,230,0.6),0_40px_70px_-25px_rgba(10,10,10,0.18)]"
                }`}
              >
                {/* Accent dot */}
                <span
                  className={`absolute top-7 right-7 font-['Fraunces'] italic text-sm ${
                    featured ? "text-[#F7F4ED]/40" : "text-[#0A0A0A]/30"
                  }`}
                >
                  0{i + 1}
                </span>

                {/* Icon tile */}
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl grid place-items-center mb-8 md:mb-10 transition-all duration-500 ${
                    featured
                      ? "bg-[#AED8E6]/15 group-hover:bg-[#AED8E6]"
                      : "bg-[#AED8E6]/30 group-hover:bg-[#AED8E6] group-hover:shadow-[0_8px_20px_-4px_rgba(174,216,230,0.7)]"
                  }`}
                >
                  <Ic
                    className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-500 ${
                      featured ? "text-[#AED8E6] group-hover:text-[#0A0A0A]" : "text-[#0A0A0A]"
                    }`}
                    strokeWidth={1.25}
                  />
                </div>

                <h3
                  className={`font-['Fraunces'] text-2xl md:text-3xl leading-tight mb-3 ${
                    featured ? "text-[#F7F4ED]" : "text-[#0A0A0A]"
                  }`}
                >
                  {s.label}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-8 ${
                    featured ? "text-[#F7F4ED]/65" : "text-[#0A0A0A]/60"
                  }`}
                >
                  {s.tagline}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs uppercase tracking-[0.2em] ${
                      featured ? "text-[#AED8E6]" : "text-[#0A0A0A]/70"
                    }`}
                  >
                    Découvrir
                  </span>
                  <span
                    className={`w-10 h-10 rounded-full grid place-items-center transition-all duration-500 ${
                      featured
                        ? "bg-[#AED8E6] text-[#0A0A0A] group-hover:bg-[#F7F4ED]"
                        : "bg-[#0A0A0A]/[0.06] text-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:text-[#F7F4ED]"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </span>
                </div>
              </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* POURQUOI NOUS */}
    <section
      data-screen-label="Home / Pourquoi"
      className="relative py-16 md:py-16 md:py-20 lg:py-24 lg:py-32 bg-[#0A0A0A] text-[#F7F4ED] overflow-hidden"
    >
      {/* Ambient halos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full bg-[#AED8E6]/15 blur-3xl" />
        <div className="absolute -right-20 bottom-0 w-[400px] h-[400px] rounded-full bg-[#AED8E6]/10 blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left intro */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <SectionLabel n="03">Pourquoi nous</SectionLabel>
          <h2 className="font-['Fraunces'] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em]">
            Ce qui fait la{" "}
            <em className="italic font-light text-[#AED8E6]">différence</em>.
          </h2>
          <p className="mt-6 text-[#F7F4ED]/70 leading-relaxed max-w-md">
            Chaque projet est unique. Nous prenons le temps d'analyser vos
            besoins et de vous proposer des solutions adaptées, du simple
            rafraîchissement à la rénovation complète.
          </p>
          <button
            onClick={() => go("contact")}
            className="mt-8 inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#F7F4ED] text-[#0A0A0A] text-sm tracking-wide hover:bg-[#AED8E6] transition group"
          >
            Parler de mon projet
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition" />
          </button>
        </div>

        {/* Cards grid */}
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4 md:gap-5">
          {[
            {
              title: "Accompagnement personnalisé",
              desc: "Un seul interlocuteur du devis aux finitions. Des conseils à chaque étape, sans jargon.",
              Icon: Sparkles,
            },
            {
              title: "Délais et budget respectés",
              desc: "Planning précis, budget transparent. Pas de surprise en cours de chantier.",
              Icon: Check,
            },
            {
              title: "Coordination de A à Z",
              desc: "Maçons, plombiers, électriciens, peintres — orchestrés sous un seul chantier.",
              Icon: Layers,
            },
            {
              title: "Solutions sur-mesure",
              desc: "Chaque projet est unique. On adapte, on propose, on ajuste avec vous.",
              Icon: Hammer,
            },
            {
              title: "Travail soigné et durable",
              desc: "Matériaux de qualité, finitions au cordeau, garanties d'usage. C'est notre signature.",
              Icon: Building2,
              wide: true,
            },
          ].map((r, i) => {
            const Ic = r.Icon;
            return (
              <Reveal
                key={i}
                delay={i * 80}
                y={20}
                className={r.wide ? "sm:col-span-2" : ""}
              >
              <div
                className="relative rounded-2xl p-6 md:p-8 bg-[#F7F4ED] text-[#0A0A0A] ring-1 ring-[#F7F4ED]/5 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.4),0_30px_60px_-25px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:shadow-[0_8px_40px_-10px_rgba(174,216,230,0.4),0_40px_80px_-30px_rgba(0,0,0,0.6)] transition-all duration-500 group overflow-hidden"
              >
                {/* Big italic number watermark */}
                <span className="absolute -top-2 -right-2 font-['Fraunces'] italic text-[7rem] md:text-[8rem] leading-none text-[#AED8E6]/25 select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-[#AED8E6]/30 grid place-items-center mb-5 group-hover:bg-[#AED8E6] transition-colors duration-500">
                    <Ic className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-['Fraunces'] text-xl md:text-2xl leading-tight mb-2 max-w-xs">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[#0A0A0A]/65 leading-relaxed max-w-md">
                    {r.desc}
                  </p>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    <FinalCta go={go} />
  </React.Fragment>
);

// ─────────────────────────────────────────────────────────────
// SERVICE (générique)
// ─────────────────────────────────────────────────────────────
const ServicePage = ({ slug, go }) => {
  const s = SERVICES[slug];
  const Ic = s.icon;
  const idx = SERVICE_KEYS.indexOf(slug);

  return (
    <React.Fragment>
      <section data-screen-label={`Service / ${s.label} / Hero`} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-40 top-1/4 w-[500px] h-[500px] rounded-full bg-[#AED8E6]/40 blur-3xl" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-10 pb-20 md:pt-16 md:pb-28">
          <button
            onClick={() => go("home")}
            className="text-xs uppercase tracking-[0.25em] text-[#0A0A0A]/50 hover:text-[#0A0A0A] mb-10 inline-flex items-center gap-2"
          >
            ← Tous les services
          </button>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#AED8E6] flex items-center justify-center">
                  <Ic className="w-7 h-7 text-[#0A0A0A]" strokeWidth={1.5} />
                </div>
                <span className="font-['Fraunces'] italic text-2xl text-[#0A0A0A]/40">
                  0{idx + 1} / 06
                </span>
              </div>
              <h1 className="font-['Fraunces'] text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em] text-[#0A0A0A]">
                {s.title.split(" ").slice(0, -1).join(" ")}{" "}
                <em className="italic font-light">{s.title.split(" ").slice(-1)}</em>.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-lg md:text-xl text-[#0A0A0A]/70 leading-relaxed">
                {s.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label={`Service / ${s.label} / Intro`} className="py-20 md:py-16 md:py-20 lg:py-24 bg-[#0A0A0A] text-[#F7F4ED]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <SectionLabel n="01">Le projet</SectionLabel>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <p className="font-['Fraunces'] text-2xl md:text-3xl leading-relaxed text-[#F7F4ED]">
              {s.intro}
            </p>
          </div>
        </div>
      </section>

      <section data-screen-label={`Service / ${s.label} / Prestations`} className="py-16 md:py-16 md:py-20 lg:py-24 lg:py-32 bg-[#F7F4ED]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionLabel n="02">Nos prestations</SectionLabel>
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#0A0A0A] leading-tight mb-6">
              Ce que nous <em className="italic font-light">réalisons</em>.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-px bg-[#0A0A0A]/10 border-y border-[#0A0A0A]/10">
              {s.prestations.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#F7F4ED] flex items-center gap-6 py-5 px-6 group hover:bg-[#AED8E6]/20 transition"
                >
                  <span className="font-['Fraunces'] italic text-sm text-[#0A0A0A]/40 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#0A0A0A] text-lg flex-1">{item}</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0A0A]/30 group-hover:text-[#0A0A0A] group-hover:translate-x-1 transition" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label={`Service / ${s.label} / Process`} className="py-16 md:py-16 md:py-20 lg:py-24 lg:py-32 bg-[#AED8E6]/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel n="03">Notre approche</SectionLabel>
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#0A0A0A] leading-tight">
                Un projet de <em className="italic font-light">A à Z</em>.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[#0A0A0A]/70 text-lg leading-relaxed">
                De l'étude de votre projet jusqu'à la finition des travaux, nous assurons
                un suivi rigoureux pour garantir un résultat durable et performant.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-[#0A0A0A]/10">
            {s.process.map((step, i) => (
              <div key={i} className="bg-[#F7F4ED] p-6 md:p-8 relative">
                <div className="font-['Fraunces'] text-6xl text-[#AED8E6] mb-4 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-[#0A0A0A] text-sm leading-relaxed">{step}</p>
                {i < s.process.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 w-5 h-5 text-[#0A0A0A]/30 bg-[#F7F4ED]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label={`Service / ${s.label} / Pourquoi`} className="py-16 md:py-16 md:py-20 lg:py-24 lg:py-32 bg-[#F7F4ED]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionLabel n="04">Pourquoi</SectionLabel>
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#0A0A0A] leading-tight">
              Les <em className="italic font-light">bénéfices</em>
              <br />
              pour vous.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <CheckList items={s.why} />
            {s.extra && (
              <div className="mt-12 pt-10 border-t border-[#0A0A0A]/10">
                <div className="text-xs uppercase tracking-[0.25em] text-[#0A0A0A]/60 mb-4">
                  {s.extra.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.extra.items.map((it, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full border border-[#0A0A0A]/20 text-sm text-[#0A0A0A]"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <FinalCta go={go} />
    </React.Fragment>
  );
};

// ─────────────────────────────────────────────────────────────
// SERVICES (overview)
// ─────────────────────────────────────────────────────────────
const ServicesPage = ({ go }) => (
  <React.Fragment>
    <BigHero
      eyebrow="Nos services"
      title="Services"
      intro="De la salle de bain à la rénovation complète, nous coordonnons chaque corps de métier sous un seul interlocuteur. Choisissez l'expertise qui correspond à votre projet."
      labels={["Salle de bain", "Toiture", "Façade", "Aménagement", "Isolation", "Rénovation"]}
    />

    {/* Mini-nav chips on cream */}
    <section className="bg-[#F7F4ED] py-10 md:py-12 border-b border-[#0A0A0A]/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-wrap gap-2 justify-center">
        {SERVICE_KEYS.map((k, i) => {
          const s = SERVICES[k];
          const Ic = s.icon;
          return (
            <a
              key={k}
              href={`#service-${k}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0A0A0A]/20 text-sm text-[#0A0A0A]/80 hover:bg-[#0A0A0A] hover:text-[#F7F4ED] hover:border-[#0A0A0A] transition-all"
            >
              <Ic className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-['Fraunces'] italic text-xs opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.label}
            </a>
          );
        })}
      </div>
    </section>

    <section data-screen-label="Services / Approche" className="bg-[#0A0A0A] text-[#F7F4ED] py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <SectionLabel n="00">Notre approche</SectionLabel>
          <h2 className="font-['Fraunces'] text-3xl md:text-4xl leading-tight">
            Un seul <em className="italic font-light">interlocuteur</em>,
            <br />
            tous les corps de métier.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 space-y-5 text-[#F7F4ED]/75 leading-relaxed">
          <p>
            Chaque projet est pensé dans sa globalité. Nous coordonnons l'intégralité
            des intervenants — maçons, carreleurs, plombiers, électriciens, peintres —
            pour garantir un chantier fluide et un résultat cohérent.
          </p>
          <p>
            Que vous ayez besoin d'une seule expertise ponctuelle ou d'un accompagnement
            de A à Z, chaque service ci-dessous peut être réalisé seul ou combiné aux
            autres.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-[#F7F4ED]">
      {SERVICE_KEYS.map((k, i) => {
        const s = SERVICES[k];
        const Ic = s.icon;
        const reverse = i % 2 === 1;
        return (
          <div
            key={k}
            id={`service-${k}`}
            data-screen-label={`Services / ${s.label}`}
            className="border-t border-[#0A0A0A]/10 py-14 md:py-20 lg:py-28 scroll-mt-24"
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
              <div
                className={`grid lg:grid-cols-12 gap-10 items-start ${
                  reverse ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className="lg:col-span-4 lg:[direction:ltr]">
                  <div className="relative aspect-square bg-gradient-to-br from-[#AED8E6] to-[#AED8E6]/40 flex items-center justify-center overflow-hidden">
                    <svg
                      className="absolute inset-0 w-full h-full opacity-25"
                      viewBox="0 0 200 200"
                      preserveAspectRatio="none"
                    >
                      {[...Array(15)].map((_, j) => (
                        <line
                          key={j}
                          x1="0"
                          y1={j * 14}
                          x2="200"
                          y2={j * 14 - 40}
                          stroke="#0A0A0A"
                          strokeWidth="0.4"
                        />
                      ))}
                    </svg>
                    <div className="relative text-center">
                      <div className="font-['Fraunces'] italic text-[12rem] md:text-[14rem] leading-none text-[#0A0A0A]/15">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <Ic
                        className="absolute inset-0 m-auto w-20 h-20 text-[#0A0A0A]"
                        strokeWidth={1}
                      />
                    </div>
                    <div className="absolute top-4 left-4 text-xs uppercase tracking-[0.2em] text-[#0A0A0A]/60">
                      Service · {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs uppercase tracking-[0.2em] text-[#0A0A0A]/60">
                      / 06
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 lg:col-start-6 lg:[direction:ltr]">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#0A0A0A]/60 mb-4">
                    {s.label}
                  </div>
                  <h3 className="font-['Fraunces'] text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] leading-[1] tracking-[-0.01em] mb-4">
                    {s.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <em className="italic font-light">
                      {s.title.split(" ").slice(-1)}
                    </em>
                    .
                  </h3>
                  <p className="font-['Fraunces'] italic text-xl md:text-2xl text-[#0A0A0A]/70 mb-8">
                    {s.tagline}
                  </p>
                  <p className="text-[#0A0A0A]/75 leading-relaxed mb-10 max-w-2xl">
                    {s.intro}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 max-w-2xl">
                    {s.prestations.slice(0, 6).map((p, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full bg-[#0A0A0A] shrink-0" />
                        <span className="text-sm text-[#0A0A0A]/80">{p}</span>
                      </div>
                    ))}
                  </div>

                  {s.prestations.length > 6 && (
                    <div className="text-xs text-[#0A0A0A]/50 italic mb-8">
                      + {s.prestations.length - 6} autres prestations
                    </div>
                  )}

                  <button
                    onClick={() => go(k)}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0A0A0A] text-[#F7F4ED] text-sm tracking-wide hover:bg-[#AED8E6] hover:text-[#0A0A0A] transition-all duration-300 group"
                  >
                    Voir cette expertise
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>

    <section data-screen-label="Services / Pack complet" className="py-16 md:py-16 md:py-20 lg:py-24 lg:py-32 bg-[#AED8E6]/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1400 600"
          preserveAspectRatio="none"
        >
          {[...Array(30)].map((_, j) => (
            <line
              key={j}
              x1="0"
              y1={j * 22}
              x2="1400"
              y2={j * 22 - 100}
              stroke="#0A0A0A"
              strokeWidth="0.3"
            />
          ))}
        </svg>
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <SectionLabel n="07">Pack rénovation complète</SectionLabel>
          <h2 className="font-['Fraunces'] text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] leading-[1] tracking-[-0.01em] mb-6">
            Besoin de <em className="italic font-light">tout combiner</em> ?
          </h2>
          <p className="text-[#0A0A0A]/75 leading-relaxed mb-8 max-w-xl">
            Nos six expertises peuvent être orchestrées en un seul chantier. Notre
            rénovation complète prend en charge la coordination, la planification et le
            suivi — pour un projet livré clé en main.
          </p>
          <button
            onClick={() => go("renovation-complete")}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#0A0A0A] text-[#F7F4ED] text-sm tracking-wide hover:bg-[#F7F4ED] hover:text-[#0A0A0A] transition-all duration-300 group"
          >
            Découvrir la rénovation complète
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition" />
          </button>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="bg-[#F7F4ED] p-6 md:p-8 lg:p-10 border border-[#0A0A0A]/10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#0A0A0A]/50 mb-6">
              Ce que ça inclut
            </div>
            <ul className="space-y-3">
              {[
                "Planification du chantier complet",
                "Coordination des corps de métier",
                "Un seul devis, un seul interlocuteur",
                "Suivi rigoureux et contrôle qualité",
                "Livraison clé en main",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#0A0A0A]">
                  <span className="mt-1.5 w-5 h-5 rounded-full bg-[#AED8E6] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#0A0A0A]" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <FinalCta go={go} />
  </React.Fragment>
);

// ─────────────────────────────────────────────────────────────
// RÉALISATIONS
// ─────────────────────────────────────────────────────────────
let beforeAfterAutoDemoUsed = false;

const BeforeAfter = ({ avant, apres, alt }) => {
  const [pos, setPos] = React.useState(50);
  const ref = React.useRef(null);
  const dragging = React.useRef(false);
  const interacted = React.useRef(false);

  React.useEffect(() => {
    if (beforeAfterAutoDemoUsed || !ref.current) return;
    let raf = null;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !beforeAfterAutoDemoUsed && !interacted.current) {
          beforeAfterAutoDemoUsed = true;
          const start = performance.now();
          const dur = 2400;
          const ease = (t) => 1 - Math.pow(1 - t, 3);
          const step = (t) => {
            if (interacted.current) return;
            const p = Math.min((t - start) / dur, 1);
            // 50 → 82 → 18 → 50
            let v;
            if (p < 0.33) v = 50 + 32 * ease(p / 0.33);
            else if (p < 0.66) v = 82 - 64 * ease((p - 0.33) / 0.33);
            else v = 18 + 32 * ease((p - 0.66) / 0.34);
            setPos(v);
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    obs.observe(ref.current);
    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const move = (clientX) => {
    interacted.current = true;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-[#0A0A0A] select-none touch-none"
      style={{ cursor: "ew-resize" }}
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => {
        dragging.current = true;
        move(e.touches[0].clientX);
      }}
      onTouchMove={(e) => dragging.current && move(e.touches[0].clientX)}
      onTouchEnd={() => (dragging.current = false)}
    >
      <img
        src={apres}
        alt={`${alt} — après`}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        src={avant}
        alt={`${alt} — avant`}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <div className="absolute top-4 left-4 bg-[#0A0A0A]/75 text-[#F7F4ED] text-[10px] md:text-xs uppercase tracking-[0.25em] px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        Avant
      </div>
      <div className="absolute top-4 right-4 bg-[#AED8E6] text-[#0A0A0A] text-[10px] md:text-xs uppercase tracking-[0.25em] px-3 py-1.5 rounded-full pointer-events-none">
        Après
      </div>

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-[#F7F4ED] pointer-events-none shadow-[0_0_20px_rgba(0,0,0,0.4)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#F7F4ED] flex items-center justify-center shadow-2xl ring-1 ring-[#0A0A0A]/10">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0A0A0A]" fill="currentColor">
            <path d="M9 6 4 12l5 6V6zm6 0v12l5-6-5-6z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-[#F7F4ED]/80 bg-[#0A0A0A]/40 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        Glissez pour comparer
      </div>
    </div>
  );
};

const Lightbox = ({ src, alt, onClose }) => {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur flex items-center justify-center p-4 md:p-10 animate-fadeIn"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-12 h-12 rounded-full bg-[#F7F4ED]/10 hover:bg-[#F7F4ED]/20 text-[#F7F4ED] flex items-center justify-center transition"
        aria-label="Fermer"
      >
        <X className="w-5 h-5" />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

const CATEGORIES = ["Tous", "Façade", "Salle de bain", "Isolation", "Aménagement intérieur", "Aménagement extérieur"];

const RealisationsPage = ({ go }) => {
  const [filter, setFilter] = React.useState("Tous");
  const [lightbox, setLightbox] = React.useState(null);

  const filtered =
    filter === "Tous" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <React.Fragment>
      <BigHero
        eyebrow={`Galerie · ${PROJECTS.length} chantiers`}
        title="Réalisations"
        intro="Le meilleur moyen de vous convaincre, c'est de vous montrer notre travail. Glissez sur chaque photo pour comparer l'état initial et le résultat final de nos chantiers récents."
        labels={["Avant · Après", "Façades", "Intérieurs", "Isolation", "Extérieurs"]}
      />

      {/* Filter chips */}
      <section className="bg-[#F7F4ED] py-10 md:py-12 border-b border-[#0A0A0A]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                filter === c
                  ? "bg-[#0A0A0A] text-[#F7F4ED] border-[#0A0A0A]"
                  : "border-[#0A0A0A]/20 text-[#0A0A0A]/70 hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
              }`}
            >
              {c}
              <span className="ml-2 text-xs opacity-60">
                {c === "Tous"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Project case-studies */}
      <section data-screen-label="Réalisations / Galerie" className="pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-20 md:space-y-28">
          {filtered.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={p.id}
                data-screen-label={`Réalisation / ${p.title}`}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                  <BeforeAfter avant={p.avant} apres={p.apres} alt={p.title} />
                </div>

                <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-['Fraunces'] italic text-3xl text-[#AED8E6]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#0A0A0A]/60">
                      {p.category}
                    </span>
                  </div>
                  <h2 className="font-['Fraunces'] text-3xl md:text-4xl lg:text-5xl text-[#0A0A0A] leading-[1.05] tracking-[-0.01em] mb-5">
                    {p.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <em className="italic font-light">
                      {p.title.split(" ").slice(-1)}
                    </em>
                    .
                  </h2>
                  <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-[#0A0A0A]/50 mb-6">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {p.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#0A0A0A]/30" />
                    <span>{p.year}</span>
                  </div>
                  <p className="text-[#0A0A0A]/75 leading-relaxed mb-8">
                    {p.description}
                  </p>

                  {p.pendant && p.pendant.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-[#0A0A0A]/50 mb-3">
                        Pendant le chantier
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {p.pendant.map((src, j) => (
                          <button
                            key={j}
                            onClick={() =>
                              setLightbox({ src, alt: `${p.title} — étape ${j + 1}` })
                            }
                            className="w-20 h-20 md:w-24 md:h-24 overflow-hidden bg-[#0A0A0A]/5 group relative"
                          >
                            <img
                              src={src}
                              alt=""
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/20 transition" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-[#0A0A0A]/50">
              Aucun chantier dans cette catégorie pour l'instant.
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}

      <section data-screen-label="Réalisations / Avis" className="py-16 md:py-16 md:py-20 lg:py-24 lg:py-32 bg-[#0A0A0A] text-[#F7F4ED]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel n="04">Avis clients</SectionLabel>
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl leading-tight">
                Ce que nos clients <em className="italic font-light">en disent</em>.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[#F7F4ED]/10">
            {[
              "Travail sérieux et très propre, nous sommes ravis du résultat.",
              "Équipe professionnelle, chantier bien suivi du début à la fin.",
              "Très bon rapport qualité-prix et respect des délais.",
            ].map((q, i) => (
              <div key={i} className="bg-[#0A0A0A] p-6 md:p-8 lg:p-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, k) => (
                    <Star
                      key={k}
                      className="w-4 h-4"
                      fill="#AED8E6"
                      stroke="#AED8E6"
                    />
                  ))}
                </div>
                <p className="font-['Fraunces'] text-xl md:text-2xl leading-relaxed text-[#F7F4ED] italic">
                  « {q} »
                </p>
                <div className="mt-8 pt-6 border-t border-[#F7F4ED]/10 text-xs uppercase tracking-wider text-[#F7F4ED]/50">
                  Client Bati Conception
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="Réalisations / Engagement" className="py-16 md:py-20 lg:py-24 bg-[#AED8E6]/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionLabel n="05">Notre engagement</SectionLabel>
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#0A0A0A] leading-tight">
              La même exigence sur <em className="italic font-light">chaque chantier</em>.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <CheckList
              items={[
                "Qualité des matériaux sélectionnés",
                "Suivi rigoureux des travaux",
                "Finitions soignées et durables",
                "Respect des attentes du client",
              ]}
            />
          </div>
        </div>
      </section>

      <FinalCta go={go} />
    </React.Fragment>
  );
};

Object.assign(window, { HomePage, ServicePage, ServicesPage, RealisationsPage });
