import { Card, Label, Input, YesNo } from "../ui";

export default function SectionGNC({ form, update }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="gnc" title="Options GNC">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><Label>Isolation phonique + A1/R90</Label><YesNo id="a1r90" value={form.optionsGNC.soundInsulation_A1R90} onChange={(v) => update("optionsGNC.soundInsulation_A1R90", v)} /></div>
          <div><Label>Sécheur</Label><YesNo id="dryer" value={form.optionsGNC.dryer} onChange={(v) => update("optionsGNC.dryer", v)} /></div>
          <div><Label htmlFor="dispenser">Type de borne</Label><Input id="dispenser" value={form.optionsGNC.dispenserType} onChange={(v) => update("optionsGNC.dispenserType", v)} placeholder="portique" /></div>
          <div><Label>NGV2 (si charge rapide)</Label><YesNo id="ngv2" value={form.optionsGNC.NGV2_fastCharge} onChange={(v) => update("optionsGNC.NGV2_fastCharge", v)} /></div>
          <div><Label>Éclairage à la place</Label><YesNo id="light" value={form.optionsGNC.placeLighting} onChange={(v) => update("optionsGNC.placeLighting", v)} /></div>
          <div><Label>Bloc compresseur containerisé</Label><YesNo id="cont" value={form.optionsGNC.containerizedCompressorBlock} onChange={(v) => update("optionsGNC.containerizedCompressorBlock", v)} /></div>
          <div><Label>1 charge semi‑rapide en backup</Label><YesNo id="semi" value={form.optionsGNC.semiRapidBackup} onChange={(v) => update("optionsGNC.semiRapidBackup", v)} /></div>
          <div><Label>Redondance compresseur</Label><YesNo id="red" value={form.optionsGNC.compressorRedundancy} onChange={(v) => update("optionsGNC.compressorRedundancy", v)} /></div>
          <div><Label>Stockage 3 bancs</Label><YesNo id="banks3" value={form.optionsGNC.storage3Banks} onChange={(v) => update("optionsGNC.storage3Banks", v)} /></div>
        </div>
      </Card>
    </div>
  );
}

