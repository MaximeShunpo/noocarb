// Thème de l'application
export const THEME = {
  primary: "#0F766E",
  primaryDark: "#115E59",
  accent: "#0EA5E9",
  ink: "#0B1220",
  text: "#0f172a",
  subtext: "#475569",
  border: "#E2E8F0",
  surface: "#FFFFFF",
  surfaceAlt: "#F8FAFC",
  success: "#10B981",
};

// Étapes du wizard
export const STEPS = [
  { key: "flotte", kicker: "Étape 1", label: "Flottes & mobilité" },
  { key: "autres", kicker: "Étape 2", label: "Autres données d'entrée" },
  { key: "gnc", kicker: "Étape 3", label: "Options GNC" },
  { key: "h2", kicker: "Étape 4", label: "Options H₂" },
  { key: "elec", kicker: "Étape 5", label: "Options Élec" },
  { key: "diesel", kicker: "Étape 6", label: "Option Diesel" },
  { key: "recap", kicker: "Étape 7", label: "Récap & export" },
];

// Types de véhicules disponibles
export const VEHICLE_TYPES = ["bioGNC", "Elec", "H2", "B100", "HVO", "Diesel"];
