import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", korean: "홈" },
  { path: "/menu", label: "Menu", korean: "메뉴" },
  { path: "/about", label: "About", korean: "소개" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold text-primary">
          Salt Bee
          <span className="block text-xs font-body font-normal text-korean-gold">
            마고르 한국식 시보
          </span>
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
              <span className="block text-xs text-korean-gold">{item.korean}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <User className="h-4 w-4" />
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
