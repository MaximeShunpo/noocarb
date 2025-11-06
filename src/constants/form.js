export const emptyForm = {
  fleet: { vehicleTypes: [] },
  otherInputs: {
    gasNetworkInletPressure_bar: "",
    compressorMinHoursPerYear: "",
    compressorMaxHoursPerYear: "",
    storagePressure_bar: "",
    stationDepreciation_years: "",
    registrationDepartment: "",
    vehicleLoanInterest_ratePctYear: "",
    inflationSinceJun2023_pct: "",
    nearestCommune: "",
    includeTICPE: true,
    includeSuramortissement: true,
  },
  optionsGNC: {
    soundInsulation_A1R90: false,
    dryer: false,
    dispenserType: "",
    NGV2_fastCharge: false,
    placeLighting: false,
    containerizedCompressorBlock: false,
    semiRapidBackup: false,
    compressorRedundancy: false,
    storage3Banks: false,
  },
  optionsH2: { onsiteElectrolyser: false },
  optionElec: { fastChargePower_kW: "" },
  optionDiesel: { tankAndStationOnSite: false },
};

export const STEPS = [
  { key: "flotte", kicker: "Étape 1", label: "Flottes & mobilité" },
  { key: "autres", kicker: "Étape 2", label: "Autres données d'entrée" },
  { key: "gnc", kicker: "Étape 3", label: "Options GNC" },
  { key: "h2", kicker: "Étape 4", label: "Options H₂" },
  { key: "elec", kicker: "Étape 5", label: "Options Élec" },
  { key: "diesel", kicker: "Étape 6", label: "Option Diesel" },
  { key: "recap", kicker: "Étape 7", label: "Récap & export" },
  { key: "charts", kicker: "Étape 8", label: "Graphiques & comparaison" },
];

