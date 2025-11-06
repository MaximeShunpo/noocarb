import { Card, Label, YesNo } from "../ui";

export default function SectionH2({ form, update }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="h2" title="Options H₂">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><Label>Électrolyseur sur site</Label><YesNo id="elec" value={form.optionsH2.onsiteElectrolyser} onChange={(v) => update("optionsH2.onsiteElectrolyser", v)} /></div>
        </div>
      </Card>
    </div>
  );
}

