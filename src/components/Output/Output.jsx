import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./Output.module.css"
import DrugCard from "../DrugCard/DrugCard";


const API_BASE_URL = "http://127.0.0.1:8000";

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin text-cyan-500" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export default function Upload() {
  // ── File state ──────────────────────────────────────────────────────────
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  // ── Dropdown / selection state ──────────────────────────────────────────
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [search, setSearch] = useState("");

  // ── Fetch state ─────────────────────────────────────────────────────────
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // file upload states 
  const [analyzing, setAnalyzing] = useState(false);


  // api response handling
  const [analysisResult, setAnalysisResult] = useState(null);




  // ── Fetch all drugs once when dropdown first opens ──────────────────────
  // Expected API: GET /drugs  →  { drugs: string[] }
  useEffect(() => {
    if (!dropdownOpen || drugs.length > 0 || loading) return;
    const fetchDrugs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/drugs`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setDrugs(data.drugs);
      } catch (err) {
        setError(err.message || "Failed to load drugs.");
      } finally {
        setLoading(false);
      }
    };
    fetchDrugs();
  }, [dropdownOpen]);

  // ── Open / close helpers ────────────────────────────────────────────────
  const openDropdown = () => setDropdownOpen(true);
  const closeDropdown = () => { setDropdownOpen(false); setSearch(""); };

  // ── File handlers ───────────────────────────────────────────────────────
  const handleFile = (f) => {
    if (f && (f.name.endsWith(".vcf"))) {
      setFile(f);
    } else {
      alert("Please upload a valid VCF file (.vcf )");
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  // ── Drug selection ──────────────────────────────────────────────────────
  const toggleDrug = (drug) =>
    setSelectedDrugs((prev) =>
      prev.includes(drug) ? prev.filter((d) => d !== drug) : [...prev, drug]
    );
  const removeDrug = (drug) =>
    setSelectedDrugs((prev) => prev.filter((d) => d !== drug));

  const filteredDrugs = drugs.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  const canAnalyze = file && selectedDrugs.length > 0;


  const handleAnalyze = async () => {
  if (!canAnalyze) return;
  setAnalyzing(true);
  try {
    const formData = new FormData();
    formData.append("file", file);               // the VCF file
    selectedDrugs.forEach(drug => formData.append("selected_drugs", drug));
    const res = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    setAnalysisResult(data);
    console.log(data);


  } catch (err) {
    alert(err.message || "Analysis failed.");
  } finally {
    setAnalyzing(false);
  }



};


  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Page Header */}
      <div className="text-center mb-10 px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Analyze Genetic Data
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Upload your VCF file to begin the pharmacogenomic analysis.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">

        {/* ── Drop Zone ─────────────────────────────────────────────────── */}
        <div 
        id="output-sec"
          onClick={() => fileInputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 p-10 flex flex-col items-center justify-center text-center gap-3
            ${dragging
              ? "border-cyan-400 bg-cyan-50 scale-[1.01]"
              : file
              ? "border-emerald-300 bg-emerald-50"
              : "border-gray-200 bg-gray-50 hover:border-cyan-300 hover:bg-cyan-50/40"
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".vcf"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          />

          {file ? (
            <>
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-emerald-500">
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-emerald-700 text-base">{file.name}</p>
                <p className="text-emerald-500 text-sm mt-0.5">
                  {(file.size / 1024).toFixed(1)} KB · VCF file ready
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="mt-1 text-xs text-gray-400 hover:text-red-400 underline transition-colors"
              >
                Remove file
              </button>
            </>
          ) : (
            <>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200 ${dragging ? "bg-cyan-100" : "bg-gray-200"}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`w-7 h-7 transition-colors ${dragging ? "text-cyan-500" : "text-gray-400"}`}>
                  <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className={`font-semibold text-base transition-colors ${dragging ? "text-cyan-600" : "text-gray-700"}`}>
                  {dragging ? "Drop it here!" : "Drag & Drop VCF File Here"}
                </p>
                <p className="text-gray-400 text-sm mt-0.5">or click to browse</p>
              </div>
              <p className="text-xs text-gray-400">Supports .vcf  files</p>
            </>
          )}
        </div>

        {/* ── Drug Dropdown ──────────────────────────────────────────────── */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Drugs to Analyze
          </label>

          {/* Trigger button */}
          <button
            onClick={() => dropdownOpen ? closeDropdown() : openDropdown()}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 bg-white text-left
              ${dropdownOpen ? "border-cyan-400 ring-2 ring-cyan-100" : "border-gray-200 hover:border-cyan-300"}`}
          >
            <span className={selectedDrugs.length ? "text-gray-800 font-medium" : "text-gray-400"}>
              {selectedDrugs.length === 0
                ? "Search and select drugs..."
                : `${selectedDrugs.length} drug${selectedDrugs.length > 1 ? "s" : ""} selected`}
                
            </span>
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            >
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
           
          </button>

          {/* Selected drug chips */}
          {selectedDrugs.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedDrugs.map((drug) => (
                <span
                  key={drug}
                  className=" inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {drug}
                  <button onClick={() => removeDrug(drug)} className="hover:text-red-500 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Dropdown panel */}
          {dropdownOpen && (
            <div className="absolute z-30 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">

              {/* Search bar */}
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400 shrink-0">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search drugs..."
                    className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
                  />
                  {search && (
                    <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500 transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Drug list */}
              <ul className="max-h-52 overflow-y-auto py-1">

                {/* Loading state */}
                {loading && (
                  <li className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400">
                    <Spinner /> Loading drugs...
                  </li>
                )}

                {/* Error state */}
                {error && !loading && (
                  <li className="px-4 py-3 text-sm text-red-500 text-center">
                    {error}{" "}
                    <button
                      onClick={() => { setDrugs([]); openDropdown(); }}
                      className="underline text-cyan-600 hover:text-cyan-700"
                    >
                      Retry
                    </button>
                  </li>
                )}

                {/* Drug rows */}
                {!loading && filteredDrugs.map((drug) => {
                  const selected = selectedDrugs.includes(drug);
                  return (
                    <li key={drug}>
                      <button
                        onClick={() => toggleDrug(drug)}
                        className={`w-full flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150
                          ${selected ? "bg-cyan-50 text-cyan-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        {drug}
                        {selected && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-cyan-500 shrink-0">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    </li>
                  );
                })}

                {/* No search results */}
                {!loading && !error && filteredDrugs.length === 0 && drugs.length > 0 && (
                  <li className="px-4 py-3 text-sm text-gray-400 text-center">
                    No drugs match "{search}"
                  </li>
                )}
              </ul>

              {/* Footer */}
              <div className="border-t border-gray-100 px-4 py-2 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {!loading && drugs.length > 0 ? `${drugs.length} drugs available` : ""}
                </span>
                <button
                  onClick={closeDropdown}
                  className="text-xs text-cyan-600 font-medium hover:underline"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Analyze Button ─────────────────────────────────────────────── */}
        <button
  disabled={!canAnalyze || analyzing}
  onClick={handleAnalyze}
  className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200
    ${canAnalyze && !analyzing
      ? "bg-cyan-500 hover:bg-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-200 active:scale-[0.98]"
      : "bg-gray-100 text-gray-400 cursor-not-allowed"
    }`}
>
  {analyzing
    ? "Analyzing..."
    : canAnalyze
    ? `Analyze ${selectedDrugs.length} Drug${selectedDrugs.length > 1 ? "s" : ""}`
    : "Upload a VCF file and select drugs to continue"}
</button>

      </div>



 {analysisResult && (
  <DrugCard
    detected_genes={analysisResult.detected_genes}
    results={analysisResult.results}
  />
)
}
  
    </div>
  );
}