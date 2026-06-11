export function Footer() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="max-w-[1500px] mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl tracking-[0.25em] text-clay">LUMIÈRE</h3>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">Timeless pieces crafted for the modern lifestyle. Made slowly, worn forever.</p>
        </div>
        {[
          { t: "Shop", l: ["Women","Men","Accessories","New In","Sale"] },
          { t: "Help", l: ["Shipping","Returns","Size Guide","Contact","FAQ"] },
          { t: "Company", l: ["About","Sustainability","Stores","Press","Careers"] },
        ].map((c) => (
          <div key={c.t}>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-4">{c.t}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.l.map((i) => <li key={i} className="hover:text-foreground cursor-pointer transition">{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs tracking-widest text-muted-foreground">© {new Date().getFullYear()} LUMIÈRE — ALL RIGHTS RESERVED</div>
    </footer>
  );
}
