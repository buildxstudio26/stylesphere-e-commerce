import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useShop, ORDER_FLOW } from "@/store/shop";
import { Check, Truck, Package, Home, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/orders/$id")({
  head: () => ({ meta: [{ title: "Order Tracking — LUMIÈRE" }] }),
  component: OrderDetail,
  notFoundComponent: () => <div className="py-24 text-center">Order not found.</div>,
});

const ICONS = [ShoppingBag, Package, Truck, Truck, Home];

function OrderDetail() {
  const { id } = Route.useParams();
  const { orders, advanceOrder } = useShop();
  const order = orders.find((o) => o.id === id);
  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/orders" className="inline-block mt-6 underline">View all orders</Link>
      </div>
    );
  }
  const currentIdx = ORDER_FLOW.indexOf(order.status);

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <Link to="/orders" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground">← All Orders</Link>
      <div className="mt-6 flex flex-wrap justify-between items-end gap-4 pb-8 border-b border-border">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-clay">Order Tracking</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2">{order.id}</h1>
          <p className="text-sm text-muted-foreground mt-2">Placed on {new Date(order.placedAt).toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" })}</p>
        </div>
        <span className="bg-accent text-accent-foreground text-xs tracking-widest uppercase px-4 py-2">{order.status}</span>
      </div>

      {/* Tracker */}
      <div className="my-12">
        <div className="relative">
          <div className="absolute top-6 left-0 right-0 h-px bg-border"/>
          <div className="absolute top-6 left-0 h-px bg-primary transition-all duration-700" style={{ width: `${(currentIdx/(ORDER_FLOW.length-1))*100}%` }}/>
          <div className="relative grid grid-cols-5 gap-2">
            {ORDER_FLOW.map((step, i) => {
              const Icon = ICONS[i];
              const done = i <= currentIdx;
              return (
                <div key={step} className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition ${done ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground"}`}>
                    {done && i < currentIdx ? <Check size={18}/> : <Icon size={18}/>}
                  </div>
                  <p className={`mt-3 text-xs tracking-widest uppercase ${done ? "text-foreground" : "text-muted-foreground"}`}>{step}</p>
                </div>
              );
            })}
          </div>
        </div>

        {currentIdx < ORDER_FLOW.length - 1 && (
          <div className="text-center mt-10">
            <button onClick={() => advanceOrder(order.id)} className="text-xs tracking-[0.25em] uppercase underline underline-offset-4 hover:text-primary">
              Simulate next update →
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        <div>
          <h2 className="text-xs uppercase tracking-[0.25em] mb-5">Items</h2>
          <div className="space-y-4">
            {order.items.map((i) => (
              <div key={i.id} className="flex gap-4 border-b border-border pb-4">
                <img src={i.image} alt={i.name} className="w-20 h-24 object-cover bg-secondary"/>
                <div className="flex-1">
                  <p className="font-medium">{i.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Size {i.size} · {i.color} · ×{i.qty}</p>
                </div>
                <p className="text-sm">${(i.price * i.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-8">
          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] mb-3">Shipping Address</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{order.address}</p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] mb-3">Activity</h2>
            <ul className="space-y-3">
              {order.tracking.slice().reverse().map((t, i) => (
                <li key={i} className="text-sm">
                  <p className="font-medium">{t.status}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.at).toLocaleString(undefined,{dateStyle:"medium",timeStyle:"short"})}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-medium">
            <span>Total</span><span>${order.total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
