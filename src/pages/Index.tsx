import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Leaf, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-korean.jpg";
import interiorImage from "@/assets/restaurant-interior.jpg";
import { menuItems } from "@/data/menuData";
import DishCard from "@/components/DishCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoneycombPattern from "@/components/HoneycombPattern";
import ScrollReveal from "@/components/ScrollReveal";
import BeeLoader from "@/components/BeeLoader";
import HoneyDrip from "@/components/HoneyDrip";
import FloatingBee from "@/components/FloatingBee";
import HoneycombDivider from "@/components/HoneycombDivider";

const signatureDishes = menuItems.filter((item) => item.popular).slice(0, 4);

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <BeeLoader text="Preparing the hive…" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navbar />

      {/* Floating bees in hero */}
      <FloatingBee className="top-[15%] right-[10%] z-20" size={32} delay={0} />
      <FloatingBee className="bottom-[30%] left-[8%] z-20" size={24} delay={3} />
      <FloatingBee className="top-[45%] right-[20%] z-20" size={20} delay={5} />

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-background/75" />
        <HoneycombPattern className="text-primary" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-primary/50" />
            <span className="text-xs tracking-[0.4em] text-primary font-medium uppercase">
              Korean Kitchen · 한국 식당
            </span>
            <div className="h-px w-12 bg-primary/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-6xl md:text-9xl font-bold leading-none"
          >
            <span className="text-accent">Salt</span>{" "}
            <span className="text-primary">Bee</span>
            <motion.span
              className="inline-block ml-2 text-5xl md:text-7xl"
              animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🐝
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <p className="mt-6 text-foreground/60 font-body text-lg max-w-xl mx-auto leading-relaxed">
              Experience the authentic flavors of Korea — sizzling BBQ, rich stews, and handcrafted dishes made with 손맛, the taste of loving hands.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-honey-dark transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]"
              >
                View Menu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-primary/30 text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
              >
                ⬡ Our Story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Honey drip transition */}
      <HoneyDrip />

      {/* Signature Dishes */}
      <section className="relative py-28 bg-secondary overflow-hidden">
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 100 100">
                  <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
                </svg>
                <span className="text-xs tracking-[0.3em] text-primary font-medium uppercase">
                  Chef's Selection · 대표 메뉴
                </span>
                <svg className="w-5 h-5 text-primary" viewBox="0 0 100 100">
                  <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                Signature Dishes
              </h2>
              <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                Our most beloved creations, each crafted with time-honored Korean culinary traditions and the finest ingredients.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureDishes.map((item, i) => (
              <DishCard key={item.id} item={item} index={i} />
            ))}
          </div>

          <ScrollReveal className="text-center mt-14">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-honey-dark transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]"
            >
              View Full Menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Honeycomb divider */}
      <HoneycombDivider />

      {/* Restaurant Interior */}
      <section className="relative">
        <img src={interiorImage} alt="Salt Bee restaurant interior" className="w-full h-[55vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
          <ScrollReveal>
            <motion.svg
              className="w-16 h-16 text-primary/30 mx-auto mb-4"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </motion.svg>
            <p className="text-primary font-display text-3xl md:text-4xl italic max-w-2xl mx-auto">
              "Welcome to our hive"
            </p>
            <p className="text-foreground/50 text-sm mt-3 tracking-widest uppercase">Where tradition meets warmth</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Honey drip into story section */}
      <HoneyDrip />

      {/* Our Story */}
      <section className="relative py-28 bg-background overflow-hidden">
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 100 100">
                  <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
                </svg>
                <span className="text-xs tracking-[0.3em] text-primary font-medium uppercase">Our Philosophy</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">Our Story</h2>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Salt Bee Korean Kitchen was born from a simple dream: to share the authentic flavors of Korean home cooking with our community. Our name, inspired by the Korean tradition of seasoning with care, represents our commitment to crafting dishes that nourish both body and soul.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                From our grandmother's cherished kimchi recipe to our chef's innovative takes on classic dishes, every plate tells a story of Korean culinary heritage.
              </p>
              <div className="mt-8 p-4 border-l-2 border-primary bg-card/50 rounded-r-lg">
                <p className="text-accent font-display italic text-xl">"약이 보약이다"</p>
                <p className="text-sm text-muted-foreground mt-1">Food is the best medicine — Korean proverb</p>
              </div>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 mt-8 text-primary font-medium hover:underline"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>

            <div className="space-y-4">
              {[
                { icon: Heart, title: "Made with 손맛", korean: "정성", desc: 'Every dish is prepared with the "taste of loving hands" — the care and passion that makes Korean home cooking special.' },
                { icon: Leaf, title: "Fresh Ingredients", korean: "신선함", desc: "We source the freshest local produce and authentic Korean ingredients daily." },
                { icon: Shield, title: "Authentic Recipes", korean: "전통", desc: "Traditional recipes passed down through three generations of Korean cooks." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 150}>
                  <div className="group flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.1)]">
                    <div className="flex-shrink-0 relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary/15 group-hover:text-primary/25 transition-colors" viewBox="0 0 100 100">
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HoneycombDivider />

      <Footer />
    </motion.div>
  );
};

export default Index;
