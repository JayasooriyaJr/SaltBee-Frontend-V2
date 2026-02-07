import { Link } from "react-router-dom";
import { Heart, Leaf, Shield } from "lucide-react";
import heroImage from "@/assets/hero-korean.jpg";
import interiorImage from "@/assets/restaurant-interior.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoneycombPattern from "@/components/HoneycombPattern";
import HexDecorations from "@/components/HexDecorations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-background/70" />
        <HoneycombPattern className="text-primary" />
        <HexDecorations />
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 mb-6">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 100 100">
              <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
            </svg>
            <span className="text-sm tracking-[0.3em] text-primary font-medium uppercase">
              Korean Kitchen · 한국 식당
            </span>
            <svg className="w-6 h-6 text-primary" viewBox="0 0 100 100">
              <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="text-accent">Salt</span>{" "}
            <span className="text-primary">Bee</span>
          </h1>
          <p className="mt-4 text-foreground/70 font-body text-lg max-w-xl mx-auto">
            Experience the authentic flavors of Korea — from sizzling bibimbap to tender bulgogi, crafted with traditional recipes and 손맛.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-md font-semibold hover:bg-honey-dark transition-colors"
            >
              🍴 View Menu
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary px-7 py-3.5 rounded-md font-semibold hover:bg-primary/10 transition-colors"
            >
              ⬡ Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        <HoneycombPattern className="text-primary" />
        <div className="container relative z-10 text-center">
          <span className="text-sm tracking-widest text-primary uppercase">🍳 Chef's Selection</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">Signature Dishes</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Discover our most beloved dishes, prepared with the finest ingredients and time-honored Korean culinary traditions.
          </p>

          <div className="mt-12 flex justify-center">
            <div className="relative">
              <svg className="w-28 h-28 text-primary/20" viewBox="0 0 100 100">
                <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-xl text-primary">손맛</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">"Taste of hands"</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-md font-semibold hover:bg-honey-dark transition-colors"
            >
              View Full Menu →
            </Link>
          </div>
        </div>
      </section>

      {/* Restaurant Interior */}
      <section className="relative">
        <img src={interiorImage} alt="Salt Bee restaurant interior" className="w-full h-[50vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 text-center z-10">
          <p className="text-primary font-display text-2xl">Welcome to our hive</p>
          <p className="text-foreground/60 text-sm mt-1">Where tradition meets warmth</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-24 bg-background overflow-hidden">
        <HexDecorations />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-sm tracking-widest text-primary uppercase">⬡ Our Philosophy</span>
              <h2 className="text-4xl font-bold text-foreground mt-3">Our Story</h2>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Salt Bee Korean Kitchen was born from a simple dream: to share the authentic flavors of Korean home cooking with our community. Our name, inspired by the Korean tradition of seasoning with care, represents our commitment to crafting dishes that nourish both body and soul.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                From our grandmother's cherished kimchi recipe to our chef's innovative takes on classic dishes, every plate tells a story of Korean culinary heritage.
              </p>
              <div className="mt-6 border-l-2 border-primary pl-4">
                <p className="text-accent font-display italic text-lg">"약이 보약이다"</p>
                <p className="text-sm text-muted-foreground mt-1">Food is the best medicine — Korean proverb</p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:underline"
              >
                Learn More About Us →
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { icon: Heart, title: "Made with 손맛", korean: "정성", desc: 'Every dish is prepared with the "taste of loving hands" — the care and passion that makes Korean home cooking special.' },
                { icon: Leaf, title: "Fresh Ingredients", korean: "신선함", desc: "We source the freshest local produce and authentic Korean ingredients daily." },
                { icon: Shield, title: "Authentic Recipes", korean: "전통", desc: "Traditional recipes passed down through three generations of Korean cooks." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary/20" viewBox="0 0 100 100">
                      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
                    </svg>
                    <item.icon className="h-5 w-5 text-primary absolute" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {item.title} <span className="text-primary text-sm">{item.korean}</span>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
