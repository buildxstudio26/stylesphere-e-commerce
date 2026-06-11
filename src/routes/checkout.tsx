import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useShop } from "@/store/shop";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — LUMIÈRE" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, placeOrder } = useShop();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", country: "United States" });

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <Link to="/shop" search={{}} className="inline-block mt-6 bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.25em] uppercase">Shop now</Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) { toast.error("Please complete shipping details"); return; }
    const addr = `${form.name}, ${form.address}, ${form.city} ${form.zip}, ${form.country}`;
    const order = placeOrder(addr);
    if (order) {
      toast.success(`Order ${order.id} placed!`);
      navigate({ to: "/orders/$id", params: { id: order.id } });
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12">
      <h1 className="font-display text-5xl mb-10">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-12">
        <div className="space-y-8">
          <section>
            <h2 className="text-xs uppercase tracking-[0.25em] mb-5">Shipping Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["name","Full Name","text",true],
                ["email","Email","email",true],
                ["address","Street Address","text",false],
                ["city","City","text",true],
                ["zip","ZIP","text",true],
                ["country","Country","text",true],
              ].map(([k,l,t,half]) => (
                <input key={k as string} required type={t as string} placeholder={l as string}
                  value={(form as any)[k as string]} onChange={(e) => setForm({...form, [k as string]: e.target.value})}
                  className={`border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary ${half ? "" : "sm:col-span-2"}`}/>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-[0.25em] mb-5">Payment</h2>
            <p className="text-xs text-muted-foreground mb-3">Demo checkout — no payment will be charged.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Card number" className="border border-border bg-transparent px-4 py-3 text-sm sm:col-span-2 outline-none focus:border-primary"/>
              <input placeholder="MM / YY" className="border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"/>
              <input placeholder="CVC" className="border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"/>
            </div>
          </section>
        </div>

        <aside className="bg-secondary/50 p-8 h-fit space-y-4">
          <h2 className="text-xs uppercase tracking-[0.25em]">Order Summary</h2>
          <div className="space-y-3 max-h-60 overflow-auto">
            {cart.map((i) => (
              <div key={i.id} className="flex gap-3 text-sm">
                <img src={i.image} className="w-12 h-16 object-cover bg-background" alt={i.name}/>
                <div className="flex-1">
                  <p className="text-xs">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.size} · {i.color} · ×{i.qty}</p>
                </div>
                <p className="text-xs">${(i.price * i.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between font-medium pt-2 border-t border-border"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.25em] uppercase hover:bg-clay transition">Place Order</button>
        </aside>
      </form>
    </div>
  );
}
