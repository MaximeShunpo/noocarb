import { Card, Select } from "../ui";
import VehicleFields from "./VehicleFields";
import { defaultVehicle, vehicleIcon } from "../../utils/helpers";

export default function SectionFlotte({ form, update, push, removeAt }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="flotte" title="Flottes & mobilité" subtitle="Ajoutez des types de véhicules" highlight>
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

              <VehicleFields v={v} idx={idx} update={update} />
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
}

