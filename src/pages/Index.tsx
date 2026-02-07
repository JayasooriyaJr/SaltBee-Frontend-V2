import { Link } from "react-router-dom";
import { Heart, Leaf, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-korean.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: Heart, title: "Passion", korean: "정성", desc: "Every dish is crafted with love and dedication to the art of Korean cooking." },
  { icon: Leaf, title: "Freshness", korean: "신선함", desc: "We use only the freshest ingredients, sourced locally and imported from Korea." },
  { icon: Shield, title: "Authenticity", korean: "전통", desc: "Our recipes are passed down through generations, preserving true Korean flavors." },
  { icon: Users, title: "Community", korean: "공동체", desc: "We believe in bringing people together through the joy of shared meals." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 text-center px-4">
          <p className="text-korean-sub text-sm tracking-widest mb-4 !text-korean-gold">
            전통 한식의 맛 · 손맛으로 전하는 정성
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Salt Bee
            <br />
            <span className="text-korean-gold">Korean Kitchen</span>
          </h1>
          <p className="mt-4 text-primary-foreground/80 font-body text-lg max-w-xl mx-auto">
            마고르 한국식 시보
          </p>
          <p className="mt-2 text-primary-foreground/70 font-body text-base max-w-xl mx-auto">
            Experience the authentic flavors of Korea — from sizzling bibimbap to tender bulgogi, crafted with traditional recipes and 손맛.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              🍴 View Menu <span className="text-sm opacity-80">메뉴 보기</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              ♡ Our Story <span className="text-sm opacity-80">우리 이야기</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="py-20 bg-background">
        <div className="container text-center">
          <p className="text-korean-sub">🍳 Chef's Selection</p>
          <p className="text-korean-sub mt-1">대표 메뉴</p>
          <h2 className="text-4xl font-bold text-foreground mt-3">Signature Dishes</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Discover our most beloved dishes, prepared with the finest ingredients and time-honored Korean culinary traditions.
          </p>
          <div className="mt-10 text-center">
            <p className="font-display text-2xl text-korean-gold">손맛</p>
            <p className="text-sm text-muted-foreground mt-1">"The taste of hands"</p>
            <p className="text-sm text-muted-foreground">Love and care in cooking</p>
            <div className="w-16 h-0.5 bg-korean-gold mx-auto mt-4" />
          </div>
          <div className="mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              View Full Menu 전체 메뉴 →
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-korean-warm">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-korean-sub">♡ Our Philosophy</p>
              <p className="text-korean-sub mt-1">우리 이야기</p>
              <h2 className="text-4xl font-bold text-foreground mt-3">Our Story</h2>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Salt Bee Korean Kitchen was born from a simple dream: to share the authentic flavors of Korean home cooking with our community. Our name, inspired by the Korean tradition of seasoning with care, represents our commitment to crafting dishes that nourish both body and soul.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                From our grandmother's cherished kimchi recipe to our chef's innovative takes on classic dishes, every plate tells a story of Korean culinary heritage.
              </p>
              <div className="mt-6 border-l-2 border-korean-gold pl-4">
                <p className="text-primary font-display italic">"약이 보약이다"</p>
                <p className="text-sm text-muted-foreground mt-1">Food is the best medicine — Korean proverb</p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:underline"
              >
                Learn More About Us 더 알아보기
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { icon: Heart, title: "Made with 손맛", korean: "정성", desc: 'Every dish is prepared with the "taste of loving hands" — the care and passion that makes Korean home cooking special.' },
                { icon: Leaf, title: "Fresh Ingredients", korean: "신선함", desc: "We source the freshest local produce and authentic Korean ingredients daily." },
                { icon: Shield, title: "Authentic Recipes", korean: "전통", desc: "Traditional recipes passed down through three generations of Korean cooks." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {item.title} <span className="text-korean-gold text-sm">{item.korean}</span>
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
