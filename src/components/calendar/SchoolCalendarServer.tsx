import { getTranslations } from "next-intl/server";
import { getReactBigCalendarEvents } from "@/data/mockEvents";
import type { ReactBigCalendarEvent } from "@/types/calendar";
import { SchoolCalendarClient } from "@/components/calendar/SchoolCalendarClient";

/* ═══════════════════════════════════════════════════════════════
   SERVER COMPONENT WRAPPER POUR LE CALENDRIER SCOLAIRE
════════════════════════════════════════════════════════════════════ */

export default async function SchoolCalendarServer({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calendar" });

  try {
    // Charger les événements côté serveur pour de meilleures performances
    const events: ReactBigCalendarEvent[] = getReactBigCalendarEvents();

    // Sérialiser les événements pour éviter les problèmes de Date objects
    const serializedEvents = events.map(event => ({
      ...event,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    }));

    return (
      <>
        {/* ── Header Section ─────────────────────────────────────────── */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-satoshi text-[#1A202C] mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-[#4A5568] max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>
        <SchoolCalendarClient initialEvents={serializedEvents as any} locale={locale} />
      </>
    );
  } catch (error) {
    console.error("Error loading calendar:", error);
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading calendar. Please try again later.</p>
      </div>
    );
  }
}
