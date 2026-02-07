import { useState } from "react";
import { Search } from "lucide-react";
import { menuItems, categories, type MenuCategory } from "@/data/menuData";
import DishCard from "@/components/DishCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import HoneyDrip from "@/components/HoneyDrip";
import HoneycombDivider from "@/components/HoneycombDivider";
import BeeLoader from "@/components/BeeLoader";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.korean.includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 text-center overflow-hidden bg-secondary">
        <div className="relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 100 100">
                <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
              </svg>
              <span className="text-xs tracking-[0.3em] text-primary font-medium uppercase">메뉴</span>
              <svg className="w-5 h-5 text-primary" viewBox="0 0 100 100">
                <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">Our Menu</h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Authentic Korean dishes crafted with traditional recipes and the finest ingredients.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <HoneyDrip />

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border py-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]"
                      : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {cat.label} <span className="text-[10px] opacity-70">{cat.korean}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12">
        <div className="container">
          {filteredItems.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"}
                {activeCategory !== "all" && ` in ${categories.find(c => c.value === activeCategory)?.label}`}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, i) => (
                  <DishCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="py-24 text-center">
              <BeeLoader size={80} text="No dishes found..." />
              <button
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                className="text-primary font-medium mt-6 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <HoneycombDivider count={5} />

      <Footer />
    </div>
  );
};

export default Menu;
