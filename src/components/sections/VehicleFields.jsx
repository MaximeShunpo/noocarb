import { Label, Input, Select } from "../ui";

export default function VehicleFields({ v, idx, update }) {
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

