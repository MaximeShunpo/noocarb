import { Card, Label, YesNo } from "../ui";

export default function SectionDiesel({ form, update }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="diesel" title="Option Diesel" subtitle="Détermine la source de prix (cuve vs pompe)">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><Label>Cuve et station sur site ?</Label><YesNo id="tank" value={form.optionDiesel.tankAndStationOnSite} onChange={(v) => update("optionDiesel.tankAndStationOnSite", v)} /></div>
        </div>
      </Card>
    </div>
  );
}

