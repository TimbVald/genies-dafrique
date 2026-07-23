interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "red" | "gold" | "white";
}

export default function SectionBadge({ children, variant = "blue" }: SectionBadgeProps) {
  const variants = {
    blue:  "bg-[#EEF2FF] text-[#1A3A8F]",
    red:   "bg-[#FFF0F0] text-[#D32F2F]",
    gold:  "bg-[#FFF8EE] text-[#F5A623]",
    white: "bg-white/20 text-white",
  };

  return (
    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${variants[variant]}`}>
      {children}
    </span>
  );
}
