export function Label({ children, htmlFor, hint }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
      {children}
      {hint && <span className="ml-1 text-[11px] text-slate-500">{hint}</span>}
    </label>
  );
}
