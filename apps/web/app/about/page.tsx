import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const timeline = [
  "1970: Kevin builds his first metal detector at age nine.",
  "2015: Gold Trails TV series premieres with Kevin as host.",
  "Appears on HISTORY Channel's Lost Gold of the Aztecs (Season 1 cast).",
  "Appears on Outdoor Channel's Gold Fever and Alaskan series.",
  "Leads Metal Detecting 101 training events for detectorists of all skill levels.",
  "Guides GPAA claim tours and field-focused outings across multiple states.",
  "Publishes the Complete Masterclass to help beginners hunt with confidence.",
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <section className="rounded-2xl border border-secondary bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">About Kevin</p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              55 Years In The Field, One Mission: Help You Find More
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Kevin Hoagland is a veteran prospector, GPAA/LDMA leader, and host of Gold
              Trails. His teaching style turns complex detector settings into practical,
              repeatable field routines for beginners and experienced hunters alike.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Public GPAA coverage and press releases highlight Kevin&apos;s long-running work
              in detector education, including Metal Detecting 101 sessions and Gold Trails
              programming focused on making prospecting more accessible.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/masterclass">Get The Free Masterclass</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/events">See Upcoming Events</Link>
              </Button>
            </div>
            <div className="rounded-lg border border-secondary/70 bg-muted/30 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-primary">Media Snapshot</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Host of GPAA&apos;s Gold Trails, featured cast on HISTORY Channel&apos;s Lost Gold
                of the Aztecs, and frequent seminar leader at Gold & Treasure Shows.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["gt1.jpg", "gt2.jpg", "gt3.jpg", "gt4.jpg"].map((file) => (
              <div key={file} className="overflow-hidden rounded-xl border border-secondary/70 bg-white shadow-sm">
                <Image
                  src={`/images/${file}`}
                  alt="Kevin in the field"
                  width={700}
                  height={700}
                  className="h-36 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-muted/30 p-4 sm:p-6">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Career Timeline</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {timeline.map((item) => (
            <Card key={item}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-secondary bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-foreground">Recognized Public Highlights</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-base font-semibold text-foreground">Gold Trails + TV Credits</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Public sources document Gold Trails&apos; launch and Kevin&apos;s role as host, plus
                his cast profile on HISTORY Channel&apos;s Lost Gold of the Aztecs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-base font-semibold text-foreground">Metal Detecting 101</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                GPAA announcements describe Kevin leading beginner-to-advanced detector
                training and in-field application sessions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-base font-semibold text-foreground">Claim Tour Leadership</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                GPAA&apos;s Kevin&apos;s Gold Trail updates show multi-state claim visits and
                member education outings.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Source Links</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a
                href="https://www.history.com/shows/lost-gold-of-the-aztecs/cast/dan-dillman-2-2-5"
                target="_blank"
                rel="noreferrer"
                className="no-underline"
              >
                HISTORY Channel Cast Profile: Lost Gold of the Aztecs
              </a>
            </li>
            <li>
              <a
                href="https://www.prweb.com/releases/gpaa_gold_trails_tv_series_to_premiere_jan_3/prweb12400346.htm"
                target="_blank"
                rel="noreferrer"
                className="no-underline"
              >
                Gold Trails TV Series Announcement (PRWeb)
              </a>
            </li>
            <li>
              <a
                href="https://www.goldprospectors.org/News/ArtMID/406/ArticleID/697/Metal-Detecting-101-Renegade-Treasure-Hunts"
                target="_blank"
                rel="noreferrer"
                className="no-underline"
              >
                Metal Detecting 101 / Renegade Treasure Hunts (GPAA)
              </a>
            </li>
            <li>
              <a
                href="https://gpaastore.com/blogs/adventures/hit-the-gold-trail-with-gpaas-kevin-hoagland"
                target="_blank"
                rel="noreferrer"
                className="no-underline"
              >
                Hit the Gold Trail with GPAA&apos;s Kevin Hoagland (GPAA Store)
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl bg-muted/30 p-4 sm:p-6">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Media & Speaking</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs uppercase tracking-[0.22em] text-primary">Television</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Kevin has appeared as host/cast across multiple prospecting-focused series,
                including Gold Trails and HISTORY Channel&apos;s Lost Gold of the Aztecs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs uppercase tracking-[0.22em] text-primary">Live Seminars</p>
              <p className="mt-2 text-sm text-muted-foreground">
                At Gold & Treasure Shows, Kevin has led seminars on metal detecting, local
                geology, and field-ready techniques for new and experienced detectorists.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs uppercase tracking-[0.22em] text-primary">Field Training</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Metal Detecting 101 sessions combine classroom instruction with in-field drills
                to build confidence in ground balance, threshold, tones, and coil control.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
