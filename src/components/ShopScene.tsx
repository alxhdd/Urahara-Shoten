import { useShopAnimation } from "@/hooks/useShopAnimation";

export function ShopScene() {
  const { src, transitioning } = useShopAnimation();

  return (
    <div className="text-center">
      <div className="relative overflow-hidden aspect-[2730/1536]" style={{ background: "#0a0a0a" }}>
        <img
          src={src}
          alt="Kisuke's Shop"
          className={`pixelated block w-full h-full object-contain transition-opacity duration-300 ${transitioning ? "opacity-96" : ""}`}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          }}
        />
      </div>
      <div
        className="retro text-sm text-[#e8a840] pt-4 pb-2 tracking-widest"
        style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}
      >
        Kisuke AI — Aleksa's personal assistant
      </div>
      <div className="retro text-[0.5rem] text-[#2d5a27] tracking-wider pb-4">
        the candy store will open soon...
      </div>
    </div>
  );
}
