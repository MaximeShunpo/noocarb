import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import clsx from "clsx";

/**
 * Noocarb – Maquette web‑app (Mobilité + Options + Graphiques + Actions)
 * React + Tailwind + Recharts
 */

const THEME = {
  primary: "#0F766E",
  primaryDark: "#115E59",
  accent: "#0EA5E9",
  ink: "#0B1220",
  text: "#0f172a",
  subtext: "#475569",
  border: "#E2E8F0",
  surface: "#FFFFFF",
  surfaceAlt: "#F8FAFC",
  success: "#10B981",
};

const numberFormatter = new Intl.NumberFormat("fr-FR");
const compactNumberFormatter = new Intl.NumberFormat("fr-FR", {
  notation: "compact",
  compactDisplay: "short",
});
const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const emptyForm = {
  fleet: { vehicleTypes: [] },
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
  optionsGNC: {
    soundInsulation_A1R90: false,
    dryer: false,
    dispenserType: "",
    NGV2_fastCharge: false,
    placeLighting: false,
    containerizedCompressorBlock: false,
    semiRapidBackup: false,
    compressorRedundancy: false,
    storage3Banks: false,
  },
  optionsH2: { onsiteElectrolyser: false },
  optionElec: { fastChargePower_kW: "" },
  optionDiesel: { tankAndStationOnSite: false },
};

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
      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-0 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  );
}
function Select({ id, value, onChange, children }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
    >
      {children}
    </select>
  );
}
function YesNo({ id, value, onChange }) {
  return (
    <div className="mt-1 inline-flex overflow-hidden rounded-xl border border-slate-200">
      <button type="button" onClick={() => onChange(true)} className={clsx("px-3 py-2 text-sm", value ? "bg-emerald-500 text-white" : "bg-white text-slate-700")}>OUI</button>
      <button type="button" onClick={() => onChange(false)} className={clsx("px-3 py-2 text-sm", !value ? "bg-emerald-500 text-white" : "bg-white text-slate-700")}>NON</button>
    </div>
  );
}

