import { Card } from "../ui";
import { vehicleIcon, exportJson } from "../../utils/helpers";

export default function SectionRecap({ form }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="recap" title="Récapitulatif" subtitle="Vue d'ensemble avec icônes">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><span>🚚</span> Flottes & mobilité</h4>
            <ul className="space-y-2">
              {form.fleet.vehicleTypes.map((v) => (
                <li key={v.id} className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2"><span className="text-base">{vehicleIcon(v.type)}</span><strong className="text-slate-800">{v.type}</strong> <span className="text-slate-500">{v.label}</span></div>
                    <span className="text-slate-600">{v.count} véh.</span>
                  </div>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>Dist. 2 pleins: {v.maxDistanceBetweenRefuels_km || "—"} km</div>
                    <div>km/an/véh.: {v.distancePerYearPerVehicle_km || "—"}</div>
                    <div>Jours/an: {v.daysPerYear || "—"}</div>
                    <div>Prix HT: {v.purchasePriceHT || "—"} €</div>
                    {v.cons_L_per_100km && <div>Conso: {v.cons_L_per_100km} L/100</div>}
                    {v.cons_kwh_per_100km && <div>Conso: {v.cons_kwh_per_100km} kWh/100</div>}
                    {v.cons_kg_per_100km && <div>Conso: {v.cons_kg_per_100km} kg/100</div>}
                    {v.autonomy_km && <div>Autonomie: {v.autonomy_km} km</div>}
                    {v.chargePower_kw && <div>Charge: {v.chargePower_kw} kW</div>}
                    {v.chargeTime_min && <div>Temps charge: {v.chargeTime_min} min</div>}
                    {v.distributionPressure_bar && <div>Pression H₂: {v.distributionPressure_bar} bar</div>}
                  </div>
                </li>
              ))}
              {form.fleet.vehicleTypes.length === 0 && <li className="text-slate-400">—</li>}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><span>⚙️</span> Autres données d'entrée</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
                <li>Entrée GN: {form.otherInputs.gasNetworkInletPressure_bar || "—"} bar</li>
                <li>Stockage: {form.otherInputs.storagePressure_bar || "—"} bar</li>
                <li>Min compresseur: {form.otherInputs.compressorMinHoursPerYear || "—"} h/an</li>
                <li>Max compresseur: {form.otherInputs.compressorMaxHoursPerYear || "—"} h/an</li>
                <li>Amort.: {form.otherInputs.stationDepreciation_years || "—"} ans</li>
                <li>Dept: {form.otherInputs.registrationDepartment || "—"}</li>
                <li>Taux intérêt: {form.otherInputs.vehicleLoanInterest_ratePctYear || "—"}%</li>
                <li>Inflation: {form.otherInputs.inflationSinceJun2023_pct || "—"}%</li>
                <li>Commune: {form.otherInputs.nearestCommune || "—"}</li>
                <li>TICPE: {form.otherInputs.includeTICPE ? "Oui" : "Non"}</li>
                <li>Suramort.: {form.otherInputs.includeSuramortissement ? "Oui" : "Non"}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button onClick={() => exportJson(form)} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">Exporter JSON</button>
        </div>
      </Card>
    </div>
  );
}

