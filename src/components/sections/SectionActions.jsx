import { Card } from "../ui";

export default function SectionActions({ ecoScore, actions, openAction, setOpenAction }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="actions" title="Pistes d'amélioration" subtitle="Note actuelle et actions pour gagner des points">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 grid place-items-center rounded-full border border-emerald-300 text-xl font-bold text-emerald-700">{ecoScore}</div>
            <div>
              <div className="text-sm text-slate-600">Note actuelle (fictive) /100</div>
              <div className="text-xs text-slate-500">Clique une action pour voir le détail</div>
            </div>
          </div>
        </div>

        <ul className="space-y-3">
          {actions.map((a) => (
            <li key={a.id} className="rounded-xl border border-slate-200 bg-white">
              <button
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
                onClick={() => setOpenAction(openAction === a.id ? null : a.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">+{a.gain}</span>
                  <span className="text-sm font-medium text-slate-800">{a.title}</span>
                </div>
                <span className="text-slate-400">{openAction === a.id ? "–" : "+"}</span>
              </button>
              {openAction === a.id && (
                <div className="border-t border-slate-100 p-4 text-sm text-slate-600">{a.detail}</div>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

