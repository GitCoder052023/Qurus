import type { LegalSummaryCardProps } from "@/types/legal";

export function LegalSummaryCard({
  title,
  icon,
  bulletColorClass,
  items,
}: LegalSummaryCardProps) {
  return (
    <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-2xs">
      <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-text-secondary">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <span className={`w-2 h-2 rounded-full ${bulletColorClass} mt-1.5 shrink-0`} />
            <span>
              <strong>{item.title}:</strong> {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
