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

  // Calcul des coûts comparatifs entre différentes flottes
  const costComparison = useMemo(() => {
    // Prix approximatifs (€/unité)
    const prices = {
      Diesel: { fuel: 1.65, // €/L
                vehicle: 36000, // € HT
                maintenance: 0.08 }, // €/km
      Elec: { fuel: 0.15, // €/kWh
              vehicle: 42000, // € HT
              maintenance: 0.05 }, // €/km
      bioGNC: { fuel: 1.10, // €/kg
                vehicle: 38000, // € HT
                maintenance: 0.07 }, // €/km
    };

    // Calculer les coûts pour la flotte actuelle
    let currentTotalCost = 0;
    let currentFuelCost = 0;
    let currentVehicleCost = 0;
    let currentMaintenanceCost = 0;
    let totalVehicles = 0;
    let totalKm = 0;

    for (const v of form.fleet.vehicleTypes) {
      const count = Number(v.count || 0);
      const kmPerVehPerYear = Number(v.distancePerYearPerVehicle_km || 0);
      const kmTot = count * kmPerVehPerYear;
      totalVehicles += count;
      totalKm += kmTot;

      if (v.type === "Diesel" && v.cons_L_per_100km) {
        const consL = (Number(v.cons_L_per_100km) || 0) * kmTot / 100;
        currentFuelCost += consL * prices.Diesel.fuel;
        currentVehicleCost += count * (Number(v.purchasePriceHT) || prices.Diesel.vehicle);
        currentMaintenanceCost += kmTot * prices.Diesel.maintenance;
      } else if (v.type === "Elec" && v.cons_kwh_per_100km) {
        const consKwh = (Number(v.cons_kwh_per_100km) || 0) * kmTot / 100;
        currentFuelCost += consKwh * prices.Elec.fuel;
        currentVehicleCost += count * (Number(v.purchasePriceHT) || prices.Elec.vehicle);
        currentMaintenanceCost += kmTot * prices.Elec.maintenance;
      } else if (v.type === "bioGNC" && v.cons_kg_per_100km) {
        const consKg = (Number(v.cons_kg_per_100km) || 0) * kmTot / 100;
        currentFuelCost += consKg * prices.bioGNC.fuel;
        currentVehicleCost += count * (Number(v.purchasePriceHT) || prices.bioGNC.vehicle);
        currentMaintenanceCost += kmTot * prices.bioGNC.maintenance;
      }
    }

    currentTotalCost = currentFuelCost + currentVehicleCost + currentMaintenanceCost;

    // Calculer les coûts si on convertissait toute la flotte en différentes énergies
    const scenarios = [];
    
    if (totalVehicles > 0 && totalKm > 0) {
      // Scénario 1: Full Diesel
      const avgConsDiesel = 24; // L/100km moyen
      const consL = avgConsDiesel * totalKm / 100;
      const dieselFuelCost = consL * prices.Diesel.fuel;
      const dieselVehicleCost = totalVehicles * prices.Diesel.vehicle;
      const dieselMaintenanceCost = totalKm * prices.Diesel.maintenance;
      const dieselTotalCost = dieselFuelCost + dieselVehicleCost + dieselMaintenanceCost;
      
      scenarios.push({
        name: "Diesel",
        fuelCost: dieselFuelCost,
        vehicleCost: dieselVehicleCost,
        maintenanceCost: dieselMaintenanceCost,
        totalCost: dieselTotalCost,
        savings: currentTotalCost - dieselTotalCost,
      });

      // Scénario 2: Full Électrique
      const avgConsElec = 19; // kWh/100km moyen
      const consKwh = avgConsElec * totalKm / 100;
      const elecFuelCost = consKwh * prices.Elec.fuel;
      const elecVehicleCost = totalVehicles * prices.Elec.vehicle;
      const elecMaintenanceCost = totalKm * prices.Elec.maintenance;
      const elecTotalCost = elecFuelCost + elecVehicleCost + elecMaintenanceCost;
      
      scenarios.push({
        name: "Électrique",
        fuelCost: elecFuelCost,
        vehicleCost: elecVehicleCost,
        maintenanceCost: elecMaintenanceCost,
        totalCost: elecTotalCost,
        savings: currentTotalCost - elecTotalCost,
      });

      // Scénario 3: Full bioGNC
      const avgConsBioGNC = 8.5; // kg/100km moyen
      const consKg = avgConsBioGNC * totalKm / 100;
      const bioGNCFuelCost = consKg * prices.bioGNC.fuel;
      const bioGNCVehicleCost = totalVehicles * prices.bioGNC.vehicle;
      const bioGNCMaintenanceCost = totalKm * prices.bioGNC.maintenance;
      const bioGNCTotalCost = bioGNCFuelCost + bioGNCVehicleCost + bioGNCMaintenanceCost;
      
      scenarios.push({
        name: "bioGNC",
        fuelCost: bioGNCFuelCost,
        vehicleCost: bioGNCVehicleCost,
        maintenanceCost: bioGNCMaintenanceCost,
        totalCost: bioGNCTotalCost,
        savings: currentTotalCost - bioGNCTotalCost,
      });
    }

    return {
      current: {
        fuelCost: currentFuelCost,
        vehicleCost: currentVehicleCost,
        maintenanceCost: currentMaintenanceCost,
        totalCost: currentTotalCost,
      },
      scenarios,
    };
  }, [form.fleet.vehicleTypes]);

  return { fleetByType, energyPerType, ecoScore, costComparison };
}

