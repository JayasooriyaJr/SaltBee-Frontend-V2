import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { categories, type MenuCategory } from "@/data/menuData";
import { api, type MenuItem } from "@/services/api";
import DishCard from "@/components/DishCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import HoneyDrip from "@/components/HoneyDrip";
import HoneycombDivider from "@/components/HoneycombDivider";
import BeeLoader from "@/components/BeeLoader";
import { useOrder } from "@/contexts/OrderContext";
import QRScannerModal from "@/components/QRScannerModal";
import { Button } from "@/components/ui/button";
import FloatingQRButton from "@/components/FloatingQRButton";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { tableNumber, orderType, isCheckoutLocked, setTableNumber, setOrderType } = useOrder();
  const [showQRModal, setShowQRModal] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.getMenuItems();
        setMenuItems(response.data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setError("Failed to load menu items. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleClearTable = () => {
    if (!isCheckoutLocked) {
      setTableNumber(null);
      setOrderType(null);
      setShowQRModal(true);
    }
  };

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
      <section className="relative py-16 sm:py-24 text-center overflow-hidden bg-secondary">
        <div className="relative z-10 px-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-primary font-medium uppercase">메뉴</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground">Our Menu</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-3 sm:mt-4 max-w-lg mx-auto px-4">
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
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === cat.value
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

      {/* Table Indicator */}
      {(tableNumber || orderType === 'takeaway') && (
        <section className="sticky top-[calc(4rem+4.5rem)] z-30 bg-primary/10 backdrop-blur border-b border-primary/20 py-3">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {tableNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      Table: <span className="text-primary font-bold text-lg">{tableNumber}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">• Dine-in</span>
                  </div>
                )}
                {orderType === 'takeaway' && !tableNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      Order Type: <span className="text-primary font-bold">Takeaway</span>
                    </span>
                  </div>
                )}
              </div>
              {!isCheckoutLocked && (
                <Button
                  onClick={handleClearTable}
                  variant="ghost"
                  size="sm"
                  className="text-xs hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear Table
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Menu Grid */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-24">
              <BeeLoader />
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : filteredItems.length > 0 ? (
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
              <p className="text-muted-foreground">No dishes found...</p>
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

      <HoneycombDivider />

      <Footer />

      {/* QR Scanner Modal */}
      <QRScannerModal
        open={showQRModal}
        onClose={() => setShowQRModal(false)}
      />

      {/* Floating QR Button */}
      <FloatingQRButton />
    </div>
  );
};

export default Menu;
