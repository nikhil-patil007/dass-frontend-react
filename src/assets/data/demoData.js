/**
 * Demo / dummy data that mirrors the DassBackend API response shapes.
 * Used when VITE_DEMO_MODE=true or backend is unreachable.
 */

const IMG = "/assets/need_to_repair";

// Helper to build a product in the API shape
const p = (id, name, slug, cat, mat, price, img, desc, sku) => ({
  id,
  name,
  slug,
  sku: sku || `DASS-${String(id).padStart(4, "0")}`,
  description: desc,
  base_price: (price + 100).toFixed(2),
  selling_price: price.toFixed(2),
  is_in_stock: true,
  is_featured: id <= 12,
  thumbnail: `${IMG}/${img}`,
  category: { id: cat.id, name: cat.name, slug: cat.slug },
  material: { id: mat.id, name: mat.name, material_type: mat.type, slug: mat.slug },
  images: [],
  created_at: new Date(2026, 0, id).toISOString(),
});

// Categories
const CAT_RING = { id: 1, name: "Rings", slug: "rings" };
const CAT_NECK = { id: 2, name: "Necklaces", slug: "necklaces" };

// Materials
const MAT_GOLD = { id: 1, name: "Gold", type: "Yellow Gold", slug: "gold" };
const MAT_ROSE = { id: 2, name: "Rose Gold", type: "Rose Gold", slug: "rose-gold" };
const MAT_WHITE = { id: 3, name: "White Gold", type: "White Gold", slug: "white-gold" };

