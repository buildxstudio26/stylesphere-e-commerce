import { createFileRoute, Link } from "@tanstack/react-router";
import { useShop } from "@/store/shop";
import { Package } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — LUMIÈRE" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const orders = useShop((s) => s.orders);
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-clay">Your Account</p>
        <h1 className="font-display text-5xl mt-3">Orders</h1>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-24">
          <Package size={40} className="mx-auto text-muted-foreground" strokeWidth={1}/>
          <p className="mt-4 text-muted-foreground">You haven't placed any orders yet.</p>
          <Link to="/shop" search={{}} className="inline-block mt-6 bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.25em] uppercase">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <Link key={o.id} to="/orders/$id" params={{ id: o.id }} className="block border border-border p-6 hover:border-foreground transition">
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground">Order</p>
                  <p className="font-medium">{o.id}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(o.placedAt).toLocaleDateString(undefined,{dateStyle:"medium"})} · {o.items.length} items</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-accent text-accent-foreground text-xs tracking-widest uppercase px-3 py-1.5">{o.status}</span>
                  <p className="text-sm mt-2">${o.total.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
