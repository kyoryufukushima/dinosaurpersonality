import { motion } from "motion/react";

export function DinoBackground() {
  const getAssetUrl = (path: string) => {
    const base = import.meta.env.BASE_URL;
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    return `${normalizedBase}${path.replace(/^\//, '')}`;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#1a1a1a]">
      {/* Main Background Image: User Provided Illustration */}
      <motion.div 
        animate={{ 
          scale: [1, 1.03, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 opacity-80"
        style={{ 
          backgroundImage: `url("${getAssetUrl('background.jpg.jpg')}")`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Subtle Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [null, "-10%", "10%"],
            opacity: [0, 0.2, 0],
          }}
          transition={{ 
            duration: 15 + Math.random() * 15, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
}
