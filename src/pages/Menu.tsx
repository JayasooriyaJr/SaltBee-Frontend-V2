import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Menu = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 bg-korean-warm text-center">
        <p className="text-korean-sub">메뉴</p>
        <h1 className="text-5xl font-bold text-foreground mt-2">Our Menu</h1>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
          Authentic Korean dishes crafted with traditional recipes and the finest ingredients. Each dish tells a story of Korean culinary heritage.
        </p>
      </section>

      {/* Search / Filters */}
      <section className="py-8 border-b border-border">
        <div className="container flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            All Dishes 전체
          </span>
        </div>
      </section>

      {/* Placeholder */}
      <section className="py-20 text-center">
        <p className="text-4xl">🍜</p>
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
