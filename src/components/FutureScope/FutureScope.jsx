const FUTURE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-cyan-50 text-cyan-500",
    tag: "For Patients",
    tagColor: "bg-cyan-100 text-cyan-700",
    title: "Home Genetic Testing Integration",
    desc: "Support for at-home genetic testing kits where users submit DNA samples and automatically receive personalized drug safety recommendations directly through the platform.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-emerald-50 text-emerald-500",
    tag: "For Doctors",
    tagColor: "bg-emerald-100 text-emerald-700",
    title: "Clinical Decision Support for Hospitals",
    desc: "Integration with hospital systems to assist doctors during prescription decisions — suggesting safe medications, adjusted doses, and potential drug interactions in real time.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-blue-50 text-blue-500",
    tag: "For Hospitals",
    tagColor: "bg-blue-100 text-blue-700",
    title: "EHR Integration",
    desc: "Direct connection with Electronic Health Record systems to automatically access patient data and provide instant pharmacogenomic insights within the doctor's existing workflow.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-purple-50 text-purple-500",
    tag: "Computer Vision",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Optical Drug Detection",
    desc: "Upload images of tablet wrappers or medicine packaging. AI and computer vision will detect the drug name and cross-check it with your genetic profile for safety instantly.",
  },
];

function FutureCard({ icon, iconBg, tag, tagColor, title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col gap-4 border border-gray-100">

      {/* Icon + Tag row */}
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor}`}>
          {tag}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-gray-900 text-base leading-snug">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>

      {/* Bottom accent bar */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400 flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-cyan-400">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Coming soon
        </span>
      </div>
    </div>
  );
}

export default function FutureScope() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            What's Next
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Future <span className="text-cyan-500">Scope</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            MediBuddy is just getting started. Here's what we're building next to make
            pharmacogenomics accessible to everyone.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FUTURE_CARDS.map((card) => (
            <FutureCard key={card.title} {...card} />
          ))}
        </div>

      </div>
    </section>
  );
}