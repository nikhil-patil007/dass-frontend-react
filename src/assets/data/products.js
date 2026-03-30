// Base products list
const baseProducts = [
    {
        "id": 1,
        "name": "Rose Cut Gemstone Ring",
        "slug": "rose-cut-gemstone-ring",
        "category": "Rings",
        "price": 459.99,
        "image": "/assets/need_to_repair/_DSC0014-266.png",
        "description": "Rose gemstone on gold ring",
        "inStock": true,
        "rating": 4.4
    },
    {
        "id": 2,
        "name": "Classic Cushion Cut Amethyst Ring",
        "slug": "classic-cushion-cut-amethyst-ring",
        "category": "Rings",
        "price": 499.99,
        "image": "/assets/need_to_repair/_DSC0016-267.png",
        "description": "Cushion amethyst on gold band",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 3,
        "name": "Royal Amethyst Three-Stone Ring",
        "slug": "royal-amethyst-three-stone-ring",
        "category": "Rings",
        "price": 549.99,
        "image": "/assets/need_to_repair/_DSC0026-271.png",
        "description": "Three stone amethyst gold ring",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 4,
        "name": "Marquise Amethyst Solitaire Ring",
        "slug": "marquise-amethyst-solitaire-ring",
        "category": "Rings",
        "price": 419.99,
        "image": "/assets/need_to_repair/_DSC0028-272.png",
        "description": "Marquise amethyst minimalist gold ring",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 5,
        "name": "Textured Band Oval Amethyst Ring",
        "slug": "textured-band-oval-amethyst-ring",
        "category": "Rings",
        "price": 439.99,
        "image": "/assets/need_to_repair/_DSC0033-273.png",
        "description": "Oval amethyst textured gold band",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 6,
        "name": "Sky Blue Topaz Signet Ring",
        "slug": "sky-blue-topaz-signet-ring",
        "category": "Rings",
        "price": 469.99,
        "image": "/assets/need_to_repair/_DSC0038-276.png",
        "description": "Blue topaz bold signet ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 7,
        "name": "Blue Topaz Gold Signet Ring",
        "slug": "blue-topaz-gold-signet-ring",
        "category": "Rings",
        "price": 479.99,
        "image": "/assets/need_to_repair/_DSC0042-277.png",
        "description": "Blue topaz classic signet ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 8,
        "name": "Dual Gemstone Open Band Ring",
        "slug": "dual-gemstone-open-band-ring",
        "category": "Rings",
        "price": 429.99,
        "image": "/assets/need_to_repair/_DSC0046-280.png",
        "description": "Open band dual gemstone ring",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 9,
        "name": "Blue Sapphire Open Band Ring",
        "slug": "blue-sapphire-open-band-ring",
        "category": "Rings",
        "price": 489.99,
        "image": "/assets/need_to_repair/_DSC0053-284.png",
        "description": "Open band sapphire gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 10,
        "name": "Blue Flower Statement Ring",
        "slug": "blue-flower-statement-ring",
        "category": "Rings",
        "price": 499.99,
        "image": "/assets/need_to_repair/_DSC0057-287.png",
        "description": "Blue flower gemstone statement ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 11,
        "name": "Lapis Flower Gold Ring",
        "slug": "lapis-flower-gold-ring",
        "category": "Rings",
        "price": 499.99,
        "image": "/assets/need_to_repair/_DSC0056-286.png",
        "description": "Lapis flower gemstone gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 12,
        "name": "Pearl Bezel Gold Ring",
        "slug": "pearl-bezel-gold-ring",
        "category": "Rings",
        "price": 459.99,
        "image": "/assets/need_to_repair/_DSC0065-292.png",
        "description": "Pearl bezel set gold ring",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 13,
        "name": "Modern Pearl Frame Ring",
        "slug": "modern-pearl-frame-ring",
        "category": "Rings",
        "price": 469.99,
        "image": "/assets/need_to_repair/_DSC0066-293.png",
        "description": "Pearl framed geometric gold ring",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 14,
        "name": "Dual Citrine Gold Ring",
        "slug": "dual-citrine-gold-ring",
        "category": "Rings",
        "price": 479.99,
        "image": "/assets/need_to_repair/_DSC0072-295.png",
        "description": "Dual citrine open gold ring",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 15,
        "name": "Peridot Trillion Cut Gold Ring",
        "slug": "peridot-trillion-cut-gold-ring",
        "category": "Rings",
        "price": 459.99,
        "image": "/assets/need_to_repair/_DSC0078-298.png",
        "description": "Trillion peridot gemstone gold ring",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 16,
        "name": "Minimal Peridot Bezel Ring",
        "slug": "minimal-peridot-bezel-ring",
        "category": "Rings",
        "price": 449.99,
        "image": "/assets/need_to_repair/_DSC0080-299.png",
        "description": "Minimal peridot bezel gold ring",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 17,
        "name": "Sky Blue Topaz Halo Ring",
        "slug": "sky-blue-topaz-halo-ring",
        "category": "Rings",
        "price": 489.99,
        "image": "/assets/need_to_repair/_DSC0084-301.png",
        "description": "Sky blue topaz halo ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 18,
        "name": "Blue Topaz Diamond Accent Ring",
        "slug": "blue-topaz-diamond-accent-ring",
        "category": "Rings",
        "price": 499.99,
        "image": "/assets/need_to_repair/_DSC0085-302.png",
        "description": "Blue topaz diamond accent ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 19,
        "name": "Turquoise Three Stone Gold Ring",
        "slug": "turquoise-three-stone-gold-ring",
        "category": "Rings",
        "price": 459.99,
        "image": "/assets/need_to_repair/_DSC0097-309.png",
        "description": "Turquoise three stone gold ring",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 20,
        "name": "Champagne Quartz Solitaire Ring",
        "slug": "champagne-quartz-solitaire-ring",
        "category": "Rings",
        "price": 479.99,
        "image": "/assets/need_to_repair/_DSC0104-313.png",
        "description": "Champagne quartz solitaire gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 21,
        "name": "Oval Quartz Halo Gold Ring",
        "slug": "oval-quartz-halo-gold-ring",
        "category": "Rings",
        "price": 489.99,
        "image": "/assets/need_to_repair/_DSC0108-316.png",
        "description": "Oval quartz halo gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 22,
        "name": "Quartz Cluster Gold Ring",
        "slug": "quartz-cluster-gold-ring",
        "category": "Rings",
        "price": 489.99,
        "image": "/assets/need_to_repair/_DSC0109-317.png",
        "description": "Quartz cluster set gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 23,
        "name": "Five Stone Aquamarine Gold Ring",
        "slug": "five-stone-aquamarine-gold-ring",
        "category": "Rings",
        "price": 499.99,
        "image": "/assets/need_to_repair/_DSC0114-320.png",
        "description": "Five aquamarine stone gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 24,
        "name": "Aquamarine Curved Band Ring",
        "slug": "aquamarine-curved-band-ring",
        "category": "Rings",
        "price": 489.99,
        "image": "/assets/need_to_repair/_DSC0116-321.png",
        "description": "Curved aquamarine band gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 25,
        "name": "Opal Five Stone Ring",
        "slug": "opal-five-stone-ring",
        "category": "Rings",
        "price": 509.99,
        "image": "/assets/need_to_repair/_DSC0120-324.png",
        "description": "Five opal stone gold ring",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 26,
        "name": "Aquamarine Wrap Band Ring",
        "slug": "aquamarine-wrap-band-ring",
        "category": "Rings",
        "price": 499.99,
        "image": "/assets/need_to_repair/_DSC0122-326.png",
        "description": "Aquamarine wrap style gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 27,
        "name": "Bi-Color Tourmaline Ring",
        "slug": "bicolor-tourmaline-ring",
        "category": "Rings",
        "price": 529.99,
        "image": "/assets/need_to_repair/_DSC0126-328.png",
        "description": "Bicolor tourmaline gold ring",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 28,
        "name": "Bicolor Tourmaline Accent Ring",
        "slug": "bicolor-tourmaline-accent-ring",
        "category": "Rings",
        "price": 539.99,
        "image": "/assets/need_to_repair/_DSC0130-329.png",
        "description": "Bicolor tourmaline accent gold ring",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 29,
        "name": "Bicolor Tourmaline Bar Ring",
        "slug": "bicolor-tourmaline-bar-ring",
        "category": "Rings",
        "price": 549.99,
        "image": "/assets/need_to_repair/_DSC0131-330.png",
        "description": "Bicolor tourmaline bar gold ring",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 30,
        "name": "Citrine Ruby Accent Ring",
        "slug": "citrine-ruby-accent-ring",
        "category": "Rings",
        "price": 559.99,
        "image": "/assets/need_to_repair/_DSC0134-332.png",
        "description": "Citrine ruby accent gold ring",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 31,
        "name": "Citrine Ruby Solitaire Ring",
        "slug": "citrine-ruby-solitaire-ring",
        "category": "Rings",
        "price": 569.99,
        "image": "/assets/need_to_repair/_DSC0135-333.png",
        "description": "Citrine ruby solitaire gold ring",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 32,
        "name": "Citrine Halo Gold Ring",
        "slug": "citrine-halo-gold-ring",
        "category": "Rings",
        "price": 579.99,
        "image": "/assets/need_to_repair/_DSC0145-337.png",
        "description": "Citrine halo style gold ring",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 33,
        "name": "Citrine Diamond Accent Ring",
        "slug": "citrine-diamond-accent-ring",
        "category": "Rings",
        "price": 589.99,
        "image": "/assets/need_to_repair/_DSC0146-338.png",
        "description": "Citrine diamond accent gold ring",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 34,
        "name": "Peridot Ribbed Band Ring",
        "slug": "peridot-ribbed-band-ring",
        "category": "Rings",
        "price": 519.99,
        "image": "/assets/need_to_repair/_DSC0150-340.png",
        "description": "Peridot ribbed gold band ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 35,
        "name": "Amethyst Solitaire Gold Ring",
        "slug": "amethyst-solitaire-gold-ring",
        "category": "Rings",
        "price": 529.99,
        "image": "/assets/need_to_repair/_DSC0158-344.png",
        "description": "Amethyst solitaire gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 36,
        "name": "Amethyst Classic Gold Ring",
        "slug": "amethyst-classic-gold-ring",
        "category": "Rings",
        "price": 529.99,
        "image": "/assets/need_to_repair/_DSC0159-345.png",
        "description": "Classic amethyst gold ring",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 37,
        "name": "Sapphire Ribbed Gold Ring",
        "slug": "sapphire-ribbed-gold-ring",
        "category": "Rings",
        "price": 549.99,
        "image": "/assets/need_to_repair/_DSC0160-346.png",
        "description": "Elegant ribbed gold ring featuring a deep blue sapphire centerpiece",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 38,
        "name": "Minimal Sapphire Gold Ring",
        "slug": "minimal-sapphire-gold-ring",
        "category": "Rings",
        "price": 499.99,
        "image": "/assets/need_to_repair/_DSC0162-347.png",
        "description": "Minimalist gold ring featuring a deep blue sapphire in a delicate setting",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 39,
        "name": "Ribbed Sapphire Gold Band",
        "slug": "ribbed-sapphire-gold-band",
        "category": "Rings",
        "price": 559.99,
        "image": "/assets/need_to_repair/_DSC0163-348.png",
        "description": "Elegant ribbed gold band featuring a rectangular deep blue sapphire",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 40,
        "name": "Textured Sapphire Gold Ring",
        "slug": "textured-sapphire-gold-ring",
        "category": "Rings",
        "price": 569.99,
        "image": "/assets/need_to_repair/_DSC0168-350.png",
        "description": "Bold textured gold ring featuring a rectangular deep blue sapphire centerpiece",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 41,
        "name": "Crystal Prism Gold Ring",
        "slug": "crystal-prism-gold-ring",
        "category": "Rings",
        "price": 599.99,
        "image": "/assets/need_to_repair/_DSC0174-352.png",
        "description": "Elegant gold ring featuring a large clear prism-cut crystal in a raised setting",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 42,
        "name": "Blue Prism Statement Gold Ring",
        "slug": "blue-prism-statement-gold-ring",
        "category": "Rings",
        "price": 629.99,
        "image": "/assets/need_to_repair/_DSC0177-353.png",
        "description": "Statement gold ring with a vibrant blue prism-cut gemstone and pavé accents",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 43,
        "name": "Blue Gradient Emerald-Cut Gold Ring",
        "slug": "blue-gradient-emerald-cut-gold-ring",
        "category": "Rings",
        "price": 649.99,
        "image": "/assets/need_to_repair/_DSC0182-356.png",
        "description": "Luxury gold ring featuring a striking blue gradient emerald-cut gemstone with delicate pavé accents",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 44,
        "name": "Ocean Prism Statement Gold Ring",
        "slug": "ocean-prism-statement-gold-ring",
        "category": "Rings",
        "price": 669.99,
        "image": "/assets/need_to_repair/_DSC0185-358.png",
        "description": "Luxury gold ring featuring a striking ocean-blue prism-cut gemstone with pavé diamond accents",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 45,
        "name": "Aqua Halo Gold Ring",
        "slug": "aqua-halo-gold-ring",
        "category": "Rings",
        "price": 689.99,
        "image": "/assets/need_to_repair/_DSC0196-360.png",
        "description": "Elegant gold ring featuring a radiant aqua gemstone centerpiece surrounded by a delicate halo setting",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 46,
        "name": "Golden Citrine Halo Ring Set",
        "slug": "golden-citrine-halo-ring-set",
        "category": "Rings",
        "price": 729.99,
        "image": "/assets/need_to_repair/_DSC0202-363.png",
        "description": "Elegant gold ring set featuring a radiant oval citrine centerpiece with a sparkling halo and matching pavé band",
        "inStock": true,
        "rating": 4.9
    },
    {
        "id": 47,
        "name": "Classic Pavé Gold Band",
        "slug": "classic-pave-gold-band",
        "category": "Rings",
        "price": 379.99,
        "image": "/assets/need_to_repair/_DSC0211-364.png",
        "description": "Elegant slim gold band adorned with delicate pavé-set stones for a timeless minimalist sparkle",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 48,
        "name": "Delicate Pavé Gold Ring",
        "slug": "delicate-pave-gold-ring",
        "category": "Rings",
        "price": 389.99,
        "image": "/assets/need_to_repair/_DSC0212-365.png",
        "description": "Refined gold ring featuring a delicate line of pavé-set stones for subtle everyday elegance",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 49,
        "name": "Royal Citrine Double Halo Ring",
        "slug": "royal-citrine-double-halo-ring",
        "category": "Rings",
        "price": 749.99,
        "image": "/assets/need_to_repair/_DSC0214-366.png",
        "description": "Luxurious gold ring featuring a radiant oval citrine surrounded by a sparkling double halo of pavé stones",
        "inStock": true,
        "rating": 4.9
    },
    {
        "id": 50,
        "name": "Citrine Halo Split Shank Ring",
        "slug": "citrine-halo-split-shank-ring",
        "category": "Rings",
        "price": 729.99,
        "image": "/assets/need_to_repair/_DSC0218-367.png",
        "description": "Elegant gold ring featuring a brilliant citrine centerpiece with a shimmering halo and split shank pavé band design",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 51,
        "name": "Citrine Halo Pendant Necklace",
        "slug": "citrine-halo-pendant-necklace",
        "category": "Necklaces",
        "price": 529.99,
        "image": "/assets/need_to_repair/_DSC9394-76.png",
        "description": "Delicate gold necklace featuring a brilliant citrine gemstone pendant accented with a sparkling halo for a refined elegant look",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 52,
        "name": "Elegant Citrine Drop Necklace",
        "slug": "elegant-citrine-drop-necklace",
        "category": "Necklaces",
        "price": 519.99,
        "image": "/assets/need_to_repair/_DSC9395-77.png",
        "description": "Graceful gold necklace featuring a radiant citrine drop pendant accented with delicate sparkling stones for a refined luxurious touch",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 53,
        "name": "Minimal Aquamarine Solitaire Necklace",
        "slug": "minimal-aquamarine-solitaire-necklace",
        "category": "Necklaces",
        "price": 489.99,
        "image": "/assets/need_to_repair/_DSC9401-78.png",
        "description": "Minimal gold aquamarine pendant",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 54,
        "name": "Citrine Amethyst Halo Ring",
        "slug": "citrine-amethyst-halo-ring",
        "category": "Rings",
        "price": 689.99,
        "image": "/assets/need_to_repair/_DSC9656-126.png",
        "description": "Elegant gold ring featuring a radiant citrine center stone surrounded by a delicate halo of purple amethyst accents",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 55,
        "name": "Citrine Eternity Band Ring",
        "slug": "citrine-eternity-band-ring",
        "category": "Rings",
        "price": 699.99,
        "image": "/assets/need_to_repair/_DSC9684-132.png",
        "description": "Luxurious gold eternity band featuring a continuous circle of radiant citrine gemstones for a bold and elegant statement",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 56,
        "name": "Citrine Heart Eternity Ring",
        "slug": "citrine-heart-eternity-ring",
        "category": "Rings",
        "price": 719.99,
        "image": "/assets/need_to_repair/_DSC9686-133.png",
        "description": "Romantic gold eternity ring featuring a continuous band of heart-cut citrine gemstones accented with delicate pavé stones",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 57,
        "name": "Dual Gem Open Statement Ring",
        "slug": "dual-gem-open-statement-ring",
        "category": "Rings",
        "price": 739.99,
        "image": "/assets/need_to_repair/_DSC9692-135.png",
        "description": "Modern open gold ring featuring two contrasting gemstones — a vibrant green stone and a luminous white stone — creating a bold contemporary statement design",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 58,
        "name": "Minimal Solitaire Gold Ring",
        "slug": "minimal-solitaire-gold-ring",
        "category": "Rings",
        "price": 459.99,
        "image": "/assets/need_to_repair/_DSC9717-142.png",
        "description": "Elegant minimalist gold ring featuring a single solitaire gemstone set in a sleek modern mount for a timeless refined look",
        "inStock": true,
        "rating": 4.6
    }
];

