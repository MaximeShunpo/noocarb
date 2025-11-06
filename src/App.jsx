import React, { useState } from "react";
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
} from "./components/sections";
import { STEPS } from "./constants/form";
import { useFormState } from "./hooks/useFormState";
import { useFormData } from "./hooks/useFormData";
import { exportJson } from "./utils/helpers";

/**
 * Noocarb – Maquette web‑app (Mobilité + Options + Graphiques + Actions)
 * React + Tailwind + Recharts
 */

export default function App() {
  const { form, update, push, removeAt, reset } = useFormState();
  const { fleetByType, energyPerType, ecoScore, costComparison, gncStationCost } = useFormData(form);
  const [step, setStep] = useState(0);
  const [viewAll, setViewAll] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[--nc-surfaceAlt] p-4 sm:p-6 lg:p-10">
      <header className="mx-auto max-w-6xl">
        <div className="mb-4 h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/fr/thumb/a/a3/Logo_GRDF_couleur_sans_descripteur_2024%28PNG%29.png/2560px-Logo_GRDF_couleur_sans_descripteur_2024%28PNG%29.png" 
              alt="GRDF" 
              className="h-10 w-auto object-contain sm:h-12"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Config mobilité & options</h1>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">Ajoutez vos types de véhicules, renseignez les paramètres et validez.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => exportJson(form)} className="flex-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-emerald-700 sm:flex-none sm:px-4 sm:text-sm">Exporter JSON</button>
            <button onClick={reset} className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:flex-none sm:px-4 sm:text-sm">Réinitialiser</button>
            <div className="flex w-full overflow-hidden rounded-xl border border-slate-200 sm:ml-2 sm:w-auto">
              <button className={clsx("flex-1 px-3 py-2 text-xs sm:text-sm", !viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700")} onClick={() => setViewAll(false)}>Wizard</button>
              <button className={clsx("flex-1 px-3 py-2 text-xs sm:text-sm", viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700")} onClick={() => setViewAll(true)}>Tout afficher</button>
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
            {step === 7 && <SectionCharts ecoScore={ecoScore} fleetByType={fleetByType} costComparison={costComparison} gncStationCost={gncStationCost} />}
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
            <SectionCharts ecoScore={ecoScore} fleetByType={fleetByType} costComparison={costComparison} gncStationCost={gncStationCost} />
          </div>
        )}
      </main>
    </div>
  );
}
