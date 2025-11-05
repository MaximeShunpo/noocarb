export function Input({ id, type = "text", value, onChange, placeholder, required, pattern }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      pattern={pattern}
      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-300"
    />
  );
}
