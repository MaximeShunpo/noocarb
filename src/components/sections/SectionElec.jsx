import { Card, Label, Input } from "../ui";

export default function SectionElec({ form, update }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="elec" title="Options Élec">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><Label htmlFor="fastkW">Borne de recharge rapide en complément (kW)</Label>
            <Input id="fastkW" value={form.optionElec.fastChargePower_kW} onChange={(v) => update("optionElec.fastChargePower_kW", v)} placeholder="Ex. 150" /></div>
        </div>
      </Card>
    </div>
  );
}

