import { useState } from "react";
import { emptyForm } from "../constants/form";
import { defaultVehicle } from "../utils/helpers";

export function useFormState() {
  const [form, setForm] = useState(() => {
    const f = JSON.parse(JSON.stringify(emptyForm));
    f.fleet.vehicleTypes = [defaultVehicle("Diesel"), defaultVehicle("Elec"), defaultVehicle("bioGNC")];
    f.otherInputs = {
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
    f.optionsGNC = {
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
    f.optionsH2.onsiteElectrolyser = false;
    f.optionElec.fastChargePower_kW = "150";
    f.optionDiesel.tankAndStationOnSite = true;
    return f;
  });

  function update(path, value) {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys.at(-1)] = value;
      return next;
    });
  }

  function push(path, item) {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length; i++) obj = obj[keys[i]];
      obj.push(item);
      return { ...next };
    });
  }

  function removeAt(path, index) {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length; i++) obj = obj[keys[i]];
      obj.splice(index, 1);
      return { ...next };
    });
  }

  function reset() {
    setForm(() => {
      const f = JSON.parse(JSON.stringify(emptyForm));
      f.fleet.vehicleTypes = [defaultVehicle("Diesel")];
      return f;
    });
  }

  return { form, setForm, update, push, removeAt, reset };
}

