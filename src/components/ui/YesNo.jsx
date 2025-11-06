import clsx from "clsx";

export default function YesNo({ id, value, onChange }) {
  return (
    <div className="mt-1 inline-flex overflow-hidden rounded-xl border border-slate-200">
      <button type="button" onClick={() => onChange(true)} className={clsx("px-3 py-2 text-sm", value ? "bg-emerald-500 text-white" : "bg-white text-slate-700")}>OUI</button>
      <button type="button" onClick={() => onChange(false)} className={clsx("px-3 py-2 text-sm", !value ? "bg-emerald-500 text-white" : "bg-white text-slate-700")}>NON</button>
    </div>
  );
}

