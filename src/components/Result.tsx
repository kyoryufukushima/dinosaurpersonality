import { motion } from "motion/react";
import { DinosaurProfile, DinosaurType } from "../types";
import { RefreshCcw, Share2, Info, Sparkles, Heart, MapPin, Download, MessageCircle, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { DINOSAUR_PROFILES } from "../constants";

interface ResultProps {
  profile: DinosaurProfile;
  onReset: () => void;
}

export function Result({ profile, onReset }: ResultProps) {
  const [imageLoading, setImageLoading] = useState(false);

  const getAssetUrl = (path: string) => {
    const base = import.meta.env.BASE_URL;
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    return `${normalizedBase}${path.replace(/^\//, '')}?v=20260525`;
  };

  const compatibleProfile = DINOSAUR_PROFILES.find(p => p.type === profile.compatibleType);

  useEffect(() => {
    // AI image generation disabled to use static profile images
  }, [profile]);

  const shareText = `私の恐竜タイプは【${profile.name}】でした！\n#大恐竜展 #恐竜性格診断`;
  const shareUrl = window.location.href;

  const generateCanvas = async (): Promise<HTMLCanvasElement | null> => {
    if (!profile.imageUrl) return null;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Set dimensions (Square for Instagram)
    canvas.width = 1080;
    canvas.height = 1080;

    // Load the profile image
    const img = new Image();
    
    const imageLoadPromise = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
    });

    // Resolve path using BASE_URL
    img.src = getAssetUrl(profile.imageUrl);

    try {
      await imageLoadPromise;
    } catch (error) {
      console.error("Image loading failed:", error);
      return null;
    }

    // 1. Background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Dinosaur Image (Top part - Contain logic to prevent cropping)
    const imgHeight = 700; // Slightly reduced to give more space for text below
    const padding = 60; // Padding inside the image area
    const availableWidth = canvas.width - (padding * 2);
    const availableHeight = imgHeight - (padding * 2);
    
    const imgAspect = img.width / img.height;
    const availableAspect = availableWidth / availableHeight;
    
    let drawWidth, drawHeight;
    if (imgAspect > availableAspect) {
      drawWidth = availableWidth;
      drawHeight = availableWidth / imgAspect;
    } else {
      drawHeight = availableHeight;
      drawWidth = availableHeight * imgAspect;
    }
    
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (imgHeight - drawHeight) / 2;
    
    // Fill the background of the image area
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, imgHeight);
    
    // Draw the image
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // 3. Footer Area
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, imgHeight, canvas.width, canvas.height - imgHeight);

    // Accent line
    ctx.fillStyle = profile.color || "#3b82f6";
    ctx.fillRect(0, imgHeight, canvas.width, 8);

    // 4. Text Styling
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Subtitle background (pill shape)
    const subTitleY = imgHeight + 60;
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    const pillWidth = 240;
    const pillHeight = 44;
    ctx.roundRect(canvas.width / 2 - pillWidth / 2, subTitleY - pillHeight / 2, pillWidth, pillHeight, 22);
    ctx.fill();

    // Small Title
    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 24px 'Noto Sans JP', sans-serif";
    ctx.fillText("恐竜性格診断", canvas.width / 2, subTitleY);

    // Headline
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px 'Noto Sans JP', sans-serif";
    ctx.fillText("私の性格は...", canvas.width / 2, imgHeight + 130);

    // Result: Dinosaur Name
    ctx.fillStyle = profile.color || "#3b82f6";
    ctx.font = "black 100px 'Noto Sans JP', sans-serif";
    // Draw text with a slight shadow for depth
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 15;
    ctx.fillText(profile.name, canvas.width / 2, imgHeight + 220);
    ctx.shadowBlur = 0; // Reset shadow

    // Traits (hashtags)
    ctx.font = "bold 28px 'Noto Sans JP', sans-serif";
    ctx.fillStyle = "#94a3b8";
    const traitsText = profile.traits.map(t => `#${t}`).join("  ");
    ctx.fillText(traitsText, canvas.width / 2, imgHeight + 300);

    // Bottom Bar (Exhibition Info)
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, canvas.height - 65, canvas.width, 65);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 21px 'Noto Sans JP', sans-serif";
    ctx.fillText("大恐竜展 福島県立博物館 7.11-9.23 [検索 🔍 大恐竜展 福島]", canvas.width / 2, canvas.height - 32);

    // Border
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    return canvas;
  };

  const handleDownload = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;

    // Download the composite
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `dino-share-${profile.type}.png`;
    link.click();
  };

  const handleXShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const handleLineShare = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const canvas = await generateCanvas();
        if (!canvas) throw new Error("Canvas generation failed");

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        if (!blob) throw new Error("Blob generation failed");

        const file = new File([blob], "dino-result.png", { type: "image/png" });

        // Check if sharing files is supported
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "大恐竜展 恐竜性格診断",
            text: shareText,
            url: shareUrl,
            files: [file],
          });
        } else {
          // Fallback to text share if files not supported
          await navigator.share({
            title: "大恐竜展 恐竜性格診断",
            text: shareText,
            url: shareUrl,
          });
        }
      } catch (error) {
        console.error("Native share failed", error);
        // Fallback to X intent if native share fails completely
        handleXShare();
      }
    } else {
      handleXShare();
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-12">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden border border-blue-100"
      >
        {/* Header Image */}
        <div className="relative overflow-hidden flex items-center justify-center">
          <img 
            src={getAssetUrl(profile.imageUrl)} 
            alt={profile.name}
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-8 right-8">
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter drop-shadow-2xl">
              {profile.name}
            </h2>
            <p className="text-white/90 font-mono text-sm drop-shadow-lg">
              {profile.scientificName}
            </p>
          </div>
          
          {/* Download Button Overlay */}
          {!imageLoading && (
            <button 
              onClick={handleDownload}
              className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors border border-white/20"
              title="画像を保存"
            >
              <Download size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex flex-wrap gap-2">
            {profile.traits.map((trait, idx) => (
              <span 
                key={idx}
                className="px-4 py-1.5 rounded-full text-sm font-bold bg-blue-50 text-blue-600 border border-blue-100"
              >
                #{trait}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <Info size={20} />
              <h3>パーソナリティ解析</h3>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-600 relative shadow-sm">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {profile.description}
              </p>
            </div>
          </div>

          {/* Compatibility Section */}
          {compatibleProfile && (
            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 text-pink-500 font-bold mb-4">
                <Heart size={20} fill="currentColor" />
                <h3>相性抜群のパートナー</h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-20 h-auto rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white bg-white flex items-center justify-center">
                  <img 
                    src={getAssetUrl(compatibleProfile.imageUrl)} 
                    alt={compatibleProfile.name}
                    className="w-full h-auto block"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-800 mb-1">
                    {compatibleProfile.name}
                  </h4>
                  <p className="text-sm text-slate-600 leading-tight">
                    {profile.compatibilityMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-500 font-bold">
              <Share2 size={20} />
              <h3>結果を共有する</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-2xl hover:bg-black transition-colors"
                title="Xでシェア（テキストのみ）"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-xs font-bold">Xでシェア</span>
              </a>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 bg-[#06C755] text-white rounded-2xl hover:opacity-90 transition-opacity"
                title="LINEでシェア（テキストのみ）"
              >
                <MessageCircle size={24} />
                <span className="text-xs font-bold">LINEでシェア</span>
              </a>
              <button
                onClick={handleDownload}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-2xl hover:opacity-90 transition-opacity"
              >
                <Download size={24} />
                <span className="text-xs font-bold leading-tight">診断画像を保存</span>
              </button>
              <button
                onClick={handleNativeShare}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                <Share2 size={24} />
                <span className="text-xs font-bold">画像＋URLを<br/>まとめてシェア</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center bg-slate-50 py-2 rounded-lg">
              ※XやLINEで画像を投稿したい場合は、一度「画像を保存」してから投稿してください。<br/>
              「画像＋URLをまとめてシェア」は対応端末でのみ利用可能です。
            </p>
          </div>

          {/* Exhibition CTA */}
          <div className="bg-blue-600 p-8 rounded-3xl text-white relative overflow-hidden group z-20">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 opacity-80 text-xs font-bold tracking-widest uppercase">
              </div>
              <h3 className="text-2xl font-black mb-3 break-keep">
                この夏、太古の鼓動が鳴り響く
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6 break-keep">
                ７月11日～９月23日に福島県立博物館で開催される「大恐竜展」では、世界初公開の化石を含む数多くの貴重な資料を展示中。
                ぜひ会場で体感してください。
              </p>
              <a 
                href="https://kyoryu-zavacephale-rinpoche.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-xl text-base hover:bg-blue-50 transition-all whitespace-nowrap shadow-lg active:scale-95 cursor-pointer"
              >
                大恐竜展の詳細を見る
              </a>
            </div>
            <Sparkles size={120} className="absolute -bottom-10 -right-10 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>

          {/* Action Buttons */}
          <div className="pt-4">
            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
            >
              <RefreshCcw size={20} />
              もう一度診断する
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
