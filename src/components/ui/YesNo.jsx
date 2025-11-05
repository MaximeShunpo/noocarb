export function YesNo({ id, value, onChange }) {
  return (
    <div className="mt-1 inline-flex overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-4 py-2 text-sm font-medium transition-all ${
          value ? "bg-emerald-500 text-white shadow-inner" : "bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        OUI
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-4 py-2 text-sm font-medium transition-all ${
          !value ? "bg-emerald-500 text-white shadow-inner" : "bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        NON
      </button>
    </div>
  );
}
