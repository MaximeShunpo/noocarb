export function getActions() {
  // Fictive recommended actions with potential point gains
  return [
    {
      id: "switch-20-diesel-ev",
      title: "Basculer 20% du Diesel vers l'Électrique",
      gain: 8,
      detail: "Identifier les usages urbains et navettes courtes. Prioriser les modèles avec charge DC ≥ 150 kW et TCO compétitif. Plan d'installation de 4 bornes rapides en dépôt + itinérance.",
    },
    {
      id: "pilot-bioGNC",
      title: "Lancer un pilote bioGNC sur les porteurs lourds",
      gain: 5,
      detail: "2 à 3 véhicules bioGNC avec stockage 3 bancs et sécheur. Sécuriser l'approvisionnement bio et contractualiser PEG Cal+ prime verte.",
    },
    {
      id: "optimize-charging",
      title: "Optimiser les fenêtres de charge et le mix lent/rapide",
      gain: 4,
      detail: "Étalement nocturne AC et top‑up DC pour lisser la pointe. Paramétrer la puissance à la baisse sur les heures pleines pour réduire CAPEX réseau.",
    },
    {
      id: "h2-feasibility",
      title: "Étude de faisabilité H₂ sur lignes longues",
      gain: 3,
      detail: "Comparer TCO H₂ vs. bioGNC/élec sur trajets > 400 km/jour. Inclure scénarios 350/700 bar, pression de distribution et disponibilité régionale.",
    },
    {
      id: "driver-eco-coaching",
      title: "Éco‑conduite & suivi télématique",
      gain: 3,
      detail: "Former 20 conducteurs, activer alerting accélérations/ralentis, mesurer les gains (‑5 à ‑12% de conso).",
    },
  ];
}

