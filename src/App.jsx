import React, { useMemo, useState } from "react";

/**
 * Noocarb – Maquette web‑app (Mobilité + Options)
 * ------------------------------------------------
 * • React + Tailwind
 * • Wizard cliquable + mode "Tout afficher"
 * • Étapes: Flottes & mobilité → Autres données d'entrée → Options (GNC/H2/Élec/Diesel) → Récap
 * • Bordure VERTE sur l'étape active, numéros toujours visibles
 * • Datas fictives pré‑remplies
 */

// ————————————————————————————
// Thème (remplacer par palette Noocarb si besoin)
const THEME = {
  primary: "#0F766E", // placeholder (teal‑700)
  primaryDark: "#115E59", // teal‑800
  accent: "#0EA5E9", // sky‑500
  ink: "#0B1220",
  text: "#0f172a",
  subtext: "#475569",
  border: "#E2E8F0",
  surface: "#FFFFFF",
  surfaceAlt: "#F8FAFC",
  success: "#10B981", // emerald‑500
};

// ————————————————————————————
// Modèle de données
const emptyForm = {
  // Étape 1 – Flottes & mobilité
  fleet: {
    vehicleTypes: [],
  },

  // Étape 2 – Autres données d'entrée
  otherInputs: {
    gasNetworkInletPressure_bar: "",
    compressorMinHoursPerYear: "",
    compressorMaxHoursPerYear: "",
    storagePressure_bar: "",
    stationDepreciation_years: "",
    registrationDepartment: "",
    vehicleLoanInterest_ratePctYear: "",
    inflationSinceJun2023_pct: "",
    nearestCommune: "",
    includeTICPE: true,
    includeSuramortissement: true,
  },

  // Étape 3 – Options GNC
  optionsGNC: {
    soundInsulation_A1R90: false,
    dryer: false,
    dispenserType: "",
    NGV2_fastCharge: false,
    placeLighting: false,
    containerizedCompressorBlock: false,
    semiRapidBackup: false,
    compressorRedundancy: false,
    storage3Banks: false, // Oui/Non
  },

  // Étape 4 – Options H2
  optionsH2: {
    onsiteElectrolyser: false,
  },

  // Étape 5 – Options Élec
  optionElec: {
    fastChargePower_kW: "",
  },

  // Étape 6 – Option Diesel
  optionDiesel: {
    tankAndStationOnSite: false,
  },
};

// ————————————————————————————
// UI helpers
function Label({ children, htmlFor, hint }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
      {children}
      {hint && <span className="ml-1 text-[11px] text-slate-500">{hint}</span>}
    </label>
  );
}

function Input({ id, type = "text", value, onChange, placeholder, required, pattern }) {
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

function Select({ id, value, onChange, children }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-300 cursor-pointer"
    >
      {children}
    </select>
  );
}

function Textarea({ id, value, onChange, rows = 4, placeholder }) {
  return (
    <textarea
      id={id}
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-300"
    />
  );
}

