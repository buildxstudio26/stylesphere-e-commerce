import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { Truck, RotateCcw, Gift, Headphones } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMIÈRE — Effortless Elegance" },
      { name: "description", content: "Timeless clothing crafted for the modern lifestyle." },
    ],
  }),
  component: Home,
});

const BENEFITS = [
  { icon: Truck, t: "Free Shipping", s: "On all orders over $150" },
  { icon: RotateCcw, t: "Easy Returns", s: "14-day return policy" },
  { icon: Gift, t: "Exclusive Benefits", s: "For members only" },
  { icon: Headphones, t: "Customer Support", s: "We're here to help" },
];

function Home() {
  const featured = PRODUCTS.slice(0, 8);
  return (
    <div>
      <HeroCarousel />

      <section className="bg-secondary/60 border-y border-border">
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {BENEFITS.map((b) => (
            <div key={b.t} className="flex items-center justify-center gap-4 py-6 px-4">
              <b.icon className="text-clay" size={28} strokeWidth={1.2}/>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase">{b.t}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{b.s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-clay">Shop By Category</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Curated For You</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { c: "women", t: "Women", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80" },
            { c: "men", t: "Men", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80" },
            { c: "accessories", t: "Accessories", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=900&q=80" },
          ].map((cat) => (
            <Link key={cat.c} to="/shop" search={{ category: cat.c as any, sort: "newest" }} className="relative aspect-[3/4] overflow-hidden group">
              <img src={cat.img} alt={cat.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent"/>
              <div className="absolute bottom-8 left-8 text-background">
                <p className="text-xs tracking-[0.3em] uppercase">Shop</p>
                <h3 className="font-display text-4xl mt-1">{cat.t}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto px-6 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-clay">This Season</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">New Arrivals</h2>
          </div>
          <Link to="/shop" search={{}} className="text-xs tracking-[0.25em] uppercase border-b border-foreground pb-1 hover:text-primary hover:border-primary transition">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {featured.map((p) => <ProductCard key={p.id} p={p}/>)}
        </div>
      </section>

      <section className="bg-accent/40 py-20 px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-clay">Stay In Touch</p>
        <h2 className="font-display text-4xl md:text-5xl mt-3 max-w-2xl mx-auto">Receive 10% off your first order</h2>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">Sign up to be the first to hear about new arrivals, exclusive offers and styling stories.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 max-w-md mx-auto flex border border-foreground/30">
          <input type="email" placeholder="Email address" className="flex-1 bg-transparent px-4 py-3 outline-none text-sm"/>
          <button className="bg-foreground text-background px-6 text-xs tracking-[0.25em] uppercase hover:bg-clay transition">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
