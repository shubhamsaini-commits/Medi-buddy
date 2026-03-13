export default function About() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Page heading ───────────────────────────────────────────────── */}
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            About <span className="text-cyan-500">Us</span>
          </h1>
          <div className="w-16 h-1 bg-cyan-500 rounded-full" />
        </div>

        {/* ── Main 3-col layout ──────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Left: Mission ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 bg-gray-50 border border-gray-100 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-cyan-50 border border-cyan-100 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-cyan-500">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
            </div>

            <div className="flex flex-col gap-5 text-sm text-gray-600 leading-relaxed">
              <div>
                <p className="font-bold text-gray-900 text-base mb-1">
                  Ending the "Guess & Check" Era of Medicine
                </p>
                <p>
                  Welcome! We are <span className="font-semibold text-gray-800">Team Cure Crew</span>, the creators behind MediBuddy. We
                  realized that traditional prescribing often ignores your unique genetics.
                  Doctors rarely analyze raw genomic data, leading to over{" "}
                  <span className="font-bold text-gray-900">100,000 deaths annually</span> from
                  adverse drug reactions.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-3">How MediBuddy Protects You:</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: "Personalized Safety", desc: "Classifies medications as Safe, Toxic, Ineffective, or Adjusted Dose" },
                    { label: "Early Detection", desc: "Catches toxic drug-gene interactions before harm" },
                    { label: "Clear Insights", desc: "Explainable AI with risk summaries and alternatives" },
                    { label: "Reliable Guidance", desc: "Probability-based confidence scores" },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <p><span className="font-semibold text-gray-800">{label}:</span> {desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="italic text-gray-400 text-xs border-t border-gray-200 pt-4">
                Building the future with at-home genetic testing and EHR integration.
              </p>
            </div>
          </div>

          {/* ── Right col ─────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 w-full lg:w-80 shrink-0">

            {/* Medical Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-amber-500 shrink-0">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
                </svg>
                <h3 className="font-bold text-amber-700">Medical Disclaimer</h3>
              </div>
              <div className="flex flex-col gap-3 text-sm text-amber-800 leading-relaxed">
                <p>
                  This website is for{" "}
                  <span className="font-bold">educational and research purposes only</span>.
                </p>
                <p>
                  It does <span className="font-bold underline">NOT replace professional medical advice</span>,
                  diagnosis, or treatment.
                </p>
                <p>
                  Always consult qualified healthcare professionals before making medical decisions.
                </p>
              </div>
            </div>

            {/* Get In Touch */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-4">Get In Touch</h3>
              <div className="flex flex-col gap-4">

                {/* Email */}
                <a
                  href="mailto:medibuddy@gmail.com" // ✏️ replace with your email
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-blue-500">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Email</p>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors">
                      medibuddy@gmail.com {/* ✏️ replace */}
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-emerald-500">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.15a16 16 0 006.29 6.29l1.42-1.42a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                    <p className="text-sm font-semibold text-gray-800">
                      +91 99909 18585 {/* ✏️ replace */}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-purple-500">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Location</p>
                    <p className="text-sm font-semibold text-gray-800">
                      Faridabad, Haryana {/* ✏️ replace */}
                    </p>
                    <p className="text-xs text-gray-400">India 121006</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
