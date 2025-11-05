import { Label, Input } from './ui';

export function VehicleFields({ vehicle, index, onUpdate }) {
  const update = (field, value) => {
    onUpdate(index, field, value);
  };

  const v = vehicle;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
      {/* Champs communs */}
      <div className="sm:col-span-12">
        <Label htmlFor={`label-${v.id}`}>Nom / label (interne)</Label>
        <Input
          id={`label-${v.id}`}
          value={v.label || ""}
          onChange={(val) => update("label", val)}
          placeholder="Ex. VU 3T5 – tournée urbaine"
        />
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor={`count-${v.id}`}>Nombre de véhicules</Label>
        <Input
          id={`count-${v.id}`}
          type="number"
          value={v.count || ""}
          onChange={(val) => update("count", val)}
          placeholder="Ex. 12"
        />
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor={`refuel-${v.id}`}>Distance max entre 2 pleins (km)</Label>
        <Input
          id={`refuel-${v.id}`}
          type="number"
          value={v.maxDistanceBetweenRefuels_km || ""}
          onChange={(val) => update("maxDistanceBetweenRefuels_km", val)}
          placeholder="Ex. 650"
        />
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor={`dist-${v.id}`}>Distance (km/an/véhicule)</Label>
        <Input
          id={`dist-${v.id}`}
          type="number"
          value={v.distancePerYearPerVehicle_km || ""}
          onChange={(val) => update("distancePerYearPerVehicle_km", val)}
          placeholder="Ex. 38000"
        />
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor={`days-${v.id}`}>Jours roulés (jt/an)</Label>
        <Input
          id={`days-${v.id}`}
          type="number"
          value={v.daysPerYear || ""}
          onChange={(val) => update("daysPerYear", val)}
          placeholder="Ex. 230"
        />
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor={`price-${v.id}`}>Prix d'achat HT (€)</Label>
        <Input
          id={`price-${v.id}`}
          type="number"
          value={v.purchasePriceHT || ""}
          onChange={(val) => update("purchasePriceHT", val)}
          placeholder="Ex. 42000"
        />
      </div>

      {/* Champs spécifiques par type */}
      {v.type === "bioGNC" && (
        <>
          <div className="sm:col-span-3">
            <Label htmlFor={`cons-kg-${v.id}`}>Consommation (kg/100km)</Label>
            <Input
              id={`cons-kg-${v.id}`}
              type="number"
              step="0.1"
              value={v.cons_kg_per_100km || ""}
              onChange={(val) => update("cons_kg_per_100km", val)}
              placeholder="Ex. 8.5"
            />
          </div>
          <div className="sm:col-span-3">
            <Label htmlFor={`auto-${v.id}`}>Autonomie (km)</Label>
            <Input
              id={`auto-${v.id}`}
              type="number"
              value={v.autonomy_km || ""}
              onChange={(val) => update("autonomy_km", val)}
              placeholder="Ex. 450"
            />
          </div>
        </>
      )}

      {v.type === "Elec" && (
        <>
          <div className="sm:col-span-3">
            <Label htmlFor={`cons-kwh-${v.id}`}>Consommation (kWh/100km)</Label>
            <Input
              id={`cons-kwh-${v.id}`}
              type="number"
              step="0.1"
              value={v.cons_kwh_per_100km || ""}
              onChange={(val) => update("cons_kwh_per_100km", val)}
              placeholder="Ex. 19"
            />
          </div>
          <div className="sm:col-span-3">
            <Label htmlFor={`pwr-${v.id}`}>Puissance de charge (kW/borne)</Label>
            <Input
              id={`pwr-${v.id}`}
              type="number"
              value={v.chargePower_kw || ""}
              onChange={(val) => update("chargePower_kw", val)}
              placeholder="Ex. 150"
            />
          </div>
          <div className="sm:col-span-3">
            <Label htmlFor={`time-${v.id}`}>Temps de charge correspondant (min)</Label>
            <Input
              id={`time-${v.id}`}
              type="number"
              value={v.chargeTime_min || ""}
              onChange={(val) => update("chargeTime_min", val)}
              placeholder="Ex. 25"
            />
          </div>
        </>
      )}

      {v.type === "H2" && (
        <>
          <div className="sm:col-span-3">
            <Label htmlFor={`cons-h2-${v.id}`}>Consommation (kg/100km)</Label>
            <Input
              id={`cons-h2-${v.id}`}
              type="number"
              step="0.1"
              value={v.cons_kg_per_100km || ""}
              onChange={(val) => update("cons_kg_per_100km", val)}
              placeholder="Ex. 1.2"
            />
          </div>
          <div className="sm:col-span-3">
            <Label htmlFor={`press-${v.id}`}>Pression de distribution (bar)</Label>
            <Input
              id={`press-${v.id}`}
              type="number"
              value={v.distributionPressure_bar || ""}
              onChange={(val) => update("distributionPressure_bar", val)}
              placeholder="Ex. 700"
            />
          </div>
        </>
      )}

      {(v.type === "B100" || v.type === "HVO" || v.type === "Diesel") && (
        <div className="sm:col-span-3">
          <Label htmlFor={`cons-${v.type}-${v.id}`}>Consommation (L/100km)</Label>
          <Input
            id={`cons-${v.type}-${v.id}`}
            type="number"
            step="0.1"
            value={v.cons_L_per_100km || ""}
            onChange={(val) => update("cons_L_per_100km", val)}
            placeholder={`Ex. ${v.type === "Diesel" ? "24" : v.type === "HVO" ? "25" : "26"}`}
          />
        </div>
      )}
    </div>
  );
}
