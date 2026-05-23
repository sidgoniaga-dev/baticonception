const { useState, useEffect } = React;

// ─────────────────────────────────────────────────────────────
// Reusable atoms
// ─────────────────────────────────────────────────────────────
const SectionLabel = ({ children, n }) => (
  <div className="flex items-center gap-3 mb-6">
    {n && (
      <span className="font-['Fraunces'] italic text-sm opacity-40">{n}</span>
    )}
    <span className="h-px w-10 bg-current opacity-30" />
    <span className="text-xs uppercase tracking-[0.25em] opacity-60">
      {children}
    </span>
  </div>
);

const CtaButton = ({ children, onClick, variant = "primary" }) => {
  const styles =
    variant === "primary"
      ? "bg-[#0A0A0A] text-[#F7F4ED] hover:bg-[#AED8E6] hover:text-[#0A0A0A]"
      : "bg-[#AED8E6] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F7F4ED]";
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm tracking-wide transition-all duration-300 group ${styles}`}
    >
      {children}
      <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
    </button>
  );
};

const CheckList = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-[#0A0A0A]/80">
        <span className="mt-1.5 w-5 h-5 rounded-full bg-[#AED8E6] flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 text-[#0A0A0A]" strokeWidth={3} />
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

// ─────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────
const PillNavItem = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={`px-3.5 py-2 text-sm rounded-full transition-colors ${
      active
        ? "bg-[#0A0A0A]/[0.06] text-[#0A0A0A]"
        : "text-[#0A0A0A]/65 hover:text-[#0A0A0A] hover:bg-[#0A0A0A]/[0.04]"
    }`}
  >
    {children}
  </button>
);

const MobileNavItem = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`text-left py-3 border-b border-[#0A0A0A]/10 text-base ${
      active ? "text-[#0A0A0A]" : "text-[#0A0A0A]/70"
    }`}
  >
    {label}
  </button>
);

const Header = ({ go, current }) => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItem = null; // legacy — replaced by <PillNavItem>

  return (
    <header className="sticky top-0 z-50 pointer-events-none">
      {/* Floating pill */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-4 md:pt-6 flex justify-center">
        <div
          className={`pointer-events-auto flex items-center gap-1 md:gap-2 pl-3 pr-1.5 md:pl-4 md:pr-2 py-1.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#F7F4ED]/95 shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
              : "bg-[#F7F4ED] shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          } backdrop-blur-xl ring-1 ring-[#0A0A0A]/5`}
        >
          <button
            onClick={() => go("home")}
            className="flex items-center pr-2 md:pr-4 pl-1 py-1.5"
            aria-label="Accueil"
          >
            <Logo className="h-7 md:h-8" />
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            <PillNavItem active={current === "home"} onClick={() => go("home")}>
              Accueil
            </PillNavItem>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <PillNavItem
                active={current === "services" || SERVICE_KEYS.includes(current)}
                onClick={() => go("services")}
              >
                <span className="flex items-center gap-1">
                  Services
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </PillNavItem>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="bg-[#0A0A0A] text-[#F7F4ED] w-[280px] py-3 rounded-2xl shadow-2xl ring-1 ring-[#F7F4ED]/10">
                    <button
                      onClick={() => {
                        go("services");
                        setServicesOpen(false);
                      }}
                      className="w-full px-5 py-3 flex items-center gap-3 text-sm hover:bg-[#AED8E6]/15 transition group border-b border-[#F7F4ED]/10 mb-1"
                    >
                      <Sparkles className="w-4 h-4 text-[#AED8E6]" strokeWidth={1.5} />
                      <span className="flex-1 text-left font-medium">
                        Tous les services
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                    </button>
                    {SERVICE_KEYS.map((k) => {
                      const Ic = SERVICES[k].icon;
                      return (
                        <button
                          key={k}
                          onClick={() => {
                            go(k);
                            setServicesOpen(false);
                          }}
                          className="w-full px-5 py-3 flex items-center gap-3 text-sm hover:bg-[#AED8E6]/15 transition group"
                        >
                          <Ic className="w-4 h-4 text-[#AED8E6]" strokeWidth={1.5} />
                          <span className="flex-1 text-left">{SERVICES[k].label}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <PillNavItem
              active={current === "realisations"}
              onClick={() => go("realisations")}
            >
              Réalisations
            </PillNavItem>
            <PillNavItem active={current === "contact"} onClick={() => go("contact")}>
              Contact
            </PillNavItem>
          </nav>

          <button
            onClick={() => go("contact")}
            className="hidden md:inline-flex items-center gap-2 bg-[#0A0A0A] text-[#F7F4ED] pl-5 pr-4 py-2.5 text-sm tracking-wide rounded-full hover:bg-[#AED8E6] hover:text-[#0A0A0A] transition-all duration-300 group ml-1"
          >
            Devis gratuit
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition" />
          </button>

          <button
            className="lg:hidden p-2.5 rounded-full hover:bg-[#0A0A0A]/5 transition"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden pointer-events-auto max-w-[1400px] mx-auto px-4 md:px-6 mt-2">
          <div className="bg-[#F7F4ED] rounded-3xl shadow-2xl ring-1 ring-[#0A0A0A]/10 px-6 py-5 flex flex-col gap-1">
            <MobileNavItem
              label="Accueil"
              active={current === "home"}
              onClick={() => {
                go("home");
                setOpen(false);
              }}
            />

            {/* Services — collapsible */}
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className={`flex items-center justify-between py-3 border-b border-[#0A0A0A]/10 text-base ${
                current === "services" || SERVICE_KEYS.includes(current)
                  ? "text-[#0A0A0A]"
                  : "text-[#0A0A0A]/70"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col pl-3 pb-1 border-b border-[#0A0A0A]/10">
                <button
                  onClick={() => {
                    go("services");
                    setOpen(false);
                    setMobileServicesOpen(false);
                  }}
                  className="flex items-center gap-3 py-2.5 text-sm text-[#0A0A0A]/80 hover:text-[#0A0A0A]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#AED8E6]" strokeWidth={1.5} />
                  Tous les services
                </button>
                {SERVICE_KEYS.map((k) => {
                  const Ic = SERVICES[k].icon;
                  return (
                    <button
                      key={k}
                      onClick={() => {
                        go(k);
                        setOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className={`flex items-center gap-3 py-2.5 text-sm ${
                        current === k
                          ? "text-[#0A0A0A]"
                          : "text-[#0A0A0A]/70 hover:text-[#0A0A0A]"
                      }`}
                    >
                      <Ic className="w-3.5 h-3.5 text-[#AED8E6]" strokeWidth={1.5} />
                      {SERVICES[k].label}
                    </button>
                  );
                })}
              </div>
            )}

            <MobileNavItem
              label="Réalisations"
              active={current === "realisations"}
              onClick={() => {
                go("realisations");
                setOpen(false);
              }}
            />
            <MobileNavItem
              label="Contact"
              active={current === "contact"}
              onClick={() => {
                go("contact");
                setOpen(false);
              }}
            />

            <button
              onClick={() => {
                go("contact");
                setOpen(false);
              }}
              className="mt-4 bg-[#0A0A0A] text-[#F7F4ED] py-3 rounded-full text-sm tracking-wide"
            >
              Demander un devis
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// ─────────────────────────────────────────────────────────────
// Big hero (Services / Réalisations / Contact)
// ─────────────────────────────────────────────────────────────
const BigHero = ({ eyebrow, title, intro, labels }) => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const on = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const blur = Math.min(scrollY / 50, 14);
  const opacity = Math.max(0.15, 1 - scrollY / 650);

  return (
    <section
      data-screen-label={`Hero / ${title}`}
      className="relative bg-[#0A0A0A] text-[#F7F4ED] -mt-[88px] md:-mt-[96px] pt-[110px] md:pt-[160px] overflow-hidden"
    >
      {/* Sky-blue halo from top */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-[85%]"
          style={{
            background:
              "radial-gradient(ellipse 75% 90% at 50% 5%, #AED8E6 0%, rgba(174,216,230,0.7) 18%, rgba(174,216,230,0.25) 45%, rgba(10,10,10,0) 75%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 80%, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 100%)",
          }}
        />
      </div>

      <div
        className="relative will-change-[filter,opacity]"
        style={{ filter: `blur(${blur}px)`, opacity }}
      >
        <div className="text-center mb-6 md:mb-12 px-6">
          {eyebrow && (
            <div className="inline-flex items-center gap-2.5 bg-[#F7F4ED]/[0.07] backdrop-blur-sm ring-1 ring-[#F7F4ED]/15 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#AED8E6]" />
              <span className="text-[11px] md:text-xs text-[#F7F4ED]/85 uppercase tracking-[0.25em]">
                {eyebrow}
              </span>
            </div>
          )}
          {intro && (
            <p className="mt-6 md:mt-8 max-w-2xl mx-auto text-base md:text-lg text-[#F7F4ED]/70 leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* Giant headline with bottom-fade mask */}
        <h1
          className="font-['Manrope'] font-extrabold text-center whitespace-nowrap leading-[0.85] tracking-[-0.045em] px-2 pb-8 md:pb-16 select-none"
          style={{
            fontSize: "clamp(3.5rem, 20vw, 22rem)",
            backgroundImage:
              "linear-gradient(180deg, #F7F4ED 0%, #F7F4ED 50%, rgba(247,244,237,0.55) 75%, rgba(247,244,237,0.05) 92%, transparent 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Final CTA
// ─────────────────────────────────────────────────────────────
const FinalCta = ({ go }) => (
  <section className="bg-[#AED8E6] py-14 md:py-20 lg:py-28 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1400 400"
        preserveAspectRatio="none"
      >
        {[...Array(20)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={i * 25}
            x2="1400"
            y2={i * 25 - 80}
            stroke="#0A0A0A"
            strokeWidth="0.3"
          />
        ))}
      </svg>
    </div>
    <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-8">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
          <span className="text-xs uppercase tracking-[0.3em] text-[#0A0A0A]/70">
            Votre projet commence ici
          </span>
        </div>
        <h2 className="font-['Fraunces'] text-5xl md:text-7xl lg:text-8xl text-[#0A0A0A] leading-[0.95] tracking-[-0.02em]">
          Parlons de votre
          <br />
          <em className="italic font-light">prochain chantier</em>.
        </h2>
      </div>
      <div className="lg:col-span-4 flex flex-col gap-4">
        <p className="text-[#0A0A0A]/80 leading-relaxed">
          Un projet en tête ? Obtenez un devis gratuit et personnalisé, sans engagement.
        </p>
        <CtaButton onClick={() => go("contact")} variant="dark">
          Demander un devis
        </CtaButton>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
const Footer = ({ go }) => (
  <footer className="bg-[#0A0A0A] text-[#F7F4ED]/70 pt-20 pb-10">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b border-[#F7F4ED]/10">
        <div className="lg:col-span-5">
          <Logo className="h-12 mb-6" invert />
          <p className="max-w-md leading-relaxed">
            Entreprise de rénovation en Belgique. De la salle de bain à la rénovation
            complète — un seul interlocuteur, un travail soigné.
          </p>
        </div>

        <div className="lg:col-span-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#F7F4ED]/50 mb-4">
            Services
          </div>
          <ul className="space-y-2">
            {SERVICE_KEYS.map((k) => (
              <li key={k}>
                <button
                  onClick={() => go(k)}
                  className="hover:text-[#AED8E6] transition"
                >
                  {SERVICES[k].label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="text-xs uppercase tracking-[0.2em] text-[#F7F4ED]/50 mb-4">
            Navigation
          </div>
          <ul className="space-y-2">
            <li>
              <button onClick={() => go("home")} className="hover:text-[#AED8E6] transition">
                Accueil
              </button>
            </li>
            <li>
              <button
                onClick={() => go("realisations")}
                className="hover:text-[#AED8E6] transition"
              >
                Réalisations
              </button>
            </li>
            <li>
              <button
                onClick={() => go("contact")}
                className="hover:text-[#AED8E6] transition"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="text-xs uppercase tracking-[0.2em] text-[#F7F4ED]/50 mb-4">
            Contact
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-[#AED8E6] shrink-0" />
              <span>Bruxelles & Belgique</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 text-[#AED8E6] shrink-0" />
              <a href="tel:+32470866359" className="hover:text-[#AED8E6] transition">+32 470 86 63 59</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 text-[#AED8E6] shrink-0" />
              <a href="mailto:baticonception@outlook.com" className="hover:text-[#AED8E6] transition break-all">baticonception@outlook.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F7F4ED]/40">
        <span>© {new Date().getFullYear()} Bati Conception — Tous droits réservés</span>
        <span>Site en construction · Belgique</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { SectionLabel, CtaButton, CheckList, Header, BigHero, FinalCta, Footer });
