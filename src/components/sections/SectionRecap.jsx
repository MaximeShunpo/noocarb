import { Card } from '../ui';
import { vehicleIcon, vehicleBadge } from '../../utils/helpers';

export function SectionRecap({ form, onExport, highlight }) {
  return (
    <Card
      id="recap"
      title="Récapitulatif"
      subtitle="Vue d'ensemble de votre configuration"
      highlight={highlight}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Flotte */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-800 bg-slate-100 p-3 rounded-xl">
            <span className="text-xl">🚚</span> Flottes & mobilité
          </h4>
          <ul className="space-y-3">
            {form.fleet.vehicleTypes.map((v) => (
              <li
                key={v.id}
                className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 text-sm shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{vehicleIcon(v.type)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${vehicleBadge(v.type)}`}>
                      {v.type}
                    </span>
                    <span className="text-slate-600 text-xs">{v.label}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                    {v.count} véh.
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-3 rounded-lg">
                  <div>📏 Dist. 2 pleins: <strong>{v.maxDistanceBetweenRefuels_km || "—"}</strong> km</div>
                  <div>🛣️ km/an/véh.: <strong>{v.distancePerYearPerVehicle_km || "—"}</strong></div>
                  <div>📅 Jours/an: <strong>{v.daysPerYear || "—"}</strong></div>
                  <div>💰 Prix HT: <strong>{v.purchasePriceHT || "—"}</strong> €</div>
                  {v.cons_L_per_100km && <div>⛽ Conso: <strong>{v.cons_L_per_100km}</strong> L/100</div>}
                  {v.cons_kwh_per_100km && <div>⚡ Conso: <strong>{v.cons_kwh_per_100km}</strong> kWh/100</div>}
                  {v.cons_kg_per_100km && <div>🔋 Conso: <strong>{v.cons_kg_per_100km}</strong> kg/100</div>}
                  {v.autonomy_km && <div>🔄 Autonomie: <strong>{v.autonomy_km}</strong> km</div>}
                  {v.chargePower_kw && <div>⚡ Charge: <strong>{v.chargePower_kw}</strong> kW</div>}
                  {v.chargeTime_min && <div>⏱️ Temps: <strong>{v.chargeTime_min}</strong> min</div>}
                  {v.distributionPressure_bar && (
                    <div>💨 Pression H₂: <strong>{v.distributionPressure_bar}</strong> bar</div>
                  )}
                </div>
              </li>
            ))}
            {form.fleet.vehicleTypes.length === 0 && (
              <li className="text-slate-400 text-center py-8">Aucun véhicule configuré</li>
            )}
          </ul>
        </div>

        {/* Paramètres & options */}
        <div className="space-y-4">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-800 bg-slate-100 p-3 rounded-xl">
              <span className="text-xl">⚙️</span> Autres données d'entrée
            </h4>
            <ul className="grid grid-cols-2 gap-3 text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
              <div className="col-span-2 sm:col-span-1">
                <strong>Entrée GN:</strong> {form.otherInputs.gasNetworkInletPressure_bar || "—"} bar
              </div>
              <div className="col-span-2 sm:col-span-1">
                <strong>Stockage:</strong> {form.otherInputs.storagePressure_bar || "—"} bar
              </div>
              <div className="col-span-2 sm:col-span-1">
                <strong>Min compresseur:</strong> {form.otherInputs.compressorMinHoursPerYear || "—"} h/an
              </div>
              <div className="col-span-2 sm:col-span-1">
                <strong>Max compresseur:</strong> {form.otherInputs.compressorMaxHoursPerYear || "—"} h/an
              </div>
              <div className="col-span-2 sm:col-span-1">
                <strong>Amort.:</strong> {form.otherInputs.stationDepreciation_years || "—"} ans
              </div>
              <div className="col-span-2 sm:col-span-1">
                <strong>Dept:</strong> {form.otherInputs.registrationDepartment || "—"}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <strong>Taux intérêt:</strong> {form.otherInputs.vehicleLoanInterest_ratePctYear || "—"}%
              </div>
              <div className="col-span-2 sm:col-span-1">
                <strong>Inflation:</strong> {form.otherInputs.inflationSinceJun2023_pct || "—"}%
              </div>
              <div className="col-span-2">
                <strong>Commune:</strong> {form.otherInputs.nearestCommune || "—"}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <strong>TICPE:</strong> {form.otherInputs.includeTICPE ? "✅ Oui" : "❌ Non"}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <strong>Suramort.:</strong> {form.otherInputs.includeSuramortissement ? "✅ Oui" : "❌ Non"}
              </div>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-800 bg-slate-100 p-3 rounded-xl">
              <span className="text-xl">🧩</span> Options
            </h4>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 p-3 rounded-xl">
                <div className="font-semibold text-green-900 text-xs mb-2">🟢 GNC</div>
                <ul className="space-y-1 text-xs text-green-800">
                  <li>A1/R90: {form.optionsGNC.soundInsulation_A1R90 ? "✅" : "❌"}</li>
                  <li>Sécheur: {form.optionsGNC.dryer ? "✅" : "❌"}</li>
                  <li>
                    Type borne: <strong>{form.optionsGNC.dispenserType || "—"}</strong>
                  </li>
                  <li>NGV2: {form.optionsGNC.NGV2_fastCharge ? "✅" : "❌"}</li>
                  <li>Éclairage: {form.optionsGNC.placeLighting ? "✅" : "❌"}</li>
                  <li>Containerisé: {form.optionsGNC.containerizedCompressorBlock ? "✅" : "❌"}</li>
                  <li>Backup semi-rapide: {form.optionsGNC.semiRapidBackup ? "✅" : "❌"}</li>
                  <li>Redondance: {form.optionsGNC.compressorRedundancy ? "✅" : "❌"}</li>
                  <li>3 bancs: {form.optionsGNC.storage3Banks ? "✅" : "❌"}</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl">
                <div className="font-semibold text-purple-900 text-xs mb-2">H₂ Hydrogène</div>
                <ul className="text-xs text-purple-800">
                  <li>Électrolyseur sur site: {form.optionsH2.onsiteElectrolyser ? "✅" : "❌"}</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl">
                <div className="font-semibold text-blue-900 text-xs mb-2">⚡ Électrique</div>
                <ul className="text-xs text-blue-800">
                  <li>
                    Borne rapide: <strong>{form.optionElec.fastChargePower_kW || "—"}</strong> kW
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl">
                <div className="font-semibold text-gray-900 text-xs mb-2">⛽ Diesel</div>
                <ul className="text-xs text-gray-800">
                  <li>Cuve + station sur site: {form.optionDiesel.tankAndStationOnSite ? "✅" : "❌"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200">
        <button
          onClick={onExport}
          className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-emerald-700 hover:to-emerald-600 active:scale-95 flex items-center gap-2"
        >
          <span>📥</span> Exporter JSON
        </button>
      </div>
    </Card>
  );
}
