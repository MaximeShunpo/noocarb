// Structure vide du formulaire
export const emptyForm = {
  // Étape 1 – Flottes & mobilité
  fleet: {
    vehicleTypes: [],
  },

  // Étape 2 – Autres données d'entrée
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

  // Étape 3 – Options GNC
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

  // Étape 4 – Options H2
  optionsH2: {
    onsiteElectrolyser: false,
  },

  // Étape 5 – Options Élec
  optionElec: {
    fastChargePower_kW: "",
  },

  // Étape 6 – Option Diesel
  optionDiesel: {
    tankAndStationOnSite: false,
  },
};

// Données de démonstration pré-remplies
export function createDemoData() {
  const data = JSON.parse(JSON.stringify(emptyForm));
  
  // Importer les helpers ici pour éviter les dépendances circulaires
  const { defaultVehicle } = require('../utils/helpers');
  
  data.fleet.vehicleTypes = [
    defaultVehicle("Diesel"),
    defaultVehicle("Elec"),
    defaultVehicle("bioGNC"),
  ];

  data.otherInputs = {
    gasNetworkInletPressure_bar: "6",
    compressorMinHoursPerYear: "1000",
    compressorMaxHoursPerYear: "3000",
    storagePressure_bar: "250",
    stationDepreciation_years: "10",
    registrationDepartment: "69",
    vehicleLoanInterest_ratePctYear: "4",
    inflationSinceJun2023_pct: "5.2",
    nearestCommune: "Lyon (69)",
    includeTICPE: true,
    includeSuramortissement: true,
  };

  data.optionsGNC = {
    soundInsulation_A1R90: true,
    dryer: false,
    dispenserType: "portique",
    NGV2_fastCharge: false,
    placeLighting: false,
    containerizedCompressorBlock: false,
    semiRapidBackup: true,
    compressorRedundancy: false,
    storage3Banks: true,
  };

  data.optionsH2.onsiteElectrolyser = false;
  data.optionElec.fastChargePower_kW = "150";
  data.optionDiesel.tankAndStationOnSite = true;

  return data;
}
