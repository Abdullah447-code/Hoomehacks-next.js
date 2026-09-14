"use client";
import { useEffect } from "react";

interface AdSlotProps {
  size?: "banner" | "rectangle" | "sidebar";
  slot?: string;
}

export default function AdSlot({ size = "banner", slot }: AdSlotProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    banner:    { display: "block", minHeight: 90 },
    rectangle: { display: "block", minHeight: 250 },
    sidebar:   { display: "block", minHeight: 300 },
  };

  return (
    <div className="my-6 text-center overflow-hidden">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={styles[size]}
        data-ad-client="ca-pub-9359782305805940"
        data-ad-slot={slot || ""}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}