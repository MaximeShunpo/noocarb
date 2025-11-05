// Génère un ID unique
export function uid() {
  return "v_" + Math.random().toString(36).slice(2, 9);
}

// Télécharge un fichier JSON
export function downloadJSON(filename, data) {
  const element = document.createElement("a");
  const json = JSON.stringify(data, null, 2);
  element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(json));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Retourne l'icône pour un type de véhicule
export function vehicleIcon(type) {
  const icons = {
    Elec: "⚡",
    bioGNC: "🟢",
    H2: "H₂",
    B100: "🛢️",
    HVO: "🛢️",
    Diesel: "⛽",
  };
  return icons[type] || "🚗";
}

// Retourne les classes CSS pour le badge d'un type de véhicule
export function vehicleBadge(type) {
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

// Crée un véhicule par défaut selon son type
export function defaultVehicle(type) {
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

  const specifics = {
    bioGNC: { cons_kg_per_100km: "8.5", autonomy_km: "450" },
    Elec: { cons_kwh_per_100km: "19", chargePower_kw: "150", chargeTime_min: "25" },
    H2: { cons_kg_per_100km: "1.2", distributionPressure_bar: "700" },
    B100: { cons_L_per_100km: "26" },
    HVO: { cons_L_per_100km: "25" },
    Diesel: { cons_L_per_100km: "24" },
  };

  return { ...common, ...(specifics[type] || {}) };
}
