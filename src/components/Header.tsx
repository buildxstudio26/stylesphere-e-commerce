import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Heart, Package } from "lucide-react";
import { useShop } from "@/store/shop";

export function Header() {
  const cartCount = useShop((s) => s.cart.reduce((a, b) => a + b.qty, 0));
  const wishCount = useShop((s) => s.wishlist.length);

  return (
    <>
      <div className="bg-accent text-accent-foreground text-xs tracking-widest text-center py-2 px-4">
        SPRING / SUMMER COLLECTION IS LIVE  —  <Link to="/shop" className="underline underline-offset-4">EXPLORE NOW</Link>
      </div>
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
        <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <nav className="hidden md:flex items-center gap-7 text-xs tracking-[0.18em] uppercase">
            <Link to="/shop" search={{ category: undefined, sort: "newest" }} className="hover:text-primary transition">New In</Link>
            <Link to="/shop" search={{ category: "women", sort: "newest" }} className="hover:text-primary transition">Women</Link>
            <Link to="/shop" search={{ category: "men", sort: "newest" }} className="hover:text-primary transition">Men</Link>
            <Link to="/shop" search={{ category: "accessories", sort: "newest" }} className="hover:text-primary transition">Accessories</Link>
          </nav>
          <Link to="/" className="font-display text-2xl md:text-3xl tracking-[0.3em] text-clay">LUMIÈRE</Link>
          <div className="flex items-center gap-5 text-xs tracking-widest">
            <button aria-label="Search" className="hidden sm:flex items-center gap-1.5 hover:text-primary"><Search size={16}/></button>
            <Link to="/orders" aria-label="Orders" className="flex items-center gap-1.5 hover:text-primary"><Package size={16}/></Link>
            <Link to="/wishlist" aria-label="Wishlist" className="flex items-center gap-1.5 hover:text-primary relative">
              <Heart size={16}/>
              {wishCount > 0 && <span className="absolute -top-2 -right-3 text-[10px] bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">{wishCount}</span>}
            </Link>
            <Link to="/cart" aria-label="Bag" className="flex items-center gap-1.5 hover:text-primary">
              <ShoppingBag size={16}/> <span className="hidden sm:inline">BAG ({cartCount})</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
