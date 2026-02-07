/** Decorative floating hexagon shapes */
const HexDecorations = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Top right cluster */}
    <svg className="absolute -top-8 -right-8 w-48 h-48 text-primary/20 animate-hex-pulse" viewBox="0 0 100 100">
      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
    <svg className="absolute top-16 right-20 w-24 h-24 text-primary/15 animate-hex-pulse" style={{ animationDelay: '1s' }} viewBox="0 0 100 100">
      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
    {/* Bottom left */}
    <svg className="absolute -bottom-6 -left-6 w-36 h-36 text-primary/10 animate-hex-pulse" style={{ animationDelay: '2s' }} viewBox="0 0 100 100">
      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

export default HexDecorations;
