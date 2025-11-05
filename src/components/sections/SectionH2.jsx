import { Card, Label, YesNo } from '../ui';

export function SectionH2({ data, onUpdate, highlight }) {
  return (
    <Card
      id="h2"
      title="Options H₂"
      subtitle="Configuration de la station hydrogène"
      highlight={highlight}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
          <Label>Électrolyseur sur site</Label>
          <YesNo
            id="elec"
            value={data.onsiteElectrolyser}
            onChange={(v) => onUpdate("optionsH2.onsiteElectrolyser", v)}
          />
        </div>
      </div>
    </Card>
  );
}
