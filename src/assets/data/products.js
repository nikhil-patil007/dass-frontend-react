// Base products list
const baseProducts = [
    {
        "id": 1,
        "name": "Garnet Pendant",
        "slug": "garnet-pendant",
        "category": "Necklaces",
        "price": 479.99,
        "image": "/assets/images/products/necklace_PNG135.webp",
        "description": "Deep red garnet pendant on delicate chain",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 2,
        "name": "Classic Solitaire Ring",
        "slug": "classic-solitaire-ring",
        "category": "Rings",
        "price": 299.99,
        "image": "/assets/images/products/ring_PNG70.webp",
        "description": "Timeless solitaire ring with a brilliant cut stone",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 3,
        "name": "Gold Twist Bracelet",
        "slug": "gold-twist-bracelet",
        "category": "Bracelets",
        "price": 199.0,
        "image": "/assets/images/products/necklace_PNG62.webp",
        "description": "Delicate gold-twist chain bracelet",
        "inStock": true,
        "rating": 4.1
    },
    {
        "id": 4,
        "name": "Emerald Halo Pendant",
        "slug": "emerald-halo-pendant",
        "category": "Pendants",
        "price": 549.0,
        "image": "/assets/images/products/necklace_PNG138.webp",
        "description": "Emerald center with halo setting pendant",
        "inStock": false,
        "rating": 4.8
    },
    {
        "id": 5,
        "name": "Minimal Bar Necklace",
        "slug": "minimal-bar-necklace",
        "category": "Necklaces",
        "price": 69.99,
        "image": "/assets/images/products/necklace_PNG100.webp",
        "description": "Minimal bar necklace — everyday wearable",
        "inStock": true,
        "rating": 4.0
    },
    {
        "id": 6,
        "name": "Cubic Zirconia Hoop",
        "slug": "cubic-zirconia-hoop",
        "category": "Earrings",
        "price": 39.99,
        "image": "/assets/images/products/jewelry_PNG6740.webp",
        "description": "Shiny CZ hoops with comfortable latch-back",
        "inStock": true,
        "rating": 3.9
    },
    {
        "id": 7,
        "name": "Twin Band Wedding Set",
        "slug": "twin-band-wedding-set",
        "category": "Rings",
        "price": 399.0,
        "image": "/assets/images/products/ring_PNG84.webp",
        "description": "Matching his & hers twin-band wedding rings",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 8,
        "name": "Stackable Midi Ring",
        "slug": "stackable-midi-ring",
        "category": "Rings",
        "price": 19.99,
        "image": "/assets/images/products/ring_PNG140.webp",
        "description": "Thin stackable midi ring — mix and match",
        "inStock": true,
        "rating": 3.8
    },
    {
        "id": 9,
        "name": "Lariat Y Necklace",
        "slug": "lariat-y-necklace",
        "category": "Necklaces",
        "price": 129.0,
        "image": "/assets/images/products/necklace_PNG92.webp",
        "description": "Modern lariat Y-shaped necklace",
        "inStock": true,
        "rating": 4.4
    },
    {
        "id": 10,
        "name": "Beaded Charm Bracelet",
        "slug": "beaded-charm-bracelet",
        "category": "Bracelets",
        "price": 59.5,
        "image": "/assets/images/products/necklace_PNG133.webp",
        "description": "Playful beaded charm bracelet with mixed beads",
        "inStock": true,
        "rating": 4.0
    },
    {
        "id": 11,
        "name": "Pearl Drop Earrings",
        "slug": "pearl-drop-earrings",
        "category": "Earrings",
        "price": 89.99,
        "image": "/assets/images/products/necklace_PNG29.webp",
        "description": "Elegant pearl drop earrings with silver posts",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 12,
        "name": "Diamond Tennis Bracelet",
        "slug": "diamond-tennis-bracelet",
        "category": "Bracelets",
        "price": 1299.99,
        "image": "/assets/images/products/necklace_PNG11.webp",
        "description": "Classic diamond tennis bracelet with secure clasp",
        "inStock": false,
        "rating": 4.9
    },
    {
        "id": 13,
        "name": "Vintage Sapphire Ring",
        "slug": "vintage-sapphire-ring",
        "category": "Rings",
        "price": 459.99,
        "image": "/assets/images/products/necklace_PNG4.webp",
        "description": "Vintage-inspired sapphire ring with detailed band",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 14,
        "name": "Statement Choker",
        "slug": "statement-choker",
        "category": "Necklaces",
        "price": 45.99,
        "image": "/assets/images/products/jewelry_PNG6740.webp",
        "description": "Bold statement choker with geometric design",
        "inStock": true,
        "rating": 4.2
    },
    {
        "id": 15,
        "name": "Infinity Bangle",
        "slug": "infinity-bangle",
        "category": "Bracelets",
        "price": 79.99,
        "image": "/assets/images/products/ring_PNG70.webp",
        "description": "Symbolic infinity bangle in rose gold finish",
        "inStock": true,
        "rating": 4.3
    },
    {
        "id": 16,
        "name": "Amethyst Stud Earrings",
        "slug": "amethyst-stud-earrings",
        "category": "Earrings",
        "price": 119.0,
        "image": "/assets/images/products/necklace_PNG138.webp",
        "description": "Deep purple amethyst studs with secure backs",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 17,
        "name": "Layered Chain Necklace",
        "slug": "layered-chain-necklace",
        "category": "Necklaces",
        "price": 59.99,
        "image": "/assets/images/products/necklace_PNG135.webp",
        "description": "Trendy multi-layer chain necklace",
        "inStock": true,
        "rating": 4.1
    },
    {
        "id": 18,
        "name": "Men's Signet Ring",
        "slug": "mens-signet-ring",
        "category": "Rings",
        "price": 249.0,
        "image": "/assets/images/products/ring_PNG84.webp",
        "description": "Classic men's signet ring for engraving",
        "inStock": true,
        "rating": 4.4
    },
    {
        "id": 19,
        "name": "Opal Teardrop Pendant",
        "slug": "opal-teardrop-pendant",
        "category": "Pendants",
        "price": 189.0,
        "image": "/assets/images/products/necklace_PNG133.webp",
        "description": "Iridescent opal teardrop in silver setting",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 20,
        "name": "Rope Chain Bracelet",
        "slug": "rope-chain-bracelet",
        "category": "Bracelets",
        "price": 149.99,
        "image": "/assets/images/products/necklace_PNG29.webp",
        "description": "Durable rope chain bracelet in 14k gold",
        "inStock": true,
        "rating": 4.3
    },
    {
        "id": 21,
        "name": "Citrine Cocktail Ring",
        "slug": "citrine-cocktail-ring",
        "category": "Rings",
        "price": 349.0,
        "image": "/assets/images/products/ring_PNG140.webp",
        "description": "Bold citrine cocktail ring for special occasions",
        "inStock": false,
        "rating": 4.7
    },
    {
        "id": 22,
        "name": "Crystal Drop Earrings",
        "slug": "crystal-drop-earrings",
        "category": "Earrings",
        "price": 85.0,
        "image": "/assets/images/products/necklace_PNG11.webp",
        "description": "Sparkling crystal drop earrings for evenings",
        "inStock": true,
        "rating": 4.2
    },
    {
        "id": 23,
        "name": "Personalizable Name Necklace",
        "slug": "personalizable-name-necklace",
        "category": "Necklaces",
        "price": 79.0,
        "image": "/assets/images/products/necklace_PNG4.webp",
        "description": "Customizable name necklace in script font",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 24,
        "name": "Tungsten Men's Band",
        "slug": "tungsten-mens-band",
        "category": "Rings",
        "price": 159.99,
        "image": "/assets/images/products/ring_PNG70.webp",
        "description": "Durable tungsten band with comfort fit",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 25,
        "name": "Pearl Strand Necklace",
        "slug": "pearl-strand-necklace",
        "category": "Necklaces",
        "price": 239.0,
        "image": "/assets/images/products/necklace_PNG100.webp",
        "description": "Classic pearl strand with sterling clasp",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 26,
        "name": "Ruby Eternity Band",
        "slug": "ruby-eternity-band",
        "category": "Rings",
        "price": 599.0,
        "image": "/assets/images/products/necklace_PNG92.webp",
        "description": "Ruby and diamond eternity band",
        "inStock": false,
        "rating": 4.9
    },
    {
        "id": 27,
        "name": "Leather Wrap Bracelet",
        "slug": "leather-wrap-bracelet",
        "category": "Bracelets",
        "price": 35.0,
        "image": "/assets/images/products/jewelry_PNG6740.webp",
        "description": "Adjustable leather wrap bracelet with metal accents",
        "inStock": true,
        "rating": 4.0
    },
    {
        "id": 28,
        "name": "Turquoise Statement Earrings",
        "slug": "turquoise-statement-earrings",
        "category": "Earrings",
        "price": 65.0,
        "image": "/assets/images/products/necklace_PNG62.webp",
        "description": "Bold turquoise statement earrings",
        "inStock": true,
        "rating": 4.1
    },
    {
        "id": 29,
        "name": "Men's Watch Chain",
        "slug": "mens-watch-chain",
        "category": "Accessories",
        "price": 89.99,
        "image": "/assets/images/products/necklace_PNG138.webp",
        "description": "Vintage-inspired pocket watch chain",
        "inStock": true,
        "rating": 4.3
    },
    {
        "id": 30,
        "name": "Birthstone Pendant",
        "slug": "birthstone-pendant",
        "category": "Pendants",
        "price": 99.0,
        "image": "/assets/images/products/necklace_PNG135.webp",
        "description": "Personalized birthstone pendant necklace",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 31,
        "name": "Moonstone Ring",
        "slug": "moonstone-ring",
        "category": "Rings",
        "price": 129.0,
        "image": "/assets/images/products/ring_PNG84.webp",
        "description": "Ethereal moonstone ring with sterling band",
        "inStock": true,
        "rating": 4.4
    },
    {
        "id": 32,
        "name": "Jade Bangle",
        "slug": "jade-bangle",
        "category": "Bracelets",
        "price": 279.0,
        "image": "/assets/images/products/necklace_PNG133.webp",
        "description": "Traditional solid jade bangle",
        "inStock": false,
        "rating": 4.7
    },
    {
        "id": 33,
        "name": "Platinum Wedding Band",
        "slug": "platinum-wedding-band",
        "category": "Rings",
        "price": 799.0,
        "image": "/assets/images/products/ring_PNG140.webp",
        "description": "Premium platinum wedding band with matte finish",
        "inStock": true,
        "rating": 4.9
    },
    {
        "id": 34,
        "name": "Chandelier Earrings",
        "slug": "chandelier-earrings",
        "category": "Earrings",
        "price": 125.0,
        "image": "/assets/images/products/necklace_PNG29.webp",
        "description": "Elaborate chandelier earrings for formal events",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 35,
        "name": "Silver Chain Anklet",
        "slug": "silver-chain-anklet",
        "category": "Accessories",
        "price": 29.99,
        "image": "/assets/images/products/necklace_PNG11.webp",
        "description": "Delicate silver chain anklet with tiny charm",
        "inStock": true,
        "rating": 4.2
    },
    {
        "id": 36,
        "name": "Onyx Cufflinks",
        "slug": "onyx-cufflinks",
        "category": "Accessories",
        "price": 95.0,
        "image": "/assets/images/products/necklace_PNG4.webp",
        "description": "Sophisticated black onyx cufflinks",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 37,
        "name": "Rose Gold Huggie Earrings",
        "slug": "rose-gold-huggie-earrings",
        "category": "Earrings",
        "price": 49.0,
        "image": "/assets/images/products/jewelry_PNG6740.webp",
        "description": "Snug-fitting rose gold huggie earrings",
        "inStock": true,
        "rating": 4.3
    },
    {
        "id": 38,
        "name": "Aquamarine Pendant",
        "slug": "aquamarine-pendant",
        "category": "Pendants",
        "price": 379.0,
        "image": "/assets/images/products/necklace_PNG100.webp",
        "description": "Ocean blue aquamarine pendant with diamond accent",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 39,
        "name": "Black Pearl Earrings",
        "slug": "black-pearl-earrings",
        "category": "Earrings",
        "price": 259.0,
        "image": "/assets/images/products/necklace_PNG92.webp",
        "description": "Rare Tahitian black pearl stud earrings",
        "inStock": false,
        "rating": 4.8
    },
    {
        "id": 40,
        "name": "Engagement Ring Setting",
        "slug": "engagement-ring-setting",
        "category": "Rings",
        "price": 899.0,
        "image": "/assets/images/products/ring_PNG70.webp",
        "description": "Classic solitaire engagement ring setting",
        "inStock": true,
        "rating": 4.9
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
const DESIRED_IMAGES_COUNT = 4;

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
