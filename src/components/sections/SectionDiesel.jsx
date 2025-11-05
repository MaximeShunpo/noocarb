import { Card, Label, YesNo } from '../ui';

export function SectionDiesel({ data, onUpdate, highlight }) {
  return (
    <Card
      id="diesel"
      title="Option Diesel"
      subtitle="Détermine la source de prix (cuve vs pompe)"
      highlight={highlight}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <Label>Cuve et station sur site ?</Label>
          <YesNo
            id="tank"
            value={data.tankAndStationOnSite}
            onChange={(v) => onUpdate("optionDiesel.tankAndStationOnSite", v)}
          />
        </div>
      </div>
    </Card>
  );
}
