"use client";

import { FooterBrandColumn } from "./footer/FooterBrandColumn";
import { FooterNavColumns } from "./footer/FooterNavColumns";
import { FooterBottomBar } from "./footer/FooterBottomBar";

export default function Footer() {
  return (
    <footer className="bg-[#FAFBF9] border-t border-border-subtle pt-20 pb-12 text-xs text-text-secondary">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          <FooterBrandColumn />
          <FooterNavColumns />
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  );
}
