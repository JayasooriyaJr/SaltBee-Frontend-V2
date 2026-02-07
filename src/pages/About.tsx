import { Heart, Leaf, Shield, Users } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoneycombPattern from "@/components/HoneycombPattern";

const values = [
  { icon: Heart, title: "Passion", korean: "정성", desc: "Every dish is crafted with love and dedication to the art of Korean cooking." },
  { icon: Leaf, title: "Freshness", korean: "신선함", desc: "We use only the freshest ingredients, sourced locally and imported from Korea." },
  { icon: Shield, title: "Authenticity", korean: "전통", desc: "Our recipes are passed down through generations, preserving true Korean flavors." },
  { icon: Users, title: "Community", korean: "공동체", desc: "We believe in bringing people together through the joy of shared meals." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${aboutHero})` }} />
        <div className="absolute inset-0 bg-background/70" />
        <HoneycombPattern className="text-primary" />
        <div className="relative z-10 text-center">
          <span className="text-sm tracking-widest text-primary uppercase">우리의 이야기</span>
          <h1 className="text-5xl font-bold text-foreground mt-2">Our Story</h1>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16">
        <div className="container max-w-2xl text-center">
          <p className="text-muted-foreground leading-relaxed">
            Salt Bee Korean Kitchen was founded with a simple mission: to bring the authentic taste of Korean home cooking to every table. Our name, "Salt Bee," draws inspiration from the Korean tradition of 손맛 (son-mat) — the unique flavor that comes from cooking with heart and soul.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-6">
            Our story begins in a small kitchen in Seoul, where our founder's grandmother would spend hours perfecting her kimchi recipe. That same dedication to quality and authenticity now lives in every dish we serve.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-6">
            Today, we invite you to experience Korean cuisine the way it was meant to be: made with fresh ingredients, prepared with care, and served with warmth. Welcome to our family's table.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-16 bg-secondary overflow-hidden">
        <HoneycombPattern className="text-primary" />
        <div className="container relative z-10 text-center">
          <span className="text-sm tracking-widest text-primary uppercase">우리의 가치</span>
          <h2 className="text-4xl font-bold text-foreground mt-2">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors text-center">
                <div className="w-14 h-14 mx-auto relative flex items-center justify-center">
                  <svg className="w-14 h-14 text-primary/20" viewBox="0 0 100 100">
                    <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
                  </svg>
                  <v.icon className="h-6 w-6 text-primary absolute" />
                </div>
                <h3 className="font-display font-semibold text-foreground mt-4">{v.title}</h3>
                <p className="text-primary text-sm">{v.korean}</p>
                <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
