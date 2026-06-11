export type Product = {
  id: string;
  name: string;
  price: number;
  category: "women" | "men" | "accessories";
  subcategory: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  image: string;
  images: string[];
  description: string;
  tags: string[];
  rating: number;
  new?: boolean;
};

// Unsplash editorial fashion photos (stable IDs)
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Cream Linen Blazer", price: 189, category: "women", subcategory: "Blazers", sizes: ["XS","S","M","L","XL"], colors: [{name:"Cream",hex:"#f3ead8"},{name:"Blush",hex:"#e7c3b8"}], image: u("1591047139829-d91aecb6caea"), images:[u("1591047139829-d91aecb6caea"),u("1551803091-e20673f15770")], description: "An effortless tailored blazer in fine Italian linen with a relaxed shoulder and softly structured lapel.", tags:["new","bestseller"], rating: 4.8, new: true },
  { id: "p2", name: "Silk Camisole", price: 89, category: "women", subcategory: "Tops", sizes:["XS","S","M","L"], colors:[{name:"Ivory",hex:"#f5efe1"}], image: u("1525507119028-ed4c629a60a3"), images:[u("1525507119028-ed4c629a60a3")], description: "100% mulberry silk camisole with adjustable straps.", tags:["new"], rating: 4.6, new: true },
  { id: "p3", name: "Wide-Leg Trousers", price: 145, category: "women", subcategory: "Bottoms", sizes:["XS","S","M","L","XL"], colors:[{name:"Sand",hex:"#d8c7a3"},{name:"Black",hex:"#1a1a1a"}], image: u("1594633312681-425c7b97ccd1"), images:[u("1594633312681-425c7b97ccd1")], description: "High-waisted wide-leg trousers in fluid crepe.", tags:[], rating: 4.7 },
  { id: "p4", name: "Cashmere Sweater", price: 220, category: "women", subcategory: "Knitwear", sizes:["S","M","L"], colors:[{name:"Camel",hex:"#c39966"},{name:"Cream",hex:"#f0e6d2"}], image: u("1576566588028-4147f3842f27"), images:[u("1576566588028-4147f3842f27")], description: "Pure cashmere crewneck knit, mid-weight for year-round wear.", tags:["bestseller"], rating: 4.9 },
  { id: "p5", name: "Pleated Midi Skirt", price: 115, category: "women", subcategory: "Bottoms", sizes:["XS","S","M","L"], colors:[{name:"Blush",hex:"#e8c8be"}], image: u("1583496661160-fb5886a0aaaa"), images:[u("1583496661160-fb5886a0aaaa")], description: "Fluid pleated midi skirt with concealed elastic waistband.", tags:[], rating: 4.5 },

  { id: "m1", name: "Ribbed Knit Polo", price: 129, category: "men", subcategory: "Knitwear", sizes:["S","M","L","XL"], colors:[{name:"Rose",hex:"#d99fa0"},{name:"Sage",hex:"#a8b89a"}], image: u("1490578474895-699cd4e2cf59"), images:[u("1490578474895-699cd4e2cf59")], description: "Soft cotton-blend ribbed polo with open collar.", tags:["new"], rating: 4.7, new: true },
  { id: "m2", name: "Tailored Chinos", price: 135, category: "men", subcategory: "Bottoms", sizes:["28","30","32","34","36"], colors:[{name:"Cream",hex:"#f0e8d4"},{name:"Olive",hex:"#6e7355"}], image: u("1473966968600-fa801b869a1a"), images:[u("1473966968600-fa801b869a1a")], description: "Tailored slim-straight chinos in compact cotton twill.", tags:[], rating: 4.6 },
  { id: "m3", name: "Linen Shirt", price: 95, category: "men", subcategory: "Shirts", sizes:["S","M","L","XL"], colors:[{name:"White",hex:"#f7f4ee"}], image: u("1602810318383-e386cc2a3ccf"), images:[u("1602810318383-e386cc2a3ccf")], description: "Pure linen shirt with mother-of-pearl buttons.", tags:["bestseller"], rating: 4.8 },
  { id: "m4", name: "Wool Overcoat", price: 389, category: "men", subcategory: "Outerwear", sizes:["S","M","L","XL"], colors:[{name:"Camel",hex:"#b88a5a"}], image: u("1539533018447-63fcce2678e3"), images:[u("1539533018447-63fcce2678e3")], description: "Double-faced wool overcoat in classic camel.", tags:[], rating: 4.9 },

  { id: "a1", name: "Leather Tote", price: 245, category: "accessories", subcategory: "Bags", sizes:["One Size"], colors:[{name:"Cognac",hex:"#8a4b2a"}], image: u("1548036328-c9fa89d128fa"), images:[u("1548036328-c9fa89d128fa")], description: "Hand-finished pebbled leather tote with suede lining.", tags:["bestseller"], rating: 4.8 },
  { id: "a2", name: "Silk Scarf", price: 78, category: "accessories", subcategory: "Scarves", sizes:["One Size"], colors:[{name:"Blush",hex:"#e7bdb1"}], image: u("1601924994987-69e26d50dc26"), images:[u("1601924994987-69e26d50dc26")], description: "Printed twill silk scarf, hand-rolled edges.", tags:[], rating: 4.6 },
  { id: "a3", name: "Round Sunglasses", price: 165, category: "accessories", subcategory: "Eyewear", sizes:["One Size"], colors:[{name:"Tortoise",hex:"#6b3f1e"}], image: u("1572635196237-14b3f281503f"), images:[u("1572635196237-14b3f281503f")], description: "Acetate frame sunglasses with UV400 lenses.", tags:["new"], rating: 4.7, new: true },
];

export const CATEGORIES = [
  { slug: "women", label: "Women" },
  { slug: "men", label: "Men" },
  { slug: "accessories", label: "Accessories" },
] as const;
