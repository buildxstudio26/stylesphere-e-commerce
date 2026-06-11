import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import { useShop } from "@/store/shop";
import { Heart, ShoppingBag, Truck, RotateCcw, Shield, Star } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }): Product => {
    const p = PRODUCTS.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} — LUMIÈRE` },
      { name: "description", content: loaderData?.description ?? "" },
    ],
  }),
  notFoundComponent: () => <div className="py-24 text-center">Product not found.</div>,
  errorComponent: () => <div className="py-24 text-center">Couldn't load product.</div>,
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData() as Product;
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState(p.colors[0].name);
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const liked = wishlist.includes(p.id);

  const handleAdd = () => {
    if (!size && p.sizes[0] !== "One Size") { toast.error("Please select a size"); return; }
    addToCart({ productId: p.id, name: p.name, price: p.price, size: size || p.sizes[0], color, image: p.image, qty });
    toast.success(`${p.name} added to bag`);
  };

  return (
    <div className="max-w-[1500px] mx-auto px-6 py-10">
      <nav className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/shop" search={{ category: p.category }} className="hover:text-foreground">{p.category}</Link> / <span className="text-foreground">{p.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="grid grid-cols-1 gap-3">
          {(p.images.length ? p.images : [p.image]).map((src, i) => (
            <img key={i} src={src} alt={`${p.name} ${i+1}`} loading={i===0?"eager":"lazy"} className="w-full aspect-[3/4] object-cover bg-secondary"/>
          ))}
        </div>

        <div className="md:sticky md:top-28 self-start">
          {p.new && <p className="text-xs tracking-[0.3em] uppercase text-clay mb-2">New Arrival</p>}
          <h1 className="font-display text-4xl md:text-5xl">{p.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex gap-0.5">
              {Array.from({length:5}).map((_,i) => <Star key={i} size={14} className={i < Math.round(p.rating) ? "fill-primary text-primary" : "text-muted-foreground"}/>)}
            </div>
            <span className="text-xs text-muted-foreground">{p.rating} • 124 reviews</span>
          </div>
          <p className="text-2xl mt-5">${p.price}</p>
          <p className="text-sm text-muted-foreground mt-2">Tax included. Free shipping over $150.</p>

          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

          <div className="mt-8">
            <p className="text-xs tracking-[0.2em] uppercase mb-3">Color: <span className="text-muted-foreground">{color}</span></p>
            <div className="flex gap-2">
              {p.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c.name)} title={c.name}
                  className={`w-10 h-10 rounded-full border-2 ${color===c.name?"border-primary":"border-border"}`} style={{ background: c.hex }}/>
              ))}
            </div>
          </div>

          {p.sizes[0] !== "One Size" && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-[0.2em] uppercase">Size</p>
                <button className="text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {p.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`py-3 text-sm border ${size===s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty-1))} className="px-4 py-3">−</button>
              <span className="px-4 text-sm">{qty}</span>
              <button onClick={() => setQty(qty+1)} className="px-4 py-3">+</button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={handleAdd} className="flex-1 bg-primary text-primary-foreground py-4 text-xs tracking-[0.25em] uppercase hover:bg-clay transition flex items-center justify-center gap-2">
              <ShoppingBag size={16}/> Add to Bag
            </button>
            <button onClick={() => { toggleWishlist(p.id); toast(liked ? "Removed from wishlist" : "Added to wishlist"); }}
              className="w-14 border border-border flex items-center justify-center hover:border-foreground transition">
              <Heart size={18} className={liked ? "fill-primary text-primary" : ""}/>
            </button>
          </div>

          <div className="mt-10 border-t border-border pt-6 space-y-3 text-sm">
            <div className="flex items-center gap-3"><Truck size={16} className="text-clay"/> Free shipping on orders over $150</div>
            <div className="flex items-center gap-3"><RotateCcw size={16} className="text-clay"/> 14-day free returns</div>
            <div className="flex items-center gap-3"><Shield size={16} className="text-clay"/> Authenticity guaranteed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
