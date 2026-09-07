import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LegalPageShellProps {
  children: ReactNode;
}

export function LegalPageShell({ children }: LegalPageShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              <span>←</span>
              <span>Back to Sanctuary</span>
            </Link>
          </div>

          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
