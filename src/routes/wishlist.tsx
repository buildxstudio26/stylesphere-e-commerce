import { createFileRoute, Link } from "@tanstack/react-router";
import { useShop } from "@/store/shop";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — LUMIÈRE" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const wishlist = useShop((s) => s.wishlist);
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  return (
    <div className="max-w-[1500px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-clay">Saved For Later</p>
        <h1 className="font-display text-5xl mt-3">Wishlist</h1>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-24">
          <Heart size={40} className="mx-auto text-muted-foreground" strokeWidth={1}/>
          <p className="mt-4 text-muted-foreground">Your wishlist is empty.</p>
          <Link to="/shop" search={{}} className="inline-block mt-6 bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.25em] uppercase">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {items.map((p) => <ProductCard key={p.id} p={p}/>)}
        </div>
      )}
    </div>
  );
}
