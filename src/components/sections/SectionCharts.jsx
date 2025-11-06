import { Card } from "../ui";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { COLORS } from "../../constants/theme";

export default function SectionCharts({ ecoScore, fleetByType, energyPerType }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="charts" title="Graphiques & score" subtitle="Visualiser la mobilité et un score (fictif) sur 100">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 grid place-items-center rounded-full border border-emerald-300 text-xl font-bold text-emerald-700">{ecoScore}</div>
            <div className="text-sm text-slate-600">Score mobilité (fictif /100)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Répartition de la flotte par énergie</h4>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={fleetByType} dataKey="value" nameKey="name" outerRadius={100} label>
                    {fleetByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Énergie annuelle estimée (index)</h4>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyPerType} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="kwh" name="Index énergie" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 md:col-span-2">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Profil d'impact (fictif)</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { subject: "CO₂", A: 100 - ecoScore },
                  { subject: "Coût énergie", A: 80 - ecoScore * 0.5 },
                  { subject: "Autonomie", A: 40 + (100 - ecoScore) * 0.2 },
                  { subject: "Capillarité", A: 50 },
                  { subject: "Maturité tech", A: 60 },
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Parc" dataKey="A" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

