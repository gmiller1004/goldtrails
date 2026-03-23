import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MediaTrustProps = {
  compact?: boolean;
};

const items = [
  {
    label: "HISTORY Channel",
    title: "Lost Gold of the Aztecs",
    detail: "Season 1 cast profile featuring Kevin Hoagland.",
  },
  {
    label: "GPAA Series",
    title: "Gold Trails Host",
    detail: "Host of GPAA's Gold Trails television series.",
  },
  {
    label: "Live Training",
    title: "Gold & Treasure Shows",
    detail: "Frequent seminar leader and Metal Detecting 101 instructor.",
  },
];

export function MediaTrust({ compact = false }: MediaTrustProps) {
  return (
    <section className="rounded-2xl bg-muted/30 p-4 sm:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Media & Authority</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
          Featured Across TV and Live Field Education
        </h2>
      </div>
      <div className={`grid gap-4 ${compact ? "md:grid-cols-3" : "md:grid-cols-3"}`}>
        {items.map((item) => (
          <Card key={item.title}>
            <CardHeader className="space-y-1 pb-2">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{item.label}</p>
              <CardTitle className="text-base text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
