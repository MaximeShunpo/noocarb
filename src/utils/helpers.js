export function download(filename, text) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function uid() {
  return "v_" + Math.random().toString(36).slice(2, 9);
}

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

export function vehicleIcon(type) {
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

export function exportJson(form) {
  const file = `noocarb-config-${new Date().toISOString().slice(0, 10)}.json`;
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(form, null, 2)));
  element.setAttribute("download", file);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

