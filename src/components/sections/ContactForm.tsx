"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full px-4 py-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[#1A202C] text-sm " +
  "placeholder-[#A0AEC0] focus:outline-none focus:border-[#1A3A8F] " +
  "focus:ring-2 focus:ring-[#1A3A8F]/15 transition-colors duration-200";

const labelClass = "block text-sm font-semibold text-[#1A202C] mb-1.5";

const SUJETS = [
  "Admission / Enrollment",
  "Information générale / General Info",
  "Frais de scolarité / Tuition Fees",
  "Partenariat / Partnership",
  "Autre / Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", sujet: "", message: "", consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const set = (field: keyof typeof form, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim())    e.name    = "Requis / Required";
    if (!form.message.trim()) e.message = "Requis / Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="text-center py-14 px-6 bg-[#F7F9FC] rounded-2xl border border-[#E2E8F0]">
        <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={34} className="text-[#1A3A8F]" />
        </div>
        <h3 className="font-display font-bold text-[#1A202C] text-xl mb-2">
          Message envoyé !
        </h3>
        <p className="text-[#4A5568] text-sm">
          Merci, nous vous répondrons dans les 24–48h. <br />
          <span className="italic">Thank you, we will reply within 24–48 hours.</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nom complet / Full name <span className="text-[#D32F2F]">*</span>
          </label>
          <input
            id="name" type="text" value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Votre nom / Your name"
            className={`${inputClass} ${errors.name ? "border-[#D32F2F]" : ""}`}
          />
          {errors.name && <p className="mt-1 text-xs text-[#D32F2F]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email" type="email" value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="exemple@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Téléphone / Phone
          </label>
          <input
            id="phone" type="tel" value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="6XX XX XX XX"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sujet" className={labelClass}>
            Sujet / Subject
          </label>
          <select
            id="sujet" value={form.sujet}
            onChange={(e) => set("sujet", e.target.value)}
            className={inputClass}
          >
            <option value="">-- Sélectionner / Select --</option>
            {SUJETS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-[#D32F2F]">*</span>
        </label>
        <textarea
          id="message" rows={5} value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Votre message… / Your message…"
          className={`${inputClass} resize-y min-h-[120px] ${errors.message ? "border-[#D32F2F]" : ""}`}
        />
        {errors.message && <p className="mt-1 text-xs text-[#D32F2F]">{errors.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent" type="checkbox"
          checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#1A3A8F] flex-shrink-0"
        />
        <label htmlFor="consent" className="text-sm text-[#4A5568] cursor-pointer">
          J&apos;accepte que mes données soient utilisées pour répondre à ma demande.
          <span className="block text-xs italic text-[#4A5568]/70 mt-0.5">
            I agree my data will be used to respond to my request.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-lg
          bg-[#D32F2F] text-white font-semibold
          hover:bg-[#B71C1C] hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0
          transition-all duration-200 shadow-[0_4px_15px_rgba(211,47,47,0.3)]"
      >
        {status === "loading" ? (
          <><Loader2 size={18} className="animate-spin" /> Envoi…</>
        ) : (
          <><Send size={18} /> Envoyer le message / Send Message</>
        )}
      </button>
    </form>
  );
}
