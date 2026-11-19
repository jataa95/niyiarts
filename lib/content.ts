import images from "./images.json";

export type ImageKey = keyof typeof images;
export type Img = { src: string; width: number; height: number; alt: string; caption?: string };

export const img = (key: ImageKey, alt: string, caption?: string): Img => ({
  ...images[key],
  alt,
  caption,
});

/* ------------------------------------------------------------------ */
/*  Site                                                               */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Olaniyi Omotayo",
  short: "Niyi",
  studio: "Niyi Art Studio",
  tagline: ["Self-taught artist &", "Afro-Impressionist painter"],
  location: "Lagos, Nigeria",
  email: "omotayoolaniyi8@gmail.com",
  url: "https://niyiarts.com",
  socials: [
    { label: "Instagram", short: "Ig", href: "https://www.instagram.com/niyi_art" },
    { label: "Facebook", short: "Fb", href: "https://www.facebook.com/niyiart" },
    { label: "X", short: "X", href: "https://x.com/niyi_art" },
  ],
  // Text carried over from the previous portfolio
  intro:
    "Step into a world where artistry meets passion. Discover the unique blend of storytelling and painting style that sets Olaniyi Omotayo apart. Explore his work and get inspired.",
  portfolioIntro:
    "Welcome to Olaniyi's portfolio. Here you’ll find a selection of his work. Explore his projects to learn more about what he does.",
  bio: [
    "Olaniyi Omotayo, born in 1995 in Ondo State, Nigeria, is a self-taught artist celebrated for his bold, vibrant, and textured works that explore the interplay between vintage and modern African histories. His journey into art began in childhood, fueled by an insatiable passion for drawing. Despite his parents' disapproval and scolding for filling his school notebooks with sketches, Olaniyi's love for art remained unshaken.",
    "A scholar at heart, Olaniyi graduated with a first-class degree in Business Administration but chose to follow his true calling as a full-time artist after university. His debut exhibition with Mitochondria Gallery in Houston, Texas, marked the beginning of a flourishing career. Since then, his works have been showcased at prestigious venues, including the Harlem Art Fair in New York, Prizm Art Fair in Miami, and Volta Art Fair, among others.",
    "Renowned for his striking use of color and texture, Olaniyi’s art speaks to confidence and identity while bridging generational narratives of African culture. His works have been acquired by notable private collectors, institutions, and museums, earning him widespread recognition and inspiring audiences worldwide. Olaniyi Omotayo stands as a testament to the power of persistence and passion, transforming his once-disapproved hobby into a celebrated artistic legacy.",
  ],
};

export const exhibitions = [
  {
    year: "2026",
    title: "Atlanta Art Fair",
    detail: "Presented by Paul Conliffe — Booth D23",
    place: "Pullman Yards, Atlanta",
  },
  { year: "", title: "Volta Art Fair", detail: "Art fair", place: "" },
  { year: "", title: "Prizm Art Fair", detail: "Art fair", place: "Miami" },
  { year: "", title: "Harlem Art Fair", detail: "Art fair", place: "New York" },
  {
    year: "",
    title: "Mitochondria Gallery",
    detail: "Debut exhibition",
    place: "Houston, Texas",
  },
];

export const press = [
  {
    date: "August 6, 2024",
    outlet: "TRT Afrika",
    title: "Niyi: Self-taught artist on Black culture and ‘impastorealism’",
    author: "By Pauline Odhiambo",
    excerpt:
      "If nostalgia is the key to unlocking the beauty of old memories, then Olaniyi Omotayo’s art may be the vessel that takes us back into time. Olaniyi creates art which has the feel and look of old photos.",
    quote:
      "I decided to paint my subjects in a vintage theme in order to bring out the beauty of African culture.",
    href: "https://trt.global/afrika-english/article/18192501",
  },
  {
    date: "July 5, 2025",
    outlet: "Page IX",
    title: "Magazine publication — Page IX",
    author: "",
    excerpt: "Read more on e-magazine – Page IX",
    quote: "",
    href: "",
  },
];

/* ------------------------------------------------------------------ */
/*  Work                                                               */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  category: string;
  statement: string;
  meta: { label: string; value: string }[];
  cover: Img;
  images: Img[];
};

