import { Card, Label, Input } from '../ui';

export function SectionElec({ data, onUpdate, highlight }) {
  return (
    <Card
      id="elec"
      title="Options Élec"
      subtitle="Configuration des bornes de recharge"
      highlight={highlight}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="fastkW">Borne de recharge rapide en complément (kW)</Label>
          <Input
            id="fastkW"
            type="number"
            value={data.fastChargePower_kW}
            onChange={(v) => onUpdate("optionElec.fastChargePower_kW", v)}
            placeholder="Ex. 150"
          />
        </div>
      </div>
    </Card>
  );
}
