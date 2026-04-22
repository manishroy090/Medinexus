import { useState, useRef, useEffect } from "react";

const COUNTRIES = [
  { flag: "🇺🇸", name: "United States", code: "USD" },
  { flag: "🇨🇳", name: "China",          code: "CNY" },
  { flag: "🇩🇪", name: "Germany",        code: "EUR" },
  { flag: "🇯🇵", name: "Japan",          code: "JPY" },
  { flag: "🇬🇧", name: "United Kingdom", code: "GBP" },
  { flag: "🇫🇷", name: "France",         code: "EUR" },
  { flag: "🇮🇳", name: "India",          code: "INR" },
  { flag: "🇧🇷", name: "Brazil",         code: "BRL" },
  { flag: "🇨🇦", name: "Canada",         code: "CAD" },
  { flag: "🇰🇷", name: "South Korea",    code: "KRW" },
  { flag: "🇦🇺", name: "Australia",      code: "AUD" },
  { flag: "🇸🇬", name: "Singapore",      code: "SGD" },
  { flag: "🇳🇵", name: "Nepal",          code: "NPR" },
  { flag: "🇿🇦", name: "South Africa",   code: "ZAR" },
  { flag: "🇲🇽", name: "Mexico",         code: "MXN" },
];

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-blue-500 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function CountrySelector({
  countries = COUNTRIES,
  defaultCountry = COUNTRIES[0],
  onChange,
  placeholder = "Select country...",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultCountry);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);
  const searchRef = useRef(null);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.code.toLowerCase().includes(query.toLowerCase())
  );

  const handleToggle = () => {
    setOpen((prev) => !prev);
    setQuery("");
  };

  const handleSelect = (country) => {
    setSelected(country);
    setOpen(false);
    setQuery("");
    onChange?.(country);
  };

  // Focus search when dropdown opens
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-64 ${className}`}>

      {/* Trigger Button */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-lg">{selected.flag}</span>
        <span className="flex-1 text-left font-medium truncate">{selected.name}</span>
        <ChevronIcon open={open} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="px-3 pt-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100">
            Select Region
          </div>

          {/* Search */}
          <div className="px-2.5 py-2 border-b border-gray-100">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country..."
              className="w-full px-2.5 py-1.5 text-xs rounded-md bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* List */}
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length > 0 ? (
              filtered.map((country) => {
                const isSelected = country.name === selected.name;
                return (
                  <li
                    key={country.name}
                    onClick={() => handleSelect(country)}
                    className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm transition-colors ${
                      isSelected
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{country.name}</p>
                      <p className={`text-[11px] ${isSelected ? "text-blue-400" : "text-gray-400"}`}>
                        {country.code}
                      </p>
                    </div>
                    {isSelected && <CheckIcon />}
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-4 text-xs text-gray-400 text-center">
                No countries found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}