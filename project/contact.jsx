const { useState: useStateC } = React;

const ContactPage = () => {
  const [form, setForm] = useStateC({
    nom: "",
    telephone: "",
    email: "",
    rue: "",
    ville: "",
    codePostal: "",
    typeProjet: "",
    delai: "",
    surface: "",
    description: "",
    contactType: "",
  });
  const [sent, setSent] = useStateC(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const updateRadio = (k, v) => setForm({ ...form, [k]: v });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  if (sent) {
    return (
      <section data-screen-label="Contact / Sent" className="min-h-[80vh] flex items-center justify-center px-6 py-16 md:py-20 lg:py-24">
        <div className="max-w-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-[#AED8E6] mx-auto mb-8 flex items-center justify-center">
            <Check className="w-10 h-10 text-[#0A0A0A]" strokeWidth={2} />
          </div>
          <h2 className="font-['Fraunces'] text-5xl md:text-6xl text-[#0A0A0A] leading-tight mb-6">
            Demande <em className="italic font-light">envoyée</em>.
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 leading-relaxed">
            Nous vous répondrons dans les plus brefs délais afin de discuter de votre projet
            et vous proposer une solution adaptée.
          </p>
        </div>
      </section>
    );
  }

  const inputBase =
    "w-full bg-transparent border-0 border-b border-[#0A0A0A]/20 py-3 text-[#0A0A0A] placeholder-[#0A0A0A]/30 focus:border-[#0A0A0A] focus:outline-none transition-colors";

  const Field = ({ label, children }) => (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-[#0A0A0A]/60 mb-2 block">
        {label}
      </span>
      {children}
    </label>
  );

  const RadioGroup = ({ name, value, options, onChange }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          onClick={() => onChange(name, opt)}
          className={`px-4 py-3 rounded-full text-sm border transition-all ${
            value === opt
              ? "bg-[#0A0A0A] text-[#F7F4ED] border-[#0A0A0A]"
              : "border-[#0A0A0A]/20 text-[#0A0A0A]/70 hover:border-[#0A0A0A]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <React.Fragment>
      <BigHero
        eyebrow="Discutons de votre projet"
        title="Contact"
        intro="Notre équipe est à votre écoute. Remplissez le formulaire ci-dessous, nous vous recontacterons rapidement."
        labels={["Téléphone", "Email", "Devis gratuit", "Belgique"]}
      />

      <section data-screen-label="Contact / Infos" className="border-y border-[#0A0A0A]/10 bg-[#F7F4ED]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0A0A0A]/10">
          {[
            [MapPin, "Zone d'intervention", "Bruxelles & Belgique", null],
            [Phone, "Téléphone", "+32 470 86 63 59", "tel:+32470866359"],
            [Mail, "Email", "baticonception@outlook.com", "mailto:baticonception@outlook.com"],
          ].map(([Ic, label, val, href], i) => (
            <div key={i} className="py-6 md:py-8 px-2 md:px-8 flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-[#AED8E6] flex items-center justify-center shrink-0">
                <Ic className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#0A0A0A]/50 mb-1">
                  {label}
                </div>
                {href ? (
                  <a href={href} className="text-lg text-[#0A0A0A] hover:text-[#0A0A0A]/70 transition">
                    {val}
                  </a>
                ) : (
                  <div className="text-lg text-[#0A0A0A]">{val}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-screen-label="Contact / Formulaire" className="py-14 md:py-20 lg:py-28 bg-[#F7F4ED]">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <form onSubmit={submit} className="space-y-16">
            <div>
              <div className="flex items-baseline gap-4 mb-10">
                <span className="font-['Fraunces'] italic text-3xl text-[#AED8E6]">01</span>
                <h3 className="font-['Fraunces'] text-2xl md:text-3xl text-[#0A0A0A]">
                  Informations personnelles
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
                <Field label="Nom et prénom *">
                  <input
                    type="text"
                    required
                    value={form.nom}
                    onChange={update("nom")}
                    className={inputBase}
                    placeholder="Marie Dupont"
                  />
                </Field>
                <Field label="Téléphone *">
                  <input
                    type="tel"
                    required
                    value={form.telephone}
                    onChange={update("telephone")}
                    className={inputBase}
                    placeholder="+32 ..."
                  />
                </Field>
                <Field label="Email *">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    className={inputBase}
                    placeholder="vous@email.be"
                  />
                </Field>
                <Field label="Rue et numéro">
                  <input
                    type="text"
                    value={form.rue}
                    onChange={update("rue")}
                    className={inputBase}
                    placeholder="Rue ..."
                  />
                </Field>
                <Field label="Ville">
                  <input
                    type="text"
                    value={form.ville}
                    onChange={update("ville")}
                    className={inputBase}
                    placeholder="Bruxelles"
                  />
                </Field>
                <Field label="Code postal">
                  <input
                    type="text"
                    value={form.codePostal}
                    onChange={update("codePostal")}
                    className={inputBase}
                    placeholder="1000"
                  />
                </Field>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-4 mb-10">
                <span className="font-['Fraunces'] italic text-3xl text-[#AED8E6]">02</span>
                <h3 className="font-['Fraunces'] text-2xl md:text-3xl text-[#0A0A0A]">
                  Votre projet
                </h3>
              </div>

              <Field label="Pour quel type de travaux ? *">
                <div className="relative">
                  <select
                    required
                    value={form.typeProjet}
                    onChange={update("typeProjet")}
                    className={`${inputBase} appearance-none pr-10 cursor-pointer`}
                  >
                    <option value="">Sélectionnez...</option>
                    {SERVICE_KEYS.map((k) => (
                      <option key={k} value={SERVICES[k].label}>
                        {SERVICES[k].title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-0 top-4 text-[#0A0A0A]/40 pointer-events-none" />
                </div>
              </Field>
            </div>

            <div>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-['Fraunces'] italic text-3xl text-[#AED8E6]">03</span>
                <h3 className="font-['Fraunces'] text-2xl md:text-3xl text-[#0A0A0A]">
                  Quand est prévu votre projet ?
                </h3>
              </div>
              <RadioGroup
                name="delai"
                value={form.delai}
                onChange={updateRadio}
                options={["Maintenant", "< 3 mois", "3–6 mois", "+6 mois"]}
              />
            </div>

            <div>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-['Fraunces'] italic text-3xl text-[#AED8E6]">04</span>
                <h3 className="font-['Fraunces'] text-2xl md:text-3xl text-[#0A0A0A]">
                  Surface concernée
                </h3>
              </div>
              <RadioGroup
                name="surface"
                value={form.surface}
                onChange={updateRadio}
                options={["< 25 m²", "25–50 m²", "50–100 m²", "+100 m²"]}
              />
            </div>

            <div>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-['Fraunces'] italic text-3xl text-[#AED8E6]">05</span>
                <h3 className="font-['Fraunces'] text-2xl md:text-3xl text-[#0A0A0A]">
                  Détails du projet
                </h3>
              </div>
              <Field label="Décrivez votre projet en quelques lignes">
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={update("description")}
                  className={`${inputBase} resize-none`}
                  placeholder="État actuel, envies, contraintes, budget approximatif..."
                />
              </Field>
            </div>

            <div>
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-['Fraunces'] italic text-3xl text-[#AED8E6]">06</span>
                <h3 className="font-['Fraunces'] text-2xl md:text-3xl text-[#0A0A0A]">
                  Comment souhaitez-vous être contacté ?
                </h3>
              </div>
              <p className="text-sm text-[#0A0A0A]/60 mb-6 pl-14">
                Cette étape nous permet de vous proposer un suivi adapté à votre demande.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    val: "Devis précis + visite",
                    icon: Phone,
                    title: "Devis précis avec visite",
                    desc: "Je souhaite être rappelé pour obtenir un devis précis et des conseils sur place.",
                  },
                  {
                    val: "Estimation rapide email",
                    icon: Mail,
                    title: "Estimation par email",
                    desc: "Je souhaite recevoir une estimation indicative par email rapidement.",
                  },
                ].map((opt) => {
                  const Ic = opt.icon;
                  const active = form.contactType === opt.val;
                  return (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => updateRadio("contactType", opt.val)}
                      className={`p-6 text-left rounded-2xl border transition-all ${
                        active
                          ? "bg-[#0A0A0A] border-[#0A0A0A] text-[#F7F4ED]"
                          : "bg-[#F7F4ED] border-[#0A0A0A]/20 text-[#0A0A0A] hover:border-[#0A0A0A]"
                      }`}
                    >
                      <Ic
                        className={`w-6 h-6 mb-4 ${
                          active ? "text-[#AED8E6]" : "text-[#0A0A0A]"
                        }`}
                        strokeWidth={1.5}
                      />
                      <div className="font-['Fraunces'] text-xl mb-2">{opt.title}</div>
                      <div
                        className={`text-sm ${
                          active ? "text-[#F7F4ED]/70" : "text-[#0A0A0A]/60"
                        }`}
                      >
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 border-t border-[#0A0A0A]/10">
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#0A0A0A] text-[#F7F4ED] px-10 py-5 rounded-full text-sm tracking-wide hover:bg-[#AED8E6] hover:text-[#0A0A0A] transition-all duration-300 group"
              >
                Envoyer ma demande
                <Send className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              <p className="mt-4 text-xs text-[#0A0A0A]/50">
                Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

Object.assign(window, { ContactPage });