function YesNo({ id, value, onChange }) {
  return (
    <div className="mt-1 inline-flex overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-4 py-2 text-sm font-medium transition-all ${value ? "bg-emerald-500 text-white shadow-inner" : "bg-white text-slate-700 hover:bg-slate-50"}`}
      >
        OUI
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-4 py-2 text-sm font-medium transition-all ${!value ? "bg-emerald-500 text-white shadow-inner" : "bg-white text-slate-700 hover:bg-slate-50"}`}
      >
        NON
      </button>
    </div>
  );
}

function Card({ title, subtitle, right, children, id, highlight = false }) {
  return (
    <section
      id={id}
      className={`rounded-2xl border bg-white shadow-md transition-all ${highlight ? "border-emerald-400 ring-2 ring-emerald-400 ring-opacity-50 shadow-lg" : "border-slate-200 hover:shadow-lg"}`}
    >
      {(title || right) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-5">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

function Stepper({ steps, current, onNav }) {
  return (
    <ol className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key}>
            <button
              onClick={() => onNav?.(i)}
              className={`w-full rounded-2xl border p-3 text-left transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                active 
                  ? "border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-400 ring-opacity-30" 
                  : done 
                  ? "border-emerald-200 bg-white shadow-sm hover:shadow-md" 
                  : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-all ${
                  active 
                    ? "bg-emerald-500 text-white shadow-sm" 
                    : done 
                    ? "bg-emerald-200 text-emerald-900" 
                    : "bg-slate-200 text-slate-700"
                }`}>
                  {done && !active ? "✓" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{s.kicker}</div>
                  <div className="text-sm font-medium text-slate-800 flex items-center gap-1 truncate">
                    {s.label}
                  </div>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

// ————————————————————————————
// Étapes
const STEPS = [
  { key: "flotte", kicker: "Étape 1", label: "Flottes & mobilité" },
  { key: "autres", kicker: "Étape 2", label: "Autres données d'entrée" },
  { key: "gnc", kicker: "Étape 3", label: "Options GNC" },
  { key: "h2", kicker: "Étape 4", label: "Options H₂" },
  { key: "elec", kicker: "Étape 5", label: "Options Élec" },
  { key: "diesel", kicker: "Étape 6", label: "Option Diesel" },
  { key: "recap", kicker: "Étape 7", label: "Récap & export" },
];

// ————————————————————————————
// Helpers
function download(filename, text) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function uid() {
  return "v_" + Math.random().toString(36).slice(2, 9);
}

function defaultVehicle(type) {
  const common = {
    id: uid(),
    type,
    label: type + " – flotte A",
    count: "5",
    maxDistanceBetweenRefuels_km: type === "Elec" ? "320" : "700",
    distancePerYearPerVehicle_km: "38000",
    daysPerYear: "230",
    purchasePriceHT: type === "Elec" ? "42000" : "36000",
  };
  switch (type) {
    case "bioGNC":
      return { ...common, cons_kg_per_100km: "8.5", autonomy_km: "450" };
    case "Elec":
      return { ...common, cons_kwh_per_100km: "19", chargePower_kw: "150", chargeTime_min: "25" };
    case "H2":
      return { ...common, cons_kg_per_100km: "1.2", distributionPressure_bar: "700" };
    case "B100":
      return { ...common, cons_L_per_100km: "26" };
    case "HVO":
      return { ...common, cons_L_per_100km: "25" };
    case "Diesel":
      return { ...common, cons_L_per_100km: "24" };
    default:
      return common;
  }
}

function vehicleIcon(type) {
  switch (type) {
    case "Elec":
      return "⚡";
    case "bioGNC":
      return "🟢"; // bio‑GNC
    case "H2":
      return "H₂";
    case "B100":
      return "🛢️";
    case "HVO":
      return "🛢️";
    case "Diesel":
      return "⛽";
    default:
      return "🚗";
  }
}

function vehicleBadge(type) {
  const badges = {
    Elec: "bg-blue-100 text-blue-800 border-blue-200",
    bioGNC: "bg-green-100 text-green-800 border-green-200",
    H2: "bg-purple-100 text-purple-800 border-purple-200",
    B100: "bg-amber-100 text-amber-800 border-amber-200",
    HVO: "bg-orange-100 text-orange-800 border-orange-200",
    Diesel: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return badges[type] || badges.Diesel;
}

// ————————————————————————————
export default function NoocarbFormWizard() {
  const [form, setForm] = useState(() => {
    // Pré‑remplissage fictif
    const f = JSON.parse(JSON.stringify(emptyForm));
    f.fleet.vehicleTypes = [defaultVehicle("Diesel"), defaultVehicle("Elec"), defaultVehicle("bioGNC")];
    f.otherInputs = {
      gasNetworkInletPressure_bar: "6",
      compressorMinHoursPerYear: "1000",
      compressorMaxHoursPerYear: "3000",
      storagePressure_bar: "250",
      stationDepreciation_years: "10",
      registrationDepartment: "69",
      vehicleLoanInterest_ratePctYear: "4",
      inflationSinceJun2023_pct: "5.2",
      nearestCommune: "Lyon (69)",
      includeTICPE: true,
      includeSuramortissement: true,
    };
    f.optionsGNC = {
      soundInsulation_A1R90: true,
      dryer: false,
      dispenserType: "portique",
      NGV2_fastCharge: false,
      placeLighting: false,
      containerizedCompressorBlock: false,
      semiRapidBackup: true,
      compressorRedundancy: false,
      storage3Banks: true,
    };
    f.optionsH2.onsiteElectrolyser = false;
    f.optionElec.fastChargePower_kW = "150";
    f.optionDiesel.tankAndStationOnSite = true;
    return f;
  });

  const [step, setStep] = useState(0); // démarrer sur Flottes & mobilité
  const [viewAll, setViewAll] = useState(false);

  const canContinue = useMemo(() => true, []);

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

  function push(path, item) {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length; i++) obj = obj[keys[i]];
      obj.push(item);
      return { ...next };
    });
  }

  function removeAt(path, index) {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length; i++) obj = obj[keys[i]];
      obj.splice(index, 1);
      return { ...next };
    });
  }

  function exportJson() {
    const file = `noocarb-config-${new Date().toISOString().slice(0, 10)}.json`;
    download(file, JSON.stringify(form, null, 2));
  }

  // ————————————————————————————
  // Rendu conditionnel des champs véhicule
  function VehicleFields({ v, idx }) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
        {/* commun */}
        <div className="sm:col-span-12">
          <Label htmlFor={`label-${v.id}`}>Nom / label (interne)</Label>
          <Input id={`label-${v.id}`} value={v.label || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.label`, val)} placeholder="Ex. VU 3T5 – tournée urbaine" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`count-${v.id}`}>Nombre de véhicules</Label>
          <Input id={`count-${v.id}`} type="number" value={v.count || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.count`, val)} placeholder="Ex. 12" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`refuel-${v.id}`}>Distance max entre 2 pleins (km)</Label>
          <Input id={`refuel-${v.id}`} type="number" value={v.maxDistanceBetweenRefuels_km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.maxDistanceBetweenRefuels_km`, val)} placeholder="Ex. 650" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`dist-${v.id}`}>Distance (km/an/véhicule)</Label>
          <Input id={`dist-${v.id}`} type="number" value={v.distancePerYearPerVehicle_km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.distancePerYearPerVehicle_km`, val)} placeholder="Ex. 38000" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`days-${v.id}`}>Jours roulés (jt/an)</Label>
          <Input id={`days-${v.id}`} type="number" value={v.daysPerYear || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.daysPerYear`, val)} placeholder="Ex. 230" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`price-${v.id}`}>Prix d'achat HT (€)</Label>
          <Input id={`price-${v.id}`} type="number" value={v.purchasePriceHT || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.purchasePriceHT`, val)} placeholder="Ex. 42000" />
        </div>

        {/* spécifiques par type */}
        {v.type === "bioGNC" && (
          <>
            <div className="sm:col-span-3">
              <Label htmlFor={`cons-kg-${v.id}`}>Consommation (kg/100km)</Label>
              <Input id={`cons-kg-${v.id}`} type="number" step="0.1" value={v.cons_kg_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_kg_per_100km`, val)} placeholder="Ex. 8.5" />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor={`auto-${v.id}`}>Autonomie (km)</Label>
              <Input id={`auto-${v.id}`} type="number" value={v.autonomy_km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.autonomy_km`, val)} placeholder="Ex. 450" />
            </div>
          </>
        )}

        {v.type === "Elec" && (
          <>
            <div className="sm:col-span-3">
              <Label htmlFor={`cons-kwh-${v.id}`}>Consommation (kWh/100km)</Label>
              <Input id={`cons-kwh-${v.id}`} type="number" step="0.1" value={v.cons_kwh_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_kwh_per_100km`, val)} placeholder="Ex. 19" />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor={`pwr-${v.id}`}>Puissance de charge (kW/borne)</Label>
              <Input id={`pwr-${v.id}`} type="number" value={v.chargePower_kw || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.chargePower_kw`, val)} placeholder="Ex. 150" />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor={`time-${v.id}`}>Temps de charge correspondant (min)</Label>
              <Input id={`time-${v.id}`} type="number" value={v.chargeTime_min || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.chargeTime_min`, val)} placeholder="Ex. 25" />
            </div>
          </>
        )}

        {v.type === "H2" && (
          <>
            <div className="sm:col-span-3">
              <Label htmlFor={`cons-h2-${v.id}`}>Consommation (kg/100km)</Label>
              <Input id={`cons-h2-${v.id}`} type="number" step="0.1" value={v.cons_kg_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_kg_per_100km`, val)} placeholder="Ex. 1.2" />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor={`press-${v.id}`}>Pression de distribution (bar)</Label>
              <Input id={`press-${v.id}`} type="number" value={v.distributionPressure_bar || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.distributionPressure_bar`, val)} placeholder="Ex. 700" />
            </div>
          </>
        )}

        {v.type === "B100" && (
          <div className="sm:col-span-3">
            <Label htmlFor={`cons-b100-${v.id}`}>Consommation (L/100km)</Label>
            <Input id={`cons-b100-${v.id}`} type="number" step="0.1" value={v.cons_L_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_L_per_100km`, val)} placeholder="Ex. 26" />
          </div>
        )}

        {v.type === "HVO" && (
          <div className="sm:col-span-3">
            <Label htmlFor={`cons-hvo-${v.id}`}>Consommation (L/100km)</Label>
            <Input id={`cons-hvo-${v.id}`} type="number" step="0.1" value={v.cons_L_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_L_per_100km`, val)} placeholder="Ex. 25" />
          </div>
        )}

        {v.type === "Diesel" && (
          <div className="sm:col-span-3">
            <Label htmlFor={`cons-diesel-${v.id}`}>Consommation (L/100km)</Label>
            <Input id={`cons-diesel-${v.id}`} type="number" step="0.1" value={v.cons_L_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_L_per_100km`, val)} placeholder="Ex. 24" />
          </div>
        )}
      </div>
    );
  }

  // ————————————————————————————
  // Sections
  const SectionFlotte = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="flotte" title="Flottes & mobilité" subtitle="Ajoutez des types de véhicules" highlight={step === 0 && !viewAll}>
        <div className="grid gap-5">
          {form.fleet.vehicleTypes.length === 0 && (
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <div className="text-4xl mb-3">🚗</div>
              <p className="text-sm text-slate-600 font-medium">Aucun type renseigné</p>
              <p className="text-xs text-slate-500 mt-1">Cliquez sur « Ajouter un type de véhicule » ci-dessous</p>
            </div>
          )}

          {form.fleet.vehicleTypes.map((v, idx) => (
            <div key={v.id} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{vehicleIcon(v.type)}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${vehicleBadge(v.type)}`}>
                      {v.type}
                    </span>
                    <Select id={`type-${v.id}`} value={v.type} onChange={(val) => update(`fleet.vehicleTypes.${idx}.type`, val)}>
                      {["bioGNC", "Elec", "H2", "B100", "HVO", "Diesel"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </Select>
                  </div>
                </div>
                <button 
                  className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  onClick={() => removeAt("fleet.vehicleTypes", idx)}
                >
                  🗑️ Supprimer
                </button>
              </div>

              <VehicleFields v={v} idx={idx} />
            </div>
          ))}

          <div className="flex gap-3">
            <button
              className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-emerald-700 hover:to-emerald-600 active:scale-95"
              onClick={() => push("fleet.vehicleTypes", defaultVehicle("Diesel"))}
            >
              ➕ Ajouter un type de véhicule
            </button>
          </div>
        </div>
      </Card>
    </div>
  );

  const SectionAutresEntrees = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="autres" title="Autres données d'entrée" subtitle="Paramètres station & finance" highlight={step === 1 && !viewAll}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="inletP">Pression d'entrée disponible réseau gaz naturel (bar)</Label>
            <Input id="inletP" type="number" value={form.otherInputs.gasNetworkInletPressure_bar} onChange={(v) => update("otherInputs.gasNetworkInletPressure_bar", v)} placeholder="Ex. 6" />
          </div>
          <div>
            <Label htmlFor="minH">Fonctionnement min d'un compresseur (h/an)</Label>
            <Input id="minH" type="number" value={form.otherInputs.compressorMinHoursPerYear} onChange={(v) => update("otherInputs.compressorMinHoursPerYear", v)} />
          </div>
          <div>
            <Label htmlFor="maxH">Fonctionnement max d'un compresseur (h/an)</Label>
            <Input id="maxH" type="number" value={form.otherInputs.compressorMaxHoursPerYear} onChange={(v) => update("otherInputs.compressorMaxHoursPerYear", v)} />
          </div>
          <div>
            <Label htmlFor="stockP">Pression de stockage (bar)</Label>
            <Input id="stockP" type="number" value={form.otherInputs.storagePressure_bar} onChange={(v) => update("otherInputs.storagePressure_bar", v)} />
          </div>
          <div>
            <Label htmlFor="amort">Durée d'amortissement de la station (années)</Label>
            <Input id="amort" type="number" value={form.otherInputs.stationDepreciation_years} onChange={(v) => update("otherInputs.stationDepreciation_years", v)} />
          </div>
          <div>
            <Label htmlFor="dept">Département rattachement veh. (n°)</Label>
            <Input id="dept" value={form.otherInputs.registrationDepartment} onChange={(v) => update("otherInputs.registrationDepartment", v)} placeholder="Ex. 69" />
          </div>
          <div>
            <Label htmlFor="rate">Taux d'intérêt emprunt véhicule (annuel %)</Label>
            <Input id="rate" type="number" step="0.1" value={form.otherInputs.vehicleLoanInterest_ratePctYear} onChange={(v) => update("otherInputs.vehicleLoanInterest_ratePctYear", v)} placeholder="4" />
          </div>
          <div>
            <Label htmlFor="infl">Taux d'inflation depuis juin 2023 (%)</Label>
            <Input id="infl" type="number" step="0.1" value={form.otherInputs.inflationSinceJun2023_pct} onChange={(v) => update("otherInputs.inflationSinceJun2023_pct", v)} placeholder="5.2" />
          </div>
          <div>
            <Label htmlFor="commune">Commune ou plus proche commune du projet</Label>
            <Input id="commune" value={form.otherInputs.nearestCommune} onChange={(v) => update("otherInputs.nearestCommune", v)} placeholder="Lyon (69)" />
          </div>
          <div className="sm:col-span-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <Label>Prise en compte de la TICPE</Label>
              <YesNo id="ticpe" value={form.otherInputs.includeTICPE} onChange={(v) => update("otherInputs.includeTICPE", v)} />
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <Label>Prise en compte du suramortissement</Label>
              <YesNo id="suram" value={form.otherInputs.includeSuramortissement} onChange={(v) => update("otherInputs.includeSuramortissement", v)} />
              <p className="mt-2 text-xs text-amber-800 bg-amber-100 p-2 rounded-lg">⚠️ Le rétrofit ne permet pas d'en bénéficier. Si véhicules rétrofités, mettre NON.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const SectionGNC = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="gnc" title="Options GNC" subtitle="Configuration de la station GNC" highlight={step === 2 && !viewAll}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="p-3 rounded-lg bg-slate-50"><Label>Isolation phonique + A1/R90</Label><YesNo id="a1r90" value={form.optionsGNC.soundInsulation_A1R90} onChange={(v) => update("optionsGNC.soundInsulation_A1R90", v)} /></div>
          <div className="p-3 rounded-lg bg-slate-50"><Label>Sécheur</Label><YesNo id="dryer" value={form.optionsGNC.dryer} onChange={(v) => update("optionsGNC.dryer", v)} /></div>
          <div>
            <Label htmlFor="dispenser">Type de borne</Label>
            <Input id="dispenser" value={form.optionsGNC.dispenserType} onChange={(v) => update("optionsGNC.dispenserType", v)} placeholder="portique" />
          </div>
          <div className="p-3 rounded-lg bg-slate-50"><Label>NGV2 (si charge rapide)</Label><YesNo id="ngv2" value={form.optionsGNC.NGV2_fastCharge} onChange={(v) => update("optionsGNC.NGV2_fastCharge", v)} /></div>
          <div className="p-3 rounded-lg bg-slate-50"><Label>Éclairage à la place</Label><YesNo id="light" value={form.optionsGNC.placeLighting} onChange={(v) => update("optionsGNC.placeLighting", v)} /></div>
          <div className="p-3 rounded-lg bg-slate-50"><Label>Bloc compresseur containerisé</Label><YesNo id="cont" value={form.optionsGNC.containerizedCompressorBlock} onChange={(v) => update("optionsGNC.containerizedCompressorBlock", v)} /></div>
          <div className="p-3 rounded-lg bg-slate-50"><Label>1 charge semi‑rapide en backup</Label><YesNo id="semi" value={form.optionsGNC.semiRapidBackup} onChange={(v) => update("optionsGNC.semiRapidBackup", v)} /></div>
          <div className="p-3 rounded-lg bg-slate-50"><Label>Redondance compresseur</Label><YesNo id="red" value={form.optionsGNC.compressorRedundancy} onChange={(v) => update("optionsGNC.compressorRedundancy", v)} /></div>
          <div className="p-3 rounded-lg bg-slate-50"><Label>Stockage 3 bancs</Label><YesNo id="banks3" value={form.optionsGNC.storage3Banks} onChange={(v) => update("optionsGNC.storage3Banks", v)} /></div>
        </div>
      </Card>
    </div>
  );

  const SectionH2 = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="h2" title="Options H₂" subtitle="Configuration de la station hydrogène" highlight={step === 3 && !viewAll}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200"><Label>Électrolyseur sur site</Label><YesNo id="elec" value={form.optionsH2.onsiteElectrolyser} onChange={(v) => update("optionsH2.onsiteElectrolyser", v)} /></div>
        </div>
      </Card>
    </div>
  );

  const SectionElec = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="elec" title="Options Élec" subtitle="Configuration des bornes de recharge" highlight={step === 4 && !viewAll}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="fastkW">Borne de recharge rapide en complément (kW)</Label>
            <Input id="fastkW" type="number" value={form.optionElec.fastChargePower_kW} onChange={(v) => update("optionElec.fastChargePower_kW", v)} placeholder="Ex. 150" />
          </div>
        </div>
      </Card>
    </div>
  );

  const SectionDiesel = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="diesel" title="Option Diesel" subtitle="Détermine la source de prix (cuve vs pompe)" highlight={step === 5 && !viewAll}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200"><Label>Cuve et station sur site ?</Label><YesNo id="tank" value={form.optionDiesel.tankAndStationOnSite} onChange={(v) => update("optionDiesel.tankAndStationOnSite", v)} /></div>
        </div>
      </Card>
    </div>
  );

  const SectionRecap = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="recap" title="Récapitulatif" subtitle="Vue d'ensemble de votre configuration" highlight={step === 6 && !viewAll}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Flotte */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-800 bg-slate-100 p-3 rounded-xl">
              <span className="text-xl">🚚</span> Flottes & mobilité
            </h4>
            <ul className="space-y-3">
              {form.fleet.vehicleTypes.map((v) => (
                <li key={v.id} className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 text-sm shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{vehicleIcon(v.type)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${vehicleBadge(v.type)}`}>
                        {v.type}
                      </span>
                      <span className="text-slate-600 text-xs">{v.label}</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">{v.count} véh.</span>
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
                    {v.distributionPressure_bar && <div>💨 Pression H₂: <strong>{v.distributionPressure_bar}</strong> bar</div>}
                  </div>
                </li>
              ))}
              {form.fleet.vehicleTypes.length === 0 && <li className="text-slate-400 text-center py-8">Aucun véhicule configuré</li>}
            </ul>
          </div>

          {/* Paramètres & options */}
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-800 bg-slate-100 p-3 rounded-xl">
                <span className="text-xl">⚙️</span> Autres données d'entrée
              </h4>
              <ul className="grid grid-cols-2 gap-3 text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
                <div className="col-span-2 sm:col-span-1"><strong>Entrée GN:</strong> {form.otherInputs.gasNetworkInletPressure_bar || "—"} bar</div>
                <div className="col-span-2 sm:col-span-1"><strong>Stockage:</strong> {form.otherInputs.storagePressure_bar || "—"} bar</div>
                <div className="col-span-2 sm:col-span-1"><strong>Min compresseur:</strong> {form.otherInputs.compressorMinHoursPerYear || "—"} h/an</div>
                <div className="col-span-2 sm:col-span-1"><strong>Max compresseur:</strong> {form.otherInputs.compressorMaxHoursPerYear || "—"} h/an</div>
                <div className="col-span-2 sm:col-span-1"><strong>Amort.:</strong> {form.otherInputs.stationDepreciation_years || "—"} ans</div>
                <div className="col-span-2 sm:col-span-1"><strong>Dept:</strong> {form.otherInputs.registrationDepartment || "—"}</div>
                <div className="col-span-2 sm:col-span-1"><strong>Taux intérêt:</strong> {form.otherInputs.vehicleLoanInterest_ratePctYear || "—"}%</div>
                <div className="col-span-2 sm:col-span-1"><strong>Inflation:</strong> {form.otherInputs.inflationSinceJun2023_pct || "—"}%</div>
                <div className="col-span-2"><strong>Commune:</strong> {form.otherInputs.nearestCommune || "—"}</div>
                <div className="col-span-2 sm:col-span-1"><strong>TICPE:</strong> {form.otherInputs.includeTICPE ? "✅ Oui" : "❌ Non"}</div>
                <div className="col-span-2 sm:col-span-1"><strong>Suramort.:</strong> {form.otherInputs.includeSuramortissement ? "✅ Oui" : "❌ Non"}</div>
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
                    <li>Type borne: <strong>{form.optionsGNC.dispenserType || "—"}</strong></li>
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
                    <li>Borne rapide: <strong>{form.optionElec.fastChargePower_kW || "—"}</strong> kW</li>
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
            onClick={exportJson} 
            className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-emerald-700 hover:to-emerald-600 active:scale-95 flex items-center gap-2"
          >
            <span>📥</span> Exporter JSON
          </button>
        </div>
      </Card>
    </div>
  );

  // ————————————————————————————
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <style>{`
        :root { --nc-primary:${THEME.primary}; --nc-primary-dark:${THEME.primaryDark}; --nc-accent:${THEME.accent}; --nc-ink:${THEME.ink}; --nc-text:${THEME.text}; --nc-subtext:${THEME.subtext}; --nc-border:${THEME.border}; --nc-surface:${THEME.surface}; --nc-surfaceAlt:${THEME.surfaceAlt}; }
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
              <p className="mt-1 text-sm text-slate-600">Ajoutez vos types de véhicules, renseignez les paramètres et validez.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={exportJson} 
                className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-emerald-700 hover:to-emerald-600 active:scale-95"
              >
                📥 Exporter
              </button>
              <button 
                onClick={() => setForm((_) => ({ ...emptyForm, fleet: { vehicleTypes: [defaultVehicle("Diesel")] } }))} 
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                🔄 Réinitialiser
              </button>
              <div className="inline-flex overflow-hidden rounded-xl border border-slate-300 shadow-sm">
                <button 
                  className={`px-3 py-2 text-sm font-medium transition-all ${!viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700 hover:bg-slate-50"}`} 
                  onClick={() => setViewAll(false)}
                >
                  📋 Wizard
                </button>
                <button 
                  className={`px-3 py-2 text-sm font-medium transition-all ${viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700 hover:bg-slate-50"}`} 
                  onClick={() => setViewAll(true)}
                >
                  📑 Tout afficher
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <main className="mx-auto mt-6 max-w-7xl p-4 sm:p-6 pb-12">
        <Stepper steps={STEPS} current={step} onNav={(i) => { setViewAll(false); setStep(i); }} />

        {/* Rendu */}
        {!viewAll && (
          <>
            {step === 0 && <SectionFlotte />}
            {step === 1 && <SectionAutresEntrees />}
            {step === 2 && <SectionGNC />}
            {step === 3 && <SectionH2 />}
            {step === 4 && <SectionElec />}
            {step === 5 && <SectionDiesel />}
            {step === 6 && <SectionRecap />}

            {/* Footer Nav */}
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
            <SectionFlotte />
            <SectionAutresEntrees />
            <SectionGNC />
            <SectionH2 />
            <SectionElec />
            <SectionDiesel />
            <SectionRecap />
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
