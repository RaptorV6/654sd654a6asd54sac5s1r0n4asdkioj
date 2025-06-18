import { routeLoader$ } from "@builder.io/qwik-city";

import type { FormInput } from "./new-request-viewer-form";

// eslint-disable-next-line qwik/loader-location
export const useFormInitialData = routeLoader$(async () => {
  const dg = "K50.9 - Crohnova nemoc bez komplikací";
  const epikriza = "Epikriza";
  const alergie = "Penicilin";
  const alergie_kontrast = "Ano";
  const anamneza = "Pacient s delší historií gastrointestinálních potíží, aktuálně bez obtíží.";
  const handicap = "Ne";
  const vaha = "75 kg";
  const vyska = "178 cm";

  const nalehavost = "Test";
  const zadane_vysetreni = "Test";
  const anestezie_pri_vysetreni = "Ano";
  const sdeleni = "Test";
  const duvod_pozadavku = "Test";
  const specialni_pozadavek = "Upřesnění diagnózy";
  const ocekavany_prinos = "Test";

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
    anamneza,
    anestezie_pri_vysetreni,
    bydliste,
    cp,
    dg,
    duvod_pozadavku,
    epikriza,
    handicap,
    jmeno,
    jmeno_zadatel,
    nalehavost,
    ocekavany_prinos,
    odbornost,
    oddeleni,
    oddeleni_prijemce,
    rc,
    sdeleni,
    specialni_pozadavek,
    stat,
    telefon,
    telefon_zadatel,
    vaha,
    vyska,
    zadane_vysetreni,
    zp,
    zz,
    zz_prijemce,
  } satisfies FormInput;
});

// eslint-disable-next-line qwik/loader-location
export const usePreviewData = routeLoader$(async () => {
  const zz = {
    Alergie: "Penicilin",
    Alergie_kontrast: "Ano",
    Anamneza: "Pacient s delší historií gastrointestinálních potíží, aktuálně bez obtíží.",
    Dg: "K50.9 - Crohnova nemoc bez komplikací",
    Epikriza: "Epikriza",
    Handicap: "Ne",
    Vaha: "75 kg",
    Vyska: "178 cm",
  };
  const pozaduje = {
    Anestezie_pri_vysetreni: "Ano",
    Duvod_pozadavku: "test",
    Nalehavost: "Statim",
    Ocekavany_prinos: "test",
    Sdeleni: "test",
    Specialni_pozadavek: "Upřesnění diagnózy",
    Zadane_vysetreni: "test",
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
