"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Bell } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

interface EvenementsContentProps {
  locale: string;
}

export default function EvenementsContent({ locale }: EvenementsContentProps) {
  const isFr = locale === "fr";

  const emptyState = {
    title: isFr ? "Aucun événement programmé" : "No Events Scheduled",
    subtitle: isFr
      ? "Il n'y a actuellement aucun événement à venir. Revenez bientôt pour découvrir nos prochaines activités."
      : "There are currently no upcoming events. Check back soon to discover our upcoming activities.",
    info: isFr
      ? "Les événements seront publiés ici dès qu'ils seront confirmés par l'établissement."
      : "Events will be published here as soon as they are confirmed by the school.",
    cta: isFr ? "Explorer nos actualités" : "Explore Our News",
    ctaLink: "/actualites",
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <SectionBadge>{isFr ? "Événements" : "Events"}</SectionBadge>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            {/* Empty State Icon */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1A3A8F]/10 to-[#D32F2F]/10 flex items-center justify-center">
                  <Calendar size={48} className="text-[#1A3A8F]/40" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D32F2F] flex items-center justify-center"
                >
                  <Clock size={16} className="text-white" />
                </motion.div>
              </motion.div>
            </div>

            {/* Empty State Text */}
            <h2 className="font-display font-bold text-[#1A202C] text-3xl mb-4">
              {emptyState.title}
            </h2>
            <p className="text-[#4A5568] text-lg leading-relaxed mb-6">
              {emptyState.subtitle}
            </p>
            <p className="text-[#4A5568]/70 text-sm leading-relaxed mb-8">
              {emptyState.info}
            </p>

            {/* CTA Button */}
            <motion.a
              href={emptyState.ctaLink}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1A3A8F] to-[#0D2A6F] text-white font-semibold rounded-full shadow-lg shadow-[#1A3A8F]/30 hover:shadow-xl hover:shadow-[#1A3A8F]/40 transition-all duration-300"
            >
              <Bell size={18} />
              {emptyState.cta}
            </motion.a>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20 grid sm:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Calendar,
                title: isFr ? "Prochainement" : "Coming Soon",
                description: isFr
                  ? "Les événements seront annoncés ici"
                  : "Events will be announced here",
              },
              {
                icon: Bell,
                title: isFr ? "Restez informé" : "Stay Informed",
                description: isFr
                  ? "Abonnez-vous à notre newsletter"
                  : "Subscribe to our newsletter",
              },
              {
                icon: Clock,
                title: isFr ? "Mise à jour" : "Updated Regularly",
                description: isFr
                  ? "Consultez cette page régulièrement"
                  : "Check this page regularly",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#F7F9FC] to-white border border-[#E2E8F0] hover:border-[#1A3A8F]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1A3A8F]/10 flex items-center justify-center mb-4 mx-auto">
                  <card.icon size={24} className="text-[#1A3A8F]" />
                </div>
                <h3 className="font-semibold text-[#1A202C] mb-2">{card.title}</h3>
                <p className="text-sm text-[#4A5568]">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
