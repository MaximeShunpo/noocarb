import clsx from "clsx";

export default function Card({ title, subtitle, right, children, id, highlight = false }) {
  return (
    <section id={id} className={clsx("rounded-2xl border bg-white shadow-sm", highlight ? "border-emerald-400 ring-1 ring-emerald-400" : "border-slate-200")}>
      {(title || right) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-4">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

