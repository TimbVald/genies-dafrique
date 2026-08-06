import { getTranslations } from "next-intl/server";
import SchoolCalendarServer from "@/components/calendar/SchoolCalendarServer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageTitles.calendar" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      {/* ── Header Section ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto">
          <SchoolCalendarServer params={params} />
        </div>
      </section>
    </>
  );
}
