import React from "react";
import { createRoot } from "react-dom/client";

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────
const api = {
  async me() {
    const r = await fetch("/api/admin/me");
    return r.ok ? r.json() : null;
  },
  async login(email, password) {
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || "Connexion impossible.");
    return data;
  },
  logout: () => fetch("/api/admin/logout", { method: "POST" }),
  async content() {
    const r = await fetch("/api/content", { cache: "no-cache" });
    if (!r.ok) throw new Error("Impossible de charger le contenu.");
    return r.json();
  },
  async save(data) {
    const r = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(out.error || "Échec de la sauvegarde.");
    return out;
  },
  async upload(file) {
    const fd = new FormData();
    fd.append("photo", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(out.error || "Échec de l'upload.");
    return out.path;
  },
};

// ─────────────────────────────────────────────────────────────
// Atomes de formulaire
// ─────────────────────────────────────────────────────────────
const labelCls = "block text-[11px] uppercase tracking-[0.2em] text-[#0A0A0A]/55 mb-2";
const inputCls =
  "w-full bg-white/70 border border-[#0A0A0A]/15 rounded-xl px-4 py-3 text-[15px] text-[#0A0A0A] placeholder-[#0A0A0A]/30 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#AED8E6]/60 transition-colors";

const TextInput = ({ label, value, onChange, hint, placeholder }) => (
  <label className="block">
    <span className={labelCls}>{label}</span>
    <input
      type="text"
      value={value || ""}
      placeholder={placeholder || ""}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
    {hint && <span className="block mt-1.5 text-xs text-[#0A0A0A]/45">{hint}</span>}
  </label>
);