function Card({ title, subtitle, right, children, id, highlight = false }) {
  return (
    <section id={id} className={clsx("rounded-2xl border bg-white shadow-sm", highlight ? "border-emerald-400 ring-1 ring-emerald-400" : "border-slate-200")}>
      {(title || right) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-4">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

function Stepper({ steps, current, onNav }) {
  const progress = steps.length > 1 ? Math.min(100, Math.max(0, (current / (steps.length - 1)) * 100)) : 100;
  return (
    <div className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="relative mb-4 hidden h-1 w-full rounded-full bg-slate-100 sm:block">
        <span className="absolute left-0 top-0 h-1 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-9">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={s.key}>
              <button
                onClick={() => onNav?.(i)}
                className={clsx(
                  "group w-full rounded-2xl border bg-white px-3 py-3 text-left shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                  active
                    ? "border-emerald-500 shadow-md"
                    : done
                      ? "border-emerald-200 hover:border-emerald-300"
                      : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      "grid h-7 w-7 place-items-center rounded-full text-xs font-semibold transition",
                      active
                        ? "bg-emerald-500 text-white"
                        : done
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-700 group-hover:bg-slate-300"
                    )}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wide text-slate-400">{s.kicker}</div>
                    <div className="flex items-center gap-1 text-sm font-medium text-slate-800">
                      {s.label}
                      {done && <span className="text-emerald-600 text-xs">✓</span>}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const STEPS = [
  { key: "flotte", kicker: "Étape 1", label: "Flottes & mobilité" },
  { key: "autres", kicker: "Étape 2", label: "Autres données d'entrée" },
  { key: "gnc", kicker: "Étape 3", label: "Options GNC" },
  { key: "h2", kicker: "Étape 4", label: "Options H₂" },
  { key: "elec", kicker: "Étape 5", label: "Options Élec" },
  { key: "diesel", kicker: "Étape 6", label: "Option Diesel" },
  { key: "recap", kicker: "Étape 7", label: "Récap & export" },
  { key: "charts", kicker: "Étape 8", label: "Graphiques & score" },
  { key: "actions", kicker: "Étape 9", label: "Pistes d'amélioration" },
];

const STEP_HELP = {
  flotte: "Définissez vos typologies de véhicules et leurs paramètres clés. Les indicateurs se recalculent en direct.",
  autres: "Renseignez les hypothèses d'infrastructure et financières pour contextualiser les options.",
  gnc: "Activez les équipements GNC pertinents pour votre station et comparez les scénarios.",
  h2: "Précisez si l'électrolyse sur site fait partie du périmètre H₂.",
  elec: "Ajoutez les compléments de puissance électrique nécessaires à la recharge rapide.",
  diesel: "Indiquez si vous disposez d'une distribution Diesel interne pour calibrer les coûts.",
  recap: "Visualisez la synthèse des données saisies et exportez la configuration.",
  charts: "Analysez graphiquement le mix énergétique et le score mobilité.",
  actions: "Identifiez des leviers d'amélioration avec le gain potentiel associé.",
};

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
    case "bioGNC": return { ...common, cons_kg_per_100km: "8.5", autonomy_km: "450" };
    case "Elec":   return { ...common, cons_kwh_per_100km: "19", chargePower_kw: "150", chargeTime_min: "25" };
    case "H2":     return { ...common, cons_kg_per_100km: "1.2", distributionPressure_bar: "700" };
    case "B100":   return { ...common, cons_L_per_100km: "26" };
    case "HVO":    return { ...common, cons_L_per_100km: "25" };
    case "Diesel": return { ...common, cons_L_per_100km: "24" };
    default:       return common;
  }
}
function vehicleIcon(type) {
  switch (type) {
    case "Elec": return "⚡";
    case "bioGNC": return "🟢";
    case "H2": return "H₂";
    case "B100": return "🛢️B100";
    case "HVO": return "🛢️HVO";
    case "Diesel": return "⛽";
    default: return "🚗";
  }
}

function StatCard({ label, value, hint, tone = "neutral" }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border bg-white/80 p-4 shadow-sm backdrop-blur-sm",
        tone === "accent" ? "border-emerald-200" : "border-slate-200"
      )}
    >
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-semibold text-slate-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

function QuickStats({ metrics, ecoScore }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Score mobilité" value={`${ecoScore} / 100`} hint="Mesure fictive mise à jour instantanément" tone="accent" />
      <StatCard
        label="Véhicules suivis"
        value={metrics.totalVehicles ? numberFormatter.format(metrics.totalVehicles) : "—"}
        hint={metrics.totalVehicles ? `${metrics.lowCarbonShare}% bas carbone` : "Ajoutez un type de véhicule"}
      />
      <StatCard
        label="Kilométrage annuel"
        value={metrics.totalKm ? `${compactNumberFormatter.format(metrics.totalKm)} km` : "—"}
        hint={metrics.totalKm ? "Tous types confondus" : undefined}
      />
      <StatCard
        label="CAPEX estimé"
        value={metrics.capex ? currencyFormatter.format(metrics.capex) : "—"}
        hint={metrics.capex ? "Somme achat véhicules" : undefined}
      />
    </div>
  );
}

function SummarySidebar({ metrics, ecoScore, activeStep, nextStep, layout = "sidebar" }) {
  const showStep = Boolean(activeStep);
  const containerClass = layout === "sidebar" ? "sticky top-24 space-y-4" : "space-y-4";
  return (
    <aside className={containerClass}>
      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-emerald-600">Score mobilité</div>
            <div className="text-3xl font-semibold text-emerald-900">{ecoScore}</div>
          </div>
          <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-600">
            {metrics.totalVehicles ? `${metrics.lowCarbonShare}% bas carbone` : "Ajoutez un type"}
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Ajustez la flotte ou les options pour visualiser immédiatement l'impact sur le mix et le score.
        </p>
      </div>

      <Card title="Mix énergétique" subtitle={metrics.totalVehicles ? "Répartition actuelle" : undefined}>
        <ul className="space-y-2">
          {metrics.mix.length === 0 && <li className="text-xs text-slate-400">Aucun véhicule renseigné.</li>}
          {metrics.mix.map((item) => (
            <li key={item.type} className="text-xs text-slate-600">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{vehicleIcon(item.type)}</span>
                  <span className="font-medium text-slate-700">{item.type}</span>
                </div>
                <span>{Math.round(item.share)}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${Math.min(100, Math.max(item.share, item.share > 0 ? 6 : 0))}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {showStep && (
        <Card title="Étape en cours" subtitle={activeStep.label}>
          <div className="space-y-3 text-xs text-slate-600">
            <p className="leading-relaxed">{STEP_HELP[activeStep.key] ?? "Complétez les champs requis, les données se répercutent en temps réel."}</p>
            {nextStep && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
                <strong className="text-slate-700">À venir :</strong> {nextStep.label}
              </div>
            )}
          </div>
        </Card>
      )}
    </aside>
  );
}

export default function App() {
  const [form, setForm] = useState(() => {
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
  const [step, setStep] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [openAction, setOpenAction] = useState(null);

  useEffect(() => {
    if (!viewAll) {
      const target = document.getElementById(STEPS[step]?.key);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [step, viewAll]);

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

  // Derived / mocked analytics
  const fleetByType = useMemo(() => {
    const map = {};
    for (const v of form.fleet.vehicleTypes) {
      const key = v.type;
      const count = Number(v.count || 0);
      map[key] = (map[key] || 0) + count;
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [form.fleet.vehicleTypes]);

  const energyPerType = useMemo(() => {
    // Rough fictive estimation (convert different units to an equivalent "energy index")
    const items = {};
    for (const v of form.fleet.vehicleTypes) {
      const count = Number(v.count || 0);
      const kmPerVehPerYear = Number(v.distancePerYearPerVehicle_km || 0);
      const kmTot = count * kmPerVehPerYear;
      let energyIndex = 0;
      if (v.cons_kwh_per_100km) energyIndex = (Number(v.cons_kwh_per_100km) || 0) * kmTot / 100;
      else if (v.cons_L_per_100km) energyIndex = (Number(v.cons_L_per_100km) || 0) * kmTot / 100 * 9; // L -> fictive kWh factor
      else if (v.cons_kg_per_100km) energyIndex = (Number(v.cons_kg_per_100km) || 0) * kmTot / 100 * 13; // kg -> fictive kWh factor
      items[v.type] = (items[v.type] || 0) + energyIndex;
    }
    return Object.entries(items).map(([type, kwh]) => ({ type, kwh: Math.round(kwh) }));
  }, [form.fleet.vehicleTypes]);

  const summaryMetrics = useMemo(() => {
    const vehicles = form.fleet.vehicleTypes;
    let totalVehicles = 0;
    let totalKm = 0;
    let capex = 0;
    let lowCarbonCount = 0;
    let dieselCount = 0;
    const lowCarbonTypes = new Set(["Elec", "H2", "bioGNC"]);

    for (const v of vehicles) {
      const count = Number(v.count || 0) || 0;
      const km = Number(v.distancePerYearPerVehicle_km || 0) || 0;
      const price = Number(v.purchasePriceHT || 0) || 0;
      totalVehicles += count;
      totalKm += count * km;
      capex += count * price;
      if (lowCarbonTypes.has(v.type)) lowCarbonCount += count;
      if (v.type === "Diesel") dieselCount += count;
    }

    const mix = fleetByType.map((item) => ({
      type: item.name,
      share: totalVehicles ? (item.value / totalVehicles) * 100 : 0,
      count: item.value,
    }));

    return {
      totalVehicles,
      totalKm,
      capex,
      lowCarbonShare: totalVehicles ? Math.round((lowCarbonCount / totalVehicles) * 100) : 0,
      dieselShare: totalVehicles ? Math.round((dieselCount / totalVehicles) * 100) : 0,
      mix,
    };
  }, [form.fleet.vehicleTypes, fleetByType]);

  const ecoScore = useMemo(() => {
    // Fictive score out of 100. Elec and H2 considered better, Diesel worse.
    let score = 50;
    const totals = fleetByType.reduce((acc, x) => acc + x.value, 0) || 1;
    const ratio = (type) => (fleetByType.find((x) => x.name === type)?.value || 0) / totals;
    score += Math.round(30 * (ratio("Elec") + 0.7 * ratio("H2") + 0.5 * ratio("bioGNC")));
    score -= Math.round(25 * (0.7 * ratio("Diesel") + 0.5 * ratio("HVO") + 0.4 * ratio("B100")));
    // Options small bonuses
    if (form.optionsGNC.semiRapidBackup) score += 2;
    if (form.optionsGNC.compressorRedundancy) score += 1;
    if (form.optionElec.fastChargePower_kW) score += 2;
    return Math.max(0, Math.min(100, score));
  }, [fleetByType, form.optionsGNC, form.optionElec]);

  const actions = useMemo(() => {
    // Fictive recommended actions with potential point gains
    return [
      {
        id: "switch-20-diesel-ev",
        title: "Basculer 20% du Diesel vers l'Électrique",
        gain: 8,
        detail: "Identifier les usages urbains et navettes courtes. Prioriser les modèles avec charge DC ≥ 150 kW et TCO compétitif. Plan d'installation de 4 bornes rapides en dépôt + itinérance.",
      },
      {
        id: "pilot-bioGNC",
        title: "Lancer un pilote bioGNC sur les porteurs lourds",
        gain: 5,
        detail: "2 à 3 véhicules bioGNC avec stockage 3 bancs et sécheur. Sécuriser l'approvisionnement bio et contractualiser PEG Cal+ prime verte.",
      },
      {
        id: "optimize-charging",
        title: "Optimiser les fenêtres de charge et le mix lent/rapide",
        gain: 4,
        detail: "Étalement nocturne AC et top‑up DC pour lisser la pointe. Paramétrer la puissance à la baisse sur les heures pleines pour réduire CAPEX réseau.",
      },
      {
        id: "h2-feasibility",
        title: "Étude de faisabilité H₂ sur lignes longues",
        gain: 3,
        detail: "Comparer TCO H₂ vs. bioGNC/élec sur trajets > 400 km/jour. Inclure scénarios 350/700 bar, pression de distribution et disponibilité régionale.",
      },
      {
        id: "driver-eco-coaching",
        title: "Éco‑conduite & suivi télématique",
        gain: 3,
        detail: "Former 20 conducteurs, activer alerting accélérations/ralentis, mesurer les gains (‑5 à ‑12% de conso).",
      },
    ];
  }, []);

  // Sections (1–7 abbreviated: we keep full fleet & others & options + recap)
  function VehicleFields({ v, idx }) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        <div className="sm:col-span-12">
          <Label htmlFor={`label-${v.id}`}>Nom / label (interne)</Label>
          <Input id={`label-${v.id}`} value={v.label || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.label`, val)} placeholder="Ex. VU 3T5 – tournée urbaine" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`count-${v.id}`}>Nombre de véhicules</Label>
          <Input id={`count-${v.id}`} value={v.count || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.count`, val)} placeholder="Ex. 12" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`refuel-${v.id}`}>Distance max entre 2 pleins (km)</Label>
          <Input id={`refuel-${v.id}`} value={v.maxDistanceBetweenRefuels_km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.maxDistanceBetweenRefuels_km`, val)} placeholder="Ex. 650" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`dist-${v.id}`}>Distance (km/an/véhicule)</Label>
          <Input id={`dist-${v.id}`} value={v.distancePerYearPerVehicle_km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.distancePerYearPerVehicle_km`, val)} placeholder="Ex. 38000" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`days-${v.id}`}>Jours roulés (jt/an)</Label>
          <Input id={`days-${v.id}`} value={v.daysPerYear || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.daysPerYear`, val)} placeholder="Ex. 230" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor={`price-${v.id}`}>Prix d'achat HT (€)</Label>
          <Input id={`price-${v.id}`} value={v.purchasePriceHT || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.purchasePriceHT`, val)} placeholder="Ex. 42000" />
        </div>

        {v.type === "bioGNC" && (
          <>
            <div className="sm:col-span-3">
              <Label htmlFor={`cons-kg-${v.id}`}>Consommation (kg/100km)</Label>
              <Input id={`cons-kg-${v.id}`} value={v.cons_kg_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_kg_per_100km`, val)} placeholder="Ex. 8.5" />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor={`auto-${v.id}`}>Autonomie (km)</Label>
              <Input id={`auto-${v.id}`} value={v.autonomy_km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.autonomy_km`, val)} placeholder="Ex. 450" />
            </div>
          </>
        )}

        {v.type === "Elec" && (
          <>
            <div className="sm:col-span-3">
              <Label htmlFor={`cons-kwh-${v.id}`}>Consommation (kWh/100km)</Label>
              <Input id={`cons-kwh-${v.id}`} value={v.cons_kwh_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_kwh_per_100km`, val)} placeholder="Ex. 19" />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor={`pwr-${v.id}`}>Puissance de charge (kW/borne)</Label>
              <Input id={`pwr-${v.id}`} value={v.chargePower_kw || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.chargePower_kw`, val)} placeholder="Ex. 150" />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor={`time-${v.id}`}>Temps de charge correspondant (min)</Label>
              <Input id={`time-${v.id}`} value={v.chargeTime_min || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.chargeTime_min`, val)} placeholder="Ex. 25" />
            </div>
          </>
        )}

        {v.type === "H2" && (
          <>
            <div className="sm:col-span-3">
              <Label htmlFor={`cons-h2-${v.id}`}>Consommation (kg/100km)</Label>
              <Input id={`cons-h2-${v.id}`} value={v.cons_kg_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_kg_per_100km`, val)} placeholder="Ex. 1.2" />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor={`press-${v.id}`}>Pression de distribution (bar)</Label>
              <Input id={`press-${v.id}`} value={v.distributionPressure_bar || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.distributionPressure_bar`, val)} placeholder="Ex. 700" />
            </div>
          </>
        )}

        {v.type === "B100" && (
          <div className="sm:col-span-3">
            <Label htmlFor={`cons-b100-${v.id}`}>Consommation (L/100km)</Label>
            <Input id={`cons-b100-${v.id}`} value={v.cons_L_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_L_per_100km`, val)} placeholder="Ex. 26" />
          </div>
        )}

        {v.type === "HVO" && (
          <div className="sm:col-span-3">
            <Label htmlFor={`cons-hvo-${v.id}`}>Consommation (L/100km)</Label>
            <Input id={`cons-hvo-${v.id}`} value={v.cons_L_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_L_per_100km`, val)} placeholder="Ex. 25" />
          </div>
        )}

        {v.type === "Diesel" && (
          <div className="sm:col-span-3">
            <Label htmlFor={`cons-diesel-${v.id}`}>Consommation (L/100km)</Label>
            <Input id={`cons-diesel-${v.id}`} value={v.cons_L_per_100km || ""} onChange={(val) => update(`fleet.vehicleTypes.${idx}.cons_L_per_100km`, val)} placeholder="Ex. 24" />
          </div>
        )}
      </div>
    );
  }

  const SectionFlotte = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="flotte" title="Flottes & mobilité" subtitle="Ajoutez des types de véhicules" highlight={!viewAll && step === 0}>
        <div className="grid gap-4">
          {form.fleet.vehicleTypes.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              Aucun type renseigné. Cliquez sur « Ajouter un type de véhicule ».
            </div>
          )}

          {form.fleet.vehicleTypes.map((v, idx) => (
            <div key={v.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{vehicleIcon(v.type)}</span>
                  <Select id={`type-${v.id}`} value={v.type} onChange={(val) => update(`fleet.vehicleTypes.${idx}.type`, val)}>
                    {["bioGNC", "Elec", "H2", "B100", "HVO", "Diesel"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Select>
                </div>
                <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50" onClick={() => removeAt("fleet.vehicleTypes", idx)}>Suppr. ce type</button>
              </div>

              <VehicleFields v={v} idx={idx} />
            </div>
          ))}

          <div>
            <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
              onClick={() => push("fleet.vehicleTypes", defaultVehicle("Diesel"))}>
              + Ajouter un type de véhicule
            </button>
          </div>
        </div>
      </Card>
    </div>
  );

  const SectionAutresEntrees = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="autres" title="Autres données d'entrée" subtitle="Paramètres station & finance" highlight={!viewAll && step === 1}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><Label htmlFor="inletP">Pression d'entrée disponible réseau gaz naturel (bar)</Label>
            <Input id="inletP" value={form.otherInputs.gasNetworkInletPressure_bar} onChange={(v) => update("otherInputs.gasNetworkInletPressure_bar", v)} placeholder="Ex. 6" /></div>
          <div><Label htmlFor="minH">Fonctionnement min d'un compresseur (h/an)</Label>
            <Input id="minH" value={form.otherInputs.compressorMinHoursPerYear} onChange={(v) => update("otherInputs.compressorMinHoursPerYear", v)} /></div>
          <div><Label htmlFor="maxH">Fonctionnement max d'un compresseur (h/an)</Label>
            <Input id="maxH" value={form.otherInputs.compressorMaxHoursPerYear} onChange={(v) => update("otherInputs.compressorMaxHoursPerYear", v)} /></div>
          <div><Label htmlFor="stockP">Pression de stockage (bar)</Label>
            <Input id="stockP" value={form.otherInputs.storagePressure_bar} onChange={(v) => update("otherInputs.storagePressure_bar", v)} /></div>
          <div><Label htmlFor="amort">Durée d'amortissement de la station (années)</Label>
            <Input id="amort" value={form.otherInputs.stationDepreciation_years} onChange={(v) => update("otherInputs.stationDepreciation_years", v)} /></div>
          <div><Label htmlFor="dept">Département rattachement veh. (n°)</Label>
            <Input id="dept" value={form.otherInputs.registrationDepartment} onChange={(v) => update("otherInputs.registrationDepartment", v)} placeholder="Ex. 69" /></div>
          <div><Label htmlFor="rate">Taux d'intérêt emprunt véhicule (annuel %)</Label>
            <Input id="rate" value={form.otherInputs.vehicleLoanInterest_ratePctYear} onChange={(v) => update("otherInputs.vehicleLoanInterest_ratePctYear", v)} placeholder="4" /></div>
          <div><Label htmlFor="infl">Taux d'inflation depuis juin 2023 (%)</Label>
            <Input id="infl" value={form.otherInputs.inflationSinceJun2023_pct} onChange={(v) => update("otherInputs.inflationSinceJun2023_pct", v)} placeholder="5.2" /></div>
          <div><Label htmlFor="commune">Commune ou plus proche commune du projet</Label>
            <Input id="commune" value={form.otherInputs.nearestCommune} onChange={(v) => update("otherInputs.nearestCommune", v)} placeholder="Lyon (69)" /></div>
          <div className="sm:col-span-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div><Label>Prise en compte de la TICPE</Label><YesNo id="ticpe" value={form.otherInputs.includeTICPE} onChange={(v) => update("otherInputs.includeTICPE", v)} /></div>
            <div><Label>Prise en compte du suramortissement</Label><YesNo id="suram" value={form.otherInputs.includeSuramortissement} onChange={(v) => update("otherInputs.includeSuramortissement", v)} />
              <p className="mt-1 text-[11px] text-amber-700">⚠️ Le rétrofit ne permet pas d'en bénéficier. Si véhicules rétrofités, mettre NON.</p></div>
          </div>
        </div>
      </Card>
    </div>
  );

  const SectionGNC = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="gnc" title="Options GNC" highlight={!viewAll && step === 2}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><Label>Isolation phonique + A1/R90</Label><YesNo id="a1r90" value={form.optionsGNC.soundInsulation_A1R90} onChange={(v) => update("optionsGNC.soundInsulation_A1R90", v)} /></div>
          <div><Label>Sécheur</Label><YesNo id="dryer" value={form.optionsGNC.dryer} onChange={(v) => update("optionsGNC.dryer", v)} /></div>
          <div><Label htmlFor="dispenser">Type de borne</Label><Input id="dispenser" value={form.optionsGNC.dispenserType} onChange={(v) => update("optionsGNC.dispenserType", v)} placeholder="portique" /></div>
          <div><Label>NGV2 (si charge rapide)</Label><YesNo id="ngv2" value={form.optionsGNC.NGV2_fastCharge} onChange={(v) => update("optionsGNC.NGV2_fastCharge", v)} /></div>
          <div><Label>Éclairage à la place</Label><YesNo id="light" value={form.optionsGNC.placeLighting} onChange={(v) => update("optionsGNC.placeLighting", v)} /></div>
          <div><Label>Bloc compresseur containerisé</Label><YesNo id="cont" value={form.optionsGNC.containerizedCompressorBlock} onChange={(v) => update("optionsGNC.containerizedCompressorBlock", v)} /></div>
          <div><Label>1 charge semi‑rapide en backup</Label><YesNo id="semi" value={form.optionsGNC.semiRapidBackup} onChange={(v) => update("optionsGNC.semiRapidBackup", v)} /></div>
          <div><Label>Redondance compresseur</Label><YesNo id="red" value={form.optionsGNC.compressorRedundancy} onChange={(v) => update("optionsGNC.compressorRedundancy", v)} /></div>
          <div><Label>Stockage 3 bancs</Label><YesNo id="banks3" value={form.optionsGNC.storage3Banks} onChange={(v) => update("optionsGNC.storage3Banks", v)} /></div>
        </div>
      </Card>
    </div>
  );

  const SectionH2 = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="h2" title="Options H₂" highlight={!viewAll && step === 3}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><Label>Électrolyseur sur site</Label><YesNo id="elec" value={form.optionsH2.onsiteElectrolyser} onChange={(v) => update("optionsH2.onsiteElectrolyser", v)} /></div>
        </div>
      </Card>
    </div>
  );

  const SectionElec = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="elec" title="Options Élec" highlight={!viewAll && step === 4}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><Label htmlFor="fastkW">Borne de recharge rapide en complément (kW)</Label>
            <Input id="fastkW" value={form.optionElec.fastChargePower_kW} onChange={(v) => update("optionElec.fastChargePower_kW", v)} placeholder="Ex. 150" /></div>
        </div>
      </Card>
    </div>
  );

  const SectionDiesel = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="diesel" title="Option Diesel" subtitle="Détermine la source de prix (cuve vs pompe)" highlight={!viewAll && step === 5}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><Label>Cuve et station sur site ?</Label><YesNo id="tank" value={form.optionDiesel.tankAndStationOnSite} onChange={(v) => update("optionDiesel.tankAndStationOnSite", v)} /></div>
        </div>
      </Card>
    </div>
  );

  const SectionRecap = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="recap" title="Récapitulatif" subtitle="Vue d'ensemble avec icônes" highlight={!viewAll && step === 6}>
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
          <button onClick={exportJson} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">Exporter JSON</button>
        </div>
      </Card>
    </div>
  );

  const COLORS = ["#10B981", "#0EA5E9", "#F59E0B", "#6366F1", "#EF4444", "#14B8A6", "#84CC16"];
  const SectionCharts = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="charts" title="Graphiques & score" subtitle="Visualiser la mobilité et un score (fictif) sur 100" highlight={!viewAll && step === 7}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 grid place-items-center rounded-full border border-emerald-300 text-xl font-bold text-emerald-700">{ecoScore}</div>
            <div className="text-sm text-slate-600">Score mobilité (fictif /100)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Répartition de la flotte par énergie</h4>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={fleetByType} dataKey="value" nameKey="name" outerRadius={100} label>
                    {fleetByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Énergie annuelle estimée (index)</h4>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyPerType} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="kwh" name="Index énergie" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 md:col-span-2">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Profil d'impact (fictif)</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={[
                    { subject: "CO₂", A: 100 - ecoScore },
                    { subject: "Coût énergie", A: 80 - ecoScore * 0.5 },
                    { subject: "Autonomie", A: 40 + (100 - ecoScore) * 0.2 },
                    { subject: "Capillarité", A: 50 },
                    { subject: "Maturité tech", A: 60 },
                  ]}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Parc" dataKey="A" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const SectionActions = () => (
    <div className="grid grid-cols-1 gap-6">
      <Card id="actions" title="Pistes d'amélioration" subtitle="Note actuelle et actions pour gagner des points" highlight={!viewAll && step === 8}>
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
            <button onClick={exportJson} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">Exporter JSON</button>
            <button onClick={() => setForm((_) => ({ ...emptyForm, fleet: { vehicleTypes: [defaultVehicle("Diesel")] } }))} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Réinitialiser</button>
            <div className="ml-2 inline-flex overflow-hidden rounded-xl border border-slate-200">
              <button className={clsx("px-3 py-2 text-sm", !viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700")} onClick={() => setViewAll(false)}>Wizard</button>
              <button className={clsx("px-3 py-2 text-sm", viewAll ? "bg-emerald-500 text-white" : "bg-white text-slate-700")} onClick={() => setViewAll(true)}>Tout afficher</button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-6 max-w-6xl space-y-6">
        <Stepper steps={STEPS} current={step} onNav={(i) => { setViewAll(false); setStep(i); }} />
        <QuickStats metrics={summaryMetrics} ecoScore={ecoScore} />

        {!viewAll ? (
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-6">
            <div className="space-y-6">
              {step === 0 && <SectionFlotte />}
              {step === 1 && <SectionAutresEntrees />}
              {step === 2 && <SectionGNC />}
              {step === 3 && <SectionH2 />}
              {step === 4 && <SectionElec />}
              {step === 5 && <SectionDiesel />}
              {step === 6 && <SectionRecap />}
              {step === 7 && <SectionCharts />}
              {step === 8 && <SectionActions />}
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                <button onClick={() => setStep((s) => Math.max(s - 1, 0))} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Précédent</button>
                <div>Étape {step + 1} / {STEPS.length}</div>
                <button onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">Suivant</button>
              </div>
            </div>
            <SummarySidebar metrics={summaryMetrics} ecoScore={ecoScore} activeStep={STEPS[step]} nextStep={STEPS[step + 1]} />
          </div>
        ) : (
          <div className="space-y-8">
            <SummarySidebar metrics={summaryMetrics} ecoScore={ecoScore} activeStep={null} nextStep={null} layout="inline" />
            <div className="grid grid-cols-1 gap-8">
              <SectionFlotte />
              <SectionAutresEntrees />
              <SectionGNC />
              <SectionH2 />
              <SectionElec />
              <SectionDiesel />
              <SectionRecap />
              <SectionCharts />
              <SectionActions />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
