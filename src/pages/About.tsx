import { Heart, Leaf, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpg";
import interiorImage from "@/assets/restaurant-interior.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoneycombPattern from "@/components/HoneycombPattern";
import ScrollReveal from "@/components/ScrollReveal";
import HoneyDrip from "@/components/HoneyDrip";
import HoneycombDivider from "@/components/HoneycombDivider";

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
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutHero})` }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <HoneycombPattern className="text-primary" />
        <div className="relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="text-xs tracking-[0.3em] text-primary uppercase">우리의 이야기</span>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mt-3">Our Story</h1>
          </motion.div>
        </div>
      </section>

      <HoneyDrip />

      {/* Story Content */}
      <section className="py-20">
        <div className="container max-w-2xl text-center space-y-8">
          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Salt Bee Korean Kitchen was founded with a simple mission: to bring the authentic taste of Korean home cooking to every table. Our name, "Salt Bee," draws inspiration from the Korean tradition of 손맛 (son-mat) — the unique flavor that comes from cooking with heart and soul.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Our story begins in a small kitchen in Seoul, where our founder's grandmother would spend hours perfecting her kimchi recipe. That same dedication to quality and authenticity now lives in every dish we serve.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Today, we invite you to experience Korean cuisine the way it was meant to be: made with fresh ingredients, prepared with care, and served with warmth. Welcome to our family's table.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <HoneycombDivider />

      {/* Interior image band */}
      <section className="relative h-[35vh]">
        <img src={interiorImage} alt="Restaurant interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollReveal>
            <p className="font-display text-3xl text-primary italic">"Come for the food, stay for the warmth"</p>
          </ScrollReveal>
        </div>
      </section>

      <HoneyDrip />

      {/* Values */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div className="container relative z-10 text-center">
          <ScrollReveal>
            <span className="text-xs tracking-[0.3em] text-primary uppercase">우리의 가치</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3">Our Values</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <div className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 text-center hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.1)]">
                  <div className="w-16 h-16 mx-auto relative flex items-center justify-center">
                    <motion.svg
                      className="w-16 h-16 text-primary/15 group-hover:text-primary/25 transition-colors duration-300"
                      viewBox="0 0 100 100"
                      whileHover={{ rotate: 60, scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
                    </motion.svg>
                    <v.icon className="h-7 w-7 text-primary absolute" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mt-5">{v.title}</h3>
                  <p className="text-primary text-sm">{v.korean}</p>
                  <p className="text-sm text-muted-foreground mt-3">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <HoneycombDivider />

      <Footer />
    </div>
  );
};

export default About;
