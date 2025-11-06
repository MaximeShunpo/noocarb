import { useMemo } from "react";

export function useFormData(form) {
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

  return { fleetByType, energyPerType, ecoScore };
}

