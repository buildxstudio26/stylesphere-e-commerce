import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useShop } from "@/store/shop";
import { Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Bag — LUMIÈRE" }] }),
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty } = useShop();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-muted-foreground" strokeWidth={1}/>
        <h1 className="font-display text-4xl mt-4">Your bag is empty</h1>
        <p className="text-muted-foreground mt-3">Discover our latest pieces.</p>
        <Link to="/shop" search={{}} className="inline-block mt-8 bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.25em] uppercase">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12">
      <h1 className="font-display text-5xl mb-10">Shopping Bag</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-5 pb-6 border-b border-border">
              <Link to="/product/$id" params={{ id: item.productId }} className="shrink-0">
                <img src={item.image} alt={item.name} className="w-28 h-36 object-cover bg-secondary"/>
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <Link to="/product/$id" params={{ id: item.productId }} className="font-medium hover:text-primary">{item.name}</Link>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Size {item.size} · {item.color}</p>
                  </div>
                  <p className="text-sm">${(item.price * item.qty).toFixed(2)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1.5">−</button>
                    <span className="px-3 text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1.5">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Trash2 size={14}/> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-secondary/50 p-8 h-fit space-y-4">
          <h2 className="text-xs uppercase tracking-[0.25em] mb-2">Order Summary</h2>
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
          <div className="border-t border-border pt-4 flex justify-between font-medium"><span>Total</span><span>${(subtotal + shipping).toFixed(2)}</span></div>
          <button onClick={() => navigate({ to: "/checkout" })} className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.25em] uppercase hover:bg-clay transition mt-4">Checkout</button>
          <Link to="/shop" search={{}} className="block text-center text-xs uppercase tracking-[0.2em] underline underline-offset-4 mt-2">Continue Shopping</Link>
        </aside>
      </div>
    </div>
  );
}
