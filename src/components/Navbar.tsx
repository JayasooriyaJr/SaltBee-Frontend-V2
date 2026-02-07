import { Link, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", korean: "홈" },
  { path: "/menu", label: "Menu", korean: "메뉴" },
  { path: "/about", label: "About", korean: "소개" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          {/* Animated hex logo mark */}
          <motion.svg
            className="w-8 h-8 text-primary"
            viewBox="0 0 100 100"
            whileHover={{ rotate: 60, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" opacity="0.9" />
            <text x="50" y="58" textAnchor="middle" fontSize="30" fontWeight="bold" fill="hsl(40,20%,8%)">SB</text>
          </motion.svg>
          
          <div>
            <span className="font-display text-xl font-bold text-primary">Salt Bee</span>
            <span className="block text-[10px] font-body text-muted-foreground tracking-wider">한국 식당</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-center transition-colors hover:text-primary ${
                location.pathname === item.path
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
          <Link
            to="/auth"
            className="hidden md:inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <User className="h-4 w-4" />
            Sign In
          </Link>
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
          <Link to="/auth" onClick={() => setMobileOpen(false)} className="block text-sm bg-primary text-primary-foreground rounded-md px-4 py-2 text-center">
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
