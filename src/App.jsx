import React, { useState, useMemo } from "react";
import clsx from "clsx";
import { Stepper } from "./components/ui";
import {
  SectionFlotte,
  SectionAutresEntrees,
  SectionGNC,
  SectionH2,
  SectionElec,
  SectionDiesel,
  SectionRecap,
  SectionCharts,
  SectionActions,
} from "./components/sections";
import { STEPS } from "./constants/form";
import { useFormState } from "./hooks/useFormState";
import { useFormData } from "./hooks/useFormData";
import { exportJson } from "./utils/helpers";
import { getActions } from "./utils/actions";

/**
 * Noocarb – Maquette web‑app (Mobilité + Options + Graphiques + Actions)
 * React + Tailwind + Recharts
 */

export default function App() {
  const { form, update, push, removeAt, reset } = useFormState();
  const { fleetByType, energyPerType, ecoScore } = useFormData(form);
  const [step, setStep] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [openAction, setOpenAction] = useState(null);

  const actions = useMemo(() => getActions(), []);

  return (
    <div className="min-h-screen w-full bg-[--nc-surfaceAlt] p-4 sm:p-6 lg:p-10">
      <header className="mx-auto max-w-6xl">
        <div className="mb-4 h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Noocarb • Config mobilité & options</h1>
            <p className="mt-1 text-sm text-slate-500">Ajoutez vos types de véhicules, renseignez les paramètres et validez.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => exportJson(form)} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">Exporter JSON</button>
            <button onClick={reset} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Réinitialiser</button>
            <div className="ml-2 inline-flex overflow-hidden rounded-xl border border-slate-200">
              <button className={clsx("px-3 py-2 text-sm", !viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700")} onClick={() => setViewAll(false)}>Wizard</button>
              <button className={clsx("px-3 py-2 text-sm", viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700")} onClick={() => setViewAll(true)}>Tout afficher</button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-6 max-w-6xl">
        <Stepper steps={STEPS} current={step} onNav={(i) => { setViewAll(false); setStep(i); }} />

        {!viewAll && (
          <>
            {step === 0 && <SectionFlotte form={form} update={update} push={push} removeAt={removeAt} />}
            {step === 1 && <SectionAutresEntrees form={form} update={update} />}
            {step === 2 && <SectionGNC form={form} update={update} />}
            {step === 3 && <SectionH2 form={form} update={update} />}
            {step === 4 && <SectionElec form={form} update={update} />}
            {step === 5 && <SectionDiesel form={form} update={update} />}
            {step === 6 && <SectionRecap form={form} />}
            {step === 7 && <SectionCharts ecoScore={ecoScore} fleetByType={fleetByType} energyPerType={energyPerType} />}
            {step === 8 && <SectionActions ecoScore={ecoScore} actions={actions} openAction={openAction} setOpenAction={setOpenAction} />}
            <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between">
              <button onClick={() => setStep((s) => Math.max(s - 1, 0))} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Précédent</button>
              <div className="text-sm text-slate-500">Étape {step + 1} / {STEPS.length}</div>
              <button onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">Suivant</button>
            </div>
          </>
        )}

        {viewAll && (
          <div className="grid grid-cols-1 gap-8">
            <SectionFlotte form={form} update={update} push={push} removeAt={removeAt} />
            <SectionAutresEntrees form={form} update={update} />
            <SectionGNC form={form} update={update} />
            <SectionH2 form={form} update={update} />
            <SectionElec form={form} update={update} />
            <SectionDiesel form={form} update={update} />
            <SectionRecap form={form} />
            <SectionCharts ecoScore={ecoScore} fleetByType={fleetByType} energyPerType={energyPerType} />
            <SectionActions ecoScore={ecoScore} actions={actions} openAction={openAction} setOpenAction={setOpenAction} />
          </div>
        )}
      </main>
    </div>
  );
}
