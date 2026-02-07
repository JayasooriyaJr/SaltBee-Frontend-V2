import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import interiorImage from "@/assets/restaurant-interior.jpg";
import HoneycombPattern from "@/components/HoneycombPattern";

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left - Form */}
      <div className="relative flex flex-col p-8 lg:p-16 bg-background overflow-hidden">
        <HoneycombPattern className="text-primary" />
        <Link to="/" className="relative z-10 flex items-center gap-2 mb-12">
          <svg className="w-7 h-7 text-primary" viewBox="0 0 100 100">
            <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
            <text x="50" y="58" textAnchor="middle" fontSize="30" fontWeight="bold" fill="hsl(40,20%,8%)">SB</text>
          </svg>
          <span className="font-display text-xl font-bold text-primary">Salt Bee</span>
        </Link>

        <div className="relative z-10 max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          <span className="inline-block self-start px-3 py-1 text-xs font-semibold rounded-full bg-primary/15 text-primary mb-4">
            {mode === "signin" ? "WELCOME BACK" : "JOIN THE HIVE"}
          </span>
          <h1 className="text-3xl font-bold text-foreground">
            {mode === "signin" ? "Sign in to your account" : "Create your account"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mode === "signin"
              ? "Enter your details below to manage your orders"
              : "Begin your culinary journey with exclusive benefits"}
          </p>

          <div className="flex mt-6 border border-border rounded-md overflow-hidden">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                mode === "signin" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <div>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Password</label>
                {mode === "signin" && (
                  <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
                )}
              </div>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={mode === "signup" ? "Create a strong password" : "••••••••"}
                  className="w-full pl-10 pr-10 py-2.5 rounded-md border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {mode === "signup" && (
                <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters long.</p>
              )}
            </div>

            <button type="submit" className="w-full py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-honey-dark transition-colors">
              {mode === "signin" ? "Sign In to Account" : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-md border border-border bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {mode === "signin" ? "Continue with Google" : "Sign up with Google"}
          </button>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing, you agree to our{" "}
            <a href="#" className="underline text-primary">Terms of Service</a> and{" "}
            <a href="#" className="underline text-primary">Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden lg:block relative">
        <img src={interiorImage} alt="Salt Bee restaurant interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-16 left-8 right-8 z-10">
          <div className="w-12 h-1 bg-primary mb-4" />
          <p className="text-2xl font-display italic text-foreground leading-relaxed">
            "Experience the authentic flavors of Korea — where every dish tells a story of tradition and passion."
          </p>
          <p className="text-muted-foreground mt-3">— The Salt Bee Team</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
