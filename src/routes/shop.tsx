import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

type Search = {
  category?: "women" | "men" | "accessories";
  size?: string;
  color?: string;
  sort?: "newest" | "price-asc" | "price-desc";
  max?: number;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: (["women","men","accessories"].includes(s.category as string) ? s.category : undefined) as Search["category"],
    size: typeof s.size === "string" ? s.size : undefined,
    color: typeof s.color === "string" ? s.color : undefined,
    sort: (["newest","price-asc","price-desc"].includes(s.sort as string) ? s.sort : "newest") as Search["sort"],
    max: typeof s.max === "number" ? s.max : undefined,
  }),
  head: () => ({ meta: [{ title: "Shop — LUMIÈRE" }] }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [openFilter, setOpenFilter] = useState(false);

  const update = (patch: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const filtered = useMemo(() => {
    let out = [...PRODUCTS];
    if (search.category) out = out.filter((p) => p.category === search.category);
    if (search.size) out = out.filter((p) => p.sizes.includes(search.size!));
    if (search.color) out = out.filter((p) => p.colors.some((c) => c.name === search.color));
    if (search.max) out = out.filter((p) => p.price <= search.max!);
    if (search.sort === "price-asc") out.sort((a,b) => a.price - b.price);
    if (search.sort === "price-desc") out.sort((a,b) => b.price - a.price);
    if (search.sort === "newest") out.sort((a,b) => (b.new?1:0) - (a.new?1:0));
    return out;
  }, [search]);

  const allSizes = Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes)));
  const allColors = Array.from(new Map(PRODUCTS.flatMap((p) => p.colors).map((c) => [c.name, c])).values());

  const title = search.category ? search.category.charAt(0).toUpperCase() + search.category.slice(1) : "All Collections";

  const FilterPanel = (
    <aside className="space-y-8 text-sm">
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Category</h4>
        <div className="space-y-2">
          <button onClick={() => update({ category: undefined })} className={`block w-full text-left ${!search.category ? "text-primary font-medium" : "hover:text-primary"}`}>All</button>
          {["women","men","accessories"].map((c) => (
            <button key={c} onClick={() => update({ category: c as any })} className={`block w-full text-left capitalize ${search.category===c ? "text-primary font-medium" : "hover:text-primary"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Size</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button key={s} onClick={() => update({ size: search.size===s ? undefined : s })}
              className={`px-3 py-1.5 border text-xs ${search.size===s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Color</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button key={c.name} title={c.name} onClick={() => update({ color: search.color===c.name ? undefined : c.name })}
              className={`w-7 h-7 rounded-full border-2 ${search.color===c.name ? "border-primary" : "border-border"}`}
              style={{ background: c.hex }}/>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Max Price: ${search.max ?? 500}</h4>
        <input type="range" min={50} max={500} step={10} value={search.max ?? 500}
          onChange={(e) => update({ max: Number(e.target.value) })} className="w-full accent-[color:var(--primary)]"/>
      </div>
      <button onClick={() => navigate({ search: { sort: "newest" } })} className="text-xs tracking-[0.2em] uppercase underline underline-offset-4 hover:text-primary">Clear all</button>
    </aside>
  );

  return (
    <div className="max-w-[1500px] mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-clay">Collection</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3">{title}</h1>
      </div>

      <div className="flex items-center justify-between mb-6 border-y border-border py-4">
        <button onClick={() => setOpenFilter(true)} className="lg:hidden flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
          <SlidersHorizontal size={16}/> Filters
        </button>
        <p className="text-xs text-muted-foreground tracking-widest">{filtered.length} ITEMS</p>
        <select value={search.sort} onChange={(e) => update({ sort: e.target.value as any })}
          className="bg-transparent text-xs tracking-[0.2em] uppercase outline-none cursor-pointer">
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        <div className="hidden lg:block">{FilterPanel}</div>
        <div>
          {filtered.length === 0 ? (
            <p className="text-center py-24 text-muted-foreground">No items match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
              {filtered.map((p) => <ProductCard key={p.id} p={p}/>)}
            </div>
          )}
        </div>
      </div>

      {openFilter && (
        <div className="fixed inset-0 z-50 bg-foreground/40 lg:hidden" onClick={() => setOpenFilter(false)}>
          <div className="absolute right-0 top-0 h-full w-80 bg-background p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs uppercase tracking-[0.25em]">Filters</h3>
              <button onClick={() => setOpenFilter(false)}><X size={20}/></button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}
    </div>
  );
}
