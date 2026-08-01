/**
 * Le'maz service catalogue — single source of truth for pricing.
 * Aligned 1:1 with the official "Le'maz Beauty Service Catalogue" PDF.
 * `price` is the amount used for booking totals (KES). `label` is what is displayed.
 */
export type CatalogService = {
  name: string;
  price: number;
  label: string;
};

export type CatalogCategory = {
  name: string;
  services: CatalogService[];
};

const svc = (name: string, price: number, label?: string): CatalogService => ({
  name,
  price,
  label: label ?? `KES ${price.toLocaleString("en-KE")}`,
});

export const catalog: CatalogCategory[] = [
  {
    name: "Braiding & Twists",
    services: [
      svc("Knotless Braids — Large", 2000),
      svc("Knotless Braids — Medium", 2500),
      svc("Knotless Braids — Small", 3000),
      svc("Half Braids, Half Lines — Large", 2000),
      svc("Half Braids, Half Lines — Medium", 2500),
      svc("Half Braids, Half Lines — Small", 3000),
      svc("Ghanaian Lines / Ghana Braids — Large", 2000),
      svc("Ghanaian Lines / Ghana Braids — Small", 2500),
      svc("Spring Twist / Natural Twists — Large", 3000),
      svc("Spring Twist / Natural Twists — Small", 3500),
      svc("Twist-Outs — Large", 1000),
      svc("Twist-Outs — Medium", 1400),
      svc("Twist-Outs — Small", 2000),
      svc("Twist-Outs — Micro", 4000),
    ],
  },
  {
    name: "Wigs, Weaves & Locks",
    services: [
      svc("Track Sew", 3500),
      svc("Wig Installation", 1500),
      svc("Wig Styling", 1000),
      svc("Wig Revamp", 1500),
      svc("Retouch (Wax)", 1200),
      svc("Retouch Crochet (Interlocking)", 2000),
      svc("Styling", 500),
      svc("Crochet Pinning", 3500),
      svc("Artificial Dreadlocks Installation", 4500),
      svc("Sisterlocks Installation", 20000, "KES 20,000 – 30,000"),
      svc("Sisterlocks Retie", 3500),
    ],
  },
  {
    name: "Kids' Hairstyles",
    services: [
      svc("Back-to-School Lines — Large", 200),
      svc("Back-to-School Lines — Medium", 400),
      svc("Back-to-School Lines — Small", 600),
      svc("Kids Braids (Inclusive of Hair) — All Styles", 2000),
      svc("Kids Twist-Outs — Large", 800),
      svc("Kids Twist-Outs — Medium", 1200),
      svc("Kids Twist-Outs — Small", 1600),
      svc("Back-to-School Lines for Adults — Large", 300),
      svc("Back-to-School Lines for Adults — Medium", 600),
      svc("Back-to-School Lines for Adults — Small", 800),
    ],
  },
  {
    name: "Pedicure & Manicure",
    services: [
      svc("Pedicure Plain", 1500),
      svc("Pedi-Gel", 1000),
      svc("Manicure Plain", 800),
      svc("Mani-Gel", 1200),
      svc("Foot Scrubbing", 300),
      svc("Cuticle Removal", 300),
      svc("Plain Gel", 500),
      svc("Tips Gel", 1500),
      svc("Stick-Ons Gel", 1200),
      svc("Overlays", 2000),
      svc("Builder Gel", 1200),
      svc("Glam Gel", 1500),
      svc("Nail Sculpting", 2000),
      svc("Nail Repairs", 200),
      svc("Press-On Nails", 500),
      svc("Henna Application", 300),
      svc("Soak-Off Gel", 200),
      svc("Soak-Off Tips", 500),
      svc("Nail Art (Per Nail) — Standard", 50),
      svc("Nail Art (Per Nail) — Detailed", 100),
      svc("Top Coat", 200),
    ],
  },
  {
    name: "Makeup & Beauty Enhancements",
    services: [
      svc("Full Glam", 2500),
      svc("Face Beat", 1500),
      svc("Eyebrow Shaping (Laser)", 300),
      svc("Eyebrow Twisting / Threading", 300),
      svc("Eyebrow Tinting", 500),
    ],
  },
  {
    name: "Extras & Add-Ons",
    services: [
      svc("Knotless Undo (Large)", 300),
      svc("Knotless Undo (Medium)", 300),
      svc("Knotless Undo (Small)", 500),
      svc("Ghanaian Undo", 300),
      svc("Artificial Locks Undo", 2000),
      svc("Twist-Outs Undo", 300),
      svc("Twist-Outs Undo (Small)", 500),
      svc("Hair Oiling", 200),
      svc("Dryer Service", 500),
      svc("Hair Detangling", 200),
      svc("Leave-In Treatment", 800, "KES 800 – 1,000"),
      svc("Deep Treatment", 1000, "KES 1,000 – 2,000"),
      svc("Wash & Straighten (Short)", 300),
      svc("Full Wash & Straighten", 500),
    ],
  },
];

export const DEPOSIT_RATE = 0.35;

export const formatKES = (amount: number) => `KES ${amount.toLocaleString("en-KE")}`;

export const depositFor = (total: number) => Math.round(total * DEPOSIT_RATE);
