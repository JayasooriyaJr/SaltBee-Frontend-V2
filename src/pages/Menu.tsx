import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoneycombPattern from "@/components/HoneycombPattern";

const Menu = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 text-center overflow-hidden bg-secondary">
        <HoneycombPattern className="text-primary" />
        <div className="relative z-10">
          <span className="text-sm tracking-widest text-primary uppercase">메뉴</span>
          <h1 className="text-5xl font-bold text-foreground mt-3">Our Menu</h1>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Authentic Korean dishes crafted with traditional recipes and the finest ingredients. Each dish tells a story of Korean culinary heritage.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 border-b border-border">
        <div className="container flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            All Dishes 전체
          </span>
        </div>
      </section>

      {/* Placeholder */}
      <section className="py-24 text-center">
        <svg className="w-16 h-16 mx-auto text-primary/30" viewBox="0 0 100 100">
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
        </svg>
        <h3 className="text-xl font-semibold text-foreground mt-4">No dishes found</h3>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
          We couldn't find any dishes matching your current filters. Try adjusting your preferences.
        </p>
        <button className="text-primary font-medium mt-4 hover:underline">Clear all filters</button>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
