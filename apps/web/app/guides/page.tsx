import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const guides = [
  {
    href: "/guides/best-metal-detector-for-beginners",
    title: "Best Metal Detector for Beginners",
    description: "Choose a beginner setup based on terrain, budget, and practical field use.",
  },
  {
    href: "/guides/ground-balancing-hot-ground",
    title: "Ground Balancing in Hot Ground",
    description: "Set up your detector for mineralized soil and reduce false signals.",
  },
  {
    href: "/guides/how-to-find-gold-nuggets",
    title: "How to Find Gold Nuggets",
    description: "A practical strategy for research, gridding, coil control, and recovery.",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Gold Trails Guides</p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Learn Faster In The Field</h1>
        <p className="mx-auto max-w-3xl text-sm text-muted-foreground sm:text-base">
          Short tactical guides to help you detect smarter, recover cleaner, and find more.
        </p>
      </header>

      <section className="rounded-2xl bg-muted/30 p-4 sm:p-6">
        <div className="grid gap-5 md:grid-cols-3">
          {guides.map((guide) => (
            <Card key={guide.href}>
              <CardHeader>
                <CardTitle className="text-foreground">
                  <Link href={guide.href} className="no-underline">
                    {guide.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
