import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import SchoolCalendar from "@/components/calendar/SchoolCalendar";

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

export default function CalendarPage() {
  const t = useTranslations("calendar");

  return (
    <>
      {/* ── Header Section ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-satoshi text-[#1A202C] mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-[#4A5568] max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
          <SchoolCalendar />
        </div>
      </section>
    </>
  );
}
