import clsx from "clsx";

export default function Stepper({ steps, current, onNav }) {
  return (
    <ol className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key}>
            <button 
              onClick={() => onNav?.(i)} 
              className={clsx(
                "w-full rounded-xl border p-2.5 text-left transition bg-white hover:shadow-sm",
                active ? "border-emerald-500 ring-1 ring-emerald-500" : done ? "border-emerald-200" : "border-slate-200 hover:border-slate-300"
              )}
            >
              <div className="flex items-start gap-2.5">
                <div className={clsx(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold flex-shrink-0 mt-0.5",
                  active ? "bg-emerald-500 text-white" : done ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-700"
                )}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] uppercase tracking-wide text-slate-500 mb-0.5 leading-tight">
                    {s.kicker}
                  </div>
                  <div className="text-xs font-medium text-slate-800 leading-snug break-words">
                    {s.label}
                    {done && <span className="ml-1 text-emerald-600 text-[10px]">✓</span>}
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
