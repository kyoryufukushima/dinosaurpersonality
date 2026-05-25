import { motion } from "motion/react";
import { Sparkles, Compass, ChevronRight } from "lucide-react";

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  const getAssetUrl = (path: string) => {
    const base = import.meta.env.BASE_URL;
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    return `${normalizedBase}${path.replace(/^\//, '')}?v=20260525`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-6 relative py-12">
      {/* Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-[10%] pointer-events-none"
      >
        <div className="w-64 h-64 bg-blue-400 rounded-full blur-[100px]" />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        className="absolute bottom-20 right-[10%] pointer-events-none"
      >
        <div className="w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
      </motion.div>

      {/* 1. Title Image: Rendered directly on the background so mix-blend-multiply works perfectly to remove white background */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-6 flex flex-col items-center justify-center w-full max-w-lg"
      >
        <div className="relative group p-4 w-full">
          <img 
            src={getAssetUrl('title2.png')} 
            alt="大恐竜展" 
            className="w-full max-w-xs md:max-w-md mx-auto h-auto object-contain select-none"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('title2.jpg')) {
                target.src = getAssetUrl('title2.jpg');
              }
            }}
          />
          {/* Subtle Ambient Glow behind the title text */}
          <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full -z-10 scale-110 pointer-events-none" />
        </div>
      </motion.div>

      {/* 2. Main Content Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="relative z-10 max-w-xl w-full bg-white/90 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-blue-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)]"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-none break-keep">
          <span className="bg-gradient-to-br from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent">
            恐竜性格診断
          </span>
        </h1>

        <div className="mb-10">
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium break-keep">
            あなたの心の奥底に眠る化石を徹底分析。<br className="hidden md:block" />
            <span className="text-blue-600 font-black">あなたの恐竜タイプ</span>を発掘します。
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="group relative px-12 py-5 bg-blue-600 text-white font-bold text-xl rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all overflow-hidden cursor-pointer"
        >
          <span className="relative z-10 flex items-center justify-center gap-3 whitespace-nowrap">
            発掘を開始する
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-16 flex flex-col items-center gap-4"
      >
        <div className="px-6 py-2 bg-white/80 backdrop-blur-md rounded-full border border-blue-50 shadow-sm">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-blue-600/70 break-keep">
            「大恐竜展」７月11日～９月23日に福島県立博物館で開催！
          </span>
        </div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
