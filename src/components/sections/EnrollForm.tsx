"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

type Step = 1 | 2;
type Status = "idle" | "loading" | "success" | "error";

const NIVEAUX = [
  "Crèche (0 – 2 ans)",
  "Maternelle – Pré-nursery (2 – 3 ans)",
  "Maternelle – Nursery (3 – 5 ans)",
  "Primaire Francophone – CP",
  "Primaire Francophone – CE1",
  "Primaire Francophone – CE2",
  "Primaire Francophone – CM1",
  "Primaire Francophone – CM2",
  "Primaire Anglophone – Class 1",
  "Primaire Anglophone – Class 2",
  "Primaire Anglophone – Class 3",
  "Primaire Anglophone – Class 4",
  "Primaire Anglophone – Class 5",
  "Primaire Anglophone – Class 6",
];

const inputClass =
  "w-full px-4 py-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[#1A202C] text-sm " +
  "placeholder-[#A0AEC0] focus:outline-none focus:border-[#1A3A8F] " +
  "focus:ring-2 focus:ring-[#1A3A8F]/15 transition-colors duration-200";

const labelClass = "block text-sm font-semibold text-[#1A202C] mb-1.5";

export default function EnrollForm() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    childName: "",
    dob: "",
    niveau: "",
    section: "",
    fatherName: "",
    motherName: "",
    phone1: "",
    phone2: "",
    email: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const set = (field: keyof typeof form, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validateStep1 = () => {
    const e: Partial<typeof form> = {};
    if (!form.childName.trim()) e.childName = "Requis / Required";
    if (!form.dob) e.dob = "Requis / Required";
    if (!form.niveau) e.niveau = "Requis / Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<typeof form> = {};
    if (!form.phone1.trim()) e.phone1 = "Requis / Required";
    if (!form.consent) e.consent = "Requis / Required" as unknown as boolean;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setStatus("loading");

    // Simule un envoi — à connecter à une API route ou Formspree
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="text-center py-16 px-6 bg-[#F7F9FC] rounded-2xl border border-[#E2E8F0]">
        <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-[#1A3A8F]" />
        </div>
        <h3 className="font-display font-bold text-[#1A202C] text-2xl mb-3">
          Demande envoyée !
        </h3>
        <p className="text-[#4A5568] mb-2">
          Votre message a bien été envoyé. Merci de votre intérêt pour le Complexe Scolaire
          Bilingue Les Génies d&apos;Afrique.
        </p>
        <p className="text-[#4A5568]/70 text-sm italic">
          Your request has been sent. A member of our team will contact you within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F9FC] rounded-2xl border border-[#E2E8F0] overflow-hidden">
      {/* Indicateur de progression */}
      <div className="flex border-b border-[#E2E8F0]">
        {([1, 2] as Step[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => s === 1 && setStep(1)}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              step === s
                ? "bg-white text-[#1A3A8F] border-b-2 border-[#1A3A8F]"
                : s < step
                ? "bg-white text-[#2E7D32]"
                : "bg-[#F7F9FC] text-[#A0AEC0] cursor-default"
            }`}
          >
            {s < step ? "✓ " : `${s}. `}
            {s === 1 ? "Informations élève / Student" : "Informations parents / Parents"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-6 md:p-8">
        {/* ── ÉTAPE 1 ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="childName" className={labelClass}>
                Nom complet de l&apos;enfant / Child&apos;s full name <span className="text-[#D32F2F]">*</span>
              </label>
              <input
                id="childName"
                type="text"
                value={form.childName}
                onChange={(e) => set("childName", e.target.value)}
                placeholder="Ex : Jean-Pierre Mbarga / Jane Doe"
                className={`${inputClass} ${errors.childName ? "border-[#D32F2F] focus:ring-[#D32F2F]/15" : ""}`}
              />
              {errors.childName && <p className="mt-1 text-xs text-[#D32F2F]">{errors.childName}</p>}
            </div>

            <div>
              <label htmlFor="dob" className={labelClass}>
                Date de naissance / Date of birth <span className="text-[#D32F2F]">*</span>
              </label>
              <input
                id="dob"
                type="date"
                value={form.dob}
                onChange={(e) => set("dob", e.target.value)}
                className={`${inputClass} ${errors.dob ? "border-[#D32F2F] focus:ring-[#D32F2F]/15" : ""}`}
              />
              {errors.dob && <p className="mt-1 text-xs text-[#D32F2F]">{errors.dob}</p>}
            </div>

            <div>
              <label htmlFor="niveau" className={labelClass}>
                Niveau souhaité / Desired level <span className="text-[#D32F2F]">*</span>
              </label>
              <select
                id="niveau"
                value={form.niveau}
                onChange={(e) => set("niveau", e.target.value)}
                className={`${inputClass} ${errors.niveau ? "border-[#D32F2F] focus:ring-[#D32F2F]/15" : ""}`}
              >
                <option value="">-- Sélectionner / Select --</option>
                {NIVEAUX.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              {errors.niveau && <p className="mt-1 text-xs text-[#D32F2F]">{errors.niveau}</p>}
            </div>

            <div>
              <label htmlFor="section" className={labelClass}>
                Section / Section
              </label>
              <select
                id="section"
                value={form.section}
                onChange={(e) => set("section", e.target.value)}
                className={inputClass}
              >
                <option value="">-- Sélectionner / Select --</option>
                <option value="Francophone">Section Francophone</option>
                <option value="Anglophone">Section Anglophone</option>
                <option value="Bilingue">Bilingue / Bilingual</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-lg
                  bg-[#1A3A8F] text-white font-semibold
                  hover:bg-[#0D1F6B] hover:-translate-y-0.5 transition-all duration-200"
              >
                Étape suivante / Next Step
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 2 ── */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fatherName" className={labelClass}>
                  Nom du père / Father&apos;s name
                </label>
                <input
                  id="fatherName"
                  type="text"
                  value={form.fatherName}
                  onChange={(e) => set("fatherName", e.target.value)}
                  placeholder="Nom complet / Full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="motherName" className={labelClass}>
                  Nom de la mère / Mother&apos;s name
                </label>
                <input
                  id="motherName"
                  type="text"
                  value={form.motherName}
                  onChange={(e) => set("motherName", e.target.value)}
                  placeholder="Nom complet / Full name"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone1" className={labelClass}>
                  Téléphone principal / Primary phone <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  id="phone1"
                  type="tel"
                  value={form.phone1}
                  onChange={(e) => set("phone1", e.target.value)}
                  placeholder="Ex : 6XX XX XX XX"
                  className={`${inputClass} ${errors.phone1 ? "border-[#D32F2F] focus:ring-[#D32F2F]/15" : ""}`}
                />
                {errors.phone1 && <p className="mt-1 text-xs text-[#D32F2F]">{errors.phone1}</p>}
              </div>
              <div>
                <label htmlFor="phone2" className={labelClass}>
                  Téléphone secondaire / Secondary phone
                </label>
                <input
                  id="phone2"
                  type="tel"
                  value={form.phone2}
                  onChange={(e) => set("phone2", e.target.value)}
                  placeholder="Ex : 6XX XX XX XX"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="exemple@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message (optionnel / optional)
              </label>
              <textarea
                id="message"
                rows={3}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Questions, précisions, besoins particuliers…"
                className={`${inputClass} resize-y min-h-[90px]`}
              />
            </div>

            {/* Consentement */}
            <div className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#1A3A8F] flex-shrink-0"
              />
              <label htmlFor="consent" className="text-sm text-[#4A5568] cursor-pointer">
                J&apos;accepte que mes données soient utilisées pour traiter ma demande d&apos;inscription.
                <span className="block text-xs italic text-[#4A5568]/70 mt-0.5">
                  I agree that my data will be used to process my enrollment request.
                </span>
                {errors.consent && <span className="block mt-0.5 text-xs text-[#D32F2F]">Requis / Required</span>}
              </label>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-lg border-2 border-[#E2E8F0]
                  text-[#4A5568] font-semibold text-sm hover:border-[#1A3A8F] hover:text-[#1A3A8F]
                  transition-colors duration-200"
              >
                <ArrowLeft size={16} />
                Retour / Back
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg
                  bg-[#D32F2F] text-white font-semibold
                  hover:bg-[#B71C1C] hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0
                  transition-all duration-200 shadow-[0_4px_15px_rgba(211,47,47,0.3)]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Envoi en cours…
                  </>
                ) : (
                  <>Envoyer la demande / Submit Request</>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
