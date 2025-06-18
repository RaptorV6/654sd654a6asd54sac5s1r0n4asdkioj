import { routeLoader$ } from "@builder.io/qwik-city";

import type { FormInput } from "./new-application-form-create-form";

// eslint-disable-next-line qwik/loader-location
export const useFormInitialData = routeLoader$(async () => {
  const dg = "K50.9 - Crohnova nemoc bez komplikací";
  const dg2 = "";
  const epikriza = "Epikriza";
  const epikriza2 = "";
  const alergie = "Penicilin";
  const alergie2 = "";
  const alergie_kontrast = "Ano";
  const alergie_kontrast2 = "";
  const anamneza = "Pacient s delší historií gastrointestinálních potíží, aktuálně bez obtíží.";
  const anamneza2 = "";
  const handicap = "Ne";
  const handicap2 = "";
  const vaha = "75 kg";
  const vaha2 = "";
  const vyska = "178 cm";
  const vyska2 = "";

  const nalehavost = "Statim";
  const nalehavost2 = "";
  const zadane_vysetreni = "Test";
  const zadane_vysetreni2 = "";
  const anestezie_pri_vysetreni = "Ano";
  const anestezie_pri_vysetreni2 = "";
  const sdeleni = "Test";
  const sdeleni2 = "";
  const duvod_pozadavku = "Test";
  const duvod_pozadavku2 = "";
  const specialni_pozadavek = "Upřesnění diagnózy";
  const specialni_pozadavek2 = "";
  const ocekavany_prinos = "Test";
  const ocekavany_prinos2 = "";

  const jmeno = "Test";
  const rc = "123456/7890";
  const bydliste = "Test";
  const stat = "Test";
  const cp = "Test";
  const zp = "Test";
  const telefon = "Test";

  const jmeno_zadatel = "Test";
  const telefon_zadatel = "Test";
  const zz = "Test";
  const oddeleni = "Test";
  const odbornost = "Test";

  const oddeleni_prijemce = "Oddeleni 1";
  const zz_prijemce = "ZZ AKESO (Nemocnice Hořovice)";

  return {
    alergie,
    alergie_kontrast,
    alergie_kontrast2,
    alergie2,
    anamneza,
    anamneza2,
    anestezie_pri_vysetreni,
    anestezie_pri_vysetreni2,
    bydliste,
    cp,
    dg,
    dg2,
    duvod_pozadavku,
    duvod_pozadavku2,
    epikriza,
    epikriza2,
    handicap,
    handicap2,
    jmeno,
    jmeno_zadatel,
    nalehavost,
    nalehavost2,
    ocekavany_prinos,
    ocekavany_prinos2,
    odbornost,
    oddeleni,
    oddeleni_prijemce,
    rc,
    sdeleni,
    sdeleni2,
    specialni_pozadavek,
    specialni_pozadavek2,
    stat,
    telefon,
    telefon_zadatel,
    vaha,
    vaha2,
    vyska,
    vyska2,
    zadane_vysetreni,
    zadane_vysetreni2,
    zp,
    zz,
    zz_prijemce,
  } satisfies FormInput;
});

// eslint-disable-next-line qwik/loader-location
export const usePreviewData = routeLoader$(async ({ error, query }) => {
  const patientAkordId = ((pid) => (!pid ? NaN : Number(pid)))(query.get("pacient"));

  if (!patientAkordId || isNaN(patientAkordId)) {
    throw error(400, "Invalid patient id query parameter.");
  }

  const zz = {
    Alergie: "Penicilin",
    Alergie_kontrast: "Ano",
    Alergie_kontrast2: "",
    Alergie2: "",
    Anamneza: "Pacient s delší historií gastrointestinálních potíží, aktuálně bez obtíží.",
    Anamneza2: "",
    Dg: "K50.9 - Crohnova nemoc bez komplikací",
    Dg2: "",
    Epikriza: "Epikriza",
    Epikriza2: "",
    Handicap: "Ne",
    Handicap2: "",
    Vaha: "75 kg",
    Vaha2: "",
    Vyska: "178 cm",
    Vyska2: "",
  };
  const pozaduje = {
    Anestezie_pri_vysetreni: "Ano",
    Anestezie_pri_vysetreni2: "Ano",
    Duvod_pozadavku: "test",
    Duvod_pozadavku2: "",
    Nalehavost: "Statim",
    Nalehavost2: "",
    Ocekavany_prinos: "test",
    Ocekavany_prinos2: "",
    Sdeleni: "test",
    Sdeleni2: "",
    Specialni_pozadavek: "Upřesnění diagnózy",
    Specialni_pozadavek2: "",
    Zadane_vysetreni: "test",
    Zadane_vysetreni2: "",
  };

  const pacient = {
    bydliste: "Adresa 12",
    cp: "123",
    jmeno: "Jan Novák",
    rc: "123456/7890",
    stat: "Stat",
    telefon: "333444555",
    zp: "1234",
  };

  const zadatel = {
    jmeno_zadatel: "Jan Novák",
    odbornost: "101",
    oddeleni: "Radiologie",
    telefon_zadatel: "123",
    zz: "Nemocnice Akeso",
  };

  const prijemce = {
    oddeleni_prijemce: "Oddeleni 1",
    zz_prijemce: "ZZ AKESO (Nemocnice Hořovice)",
  };

  return {
    pacient,
    pozaduje,
    prijemce,
    zadatel,
    zz,
  };
});
