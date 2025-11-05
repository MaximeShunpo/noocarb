import { Card, Select } from '../ui';
import { VehicleFields } from '../VehicleFields';
import { vehicleIcon, vehicleBadge, defaultVehicle } from '../../utils/helpers';
import { VEHICLE_TYPES } from '../../utils/constants';

export function SectionFlotte({ vehicles, onAdd, onRemove, onUpdateVehicle, highlight }) {
  return (
    <Card
      id="flotte"
      title="Flottes & mobilité"
      subtitle="Ajoutez des types de véhicules"
      highlight={highlight}
    >
      <div className="grid gap-5">
        {vehicles.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="text-4xl mb-3">🚗</div>
            <p className="text-sm text-slate-600 font-medium">Aucun type renseigné</p>
            <p className="text-xs text-slate-500 mt-1">
              Cliquez sur « Ajouter un type de véhicule » ci-dessous
            </p>
          </div>
        )}

        {vehicles.map((v, idx) => (
          <div
            key={v.id}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{vehicleIcon(v.type)}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${vehicleBadge(v.type)}`}>
                    {v.type}
                  </span>
                  <Select
                    id={`type-${v.id}`}
                    value={v.type}
                    onChange={(val) => onUpdateVehicle(idx, "type", val)}
                  >
                    {VEHICLE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <button
                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                onClick={() => onRemove(idx)}
              >
                🗑️ Supprimer
              </button>
            </div>

            <VehicleFields vehicle={v} index={idx} onUpdate={onUpdateVehicle} />
          </div>
        ))}

        <div className="flex gap-3">
          <button
            className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-emerald-700 hover:to-emerald-600 active:scale-95"
            onClick={() => onAdd(defaultVehicle("Diesel"))}
          >
            ➕ Ajouter un type de véhicule
          </button>
        </div>
      </div>
    </Card>
  );
}
