import { Card, Label, Input, YesNo } from '../ui';

export function SectionAutresEntrees({ data, onUpdate, highlight }) {
  return (
    <Card
      id="autres"
      title="Autres données d'entrée"
      subtitle="Paramètres station & finance"
      highlight={highlight}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="inletP">Pression d'entrée disponible réseau gaz naturel (bar)</Label>
          <Input
            id="inletP"
            type="number"
            value={data.gasNetworkInletPressure_bar}
            onChange={(v) => onUpdate("otherInputs.gasNetworkInletPressure_bar", v)}
            placeholder="Ex. 6"
          />
        </div>

        <div>
          <Label htmlFor="minH">Fonctionnement min d'un compresseur (h/an)</Label>
          <Input
            id="minH"
            type="number"
            value={data.compressorMinHoursPerYear}
            onChange={(v) => onUpdate("otherInputs.compressorMinHoursPerYear", v)}
          />
        </div>

        <div>
          <Label htmlFor="maxH">Fonctionnement max d'un compresseur (h/an)</Label>
          <Input
            id="maxH"
            type="number"
            value={data.compressorMaxHoursPerYear}
            onChange={(v) => onUpdate("otherInputs.compressorMaxHoursPerYear", v)}
          />
        </div>

        <div>
          <Label htmlFor="stockP">Pression de stockage (bar)</Label>
          <Input
            id="stockP"
            type="number"
            value={data.storagePressure_bar}
            onChange={(v) => onUpdate("otherInputs.storagePressure_bar", v)}
          />
        </div>

        <div>
          <Label htmlFor="amort">Durée d'amortissement de la station (années)</Label>
          <Input
            id="amort"
            type="number"
            value={data.stationDepreciation_years}
            onChange={(v) => onUpdate("otherInputs.stationDepreciation_years", v)}
          />
        </div>

        <div>
          <Label htmlFor="dept">Département rattachement veh. (n°)</Label>
          <Input
            id="dept"
            value={data.registrationDepartment}
            onChange={(v) => onUpdate("otherInputs.registrationDepartment", v)}
            placeholder="Ex. 69"
          />
        </div>

        <div>
          <Label htmlFor="rate">Taux d'intérêt emprunt véhicule (annuel %)</Label>
          <Input
            id="rate"
            type="number"
            step="0.1"
            value={data.vehicleLoanInterest_ratePctYear}
            onChange={(v) => onUpdate("otherInputs.vehicleLoanInterest_ratePctYear", v)}
            placeholder="4"
          />
        </div>

        <div>
          <Label htmlFor="infl">Taux d'inflation depuis juin 2023 (%)</Label>
          <Input
            id="infl"
            type="number"
            step="0.1"
            value={data.inflationSinceJun2023_pct}
            onChange={(v) => onUpdate("otherInputs.inflationSinceJun2023_pct", v)}
            placeholder="5.2"
          />
        </div>

        <div>
          <Label htmlFor="commune">Commune ou plus proche commune du projet</Label>
          <Input
            id="commune"
            value={data.nearestCommune}
            onChange={(v) => onUpdate("otherInputs.nearestCommune", v)}
            placeholder="Lyon (69)"
          />
        </div>

        <div className="sm:col-span-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <Label>Prise en compte de la TICPE</Label>
            <YesNo
              id="ticpe"
              value={data.includeTICPE}
              onChange={(v) => onUpdate("otherInputs.includeTICPE", v)}
            />
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <Label>Prise en compte du suramortissement</Label>
            <YesNo
              id="suram"
              value={data.includeSuramortissement}
              onChange={(v) => onUpdate("otherInputs.includeSuramortissement", v)}
            />
            <p className="mt-2 text-xs text-amber-800 bg-amber-100 p-2 rounded-lg">
              ⚠️ Le rétrofit ne permet pas d'en bénéficier. Si véhicules rétrofités, mettre NON.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
