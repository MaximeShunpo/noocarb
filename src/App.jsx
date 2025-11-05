import React, { useState, useMemo } from "react";
import { Stepper } from "./components/ui";
import {
  SectionFlotte,
  SectionAutresEntrees,
  SectionGNC,
  SectionH2,
  SectionElec,
  SectionDiesel,
  SectionRecap,
} from "./components/sections";
import { THEME, STEPS } from "./utils/constants";
import { downloadJSON } from "./utils/helpers";
import { emptyForm, createDemoData } from "./config/formSchema";

export default function App() {
  const [form, setForm] = useState(() => createDemoData());
  const [step, setStep] = useState(0);
  const [viewAll, setViewAll] = useState(false);

  const canContinue = useMemo(() => true, []);

  // Mise à jour générique d'une valeur du formulaire
  function update(path, value) {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys.at(-1)] = value;
      return next;
    });
  }

  // Ajoute un véhicule
  function addVehicle(vehicle) {
    setForm((prev) => ({
      ...prev,
      fleet: {
        ...prev.fleet,
        vehicleTypes: [...prev.fleet.vehicleTypes, vehicle],
      },
    }));
  }

  // Supprime un véhicule
  function removeVehicle(index) {
    setForm((prev) => ({
      ...prev,
      fleet: {
        ...prev.fleet,
        vehicleTypes: prev.fleet.vehicleTypes.filter((_, i) => i !== index),
      },
    }));
  }

  // Met à jour un champ d'un véhicule
  function updateVehicle(index, field, value) {
    setForm((prev) => {
      const newVehicles = [...prev.fleet.vehicleTypes];
      newVehicles[index] = { ...newVehicles[index], [field]: value };
      return {
        ...prev,
        fleet: { ...prev.fleet, vehicleTypes: newVehicles },
      };
    });
  }

  // Exporte le formulaire en JSON
  function exportJson() {
    const filename = `noocarb-config-${new Date().toISOString().slice(0, 10)}.json`;
    downloadJSON(filename, form);
  }

  // Réinitialise le formulaire
  function reset() {
    setForm({ ...emptyForm, fleet: { vehicleTypes: [] } });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <style>{`
        :root {
          --nc-primary:${THEME.primary};
          --nc-primary-dark:${THEME.primaryDark};
          --nc-accent:${THEME.accent};
          --nc-ink:${THEME.ink};
          --nc-text:${THEME.text};
          --nc-subtext:${THEME.subtext};
          --nc-border:${THEME.border};
          --nc-surface:${THEME.surface};
          --nc-surfaceAlt:${THEME.surfaceAlt};
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl p-4 sm:p-6">
          <div className="mb-3 h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                Noocarb • Config mobilité & options
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Ajoutez vos types de véhicules, renseignez les paramètres et validez.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={exportJson}
                className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-emerald-700 hover:to-emerald-600 active:scale-95"
              >
                📥 Exporter
              </button>
              <button
                onClick={reset}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                🔄 Réinitialiser
              </button>
              <div className="inline-flex overflow-hidden rounded-xl border border-slate-300 shadow-sm">
                <button
                  className={`px-3 py-2 text-sm font-medium transition-all ${
                    !viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setViewAll(false)}
                >
                  📋 Wizard
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium transition-all ${
                    viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setViewAll(true)}
                >
                  📑 Tout afficher
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto mt-6 max-w-7xl p-4 sm:p-6 pb-12">
        <Stepper
          steps={STEPS}
          current={step}
          onNav={(i) => {
            setViewAll(false);
            setStep(i);
          }}
        />

        {!viewAll && (
          <>
            {step === 0 && (
              <SectionFlotte
                vehicles={form.fleet.vehicleTypes}
                onAdd={addVehicle}
                onRemove={removeVehicle}
                onUpdateVehicle={updateVehicle}
                highlight
              />
            )}
            {step === 1 && (
              <SectionAutresEntrees data={form.otherInputs} onUpdate={update} highlight />
            )}
            {step === 2 && <SectionGNC data={form.optionsGNC} onUpdate={update} highlight />}
            {step === 3 && <SectionH2 data={form.optionsH2} onUpdate={update} highlight />}
            {step === 4 && <SectionElec data={form.optionElec} onUpdate={update} highlight />}
            {step === 5 && <SectionDiesel data={form.optionDiesel} onUpdate={update} highlight />}
            {step === 6 && <SectionRecap form={form} onExport={exportJson} highlight />}

            {/* Footer Navigation */}
            <div className="mx-auto mt-8 flex max-w-7xl items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setStep((s) => Math.max(s - 1, 0))}
                disabled={step === 0}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                ← Précédent
              </button>
              <div className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
                Étape {step + 1} / {STEPS.length}
              </div>
              <button
                onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
                disabled={!canContinue || step === STEPS.length - 1}
                className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                Suivant →
              </button>
            </div>
          </>
        )}

        {viewAll && (
          <div className="grid grid-cols-1 gap-8">
            <SectionFlotte
              vehicles={form.fleet.vehicleTypes}
              onAdd={addVehicle}
              onRemove={removeVehicle}
              onUpdateVehicle={updateVehicle}
            />
            <SectionAutresEntrees data={form.otherInputs} onUpdate={update} />
            <SectionGNC data={form.optionsGNC} onUpdate={update} />
            <SectionH2 data={form.optionsH2} onUpdate={update} />
            <SectionElec data={form.optionElec} onUpdate={update} />
            <SectionDiesel data={form.optionDiesel} onUpdate={update} />
            <SectionRecap form={form} onExport={exportJson} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center text-xs text-slate-500">
          <p>Noocarb © {new Date().getFullYear()} • Configuration de mobilité décarbonée</p>
        </div>
      </footer>
    </div>
  );
}
