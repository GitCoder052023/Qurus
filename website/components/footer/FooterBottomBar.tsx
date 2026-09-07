export function FooterBottomBar() {
  return (
    <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-tertiary">
      <div>
        © {new Date().getFullYear()} Qurus. Created with intention by{" "}
        <strong className="text-text-primary font-medium">
          Hamdan Khubaib
        </strong>
        .
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
        <span className="inline-flex items-center gap-1 text-text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          100% Free Forever
        </span>

        <span>•</span>

        <span>Zero Ads</span>

        <span>•</span>

        <span>Uthmani Script</span>

        <span>•</span>

        <span>5 Global Languages</span>

        <span>•</span>

        <span>On-Device Privacy</span>
      </div>
    </div>
  );
}
