import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useShop } from "@/store/shop";
import type { Product } from "@/data/products";
import { toast } from "sonner";

export function ProductCard({ p }: { p: Product }) {
  const { wishlist, toggleWishlist } = useShop();
  const liked = wishlist.includes(p.id);

  return (
    <div className="group">
      <Link to="/product/$id" params={{ id: p.id }} className="block relative overflow-hidden bg-secondary aspect-[3/4]">
        <img src={p.image} alt={p.name} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
        {p.new && <span className="absolute top-3 left-3 bg-background/90 text-foreground text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">New</span>}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(p.id); toast(liked ? "Removed from wishlist" : "Added to wishlist"); }}
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition">
          <Heart size={16} className={liked ? "fill-primary text-primary" : ""}/>
        </button>
      </Link>
      <div className="pt-4 px-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to="/product/$id" params={{ id: p.id }} className="text-sm font-medium hover:text-primary transition">{p.name}</Link>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{p.subcategory}</p>
          </div>
          <p className="text-sm">${p.price}</p>
        </div>
        <div className="flex gap-1.5 mt-2">
          {p.colors.map((c) => (
            <span key={c.name} title={c.name} className="w-3 h-3 rounded-full border border-border" style={{ background: c.hex }}/>
          ))}
        </div>
      </div>
    </div>
  );
}
