// Real renovation projects with before/during/after photos.
// All paths point to user-uploaded images in /uploads.

const PROJECTS = [
  {
    id: "facade-arriere-blanc",
    category: "Façade",
    title: "Façade arrière, du brut au blanc",
    location: "Bruxelles",
    year: "2025 — 2026",
    description:
      "Isolation, enduit et finition d'une façade arrière dégradée. Le mur en briques anciennes, recouvert d'une membrane d'étanchéité provisoire, a été repris intégralement avec un enduit de finition.",
    avant: "uploads/PHOTO-2025-01-14-14-36-55.jpg",
    apres: "uploads/PHOTO-2026-01-15-22-19-43.jpg",
    pendant: ["uploads/PHOTO-2025-01-16-14-52-54.jpg"],
  },
  {
    id: "salle-de-bain-carrare",
    category: "Salle de bain",
    title: "Salle de bain en marbre de Carrare",
    location: "Bruxelles",
    year: "2025",
    description:
      "Rénovation complète d'une salle de bain vétuste : démolition, plomberie, douche italienne avec carrelage effet marbre, meuble suspendu et sèche-serviettes.",
    avant: "uploads/PHOTO-2025-06-26-17-05-48.jpg",
    apres: "uploads/PHOTO-2025-08-06-20-11-52.jpg",
    pendant: [
      "uploads/PHOTO-2025-06-26-20-35-08.jpg",
      "uploads/PHOTO-2025-06-27-14-57-16.jpg",
    ],
  },
  {
    id: "facade-arriere-schaerbeek",
    category: "Façade",
    title: "Isolation et ravalement de façade arrière",
    location: "Schaerbeek",
    year: "2024",
    description:
      "Pose d'un système d'isolation par l'extérieur (ITE) avec panneaux rigides, enduit armé et finition blanche. Reprise complète des appuis de fenêtres et raccords.",
    avant: "uploads/PHOTO-2024-04-18-19-33-04.jpg",
    apres: "uploads/PHOTO-2024-05-10-08-25-58.jpg",
    pendant: [
      "uploads/PHOTO-2024-04-29-13-05-38.jpg",
      "uploads/PHOTO-2024-04-29-16-27-58.jpg",
    ],
  },
  {
    id: "ite-facade-arriere-ixelles",
    category: "Isolation",
    title: "Isolation par l'extérieur, façade arrière",
    location: "Ixelles",
    year: "2025 — 2026",
    description:
      "Mise en œuvre d'un système ITE complet sur cinq étages : pose des panneaux isolants, traitement des linteaux et tableaux de fenêtres, enduit de finition.",
    avant: "uploads/PHOTO-2025-01-21-19-21-31.jpg",
    apres: "uploads/PHOTO-2026-01-15-22-32-27.jpg",
    pendant: [
      "uploads/PHOTO-2025-01-27-16-32-09.jpg",
      "uploads/PHOTO-2025-01-28-16-20-41.jpg",
    ],
  },
  {
    id: "amenagement-interieur-isolation",
    category: "Aménagement intérieur",
    title: "Reprise complète d'un espace de vie",
    location: "Bruxelles",
    year: "2026",
    description:
      "Mise à nu des murs jusqu'aux briques d'origine, ossature métallique, isolation en laine minérale, pose de plaques de plâtre, jointoiement et préparation peinture.",
    avant: "uploads/PHOTO-2026-02-13-19-28-19.jpg",
    apres: "uploads/PHOTO-2026-03-06-13-42-24 4.jpg",
    pendant: [
      "uploads/PHOTO-2026-02-16-15-11-15.jpg",
      "uploads/PHOTO-2026-02-17-13-53-51.jpg",
      "uploads/PHOTO-2026-03-04-15-11-07.jpg",
      "uploads/PHOTO-2026-03-05-14-55-01.jpg",
    ],
  },
  {
    id: "facade-rue-uccle",
    category: "Façade",
    title: "Isolation de façade côté rue",
    location: "Uccle",
    year: "2024 — 2025",
    description:
      "Pose de panneaux isolants haute densité sur la façade avant, enduit armé, finition teintée dans la masse. Travail réalisé en façade habitée, sans gêne pour les occupants.",
    avant: "uploads/PHOTO-2024-08-29-16-41-02.jpg",
    apres: "uploads/PHOTO-2025-08-02-19-14-37 2.jpg",
    pendant: ["uploads/PHOTO-2024-09-03-12-53-47.jpg"],
  },
  {
    id: "dalles-exterieures",
    category: "Aménagement extérieur",
    title: "Réfection du seuil et des dalles",
    location: "Périphérie bruxelloise",
    year: "2025",
    description:
      "Démolition d'un revêtement vieillissant, reprise du support, pose de dalles en pierre bleue grand format avec joints au cordeau.",
    avant: "uploads/PHOTO-2025-05-23-19-48-19.jpg",
    apres: "uploads/PHOTO-2025-07-31-21-24-40.jpg",
    pendant: ["uploads/PHOTO-2025-07-10-13-19-31.jpg"],
  },
];

window.PROJECTS = PROJECTS;
