export function Card({ title, subtitle, right, children, id, highlight = false }) {
  return (
    <section
      id={id}
      className={`rounded-2xl border bg-white shadow-md transition-all ${
        highlight
          ? "border-emerald-400 ring-2 ring-emerald-400 ring-opacity-50 shadow-lg"
          : "border-slate-200 hover:shadow-lg"
      }`}
    >
      {(title || right) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-5">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
