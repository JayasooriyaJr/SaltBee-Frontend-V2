import { MapPin, Phone, Instagram, Facebook } from "lucide-react";
import logo from "../assets/Saltbee_Red_Yellow_Logo.png";


const Footer = () => {
  return (
    <footer className="relative bg-secondary border-t border-border overflow-hidden">
      <div className="container relative z-10 py-16">
        {/* Logo and Tagline Section - Centered */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Salt Bee"
              className="object-contain transition-transform hover:scale-105 duration-300"
              style={{ width: '100px', height: '100px' }}
            />
          </div>
          <p className="font-display text-2xl text-primary mb-2">잘 먹겠습니다</p>
          <p className="text-sm text-muted-foreground">
            "I will eat well" — Korean dining gratitude
          </p>
          <div className="w-24 h-0.5 bg-primary mx-auto mt-6" />
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-12">
          {/* Hours Section */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="text-primary">⏰</span> Hours · 영업시간
            </h4>
            <div className="space-y-2.5 text-sm text-muted-foreground">
              <div className="flex justify-between items-center bg-background/50 rounded-lg px-4 py-2.5">
                <span className="font-medium">Monday - Thursday</span>
                <span className="text-primary">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center bg-background/50 rounded-lg px-4 py-2.5">
                <span className="font-medium">Friday - Saturday</span>
                <span className="text-primary">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between items-center bg-background/50 rounded-lg px-4 py-2.5">
                <span className="font-medium">Sunday</span>
                <span className="text-primary">12:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Contact · 연락처
            </h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3 bg-background/50 rounded-lg px-4 py-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Location</p>
                  <p>123 Korean Street, Koreatown</p>
                  <p>Los Angeles, CA 90020</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-background/50 rounded-lg px-4 py-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Phone</p>
                  <p>(213) 555-0123</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Social */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Authentic Korean cuisine crafted with 손맛 (the taste of loving hands)
            and traditional recipes. Experience the true taste of Korea.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 bg-background/50 rounded-full p-3"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 bg-background/50 rounded-full p-3"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 bg-background/50 rounded-full p-3"
              aria-label="Threads"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.186 3.998a8.188 8.188 0 1 0 8.188 8.188 8.188 8.188 0 0 0-8.188-8.188zm4.606 11.003a5.45 5.45 0 0 1-1.391 1.391 6.102 6.102 0 0 1-1.815.922 7.432 7.432 0 0 1-2.4.374 7.432 7.432 0 0 1-2.4-.374 6.102 6.102 0 0 1-1.815-.922 5.45 5.45 0 0 1-1.391-1.391 6.102 6.102 0 0 1-.922-1.815 7.432 7.432 0 0 1-.374-2.4 7.432 7.432 0 0 1 .374-2.4 6.102 6.102 0 0 1 .922-1.815 5.45 5.45 0 0 1 1.391-1.391 6.102 6.102 0 0 1 1.815-.922 7.432 7.432 0 0 1 2.4-.374 7.432 7.432 0 0 1 2.4.374 6.102 6.102 0 0 1 1.815.922 5.45 5.45 0 0 1 1.391 1.391 6.102 6.102 0 0 1 .922 1.815 7.432 7.432 0 0 1 .374 2.4 7.432 7.432 0 0 1-.374 2.4 6.102 6.102 0 0 1-.922 1.815zM15.408 9.75c-.373-.945-1.105-1.413-2.197-1.413-1.197 0-2.015.6-2.453 1.8-.27.735-.405 1.65-.405 2.745 0 1.095.135 2.01.405 2.745.438 1.2 1.256 1.8 2.453 1.8 1.092 0 1.824-.468 2.197-1.413.225-.57.338-1.305.338-2.205v-.135h-1.5v.135c0 .63-.06 1.095-.18 1.395-.195.495-.555.743-1.08.743-.525 0-.885-.248-1.08-.743-.12-.3-.18-.765-.18-1.395v-1.8h4.02v-.135c0-.9-.113-1.635-.338-2.205z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-border bg-background/30 py-6 text-center text-xs text-muted-foreground">
        <p className="font-medium">
          Made by
          <a href="https://ceyglo.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-all">
            {"  "}CeyGlo
          </a>
        </p>
        <p className="mt-1">© 2025 Salt Bee Korean Kitchen. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