export const projects: Project[] = [
  {
    slug: "the-unwritten",
    title: "The Unwritten",
    category: "Atlanta Art Fair 2026",
    statement:
      "Presented by Paul Conliffe at the Atlanta Art Fair, Booth D23 — Pullman Yards, October 1–4, 2026.",
    meta: [
      { label: "Exhibited", value: "Atlanta Art Fair" },
      { label: "Presented by", value: "Paul Conliffe" },
      { label: "Booth", value: "D23, Pullman Yards" },
      { label: "Year", value: "2026" },
    ],
    cover: img("the-unwritten", "A young girl in a brown blazer and yellow dress clings to the leg of a tall man in a brown suit holding a book titled The Unwritten"),
    images: [
      img("the-unwritten", "The Unwritten — full painting", "The Unwritten, 2026"),
      img("on-his-shoulders", "A girl in a blue coat sits on the shoulders of a man in an olive suit in a crowd", "Shown alongside at Booth D23, 2026"),
      img("atlanta-booth-wall", "Booth wall at the Atlanta Art Fair with five framed works", "Installation view, Atlanta Art Fair 2026"),
      img("atlanta-art-fair-2026", "Atlanta Art Fair announcement featuring The Unwritten", "Atlanta Art Fair — Oct 1–4, 2026"),
    ],
  },
  {
    slug: "narratives-of-the-african-folks",
    title: "Narratives of the African Folks",
    category: "Series",
    statement:
      "“Narratives of the African Folks” is an inspiring painting series that captures the power of unity, healing, and shared purpose among Africans in the diaspora. Through scenes of meaningful gatherings, support, and cultural connection, the project reflects a deep reconnection to African roots, while offering a universal message of belonging, identity, and the strength found in community across all races.",
    meta: [
      { label: "Type", value: "Painting series" },
      { label: "Theme", value: "Unity, healing, diaspora" },
      { label: "Studio", value: "Niyi Art Studio" },
      { label: "Location", value: "Lagos, Nigeria" },
    ],
    cover: img("narratives-cover", "Figures in vintage suits gathered around a table with a globe under a hanging lamp"),
    images: [
      img("the-gathering", "Six figures in colourful suits gathered around a dinner table"),
      img("the-gathering-detail-1", "Detail — a woman with an afro rests her chin on her hand", "Detail"),
      img("the-gathering-detail-2", "Detail — a woman in an orange suit beside a man in green", "Detail"),
      img("narratives-cover", "Figures gathered around a globe at a table"),
      img("narratives-1", "Men and women in suits rescue a man from the sea beside a ship"),
      img("narratives-2", "Two men shake hands beside a horse carriage"),
      img("narratives-3", "Three men in hats at a card table"),
      img("narratives-4", "A group of men in hats seated around a campfire"),
      img("narratives-5", "Men in suits in a rowing boat on rough water"),
      img("artist-with-the-gathering", "Olaniyi Omotayo seated beside the dinner painting on an easel", "In the studio"),
    ],
  },
  {
    slug: "united-roots",
    title: "United Roots",
    category: "Series",
    statement:
      "“United Roots” is a powerful painting series that celebrates unity within the African community. Through striking portraits of couples, bonded brothers, united women, and strong family figures, the project highlights the strength found in togetherness. Each piece radiates love, solidarity, and shared identity. The project reminds us that we are strongest when we stand as one.",
    meta: [
      { label: "Type", value: "Painting series" },
      { label: "Theme", value: "Unity, family, togetherness" },
      { label: "Studio", value: "Niyi Art Studio" },
      { label: "Location", value: "Lagos, Nigeria" },
    ],
    cover: img("united-roots-cover", "A couple in vintage dress stand on a city street"),
    images: [
      img("united-roots-1", "Five men in suits stack their hands together"),
      img("united-roots-cover", "A couple in vintage dress stand on a city street"),
      img("united-roots-2", "A man plays piano while a woman reads beside him"),
      img("united-roots-3", "A family of four in vintage clothing"),
      img("united-roots-4", "Three women in suits and hats seated together"),
      img("united-roots-5", "A seated man with a teapot and a standing woman in a long dress"),
    ],
  },
  {
    slug: "united-roots-prints",
    title: "United Roots — Prints",
    category: "Limited prints",
    statement:
      "Archival prints of the United Roots painting of five brothers, hands joined as one — each print finished and signed by hand in the studio.",
    meta: [
      { label: "Edition", value: "Limited" },
      { label: "Finish", value: "Hand-finished & signed" },
      { label: "From", value: "United Roots" },
      { label: "Enquiries", value: "omotayoolaniyi8@gmail.com" },
    ],
    cover: img("artist-holding-print", "Olaniyi Omotayo holds up a print of five men with hands joined"),
    images: [
      img("hands-of-unity-print", "Print of five men in suits stacking hands, held up by gloved hands"),
      img("artist-signing-print", "The artist, gloved, signs a print with a fine brush", "Finishing in the studio"),
      img("hands-of-unity-detail", "Close detail of two faces on the print"),
      img("hands-of-unity-print-corner", "Corner of the print showing the paper margin"),
      img("artist-holding-print", "The artist holds the print in the studio"),
    ],
  },
  {
    slug: "self-confidence",
    title: "Self Confidence",
    category: "Series",
    statement:
      "“Self Confidence” is a vibrant and empowering painting project that features bold, stylized portraits of African men and women. Each figure is painted with strong posture, expressive color palettes, and confident gazes that embody strength, pride, and cultural elegance. The project seeks to inspire viewers to embrace their identity and heritage with confidence and dignity. Through its powerful visual storytelling, the series celebrates individuality, resilience, and the timeless style rooted in African heritage.",
    meta: [
      { label: "Type", value: "Painting series" },
      { label: "Theme", value: "Identity, pride, heritage" },
      { label: "Studio", value: "Niyi Art Studio" },
      { label: "Location", value: "Lagos, Nigeria" },
    ],
    cover: img("self-confidence-cover", "Two men in suits play chess in a warmly lit room"),
    images: [
      img("self-confidence-cover", "Two men in suits play chess"),
      img("self-confidence-1", "A man in a green suit reads in an orange armchair"),
      img("self-confidence-2", "A woman in a red suit sits on the running board of a vintage car"),
      img("the-best-version-of-myself", "A woman reading a book titled The Best Version of Myself sits back to back with a girl holding a pinwheel"),
    ],
  },
  {
    slug: "the-sovereign-chronicles",
    title: "The Sovereign Chronicles",
    category: "Ongoing series",
    statement:
      "“The Sovereign Chronicles” is a powerful collection of paintings that honors bold African figures who embody strength, leadership, and self-worth. Each portrait tells a story of resilience and dignity, reminding us that true power begins within. This project is a tribute to the spirit of individuals who rise with purpose and inspire others to own their worth and lead with courage.",
    meta: [
      { label: "Type", value: "Painting series" },
      { label: "Status", value: "Ongoing" },
      { label: "Theme", value: "Strength, leadership, self-worth" },
      { label: "Studio", value: "Niyi Art Studio" },
    ],
    cover: img("sovereign-cover", "A woman in a green suit and coral beads seated on a red throne"),
    images: [
      img("sovereign-cover", "A woman in a green suit and coral beads seated on a red throne"),
      img("sovereign-1", "A man in a flat cap smoking a pipe"),
      img("studio-sovereign", "The artist stands beside the throne painting in the studio", "In the studio"),
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/* Images that drift through the home page, each linking to its project. */
export const floating: { image: Img; slug: string }[] = [
  { image: img("the-unwritten", "The Unwritten"), slug: "the-unwritten" },
  { image: img("the-gathering", "Gathering at the table"), slug: "narratives-of-the-african-folks" },
  { image: img("united-roots-1", "Hands joined"), slug: "united-roots" },
  { image: img("sovereign-cover", "Seated on the throne"), slug: "the-sovereign-chronicles" },
  { image: img("the-best-version-of-myself", "The Best Version of Myself"), slug: "self-confidence" },
  { image: img("on-his-shoulders", "On his shoulders"), slug: "the-unwritten" },
  { image: img("narratives-cover", "Around the globe"), slug: "narratives-of-the-african-folks" },
  { image: img("self-confidence-2", "Red suit"), slug: "self-confidence" },
  { image: img("united-roots-2", "At the piano"), slug: "united-roots" },
  { image: img("sovereign-1", "Pipe"), slug: "the-sovereign-chronicles" },
  { image: img("narratives-4", "Campfire"), slug: "narratives-of-the-african-folks" },
  { image: img("united-roots-cover", "On the street"), slug: "united-roots" },
  { image: img("self-confidence-cover", "Chess"), slug: "self-confidence" },
  { image: img("narratives-1", "The rescue"), slug: "narratives-of-the-african-folks" },
  { image: img("hands-of-unity-detail", "Print detail"), slug: "united-roots-prints" },
  { image: img("united-roots-3", "Family"), slug: "united-roots" },
  { image: img("self-confidence-1", "Green suit"), slug: "self-confidence" },
  { image: img("narratives-5", "The boat"), slug: "narratives-of-the-african-folks" },
];
