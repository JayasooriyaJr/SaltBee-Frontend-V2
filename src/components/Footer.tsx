import { MapPin, Phone, Instagram } from "lucide-react";


const Footer = () => {
  return (
    <footer className="relative bg-secondary border-t border-border overflow-hidden">
      <div className="container relative z-10 py-12">
        <div className="text-center mb-10">
          <p className="font-display text-lg text-primary">잘 먹겠습니다</p>
          <p className="text-sm text-muted-foreground mt-1">
            "I will eat well" — Korean dining gratitude
          </p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold text-primary">Salt Bee</h3>
            <p className="text-xs text-muted-foreground mt-1">한국 식당</p>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              Authentic Korean cuisine crafted with 손맛 (the taste of loving hands)
              and traditional recipes. Experience the true taste of Korea.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground">
              ⏰ Hours · 영업시간
            </h4>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Monday - Thursday</span><span>11:00 AM - 10:00 PM</span></div>
              <div className="flex justify-between"><span>Friday - Saturday</span><span>11:00 AM - 11:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday</span><span>12:00 PM - 9:00 PM</span></div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground">Contact · 연락처</h4>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>123 Korean Street, Koreatown<br />Los Angeles, CA 90020</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(213) 555-0123</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>Made with Chamuditha and 정성</p>
        <p className="mt-1">© 2025 Salt Bee Korean Kitchen. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
