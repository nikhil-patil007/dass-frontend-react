const products = [
    {
        "id": 1,
        "name": "Garnet Pendant",
        "category": "Necklaces",
        "price": 479.99,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG135.png",
        "description": "Deep red garnet pendant on delicate chain",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 2,
        "name": "Classic Solitaire Ring",
        "category": "Rings",
        "price": 299.99,
        "image": "https://pngimg.com/uploads/ring/ring_PNG70.png",
        "description": "Timeless solitaire ring with a brilliant cut stone",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 3,
        "name": "Gold Twist Bracelet",
        "category": "Bracelets",
        "price": 199.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG62.png",
        "description": "Delicate gold-twist chain bracelet",
        "inStock": true,
        "rating": 4.1
    },
    {
        "id": 4,
        "name": "Emerald Halo Pendant",
        "category": "Pendants",
        "price": 549.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG138.png",
        "description": "Emerald center with halo setting pendant",
        "inStock": false,
        "rating": 4.8
    },
    {
        "id": 5,
        "name": "Minimal Bar Necklace",
        "category": "Necklaces",
        "price": 69.99,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG100.png",
        "description": "Minimal bar necklace — everyday wearable",
        "inStock": true,
        "rating": 4.0
    },
    {
        "id": 6,
        "name": "Cubic Zirconia Hoop",
        "category": "Earrings",
        "price": 39.99,
        "image": "https://pngimg.com/uploads/jewelry/jewelry_PNG6740.png",
        "description": "Shiny CZ hoops with comfortable latch-back",
        "inStock": true,
        "rating": 3.9
    },
    {
        "id": 7,
        "name": "Twin Band Wedding Set",
        "category": "Rings",
        "price": 399.0,
        "image": "https://pngimg.com/uploads/ring/ring_PNG84.png",
        "description": "Matching his & hers twin-band wedding rings",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 8,
        "name": "Stackable Midi Ring",
        "category": "Rings",
        "price": 19.99,
        "image": "https://pngimg.com/uploads/ring/ring_PNG140.png",
        "description": "Thin stackable midi ring — mix and match",
        "inStock": true,
        "rating": 3.8
    },
    {
        "id": 9,
        "name": "Lariat Y Necklace",
        "category": "Necklaces",
        "price": 129.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG92.png",
        "description": "Modern lariat Y-shaped necklace",
        "inStock": true,
        "rating": 4.4
    },
    {
        "id": 10,
        "name": "Beaded Charm Bracelet",
        "category": "Bracelets",
        "price": 59.5,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG133.png",
        "description": "Playful beaded charm bracelet with mixed beads",
        "inStock": true,
        "rating": 4.0
    },
    {
        "id": 11,
        "name": "Pearl Drop Earrings",
        "category": "Earrings",
        "price": 89.99,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG29.png",
        "description": "Elegant pearl drop earrings with silver posts",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 12,
        "name": "Diamond Tennis Bracelet",
        "category": "Bracelets",
        "price": 1299.99,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG11.png",
        "description": "Classic diamond tennis bracelet with secure clasp",
        "inStock": false,
        "rating": 4.9
    },
    {
        "id": 13,
        "name": "Vintage Sapphire Ring",
        "category": "Rings",
        "price": 459.99,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG4.png",
        "description": "Vintage-inspired sapphire ring with detailed band",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 14,
        "name": "Statement Choker",
        "category": "Necklaces",
        "price": 45.99,
        "image": "https://pngimg.com/uploads/jewelry/jewelry_PNG6740.png",
        "description": "Bold statement choker with geometric design",
        "inStock": true,
        "rating": 4.2
    },
    {
        "id": 15,
        "name": "Infinity Bangle",
        "category": "Bracelets",
        "price": 79.99,
        "image": "https://pngimg.com/uploads/ring/ring_PNG70.png",
        "description": "Symbolic infinity bangle in rose gold finish",
        "inStock": true,
        "rating": 4.3
    },
    {
        "id": 16,
        "name": "Amethyst Stud Earrings",
        "category": "Earrings",
        "price": 119.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG138.png",
        "description": "Deep purple amethyst studs with secure backs",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 17,
        "name": "Layered Chain Necklace",
        "category": "Necklaces",
        "price": 59.99,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG135.png",
        "description": "Trendy multi-layer chain necklace",
        "inStock": true,
        "rating": 4.1
    },
    {
        "id": 18,
        "name": "Men's Signet Ring",
        "category": "Rings",
        "price": 249.0,
        "image": "https://pngimg.com/uploads/ring/ring_PNG84.png",
        "description": "Classic men's signet ring for engraving",
        "inStock": true,
        "rating": 4.4
    },
    {
        "id": 19,
        "name": "Opal Teardrop Pendant",
        "category": "Pendants",
        "price": 189.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG133.png",
        "description": "Iridescent opal teardrop in silver setting",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 20,
        "name": "Rope Chain Bracelet",
        "category": "Bracelets",
        "price": 149.99,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG29.png",
        "description": "Durable rope chain bracelet in 14k gold",
        "inStock": true,
        "rating": 4.3
    },
    {
        "id": 21,
        "name": "Citrine Cocktail Ring",
        "category": "Rings",
        "price": 349.0,
        "image": "https://pngimg.com/uploads/ring/ring_PNG140.png",
        "description": "Bold citrine cocktail ring for special occasions",
        "inStock": false,
        "rating": 4.7
    },
    {
        "id": 22,
        "name": "Crystal Drop Earrings",
        "category": "Earrings",
        "price": 85.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG11.png",
        "description": "Sparkling crystal drop earrings for evenings",
        "inStock": true,
        "rating": 4.2
    },
    {
        "id": 23,
        "name": "Personalizable Name Necklace",
        "category": "Necklaces",
        "price": 79.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG4.png",
        "description": "Customizable name necklace in script font",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 24,
        "name": "Tungsten Men's Band",
        "category": "Rings",
        "price": 159.99,
        "image": "https://pngimg.com/uploads/ring/ring_PNG70.png",
        "description": "Durable tungsten band with comfort fit",
        "inStock": true,
        "rating": 4.8
    },
    {
        "id": 25,
        "name": "Pearl Strand Necklace",
        "category": "Necklaces",
        "price": 239.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG100.png",
        "description": "Classic pearl strand with sterling clasp",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 26,
        "name": "Ruby Eternity Band",
        "category": "Rings",
        "price": 599.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG92.png",
        "description": "Ruby and diamond eternity band",
        "inStock": false,
        "rating": 4.9
    },
    {
        "id": 27,
        "name": "Leather Wrap Bracelet",
        "category": "Bracelets",
        "price": 35.0,
        "image": "https://pngimg.com/uploads/jewelry/jewelry_PNG6740.png",
        "description": "Adjustable leather wrap bracelet with metal accents",
        "inStock": true,
        "rating": 4.0
    },
    {
        "id": 28,
        "name": "Turquoise Statement Earrings",
        "category": "Earrings",
        "price": 65.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG62.png",
        "description": "Bold turquoise statement earrings",
        "inStock": true,
        "rating": 4.1
    },
    {
        "id": 29,
        "name": "Men's Watch Chain",
        "category": "Accessories",
        "price": 89.99,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG138.png",
        "description": "Vintage-inspired pocket watch chain",
        "inStock": true,
        "rating": 4.3
    },
    {
        "id": 30,
        "name": "Birthstone Pendant",
        "category": "Pendants",
        "price": 99.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG135.png",
        "description": "Personalized birthstone pendant necklace",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 31,
        "name": "Moonstone Ring",
        "category": "Rings",
        "price": 129.0,
        "image": "https://pngimg.com/uploads/ring/ring_PNG84.png",
        "description": "Ethereal moonstone ring with sterling band",
        "inStock": true,
        "rating": 4.4
    },
    {
        "id": 32,
        "name": "Jade Bangle",
        "category": "Bracelets",
        "price": 279.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG133.png",
        "description": "Traditional solid jade bangle",
        "inStock": false,
        "rating": 4.7
    },
    {
        "id": 33,
        "name": "Platinum Wedding Band",
        "category": "Rings",
        "price": 799.0,
        "image": "https://pngimg.com/uploads/ring/ring_PNG140.png",
        "description": "Premium platinum wedding band with matte finish",
        "inStock": true,
        "rating": 4.9
    },
    {
        "id": 34,
        "name": "Chandelier Earrings",
        "category": "Earrings",
        "price": 125.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG29.png",
        "description": "Elaborate chandelier earrings for formal events",
        "inStock": true,
        "rating": 4.6
    },
    {
        "id": 35,
        "name": "Silver Chain Anklet",
        "category": "Accessories",
        "price": 29.99,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG11.png",
        "description": "Delicate silver chain anklet with tiny charm",
        "inStock": true,
        "rating": 4.2
    },
    {
        "id": 36,
        "name": "Onyx Cufflinks",
        "category": "Accessories",
        "price": 95.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG4.png",
        "description": "Sophisticated black onyx cufflinks",
        "inStock": true,
        "rating": 4.5
    },
    {
        "id": 37,
        "name": "Rose Gold Huggie Earrings",
        "category": "Earrings",
        "price": 49.0,
        "image": "https://pngimg.com/uploads/jewelry/jewelry_PNG6740.png",
        "description": "Snug-fitting rose gold huggie earrings",
        "inStock": true,
        "rating": 4.3
    },
    {
        "id": 38,
        "name": "Aquamarine Pendant",
        "category": "Pendants",
        "price": 379.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG100.png",
        "description": "Ocean blue aquamarine pendant with diamond accent",
        "inStock": true,
        "rating": 4.7
    },
    {
        "id": 39,
        "name": "Black Pearl Earrings",
        "category": "Earrings",
        "price": 259.0,
        "image": "https://pngimg.com/uploads/necklace/necklace_PNG92.png",
        "description": "Rare Tahitian black pearl stud earrings",
        "inStock": false,
        "rating": 4.8
    },
    {
        "id": 40,
        "name": "Engagement Ring Setting",
        "category": "Rings",
        "price": 899.0,
        "image": "https://pngimg.com/uploads/ring/ring_PNG70.png",
        "description": "Classic solitaire engagement ring setting",
        "inStock": true,
        "rating": 4.9
    }
]

export default products;