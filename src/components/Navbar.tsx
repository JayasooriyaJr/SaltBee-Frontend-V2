import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/Saltbee_Red_Yellow_Logo.png";
import { useCart } from "../contexts/CartContext";
import { useOrder } from "../contexts/OrderContext";
import { useAuth } from "../contexts/AuthContext";
import CartDrawer from "./CartDrawer";
import ActiveOrdersModal from "./ActiveOrdersModal";
import { ClipboardList } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", korean: "홈" },
  { path: "/menu", label: "Menu", korean: "메뉴" },
  { path: "/about", label: "About", korean: "소개" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeOrdersOpen, setActiveOrdersOpen] = useState(false);
  const { totalItems } = useCart();
  const { activeOrders } = useOrder();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center group">
          {/* Logo image with hover animation */}
          <motion.div
            className="relative w-20 h-20"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <img
              src={logo}
              alt="Salt Bee"
              className="w-20 h-20 object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
            />
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-center transition-colors hover:text-primary ${location.pathname === item.path
                ? "text-primary font-medium"
                : "text-muted-foreground"
                }`}
            >
              <span className="text-sm">{item.label}</span>
              <span className="block text-[10px] text-primary/60">{item.korean}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Active Orders Button */}
          {activeOrders.length > 0 && (
            <button
              onClick={() => setActiveOrdersOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">View Orders</span>
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-pulse">
                {activeOrders.length}
              </span>
            </button>
          )}

          {/* Cart/Orders Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Orders</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="hidden md:inline-flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                Welcome{user?.name ? `, ${user.name}` : ''}
              </span>
              <button
                onClick={logout}
                className="items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="hidden md:inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <User className="h-4 w-4" />
              Sign In
            </Link>
          )}
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-foreground hover:text-primary"
            >
              {item.label} <span className="text-primary/60 text-xs">{item.korean}</span>
            </Link>
          ))}
          {activeOrders.length > 0 && (
            <button
              onClick={() => {
                setMobileOpen(false);
                setActiveOrdersOpen(true);
              }}
              className="flex w-full items-center justify-between text-sm border border-primary/20 bg-primary/5 rounded-md px-4 py-2 text-primary hover:bg-primary/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                View Active Orders
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {activeOrders.length}
              </span>
            </button>
          )}
          <button
            onClick={() => {
              setMobileOpen(false);
              setCartOpen(true);
            }}
            className="flex items-center justify-between text-sm border border-border rounded-md px-4 py-2 hover:bg-secondary transition-colors"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </span>
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="block w-full text-left text-sm bg-secondary text-foreground rounded-md px-4 py-2"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth" onClick={() => setMobileOpen(false)} className="block text-sm bg-primary text-primary-foreground rounded-md px-4 py-2 text-center">
              Sign In
            </Link>
          )}
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Active Orders Modal */}
      <ActiveOrdersModal isOpen={activeOrdersOpen} onClose={() => setActiveOrdersOpen(false)} />
    </header>
  );
};

export default Navbar;
