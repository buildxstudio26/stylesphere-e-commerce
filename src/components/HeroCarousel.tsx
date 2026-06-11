import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const SLIDES = [
  { img: hero1, eyebrow: "New Collection", title: "Effortless Elegance", sub: "Timeless pieces crafted for the modern lifestyle.", cta: "Explore Collection", to: "/shop", search: { category: "women" } },
  { img: hero2, eyebrow: "Men's Edit", title: "Quiet Luxury", sub: "Refined knitwear and tailoring for the season.", cta: "Shop Men", to: "/shop", search: { category: "men" } },
  { img: hero3, eyebrow: "Accessories", title: "Crafted Details", sub: "Leather goods finished by hand.", cta: "Shop Accessories", to: "/shop", search: { category: "accessories" } },
  { img: hero4, eyebrow: "Summer '24", title: "Sun-Soaked Hues", sub: "Earth tones and breathable fabrics.", cta: "Discover", to: "/shop", search: {} },
  { img: hero5, eyebrow: "Winter Preview", title: "Warm Minimalism", sub: "Camel coats and cashmere knits.", cta: "View Lookbook", to: "/shop", search: {} },
] as const;

export function HeroCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);
  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSel = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSel);
    onSel();
    const id = setInterval(() => embla.scrollNext(), 6000);
    return () => { clearInterval(id); embla.off("select", onSel); };
  }, [embla]);

  return (
    <section className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-[78vh] min-h-[560px] overflow-hidden">
              <img src={s.img} alt={s.title} className={`absolute inset-0 w-full h-full object-cover ${selected===i ? "animate-hero-zoom" : ""}`} loading={i===0?"eager":"lazy"} />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/10 to-transparent"/>
              <div className="relative h-full max-w-[1500px] mx-auto px-8 md:px-16 flex items-center">
                {selected === i && (
                  <div className="max-w-xl text-foreground animate-fade-up">
                    <p className="text-xs tracking-[0.3em] uppercase mb-5 text-clay">{s.eyebrow}</p>
                    <h1 className="font-display text-6xl md:text-7xl leading-[0.95] text-clay">{s.title}</h1>
                    <div className="w-16 h-px bg-clay my-6"/>
                    <p className="text-base md:text-lg text-muted-foreground max-w-sm">{s.sub}</p>
                    <Link to={s.to} search={s.search as any} className="inline-block mt-8 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-clay transition-colors">{s.cta}</Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={prev} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 backdrop-blur flex items-center justify-center hover:bg-background transition shadow"><ChevronLeft size={20}/></button>
      <button onClick={next} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 backdrop-blur flex items-center justify-center hover:bg-background transition shadow"><ChevronRight size={20}/></button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => scrollTo(i)} aria-label={`Slide ${i+1}`}
            className={`h-1.5 rounded-full transition-all ${selected===i ? "w-8 bg-clay" : "w-1.5 bg-clay/40"}`}/>
        ))}
      </div>
    </section>
  );
}
