export default function AdSlot({ size = "banner" }: { size?: "banner" | "rectangle" | "sidebar" }) {
  const sizes: Record<string, string> = {
    banner: "h-24 max-w-3xl",
    rectangle: "h-36 max-w-sm",
    sidebar: "h-64 w-full",
  };
  return (
    <div className="my-6 text-center">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Advertisement</p>
      <div className={`mx-auto border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 text-sm italic ${sizes[size]}`}>
        📢 Google AdSense ({size === "banner" ? "728×90" : size === "rectangle" ? "336×280" : "300×600"}) — Replace with AdSense code
      </div>
    </div>
  );
}
