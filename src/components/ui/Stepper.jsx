import clsx from "clsx";

export default function Stepper({ steps, current, onNav }) {
  return (
    <ol className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-9">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key}>
            <button onClick={() => onNav?.(i)} className={clsx("w-full rounded-2xl border p-3 text-left transition bg-white", active ? "border-emerald-500" : done ? "border-emerald-200" : "border-slate-200 hover:border-slate-300")}>
              <div className="flex items-center gap-2">
                <div className={clsx("grid h-6 w-6 place-items-center rounded-full text-xs font-semibold", active ? "bg-emerald-500 text-white" : done ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-700")}>
                  {i + 1}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-slate-500">{s.kicker}</div>
                  <div className="text-sm font-medium text-slate-800 flex items-center gap-1">
                    {s.label}
                    {done && <span className="text-emerald-600 text-xs">✓</span>}
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