// Build a category -> image URL pool from the product list
const categoryImagePool = baseProducts.reduce((acc, p) => {
    const key = p.category;
    if (!acc[key]) acc[key] = new Set();
    if (p.image) acc[key].add(p.image);
    return acc;
}, {});

// Convert sets to arrays for processing
const categoryImageArr = Object.fromEntries(
    Object.entries(categoryImagePool).map(([k, v]) => [k, Array.from(v)])
);

// Simple shuffle util
function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Ensure each product has an images[] with multiple items from the same category
const DESIRED_IMAGES_COUNT = 6;

const products = baseProducts.map((p) => {
    const pool = (categoryImageArr[p.category] || [p.image]).slice();

    // If pool is smaller than desired, repeat it to reach minimum length
    let expandedPool = pool.slice();
    while (expandedPool.length < DESIRED_IMAGES_COUNT) {
        expandedPool = expandedPool.concat(pool);
        if (expandedPool.length > 20) break; // guard just in case
    }

    const shuffled = shuffle(expandedPool);

    // Keep primary image first
    const images = [p.image];
    // Add unique images from pool excluding primary
    const uniqueRest = Array.from(new Set(shuffled.filter((u) => u !== p.image)));
    for (const url of uniqueRest) {
        if (images.length >= DESIRED_IMAGES_COUNT) break;
        images.push(url);
    }
    // If still short, allow duplicates from shuffled (fallback)
    let i = 0;
    const fallback = shuffled.length ? shuffled : [p.image];
    while (images.length < DESIRED_IMAGES_COUNT) {
        images.push(fallback[i % fallback.length]);
        i++;
    }

    return { ...p, images: images.slice(0, DESIRED_IMAGES_COUNT) };
});

export default products;
