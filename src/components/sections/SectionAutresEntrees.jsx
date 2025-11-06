import { Card, Label, Input, YesNo } from "../ui";

export default function SectionAutresEntrees({ form, update }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="autres" title="Autres données d'entrée" subtitle="Paramètres station & finance">
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
}

