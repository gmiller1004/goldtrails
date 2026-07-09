import { Award, Box, Layers, Mountain, Radio, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Partner = {
  name: string;
  Icon: LucideIcon;
};

const partners: Partner[] = [
  { name: "GPAA", Icon: Award },
  { name: "LDMA", Icon: Mountain },
  { name: "Minelab", Icon: Radio },
  { name: "Garrett", Icon: Search },
  { name: "Gold Cube", Icon: Box },
  { name: "Dream Mat", Icon: Layers },
];

export function PartnersSection() {
  return (
    <section
      id="partners"
      className="border-t border-[#d8dcc8] bg-[#eef0e8]"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Trusted in the field</p>
          <h2 id="partners-heading" className="mt-2 font-serif text-2xl font-semibold text-[#1a140f] sm:text-3xl">
            Partners &amp; sponsors
          </h2>
          <p className="mt-2 text-sm text-[#5c4f3f] sm:text-base">
            Organizations and brands that support Gold Trails education and prospecting in the field.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map(({ name, Icon }) => (
            <li key={name}>
              <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-[#d0d5c4] bg-white/80 px-4 py-6 text-center shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef0e8] text-[#5a6348]">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-[#3d4535] sm:text-sm">
                  {name}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-[#6d7760]">Logo placeholders — partner marks coming soon.</p>
      </div>
    </section>
  );
}
