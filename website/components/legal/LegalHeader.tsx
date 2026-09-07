interface LegalHeaderProps {
  badge: string;
  title: string;
  effectiveDate: string;
  lastUpdated: string;
}

export function LegalHeader({
  badge,
  title,
  effectiveDate,
  lastUpdated,
}: LegalHeaderProps) {
  return (
    <div className="mb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        {badge}
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary">
        {title}
      </h1>
      <p className="mt-3 text-sm text-text-secondary">
        <strong>Effective Date:</strong> {effectiveDate} •{" "}
        <strong>Last Updated:</strong> {lastUpdated}
      </p>
    </div>
  );
}