const TextArea = ({ label, value, onChange, rows = 4, hint }) => (
  <label className="block">
    <span className={labelCls}>{label}</span>
    <textarea
      rows={rows}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} resize-y leading-relaxed`}
    />
    {hint && <span className="block mt-1.5 text-xs text-[#0A0A0A]/45">{hint}</span>}
  </label>
);

// Liste de points — un élément par ligne
const ListEditor = ({ label, items, onChange, hint }) => (
  <label className="block">
    <span className={labelCls}>{label}</span>
    <textarea
      rows={Math.max(4, (items || []).length + 1)}
      value={(items || []).join("\n")}
      onChange={(e) => onChange(e.target.value.split("\n"))}
      onBlur={(e) =>
        onChange(e.target.value.split("\n").map((l) => l.trim()).filter(Boolean))
      }
      className={`${inputCls} resize-y leading-loose font-[450]`}
    />
    <span className="block mt-1.5 text-xs text-[#0A0A0A]/45">
      {hint || "Un élément par ligne."}
    </span>
  </label>
);

// Champ photo : aperçu + remplacement par upload
const ImageField = ({ label, value, onChange }) => {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const pick = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      onChange(await api.upload(file));
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#0A0A0A]/5 ring-1 ring-[#0A0A0A]/10 shrink-0">
          {value ? (
            <img src={"/" + value} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-[#0A0A0A]/30 text-xs">
              vide
            </div>
          )}
        </div>
        <div className="min-w-0">
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current && fileRef.current.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0A0A] text-[#F7F4ED] text-xs tracking-wide hover:bg-[#AED8E6] hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A0A0A] active:scale-[0.97] transition-colors disabled:opacity-50"
          >
            {busy ? "Envoi…" : "Remplacer la photo"}
          </button>
          <p className="mt-2 text-[11px] text-[#0A0A0A]/40 truncate max-w-[260px]">{value}</p>
          {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
        </div>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={pick} />
      </div>
    </div>
  );
};

// Galerie : miniatures + suppression + ajout
const GalleryEditor = ({ label, items, onChange }) => {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const add = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setErr(null);
    try {
      const paths = [];
      for (const f of files) paths.push(await api.upload(f));
      onChange([...(items || []), ...paths]);
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex flex-wrap gap-3">
        {(items || []).map((src, i) => (
          <div key={src + i} className="relative group w-20 h-20 rounded-lg overflow-hidden ring-1 ring-[#0A0A0A]/10">
            <img src={"/" + src} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              aria-label="Retirer cette photo"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="absolute inset-0 grid place-items-center bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/60 text-transparent group-hover:text-[#F7F4ED] focus-visible:bg-[#0A0A0A]/60 focus-visible:text-[#F7F4ED] transition-colors text-lg font-bold"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current && fileRef.current.click()}
          className="w-20 h-20 rounded-lg border-2 border-dashed border-[#0A0A0A]/20 text-[#0A0A0A]/40 hover:border-[#0A0A0A]/60 hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A0A0A] active:scale-[0.97] transition-colors grid place-items-center text-2xl disabled:opacity-50"
        >
          {busy ? "…" : "+"}
        </button>
      </div>
      {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
      <input ref={fileRef} type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={add} />
    </div>
  );
};

const Card = ({ title, children, subtitle }) => (
  <section className="bg-[#FBFAF6] rounded-2xl ring-1 ring-[#0A0A0A]/[0.07] shadow-[0_4px_24px_-8px_rgba(10,10,10,0.06),0_24px_48px_-24px_rgba(10,10,10,0.10)] p-6 md:p-8">
    {title && (
      <div className="mb-6">
        <h3 className="font-['Fraunces'] text-2xl text-[#0A0A0A]">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-[#0A0A0A]/50">{subtitle}</p>}
      </div>
    )}
    <div className="space-y-5">{children}</div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// Login
// ─────────────────────────────────────────────────────────────
const Login = ({ onDone }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await api.login(email, password);
      onDone();
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  };

  const darkInput =
    "w-full bg-transparent border-0 border-b border-[#F7F4ED]/25 py-3 text-[#F7F4ED] placeholder-[#F7F4ED]/30 focus:border-[#AED8E6] focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-[70%]"
          style={{
            background:
              "radial-gradient(ellipse 75% 90% at 50% 0%, rgba(174,216,230,0.5) 0%, rgba(174,216,230,0.18) 40%, rgba(10,10,10,0) 75%)",
          }}
        />
      </div>

      <form onSubmit={submit} className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <img src="/favicon.svg" alt="Bati Conception" className="w-14 h-14 mx-auto mb-6" />
          <div className="text-[10px] uppercase tracking-[0.35em] text-[#AED8E6] mb-3">
            Bati Conception
          </div>
          <h1 className="font-['Fraunces'] text-4xl text-[#F7F4ED]">
            Espace <em className="italic font-light">client</em>
          </h1>
          <p className="mt-3 text-sm text-[#F7F4ED]/50">
            Modifiez les textes et les photos de votre site.
          </p>
        </div>

        <div className="space-y-6">
          <label className="block">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-[#F7F4ED]/50 mb-1">
              Email
            </span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={darkInput}
              placeholder="vous@email.be"
              autoComplete="username"
            />
          </label>
          <label className="block">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-[#F7F4ED]/50 mb-1">
              Mot de passe
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={darkInput}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
        </div>

        {err && <p className="mt-5 text-sm text-red-400">{err}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-8 w-full py-4 rounded-full bg-[#AED8E6] text-[#0A0A0A] text-sm tracking-wide font-semibold hover:bg-[#F7F4ED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#AED8E6] active:scale-[0.98] transition-colors disabled:opacity-50"
        >
          {busy ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Sections d'édition
// ─────────────────────────────────────────────────────────────
const SERVICE_ORDER = [
  "salle-de-bain",
  "toiture",
  "facade",
  "amenagement",
  "isolation",
  "renovation-complete",
];
const PROJECT_CATEGORIES = ["Salle de bain", "Façade", "Isolation", "Toiture", "Carrelage"];

const HomeSection = ({ t, set }) => (
  <div className="space-y-6">
    <Card title="Bandeau d'accueil" subtitle="Le grand écran noir en haut de la page d'accueil.">
      <div className="grid md:grid-cols-2 gap-5">
        <TextInput label="Badge — année" value={t.home.badgeYear} onChange={(v) => set("home.badgeYear", v)} />
        <TextInput label="Badge — texte" value={t.home.badgeText} onChange={(v) => set("home.badgeText", v)} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <TextInput label="Titre — ligne 1" value={t.home.heroLine1Pre} onChange={(v) => set("home.heroLine1Pre", v)} />
        <TextInput label="Ligne 1 — mot en italique" value={t.home.heroLine1Em} onChange={(v) => set("home.heroLine1Em", v)} />
        <TextInput label="Titre — ligne 2" value={t.home.heroLine2Pre} onChange={(v) => set("home.heroLine2Pre", v)} />
        <TextInput label="Ligne 2 — mot en bleu" value={t.home.heroLine2Em} onChange={(v) => set("home.heroLine2Em", v)} />
      </div>
      <TextArea label="Texte sous le titre" rows={3} value={t.home.heroSubtitle} onChange={(v) => set("home.heroSubtitle", v)} />
    </Card>

    <Card title="Présentation" subtitle="Section « Le savoir-faire au service de vos projets ».">
      <TextArea label="Paragraphe 1" rows={3} value={t.home.presentationP1} onChange={(v) => set("home.presentationP1", v)} />
      <TextArea label="Paragraphe 2" rows={3} value={t.home.presentationP2} onChange={(v) => set("home.presentationP2", v)} />
    </Card>

    <Card title="Intros de sections">
      <TextArea label="Intro « Nos services »" rows={2} value={t.home.servicesIntro} onChange={(v) => set("home.servicesIntro", v)} />
      <TextArea label="Intro « Pourquoi nous »" rows={3} value={t.home.pourquoiIntro} onChange={(v) => set("home.pourquoiIntro", v)} />
    </Card>

    <Card title="Cartes « Pourquoi nous »" subtitle="Les 5 cartes d'arguments. La dernière s'affiche en pleine largeur.">
      {t.home.pourquoiCards.map((c, i) => (
        <div key={i} className="grid md:grid-cols-[1fr_2fr] gap-4 pb-5 border-b border-[#0A0A0A]/8 last:border-0 last:pb-0">
          <TextInput label={`Carte ${i + 1} — titre`} value={c.title} onChange={(v) => set(`home.pourquoiCards.${i}.title`, v)} />
          <TextArea label="Description" rows={2} value={c.desc} onChange={(v) => set(`home.pourquoiCards.${i}.desc`, v)} />
        </div>
      ))}
    </Card>
  </div>
);

const ServicesSection = ({ services, set }) => {
  const [active, setActive] = useState(SERVICE_ORDER[0]);
  const s = services[active] || {};
  const p = (field) => `${active}.${field}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {SERVICE_ORDER.filter((k) => services[k]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setActive(k)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A0A0A] ${
              active === k
                ? "bg-[#0A0A0A] text-[#F7F4ED] border-[#0A0A0A]"
                : "border-[#0A0A0A]/20 text-[#0A0A0A]/70 hover:border-[#0A0A0A] hover:text-[#0A0A0A] bg-transparent"
            }`}
          >
            {services[k].label}
          </button>
        ))}
      </div>

      <Card title={s.label}>
        <div className="grid md:grid-cols-2 gap-5">
          <TextInput label="Nom court (menus)" value={s.label} onChange={(v) => set(p("label"), v)} />
          <TextInput label="Titre de la page" value={s.title} onChange={(v) => set(p("title"), v)} />
        </div>
        <TextInput label="Sous-titre" value={s.tagline} onChange={(v) => set(p("tagline"), v)} />
        <TextArea label="Texte d'introduction" rows={4} value={s.intro} onChange={(v) => set(p("intro"), v)} />
      </Card>

      <Card title="Listes">
        <ListEditor label="Prestations" items={s.prestations} onChange={(v) => set(p("prestations"), v)} />
        <ListEditor label="Étapes de notre approche" items={s.process} onChange={(v) => set(p("process"), v)} />
        <ListEditor label="Bénéfices pour le client" items={s.why} onChange={(v) => set(p("why"), v)} />
        {s.extra && (
          <div className="space-y-5 pt-2 border-t border-[#0A0A0A]/8">
            <TextInput label="Encadré — titre" value={s.extra.title} onChange={(v) => set(p("extra.title"), v)} />
            <ListEditor label="Encadré — éléments" items={s.extra.items} onChange={(v) => set(p("extra.items"), v)} />
          </div>
        )}
      </Card>

      <Card title="Photos" subtitle="Photo de présentation + paire avant/après affichée en bas de la page service.">
        <div className="grid md:grid-cols-3 gap-6">
          <ImageField label="Photo principale" value={s.photo} onChange={(v) => set(p("photo"), v)} />
          <ImageField label="Avant" value={s.avant} onChange={(v) => set(p("avant"), v)} />
          <ImageField label="Après" value={s.apres} onChange={(v) => set(p("apres"), v)} />
        </div>
      </Card>
    </div>
  );
};

const slugify = (str) =>
  (str || "chantier")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const ProjectsSection = ({ projects, setProjects }) => {
  const [open, setOpen] = useState(null);

  const update = (i, fn) => {
    const next = projects.map((x) => ({ ...x }));
    fn(next[i]);
    setProjects(next);
  };
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= projects.length) return;
    const next = [...projects];
    [next[i], next[j]] = [next[j], next[i]];
    setProjects(next);
    setOpen(j);
  };
  const remove = (i) => {
    if (!window.confirm(`Supprimer « ${projects[i].title} » ? Cette action est définitive après sauvegarde.`)) return;
    setProjects(projects.filter((_, j) => j !== i));
    setOpen(null);
  };
  const add = () => {
    const next = [
      ...projects,
      {
        id: `chantier-${Date.now()}`,
        category: PROJECT_CATEGORIES[0],
        title: "Nouveau chantier",
        location: "Bruxelles",
        year: String(new Date().getFullYear()),
        description: "",
        avant: "",
        apres: "",
        pendant: [],
      },
    ];
    setProjects(next);
    setOpen(next.length - 1);
  };

  return (
    <div className="space-y-4">
      {projects.map((pr, i) => (
        <div
          key={pr.id || i}
          className="bg-[#FBFAF6] rounded-2xl ring-1 ring-[#0A0A0A]/[0.07] shadow-[0_4px_24px_-8px_rgba(10,10,10,0.06)] overflow-hidden"
        >
          <div className="flex items-center gap-3 px-5 py-4">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex items-center gap-4 flex-1 text-left min-w-0 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A0A0A] rounded-lg"
            >
              <span className="font-['Fraunces'] italic text-lg text-[#AED8E6] w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#0A0A0A]/5 shrink-0">
                {pr.apres && <img src={"/" + pr.apres} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="min-w-0">
                <div className="text-[#0A0A0A] font-semibold truncate group-hover:text-[#0A0A0A]/70 transition-colors">
                  {pr.title}
                </div>
                <div className="text-xs text-[#0A0A0A]/45">
                  {pr.category} · {pr.location} · {pr.year}
                </div>
              </div>
            </button>
            <div className="flex items-center gap-1 shrink-0">
              <button type="button" aria-label="Monter" onClick={() => move(i, -1)} className="w-8 h-8 rounded-full hover:bg-[#0A0A0A]/8 active:scale-95 transition-colors text-[#0A0A0A]/60">↑</button>
              <button type="button" aria-label="Descendre" onClick={() => move(i, 1)} className="w-8 h-8 rounded-full hover:bg-[#0A0A0A]/8 active:scale-95 transition-colors text-[#0A0A0A]/60">↓</button>
              <button type="button" aria-label="Supprimer" onClick={() => remove(i)} className="w-8 h-8 rounded-full hover:bg-red-100 active:scale-95 transition-colors text-red-500">✕</button>
            </div>
          </div>

          {open === i && (
            <div className="px-5 pb-6 pt-2 space-y-5 border-t border-[#0A0A0A]/8">
              <div className="grid md:grid-cols-2 gap-5">
                <TextInput
                  label="Titre"
                  value={pr.title}
                  onChange={(v) => update(i, (x) => { x.title = v; if (x.id.startsWith("chantier-")) x.id = slugify(v) || x.id; })}
                />
                <label className="block">
                  <span className={labelCls}>Catégorie</span>
                  <select
                    value={pr.category}
                    onChange={(e) => update(i, (x) => (x.category = e.target.value))}
                    className={`${inputCls} cursor-pointer`}
                  >
                    {PROJECT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <TextInput label="Lieu" value={pr.location} onChange={(v) => update(i, (x) => (x.location = v))} />
                <TextInput label="Année" value={pr.year} onChange={(v) => update(i, (x) => (x.year = v))} />
              </div>
              <TextArea label="Description" rows={4} value={pr.description} onChange={(v) => update(i, (x) => (x.description = v))} />
              <div className="grid md:grid-cols-2 gap-6">
                <ImageField label="Photo avant" value={pr.avant} onChange={(v) => update(i, (x) => (x.avant = v))} />
                <ImageField label="Photo après" value={pr.apres} onChange={(v) => update(i, (x) => (x.apres = v))} />
              </div>
              <GalleryEditor label="Photos pendant le chantier" items={pr.pendant} onChange={(v) => update(i, (x) => (x.pendant = v))} />
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-full py-5 rounded-2xl border-2 border-dashed border-[#0A0A0A]/20 text-[#0A0A0A]/50 hover:border-[#0A0A0A]/60 hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A0A0A] active:scale-[0.99] transition-colors text-sm tracking-wide"
      >
        + Ajouter un chantier
      </button>
    </div>
  );
};

const PagesSection = ({ t, set }) => (
  <div className="space-y-6">
    <Card title="Introductions des pages" subtitle="Le texte affiché sous le grand titre de chaque page.">
      <TextArea label="Page Services" rows={3} value={t.pages.servicesIntro} onChange={(v) => set("pages.servicesIntro", v)} />
      <TextArea label="Page Réalisations" rows={3} value={t.pages.realisationsIntro} onChange={(v) => set("pages.realisationsIntro", v)} />
      <TextArea label="Page Contact" rows={3} value={t.pages.contactIntro} onChange={(v) => set("pages.contactIntro", v)} />
    </Card>
    <Card title="Bandeau « Parlons de votre prochain chantier »">
      <TextArea label="Texte d'accroche" rows={2} value={t.finalCta.text} onChange={(v) => set("finalCta.text", v)} />
    </Card>
  </div>
);

const ContactSection = ({ t, set }) => (
  <div className="space-y-6">
    <Card title="Coordonnées" subtitle="Affichées dans le pied de page et sur la page Contact.">
      <div className="grid md:grid-cols-2 gap-5">
        <TextInput label="Téléphone" value={t.global.phone} onChange={(v) => set("global.phone", v)} />
        <TextInput label="Email" value={t.global.email} onChange={(v) => set("global.email", v)} />
        <TextInput label="Zone d'intervention" value={t.global.zone} onChange={(v) => set("global.zone", v)} />
        <TextInput label="Numéro de TVA" value={t.global.tva} onChange={(v) => set("global.tva", v)} />
      </div>
      <TextArea label="Texte du pied de page" rows={3} value={t.global.footerAbout} onChange={(v) => set("global.footerAbout", v)} />
    </Card>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Éditeur
// ─────────────────────────────────────────────────────────────
const NAV = [
  { id: "accueil", label: "Page d'accueil" },
  { id: "services", label: "Services" },
  { id: "realisations", label: "Réalisations" },
  { id: "pages", label: "Pages & accroches" },
  { id: "contact", label: "Coordonnées" },
];

const Editor = ({ onLogout }) => {
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState("accueil");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [loadErr, setLoadErr] = useState(null);

  useEffect(() => {
    api.content().then(setContent).catch((e) => setLoadErr(e.message));
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (loadErr)
    return <div className="min-h-screen grid place-items-center text-[#0A0A0A]/60">{loadErr}</div>;
  if (!content)
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="font-['Fraunces'] italic text-2xl text-[#0A0A0A]/40 animate-pulse">
          Chargement…
        </div>
      </div>
    );

  // set("home.heroLine1Pre", v) — chemin pointé dans content.texts
  const setText = (pathStr, value) => {
    setContent((c) => {
      const next = structuredClone(c);
      const keys = pathStr.split(".");
      let node = next.texts;
      for (const k of keys.slice(0, -1)) node = node[k];
      node[keys[keys.length - 1]] = value;
      return next;
    });
    setDirty(true);
  };

  const setService = (pathStr, value) => {
    setContent((c) => {
      const next = structuredClone(c);
      const keys = pathStr.split(".");
      let node = next.services;
      for (const k of keys.slice(0, -1)) node = node[k];
      node[keys[keys.length - 1]] = value;
      return next;
    });
    setDirty(true);
  };

  const setProjects = (projects) => {
    setContent((c) => ({ ...c, projects }));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.save(content);
      setDirty(false);
      setToast({ ok: true, msg: "Modifications enregistrées. Elles sont en ligne." });
    } catch (e) {
      setToast({ ok: false, msg: e.message });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const logout = async () => {
    if (dirty && !window.confirm("Des modifications ne sont pas enregistrées. Quitter quand même ?")) return;
    await api.logout();
    onLogout();
  };

  return (
    <div className="min-h-screen">
      {/* Barre supérieure */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A] text-[#F7F4ED]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" className="w-8 h-8" />
            <div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-[#AED8E6] leading-none mb-1">
                Espace client
              </div>
              <div className="font-['Fraunces'] text-lg leading-none">Bati Conception</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="hidden md:inline-flex px-4 py-2 rounded-full text-xs tracking-wide ring-1 ring-[#F7F4ED]/20 hover:bg-[#F7F4ED]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#AED8E6] transition-colors"
            >
              Voir le site ↗
            </a>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 rounded-full text-xs tracking-wide text-[#F7F4ED]/60 hover:text-[#F7F4ED] hover:bg-[#F7F4ED]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#AED8E6] transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-8 md:py-10 grid md:grid-cols-[210px_1fr] gap-8 items-start">
        {/* Navigation */}
        <nav className="md:sticky md:top-24 flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setTab(n.id)}
              className={`px-4 py-2.5 rounded-full text-sm text-left whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A0A0A] ${
                tab === n.id
                  ? "bg-[#0A0A0A] text-[#F7F4ED]"
                  : "text-[#0A0A0A]/60 hover:text-[#0A0A0A] hover:bg-[#0A0A0A]/[0.05]"
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Contenu */}
        <main className="min-w-0 pb-32">
          <h2 className="font-['Fraunces'] text-4xl text-[#0A0A0A] mb-7">
            {NAV.find((n) => n.id === tab).label}
            <span className="text-[#AED8E6]">.</span>
          </h2>
          {tab === "accueil" && <HomeSection t={content.texts} set={setText} />}
          {tab === "services" && <ServicesSection services={content.services} set={setService} />}
          {tab === "realisations" && (
            <ProjectsSection projects={content.projects} setProjects={setProjects} />
          )}
          {tab === "pages" && <PagesSection t={content.texts} set={setText} />}
          {tab === "contact" && <ContactSection t={content.texts} set={setText} />}
        </main>
      </div>

      {/* Barre de sauvegarde */}
      <div
        className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ${
          dirty || toast ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 pb-5">
          <div className="bg-[#0A0A0A] text-[#F7F4ED] rounded-2xl shadow-[0_-8px_40px_rgba(10,10,10,0.35)] px-5 py-4 flex items-center justify-between gap-4">
            <span className="text-sm text-[#F7F4ED]/80">
              {toast ? (
                <span className={toast.ok ? "text-[#AED8E6]" : "text-red-400"}>{toast.msg}</span>
              ) : (
                "Modifications non enregistrées"
              )}
            </span>
            {dirty && (
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="shrink-0 px-6 py-3 rounded-full bg-[#AED8E6] text-[#0A0A0A] text-sm font-semibold tracking-wide hover:bg-[#F7F4ED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#AED8E6] active:scale-[0.98] transition-colors disabled:opacity-50"
              >
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Racine
// ─────────────────────────────────────────────────────────────
const AdminApp = () => {
  const [state, setState] = useState("checking"); // checking | login | editor

  useEffect(() => {
    api.me().then((me) => setState(me ? "editor" : "login"));
  }, []);

  if (state === "checking")
    return (
      <div className="min-h-screen bg-[#0A0A0A] grid place-items-center">
        <div className="font-['Fraunces'] italic text-2xl text-[#F7F4ED]/40 animate-pulse">…</div>
      </div>
    );
  if (state === "login") return <Login onDone={() => setState("editor")} />;
  return <Editor onLogout={() => setState("login")} />;
};

createRoot(document.getElementById("root")).render(<AdminApp />);
