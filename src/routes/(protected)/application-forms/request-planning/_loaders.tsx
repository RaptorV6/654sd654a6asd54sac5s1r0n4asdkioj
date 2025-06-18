import { routeLoader$ } from "@builder.io/qwik-city";

import type { FormInput } from "./new-request-planning-form";

// eslint-disable-next-line qwik/loader-location
export const useFormInitialData = routeLoader$(async () => {
  const dg = "";
  const epikriza = "Epikriza";
  const alergie = "";
  const alergie_kontrast = "Ano";
  const anamneza = "Pacient s delší historií gastrointestinálních potíží, aktuálně bez obtíží.";
  const handicap = "Ne";
  const vaha = undefined;
  const vyska = undefined;

  const nalehavost = "Statim";
  const zadane_vysetreni = "Test";
  const anestezie_pri_vysetreni = "Ano";
  const sdeleni = "Test";
  const duvod_pozadavku = "Test";
  const specialni_pozadavek = "Upřesnění diagnózy";
  const ocekavany_prinos = "Test";

  const jmeno = "";
  const bydliste = "Test";
  const stat = "Test";
  const cp = undefined;
  const ext_zad = true;
  const zp = "Test";
  const telefon = "Test";

  const jmeno_zadatel = "";
  const telefon_zadatel = "Test";
  const duvod_neprovedeni = "Test";
  const zz = "Test";
  const nepodepsano = "neomluvil";
  const oddeleni = "Test";
  const icp = undefined;
  const odbornost = undefined;
  const urgency = "RUTINA";
  const urgency2 = "RUTINA";
  const issueDate = new Date();

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
    duvod_neprovedeni,
    duvod_pozadavku,
    epikriza,
    ext_zad,
    handicap,
    icp,
    issueDate,
    jmeno,
    jmeno_zadatel,
    nalehavost,
    nepodepsano,
    ocekavany_prinos,
    odbornost,
    oddeleni,
    oddeleni_prijemce,
    sdeleni,
    specialni_pozadavek,
    stat,
    telefon,
    telefon_zadatel,
    urgency,
    urgency2,
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
    Alergie: "",
    Alergie_kontrast: "Ano",
    Anamneza: "Pacient s delší historií gastrointestinálních potíží, aktuálně bez obtíží.",
    Dg: "",
    Epikriza: "Epikriza",
    Handicap: "Ne",
    Vaha: "75 kg",
    Vyska: "178 cm",
  };
  const pozaduje = {
    Anestezie_pri_vysetreni: "Ano",
    Duvod_pozadavku: "test",
    ext_zad: true,
    Nalehavost: "Statim",
    Ocekavany_prinos: "test",
    Sdeleni: "test",
    Specialni_pozadavek: "Upřesnění diagnózy",
    Zadane_vysetreni: "test",
  };

  const pacient = {
    bydliste: "Adresa 12",
    cp: undefined,
    jmeno: "",
    stat: "Stat",
    telefon: "333444555",
    zp: "1234",
  };

  const zadatel = {
    duvod_neprovedeni: "123",
    Icp: undefined,
    jmeno_zadatel: "Jan Novák",
    Odbornost: "",
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
