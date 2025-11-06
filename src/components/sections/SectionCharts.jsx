import { Card } from "../ui";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Legend } from "recharts";
import { COLORS } from "../../constants/theme";

export default function SectionCharts({ ecoScore, fleetByType, costComparison, gncStationCost }) {
  // Préparer les données pour le graphique de comparaison des coûts
  const costComparisonData = costComparison?.scenarios?.map((scenario) => ({
    name: scenario.name,
    "Coût total (€)": Math.round(scenario.totalCost),
    "Coût carburant (€)": Math.round(scenario.fuelCost),
    "Coût véhicules (€)": Math.round(scenario.vehicleCost),
    "Coût maintenance (€)": Math.round(scenario.maintenanceCost),
    "Économies vs actuel (€)": Math.round(scenario.savings),
  })) || [];

  // Données pour le graphique des économies
  const savingsData = costComparison?.scenarios?.map((scenario) => ({
    name: scenario.name,
    "Économies (€)": Math.round(scenario.savings),
  })) || [];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card id="charts" title="Graphiques & analyse comparative" subtitle="Comparaison des coûts entre différentes flottes">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 grid place-items-center rounded-full border border-emerald-300 text-xl font-bold text-emerald-700">{ecoScore}</div>
            <div className="text-sm text-slate-600">Score mobilité (fictif /100)</div>
          </div>
          {costComparison?.current && (
            <div className="text-sm text-slate-600">
              <span className="font-semibold">Coût actuel estimé : </span>
              {formatCurrency(costComparison.current.totalCost)}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Graphique de comparaison des coûts totaux */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-4 text-sm font-semibold text-slate-700">Comparaison des coûts totaux par scénario</h4>
            <p className="mb-4 text-xs text-slate-500">
              Comparaison des coûts annuels si toute la flotte était convertie en Diesel, Électrique ou bioGNC
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costComparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    labelStyle={{ color: "#334155" }}
                  />
                  <Legend />
                  <Bar dataKey="Coût total (€)" fill="#10B981" name="Coût total" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graphique des économies potentielles */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-4 text-sm font-semibold text-slate-700">Économies potentielles vs flotte actuelle</h4>
            <p className="mb-4 text-xs text-slate-500">
              Économies annuelles estimées en convertissant toute la flotte vers chaque énergie
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={savingsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    labelStyle={{ color: "#334155" }}
                  />
                  <Bar 
                    dataKey="Économies (€)" 
                    name="Économies"
                  >
                    {savingsData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry["Économies (€)"] > 0 ? "#10B981" : "#EF4444"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Détail des coûts par catégorie */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-4 text-sm font-semibold text-slate-700">Détail des coûts par catégorie</h4>
            <p className="mb-4 text-xs text-slate-500">
              Répartition des coûts : carburant, véhicules et maintenance
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costComparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    labelStyle={{ color: "#334155" }}
                  />
                  <Legend />
                  <Bar dataKey="Coût carburant (€)" stackId="a" fill="#0EA5E9" name="Carburant" />
                  <Bar dataKey="Coût véhicules (€)" stackId="a" fill="#F59E0B" name="Véhicules" />
                  <Bar dataKey="Coût maintenance (€)" stackId="a" fill="#6366F1" name="Maintenance" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Répartition de la flotte actuelle */}
          {fleetByType.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="mb-2 text-sm font-semibold text-slate-700">Répartition de la flotte actuelle par énergie</h4>
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
          )}

          {/* Coût de la station GNC */}
          {gncStationCost && (
            <>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h4 className="mb-4 text-sm font-semibold text-slate-700">Coût de la station GNC</h4>
                <p className="mb-4 text-xs text-slate-500">
                  Répartition des coûts d'investissement et d'exploitation de la station GNC pour la flotte bioGNC
                </p>
                <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Investissement total</div>
                    <div className="text-lg font-bold text-slate-900">{formatCurrency(gncStationCost.totalInvestment)}</div>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Coût annuel</div>
                    <div className="text-lg font-bold text-slate-900">{formatCurrency(gncStationCost.annualStationCost)}</div>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Maintenance annuelle</div>
                    <div className="text-lg font-bold text-slate-900">{formatCurrency(gncStationCost.annualMaintenanceCost)}</div>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Consommation GNC</div>
                    <div className="text-lg font-bold text-slate-900">{gncStationCost.totalConsumption_kg_per_year.toLocaleString()} kg/an</div>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[
                        { name: "Compresseur", value: gncStationCost.breakdown.compressor },
                        { name: "Stockage", value: gncStationCost.breakdown.storage },
                        { name: "Borne", value: gncStationCost.breakdown.dispenser },
                        { name: "Installation", value: gncStationCost.breakdown.installation },
                        { name: "Options", value: gncStationCost.breakdown.options },
                      ]} 
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
                      <Tooltip 
                        formatter={(value) => formatCurrency(value)}
                        labelStyle={{ color: "#334155" }}
                      />
                      <Bar dataKey="value" fill="#10B981" name="Coût (€)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h4 className="mb-4 text-sm font-semibold text-slate-700">Coûts annuels de la station GNC</h4>
                <p className="mb-4 text-xs text-slate-500">
                  Répartition des coûts annuels : amortissement et maintenance
                </p>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[
                        { name: "Amortissement", value: gncStationCost.annualDepreciation },
                        { name: "Maintenance", value: gncStationCost.annualMaintenanceCost },
                      ]} 
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
                      <Tooltip 
                        formatter={(value) => formatCurrency(value)}
                        labelStyle={{ color: "#334155" }}
                      />
                      <Bar dataKey="value" fill="#0EA5E9" name="Coût annuel (€)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
