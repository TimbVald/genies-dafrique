import Image from "next/image";
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumbs: Crumb[];
}

export default function PageHero({
  title,
  subtitle,
  image,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative h-[320px] md:h-[400px] flex items-end overflow-hidden">
      {/* Image de fond */}
      <Image
        src={image}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
        aria-hidden="true"
      />
      {/* Overlay dégradé */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,31,107,0.92) 0%, rgba(13,31,107,0.5) 60%, rgba(13,31,107,0.15) 100%)",
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10 pb-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="flex items-center gap-2 text-white/60 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/30">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1
          className="font-display font-bold text-white"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 mt-2 text-lg max-w-xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
