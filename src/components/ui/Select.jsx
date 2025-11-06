export default function Select({ id, value, onChange, children }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
    >
      {children}
    </select>
  );
}