const demoProducts = [
  p(1, "Rose Cut Gemstone Ring", "rose-cut-gemstone-ring", CAT_RING, MAT_ROSE, 459.99, "_DSC0014-266.png", "Elegant rose-cut gemstone set on a warm rose gold band, featuring intricate metalwork and a vintage-inspired design"),
  p(2, "Classic Cushion Cut Amethyst Ring", "classic-cushion-cut-amethyst-ring", CAT_RING, MAT_GOLD, 499.99, "_DSC0016-267.png", "A stunning cushion-cut amethyst centerpiece set on a polished gold band with delicate prong detailing"),
  p(3, "Royal Amethyst Three-Stone Ring", "royal-amethyst-three-stone-ring", CAT_RING, MAT_GOLD, 549.99, "_DSC0026-271.png", "Luxurious three-stone amethyst ring in rich gold, symbolizing past, present, and future"),
  p(4, "Marquise Amethyst Solitaire Ring", "marquise-amethyst-solitaire-ring", CAT_RING, MAT_GOLD, 419.99, "_DSC0028-272.png", "Minimalist marquise-cut amethyst solitaire on a sleek gold band for everyday elegance"),
  p(5, "Textured Band Oval Amethyst Ring", "textured-band-oval-amethyst-ring", CAT_RING, MAT_GOLD, 439.99, "_DSC0033-273.png", "Oval amethyst gemstone paired with a uniquely textured gold band for a bold artisan look"),
  p(6, "Sky Blue Topaz Signet Ring", "sky-blue-topaz-signet-ring", CAT_RING, MAT_GOLD, 469.99, "_DSC0038-276.png", "Bold signet-style ring featuring a vibrant sky blue topaz set in polished yellow gold"),
  p(7, "Blue Topaz Gold Signet Ring", "blue-topaz-gold-signet-ring", CAT_RING, MAT_GOLD, 479.99, "_DSC0042-277.png", "Classic signet ring with a deep blue topaz centerpiece and a rich gold finish"),
  p(8, "Dual Gemstone Open Band Ring", "dual-gemstone-open-band-ring", CAT_RING, MAT_GOLD, 429.99, "_DSC0046-280.png", "Modern open-band design featuring two complementary gemstones on a gold setting"),
  p(9, "Blue Sapphire Open Band Ring", "blue-sapphire-open-band-ring", CAT_RING, MAT_GOLD, 489.99, "_DSC0053-284.png", "Elegant open-band gold ring with a brilliant blue sapphire accent"),
  p(10, "Blue Flower Statement Ring", "blue-flower-statement-ring", CAT_RING, MAT_GOLD, 499.99, "_DSC0057-287.png", "Eye-catching floral statement ring with blue gemstone petals on gold"),
  p(11, "Lapis Flower Gold Ring", "lapis-flower-gold-ring", CAT_RING, MAT_GOLD, 499.99, "_DSC0056-286.png", "Handcrafted lapis lazuli flower motif set on a warm gold band"),
  p(12, "Pearl Bezel Gold Ring", "pearl-bezel-gold-ring", CAT_RING, MAT_GOLD, 459.99, "_DSC0065-292.png", "Timeless pearl set in a clean bezel on polished gold for refined simplicity"),
  p(13, "Modern Pearl Frame Ring", "modern-pearl-frame-ring", CAT_RING, MAT_GOLD, 469.99, "_DSC0066-293.png", "Contemporary geometric gold frame embracing a luminous freshwater pearl"),
  p(14, "Dual Citrine Gold Ring", "dual-citrine-gold-ring", CAT_RING, MAT_GOLD, 479.99, "_DSC0072-295.png", "Warm dual citrine stones on an open gold ring for a sunlit glow"),
  p(15, "Peridot Trillion Cut Gold Ring", "peridot-trillion-cut-gold-ring", CAT_RING, MAT_GOLD, 459.99, "_DSC0078-298.png", "Vivid trillion-cut peridot gemstone on a sleek gold setting"),
  p(16, "Minimal Peridot Bezel Ring", "minimal-peridot-bezel-ring", CAT_RING, MAT_GOLD, 449.99, "_DSC0080-299.png", "Understated peridot bezel ring in gold — perfect for stacking"),
  p(17, "Sky Blue Topaz Halo Ring", "sky-blue-topaz-halo-ring", CAT_RING, MAT_WHITE, 489.99, "_DSC0084-301.png", "Radiant sky blue topaz surrounded by a sparkling halo of accent stones"),
  p(18, "Blue Topaz Diamond Accent Ring", "blue-topaz-diamond-accent-ring", CAT_RING, MAT_WHITE, 499.99, "_DSC0085-302.png", "Blue topaz center stone with elegant diamond accents on white gold"),
  p(19, "Turquoise Three Stone Gold Ring", "turquoise-three-stone-gold-ring", CAT_RING, MAT_GOLD, 459.99, "_DSC0097-309.png", "Three turquoise cabochons on a warm gold band — boho meets luxury"),
  p(20, "Champagne Quartz Solitaire Ring", "champagne-quartz-solitaire-ring", CAT_RING, MAT_GOLD, 479.99, "_DSC0104-313.png", "Smoky champagne quartz solitaire on a refined gold band"),
  p(21, "Oval Quartz Halo Gold Ring", "oval-quartz-halo-gold-ring", CAT_RING, MAT_GOLD, 489.99, "_DSC0108-316.png", "Oval quartz center encircled by a dazzling halo on gold"),
  p(22, "Quartz Cluster Gold Ring", "quartz-cluster-gold-ring", CAT_RING, MAT_GOLD, 489.99, "_DSC0109-317.png", "Cluster of natural quartz stones set in rich gold for a statement look"),
  p(23, "Five Stone Aquamarine Gold Ring", "five-stone-aquamarine-gold-ring", CAT_RING, MAT_GOLD, 499.99, "_DSC0114-320.png", "Five graduating aquamarine stones on a polished gold band"),
  p(24, "Aquamarine Curved Band Ring", "aquamarine-curved-band-ring", CAT_RING, MAT_GOLD, 489.99, "_DSC0116-321.png", "Curved gold band adorned with channel-set aquamarine gemstones"),
  p(25, "Opal Five Stone Ring", "opal-five-stone-ring", CAT_RING, MAT_GOLD, 509.99, "_DSC0120-324.png", "Five iridescent opals set along a gold band for a mesmerizing rainbow effect"),
  p(26, "Aquamarine Wrap Band Ring", "aquamarine-wrap-band-ring", CAT_RING, MAT_GOLD, 499.99, "_DSC0122-326.png", "Aquamarine gemstones wrapping around a textured gold band"),
  p(27, "Bi-Color Tourmaline Ring", "bicolor-tourmaline-ring", CAT_RING, MAT_GOLD, 529.99, "_DSC0126-328.png", "Rare bi-color tourmaline stone transitioning from green to pink on gold"),
  p(28, "Bicolor Tourmaline Accent Ring", "bicolor-tourmaline-accent-ring", CAT_RING, MAT_GOLD, 539.99, "_DSC0130-329.png", "Bi-color tourmaline with sparkling accent stones on yellow gold"),
  p(29, "Bicolor Tourmaline Bar Ring", "bicolor-tourmaline-bar-ring", CAT_RING, MAT_GOLD, 549.99, "_DSC0131-330.png", "Modern bar-set bi-color tourmaline on a minimalist gold band"),
  p(30, "Citrine Ruby Accent Ring", "citrine-ruby-accent-ring", CAT_RING, MAT_GOLD, 559.99, "_DSC0134-332.png", "Warm citrine center flanked by vivid ruby accents on gold"),
  p(31, "Citrine Ruby Solitaire Ring", "citrine-ruby-solitaire-ring", CAT_RING, MAT_GOLD, 569.99, "_DSC0135-333.png", "Bold citrine solitaire with subtle ruby side stones on gold"),
  p(32, "Citrine Halo Gold Ring", "citrine-halo-gold-ring", CAT_RING, MAT_GOLD, 579.99, "_DSC0145-337.png", "Brilliant citrine surrounded by a sparkling halo on warm gold"),
  p(33, "Citrine Diamond Accent Ring", "citrine-diamond-accent-ring", CAT_RING, MAT_GOLD, 589.99, "_DSC0146-338.png", "Citrine center stone with diamond accent shoulders on gold"),
  p(34, "Peridot Ribbed Band Ring", "peridot-ribbed-band-ring", CAT_RING, MAT_GOLD, 519.99, "_DSC0150-340.png", "Peridot gemstone on a distinctive ribbed gold band"),
  p(35, "Amethyst Solitaire Gold Ring", "amethyst-solitaire-gold-ring", CAT_RING, MAT_GOLD, 529.99, "_DSC0158-344.png", "Classic amethyst solitaire on a polished gold setting"),
  p(36, "Amethyst Classic Gold Ring", "amethyst-classic-gold-ring", CAT_RING, MAT_GOLD, 529.99, "_DSC0159-345.png", "Timeless amethyst on a classic gold cathedral band"),
  p(37, "Sapphire Ribbed Gold Ring", "sapphire-ribbed-gold-ring", CAT_RING, MAT_GOLD, 549.99, "_DSC0160-346.png", "Deep blue sapphire on an elegantly ribbed gold band"),
  p(38, "Minimal Sapphire Gold Ring", "minimal-sapphire-gold-ring", CAT_RING, MAT_GOLD, 499.99, "_DSC0162-347.png", "Minimalist sapphire in a delicate gold setting for everyday wear"),
  p(39, "Ribbed Sapphire Gold Band", "ribbed-sapphire-gold-band", CAT_RING, MAT_GOLD, 559.99, "_DSC0163-348.png", "Rectangular sapphire on a bold ribbed gold band"),
  p(40, "Textured Sapphire Gold Ring", "textured-sapphire-gold-ring", CAT_RING, MAT_GOLD, 569.99, "_DSC0168-350.png", "Bold textured gold ring with a rectangular deep blue sapphire centerpiece"),
  p(41, "Crystal Prism Gold Ring", "crystal-prism-gold-ring", CAT_RING, MAT_GOLD, 599.99, "_DSC0174-352.png", "Large clear prism-cut crystal in a raised gold setting"),
  p(42, "Blue Prism Statement Gold Ring", "blue-prism-statement-gold-ring", CAT_RING, MAT_GOLD, 629.99, "_DSC0177-353.png", "Vibrant blue prism-cut gemstone with pavé accents on gold"),
  p(43, "Blue Gradient Emerald-Cut Ring", "blue-gradient-emerald-cut-gold-ring", CAT_RING, MAT_GOLD, 649.99, "_DSC0182-356.png", "Striking blue gradient emerald-cut gemstone with delicate pavé accents"),
  p(44, "Ocean Prism Statement Ring", "ocean-prism-statement-gold-ring", CAT_RING, MAT_GOLD, 669.99, "_DSC0185-358.png", "Ocean-blue prism-cut gemstone with pavé diamond accents on luxury gold"),
  p(45, "Aqua Halo Gold Ring", "aqua-halo-gold-ring", CAT_RING, MAT_GOLD, 689.99, "_DSC0196-360.png", "Radiant aqua gemstone surrounded by a delicate halo on gold"),
  p(46, "Golden Citrine Halo Ring Set", "golden-citrine-halo-ring-set", CAT_RING, MAT_GOLD, 729.99, "_DSC0202-363.png", "Oval citrine with sparkling halo and matching pavé band set"),
  p(47, "Classic Pavé Gold Band", "classic-pave-gold-band", CAT_RING, MAT_GOLD, 379.99, "_DSC0211-364.png", "Slim gold band with delicate pavé-set stones for timeless sparkle"),
  p(48, "Delicate Pavé Gold Ring", "delicate-pave-gold-ring", CAT_RING, MAT_GOLD, 389.99, "_DSC0212-365.png", "Refined gold ring with a delicate line of pavé-set stones"),
  p(49, "Royal Citrine Double Halo Ring", "royal-citrine-double-halo-ring", CAT_RING, MAT_GOLD, 749.99, "_DSC0214-366.png", "Oval citrine surrounded by a sparkling double halo of pavé stones"),
  p(50, "Citrine Halo Split Shank Ring", "citrine-halo-split-shank-ring", CAT_RING, MAT_GOLD, 729.99, "_DSC0218-367.png", "Brilliant citrine with shimmering halo and split shank pavé band"),
  p(51, "Citrine Halo Pendant Necklace", "citrine-halo-pendant-necklace", CAT_NECK, MAT_GOLD, 529.99, "_DSC9394-76.png", "Delicate gold necklace with a brilliant citrine pendant accented by a sparkling halo"),
  p(52, "Elegant Citrine Drop Necklace", "elegant-citrine-drop-necklace", CAT_NECK, MAT_GOLD, 519.99, "_DSC9395-77.png", "Graceful gold necklace with a radiant citrine drop pendant and sparkling accents"),
  p(53, "Minimal Aquamarine Solitaire Necklace", "minimal-aquamarine-solitaire-necklace", CAT_NECK, MAT_GOLD, 489.99, "_DSC9401-78.png", "Minimal gold chain with a single aquamarine solitaire pendant"),
  p(54, "Citrine Amethyst Halo Ring", "citrine-amethyst-halo-ring", CAT_RING, MAT_GOLD, 689.99, "_DSC9656-126.png", "Radiant citrine center surrounded by purple amethyst halo accents"),
  p(55, "Citrine Eternity Band Ring", "citrine-eternity-band-ring", CAT_RING, MAT_GOLD, 699.99, "_DSC9684-132.png", "Continuous circle of radiant citrine gemstones on a gold eternity band"),
  p(56, "Citrine Heart Eternity Ring", "citrine-heart-eternity-ring", CAT_RING, MAT_GOLD, 719.99, "_DSC9686-133.png", "Romantic heart-cut citrine eternity band with delicate pavé accents"),
  p(57, "Dual Gem Open Statement Ring", "dual-gem-open-statement-ring", CAT_RING, MAT_GOLD, 739.99, "_DSC9692-135.png", "Modern open ring with contrasting green and white gemstones"),
  p(58, "Minimal Solitaire Gold Ring", "minimal-solitaire-gold-ring", CAT_RING, MAT_GOLD, 459.99, "_DSC9717-142.png", "Elegant minimalist solitaire in a sleek modern gold mount"),
];

// Add images array (multiple images per product from same category)
const ringImages = demoProducts.filter(p => p.category.slug === "rings").map(p => p.thumbnail);
const neckImages = demoProducts.filter(p => p.category.slug === "necklaces").map(p => p.thumbnail);

demoProducts.forEach((prod) => {
  const pool = prod.category.slug === "rings" ? ringImages : neckImages;
  const imgs = [{ image: prod.thumbnail }];
  const shuffled = pool.filter(u => u !== prod.thumbnail).sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(5, shuffled.length); i++) {
    imgs.push({ image: shuffled[i] });
  }
  prod.images = imgs;
});

// Demo categories & materials for filter dropdowns
export const demoCategories = [
  { id: 1, name: "Rings", slug: "rings", product_count: 55 },
  { id: 2, name: "Necklaces", slug: "necklaces", product_count: 3 },
];

export const demoMaterials = [
  { id: 1, name: "Gold", slug: "gold", material_type: "Yellow Gold" },
  { id: 2, name: "Rose Gold", slug: "rose-gold", material_type: "Rose Gold" },
  { id: 3, name: "White Gold", slug: "white-gold", material_type: "White Gold" },
];

export default demoProducts;
