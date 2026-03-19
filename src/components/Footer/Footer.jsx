export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M8 12h8M12 8v8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">
            <span className="text-white">Medi</span>
            <span className="text-cyan-500">Buddy</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-400 text-center max-w-sm">
          AI Powered Pharmacogenomics — bridging genomic data and clinical decision-making.
        </p>

        {/* Privacy notice */}
        <div className="flex items-start gap-3 bg-cyan-950 border border-cyan-900 rounded-xl px-5 py-4 max-w-lg text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-xs text-cyan-300 leading-relaxed">
            <span className="font-semibold">Your data stays private.</span> We do not store or collect your VCF files.
            Only the genetic variants are extracted to perform the analysis —
            your file is permanently deleted from our server immediately after processing.
          </p>
        </div>

        {/* Medical disclaimer */}
        <p className="text-xs text-gray-500 text-center max-w-md leading-relaxed">
          ⚠️ MediBuddy is intended for informational purposes only and is not a substitute
          for professional medical advice, diagnosis, or treatment. Always consult a
          qualified healthcare provider before making any medication decisions.
        </p>

        {/* Bottom bar */}
        <div className="w-full border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span className="text-gray-500">© 2026 MediBuddy. All rights reserved.</span>

          <div className="flex items-center gap-4">
            {/* ✏️ Replace href with your actual GitHub repo URL */}
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>

            {/* ✏️ Replace href with your actual email */}
            <a href="mailto:your@email.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Contact
            </a>

            <span className="flex items-center gap-1.5">
              Built with
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-red-400">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              for better healthcare
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}