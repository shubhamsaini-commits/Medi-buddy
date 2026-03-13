import { useEffect, useRef } from "react";

// ── Risk config — drives all color + icon logic ─────────────────────────────
const RISK_CONFIG = {
  Safe: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    bar: "bg-emerald-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    dot: "bg-emerald-400",
    label: "Safe",
  },
  "Adjust Dose": {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    bar: "bg-amber-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    dot: "bg-amber-400",
    label: "Adjust Dose",
  },
  Toxic: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    bar: "bg-red-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
      </svg>
    ),
    dot: "bg-red-400",
    label: "Toxic",
  },
  Ineffective: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-600",
    bar: "bg-slate-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" strokeLinecap="round" />
      </svg>
    ),
    dot: "bg-slate-400",
    label: "Ineffective",
  },
  Unknown: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    badge: "bg-gray-100 text-gray-500",
    bar: "bg-gray-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round" />
      </svg>
    ),
    dot: "bg-gray-400",
    label: "Unknown",
  },
};

const getRiskConfig = (risk) =>
  RISK_CONFIG[risk] || RISK_CONFIG.Unknown;

// ── Single drug card ─────────────────────────────────────────────────────────
function DrugCard({ drug, risk, recommendation, index }) {
  const cfg = getRiskConfig(risk);
  const cardRef = useRef(null);

  // CSS keyframe animation with staggered delay — no GSAP dependency needed
  // but we set the delay via inline style based on index
  const delay = `${index * 100}ms`;

  return (
    <div
      ref={cardRef}
      style={{ animationDelay: delay }}
      className={`
        relative rounded-2xl border ${cfg.border} ${cfg.bg}
        p-5 flex flex-col gap-3 min-w-0
        opacity-0 translate-y-4
        animate-[fadeSlideUp_0.4s_ease_forwards]
        hover:-translate-y-1 hover:shadow-lg transition-transform duration-200
      `}
    >
      {/* Top row: drug name + risk badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Colored dot */}
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />
          <h3 className="font-bold text-gray-900 text-base leading-tight truncate">{drug}</h3>
        </div>

        {/* Risk badge */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${cfg.badge}`}>
          {cfg.icon}
          {risk}
        </span>
      </div>

      {/* Recommendation */}
      <p className="text-sm text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-200 break-words">
        {recommendation}
      </p>

      {/* Risk indicator bar */}
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${cfg.bar} transition-all duration-700`}
          style={{
            width:
              risk === "Safe" ? "30%" :
              risk === "Adjust Dose" ? "60%" :
              risk === "Toxic" ? "100%" :
              risk === "Ineffective" ? "45%" : "20%",
            transitionDelay: `${index * 100 + 300}ms`,
          }}
        />
      </div>
    </div>
  );
}

// ── Gene chip ────────────────────────────────────────────────────────────────
function GeneChip({ gene, index }) {
  return (
    <span
      style={{ animationDelay: `${index * 60}ms` }}
      className="
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full
        bg-cyan-50 border border-cyan-200 text-cyan-700
        text-xs font-semibold tracking-wide
        opacity-0 animate-[fadeSlideUp_0.35s_ease_forwards]
      "
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {gene}
    </span>
  );
}

// ── Risk legend ──────────────────────────────────────────────────────────────
function RiskLegend() {
  const items = [
    { label: "Safe", dot: "bg-emerald-400" },
    { label: "Adjust Dose", dot: "bg-amber-400" },
    { label: "Toxic", dot: "bg-red-400" },
    { label: "Ineffective", dot: "bg-slate-400" },
    { label: "Unknown", dot: "bg-gray-400" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ label, dot }) => (
        <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          {label}
        </span>
      ))}
    </div>
  );
}

// ── Summary stat ─────────────────────────────────────────────────────────────
function StatPill({ label, count, color }) {
  return (
    <div className={`flex flex-col items-center px-4 py-2 rounded-xl ${color} min-w-[60px]`}>
      <span className="text-lg font-extrabold leading-none">{count}</span>
      <span className="text-xs mt-0.5 font-medium opacity-80">{label}</span>
    </div>
  );
}

// ── Main DrugResults component ───────────────────────────────────────────────
/**
 * Props:
 *   detected_genes  — string[]
 *   results         — { drug: string, risk: string, recommendation: string }[]
 */
export default function DrugResults({ detected_genes = [], results = [] }) {
  // Derive summary counts
  const counts = results.reduce((acc, r) => {
    acc[r.risk] = (acc[r.risk] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {/* Inject keyframe into document head once */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Analysis Results
            </h1>
            <p className="text-gray-600 text-base">
              Pharmacogenomic safety assessment for {results.length} drug{results.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* ── Summary pills ────────────────────────────────────────────── */}
          <div className="flex flex-wrap justify-center gap-3">
            {counts["Safe"] && (
              <StatPill label="Safe" count={counts["Safe"]} color="bg-emerald-50 text-emerald-700" />
            )}
            {counts["Adjust Dose"] && (
              <StatPill label="Adjust" count={counts["Adjust Dose"]} color="bg-amber-50 text-amber-700" />
            )}
            {counts["Toxic"] && (
              <StatPill label="Toxic" count={counts["Toxic"]} color="bg-red-50 text-red-700" />
            )}
            {counts["Ineffective"] && (
              <StatPill label="Ineffective" count={counts["Ineffective"]} color="bg-slate-50 text-slate-600" />
            )}
            {counts["Unknown"] && (
              <StatPill label="Unknown" count={counts["Unknown"]} color="bg-gray-50 text-gray-500" />
            )}
          </div>

          {/* ── Detected genes ───────────────────────────────────────────── */}
          {detected_genes.length > 0 && (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-cyan-500">
                  <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">
                  Detected Genes
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    ({detected_genes.length} identified)
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {detected_genes.map((gene, i) => (
                  <GeneChip key={gene} gene={gene} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* ── Drug cards ───────────────────────────────────────────────── */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h2 className="text-sm font-semibold text-gray-700">Drug Safety Assessment</h2>
              <RiskLegend />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map((r, i) => (
                <DrugCard
                  key={r.drug}
                  drug={r.drug}
                  risk={r.risk}
                  recommendation={r.recommendation}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* ── Disclaimer ───────────────────────────────────────────────── */}
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            This analysis is AI-generated and intended for informational purposes only.
            Always consult a qualified healthcare provider before making any medication decisions.
          </p>

        </div>
      </div>
    </>
  );
}
