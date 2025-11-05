export function Stepper({ steps, current, onNav }) {
  return (
    <ol className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key}>
            <button
              onClick={() => onNav?.(i)}
              className={`w-full rounded-2xl border p-3 text-left transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                active
                  ? "border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-400 ring-opacity-30"
                  : done
                  ? "border-emerald-200 bg-white shadow-sm hover:shadow-md"
                  : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-all ${
                    active
                      ? "bg-emerald-500 text-white shadow-sm"
                      : done
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {done && !active ? "✓" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
                    {s.kicker}
                  </div>
                  <div className="text-sm font-medium text-slate-800 flex items-center gap-1 truncate">
                    {s.label}
                  </div>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
