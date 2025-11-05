import { Card, Label, Input, YesNo } from '../ui';

export function SectionGNC({ data, onUpdate, highlight }) {
  return (
    <Card id="gnc" title="Options GNC" subtitle="Configuration de la station GNC" highlight={highlight}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="p-3 rounded-lg bg-slate-50">
          <Label>Isolation phonique + A1/R90</Label>
          <YesNo
            id="a1r90"
            value={data.soundInsulation_A1R90}
            onChange={(v) => onUpdate("optionsGNC.soundInsulation_A1R90", v)}
          />
        </div>

        <div className="p-3 rounded-lg bg-slate-50">
          <Label>Sécheur</Label>
          <YesNo id="dryer" value={data.dryer} onChange={(v) => onUpdate("optionsGNC.dryer", v)} />
        </div>

        <div>
          <Label htmlFor="dispenser">Type de borne</Label>
          <Input
            id="dispenser"
            value={data.dispenserType}
            onChange={(v) => onUpdate("optionsGNC.dispenserType", v)}
            placeholder="portique"
          />
        </div>

        <div className="p-3 rounded-lg bg-slate-50">
          <Label>NGV2 (si charge rapide)</Label>
          <YesNo
            id="ngv2"
            value={data.NGV2_fastCharge}
            onChange={(v) => onUpdate("optionsGNC.NGV2_fastCharge", v)}
          />
        </div>

        <div className="p-3 rounded-lg bg-slate-50">
          <Label>Éclairage à la place</Label>
          <YesNo
            id="light"
            value={data.placeLighting}
            onChange={(v) => onUpdate("optionsGNC.placeLighting", v)}
          />
        </div>

        <div className="p-3 rounded-lg bg-slate-50">
          <Label>Bloc compresseur containerisé</Label>
          <YesNo
            id="cont"
            value={data.containerizedCompressorBlock}
            onChange={(v) => onUpdate("optionsGNC.containerizedCompressorBlock", v)}
          />
        </div>

        <div className="p-3 rounded-lg bg-slate-50">
          <Label>1 charge semi‑rapide en backup</Label>
          <YesNo
            id="semi"
            value={data.semiRapidBackup}
            onChange={(v) => onUpdate("optionsGNC.semiRapidBackup", v)}
          />
        </div>

        <div className="p-3 rounded-lg bg-slate-50">
          <Label>Redondance compresseur</Label>
          <YesNo
            id="red"
            value={data.compressorRedundancy}
            onChange={(v) => onUpdate("optionsGNC.compressorRedundancy", v)}
          />
        </div>

        <div className="p-3 rounded-lg bg-slate-50">
          <Label>Stockage 3 bancs</Label>
          <YesNo
            id="banks3"
            value={data.storage3Banks}
            onChange={(v) => onUpdate("optionsGNC.storage3Banks", v)}
          />
        </div>
      </div>
    </Card>
  );
}
