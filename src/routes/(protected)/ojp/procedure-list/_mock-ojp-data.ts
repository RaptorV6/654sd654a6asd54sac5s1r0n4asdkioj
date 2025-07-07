/* eslint-disable perfectionist/sort-object-types */
/* eslint-disable perfectionist/sort-objects */
import { splitCsv } from "~/lib/mock-client-helpers";

//----------------------------------------------------------------------------------------------------------------------
//
// Surgery Slots
//
//----------------------------------------------------------------------------------------------------------------------

const ojpProcedureListSurgerySourceCols = [
  "ID operetár / výkon",
  "ID operetár / výkon2",
  "Typ",
  "Operační výkon",
  "Kód výkonu",
  "Operatér",
  "Priorita operatéra",
  "Úhrada",
  "Zaokrouhlen čas na sále (min)",
  "Prům. délka pacienta na sále (min)",
  "% Pacientů, kteří musí zůstat do dalšího dne",
  "Anesteziolog",
  "Asistent 1",
  "Asistent 2",
  "Perioperační sestra",
  "Anesteziolog. sestra",
  "Obíhácí sestra",
  "Sanitář",
  "Úklid sálu",
  "Jméno operatéra",
  "Příjmení operatéra",
] as const;

const ojpProcedureListSurgerySource = `
STRYKO 1;STRYKO (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Adam Stryko;2;47818;45;44.5;48;1;1;0;1;1;1;1;10;Adam;Stryko
STRYKO 2;STRYKO (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Adam Stryko;2;50.000;55;53.0;69;1;1;0;1;1;1;1;10;Adam;Stryko
STRYKO 3;STRYKO (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Adam Stryko;2;23.355;45;41.5;29;1;1;0;1;1;1;1;10;Adam;Stryko
STANČÁK 1;STANČÁK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Andrej Stančák;2;47818;40;37.9;48;1;1;0;1;1;1;1;10;Andrej;Stančák
STANČÁK 2;STANČÁK (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Andrej Stančák;2;23355;35;30.4;29;1;1;0;1;1;1;1;10;Andrej;Stančák
ROSOCHA 1;ROSOCHA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Bohumil Rosocha;2;47818;35;32.9;48;1;1;0;1;1;1;1;10;Bohumil;Rosocha
ROSOCHA 2;ROSOCHA (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Bohumil Rosocha;2;23355;35;34.0;29;1;1;0;1;1;1;1;10;Bohumil;Rosocha
BĚLÍK 1;BĚLÍK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Daniel Bělík;2;47818;45;44.9;48;1;1;0;1;1;1;1;10;Daniel;Bělík
BĚLÍK 2;BĚLÍK (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Daniel Bělík;2;23355;40;36.4;29;1;1;0;1;1;1;1;10;Daniel;Bělík
HOŠEK 1;HOŠEK (M);Ortopedie;HEMIARTROPLASTIKA KOLENE - SÁŇOVÁ PROTÉZA;66649;Daniel Hošek;2;37000;105;100.6;100;1;1;0;1;1;1;1;10;Daniel;Hošek
HOŠEK 2;HOŠEK (N);Ortopedie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Daniel Hošek;2;1584;50;49.0;7;1;1;0;1;1;1;1;10;Daniel;Hošek
HOŠEK 3;HOŠEK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Daniel Hošek;2;47818;50;49.7;48;1;1;0;1;1;1;1;10;Daniel;Hošek
STEHLÍK 1;STEHLÍK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;David Stehlík;2;47818;30;28.5;48;1;1;0;1;1;1;1;10;David;Stehlík
STEHLÍK 2;STEHLÍK (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;David Stehlík;2;23355;30;27.7;29;1;1;0;1;1;1;1;10;David;Stehlík
STEHLÍK 3;STEHLÍK (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;David Stehlík;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;David;Stehlík
STEHLÍK 4;STEHLÍK (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;David Stehlík;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;David;Stehlík
ŠŤASTNÝ 1;ŠŤASTNÝ (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Eduard Šťastný;2;47818;40;38.8;48;1;1;0;1;1;1;1;10;Eduard;Šťastný
ŠŤASTNÝ 2;ŠŤASTNÝ (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Eduard Šťastný;2;23355;35;30.8;29;1;1;0;1;1;1;1;10;Eduard;Šťastný
HANÁK 1;HANÁK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Filip Hanák;2;47818;40;37.8;48;1;1;0;1;1;1;1;10;Filip;Hanák
HANÁK 2;HANÁK (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Filip Hanák;2;23355;40;36.0;29;1;1;0;1;1;1;1;10;Filip;Hanák
HEBELKA 1;HEBELKA (M);Ortopedie;HEMIARTROPLASTIKA KOLENE - SÁŇOVÁ PROTÉZA;66649;Filip Hebelka;2;37000;115;111.0;100;1;1;0;1;1;1;1;10;Filip;Hebelka
HEBELKA 2;HEBELKA (N);Ortopedie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Filip Hebelka;2;1584;50;48.0;7;1;1;0;1;1;1;1;10;Filip;Hebelka
HEBELKA 3;HEBELKA (P);Ortopedie;OPERACE KARPÁLNÍHO TUNELU;61247;Filip Hebelka;2;2785;40;40.0;0;1;1;0;1;1;1;1;10;Filip;Hebelka
HEBELKA 4;HEBELKA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Filip Hebelka;2;47818;50;45.1;48;1;1;0;1;1;1;1;10;Filip;Hebelka
HEBELKA 5;HEBELKA (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Filip Hebelka;2;50000;70;69.0;69;1;1;0;1;1;1;1;10;Filip;Hebelka
HEBELKA 6;HEBELKA (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Filip Hebelka;2;23355;45;44.0;29;1;1;0;1;1;1;1;10;Filip;Hebelka
HEBELKA 7;HEBELKA (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Filip Hebelka;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;Filip;Hebelka
HEBELKA 8;HEBELKA (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Filip Hebelka;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;Filip;Hebelka
GULAČ 1;GULAČ (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Jakub Gulač;2;47818;30;29.7;48;1;1;0;1;1;1;1;10;Jakub;Gulač
GULAČ 2;GULAČ (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Jakub Gulač;2;23355;40;39.4;29;1;1;0;1;1;1;1;10;Jakub;Gulač
BĚŠCEC 1;BĚŠCEC (N);Ortopedie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Jan Běšcec;2;1584;40;37.0;7;1;1;0;1;1;1;1;10;Jan;Běšcec
BĚŠCEC 2;BĚŠCEC (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Jan Běšcec;2;47818;100;95.1;48;1;1;0;1;1;1;1;10;Jan;Běšcec
BĚŠCEC 3;BĚŠCEC (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Jan Běšcec;2;23355;40;38.5;29;1;1;0;1;1;1;1;10;Jan;Běšcec
KOTAŠKA 1;KOTAŠKA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Jan Kotaška;2;47818;35;34.6;48;1;1;0;1;1;1;1;10;Jan;Kotaška
KOTAŠKA 2;KOTAŠKA (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Jan Kotaška;2;23355;30;29.0;29;1;1;0;1;1;1;1;10;Jan;Kotaška
KOTAŠKA 3;KOTAŠKA (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Jan Kotaška;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;Jan;Kotaška
KOTAŠKA 4;KOTAŠKA (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Jan Kotaška;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;Jan;Kotaška
ZLATOHLAVÝ 1;ZLATOHLAVÝ (L);Ortopedie;FENESTRACE ŠLACHOVÉ POCHVY;61245;Jan Zlatohlavý;2;2675;55;54.2;0;1;1;0;1;1;1;1;10;Jan;Zlatohlavý
ZLATOHLAVÝ 2;ZLATOHLAVÝ (P);Ortopedie;OPERACE KARPÁLNÍHO TUNELU;61247;Jan Zlatohlavý;2;2785;45;40.4;0;1;1;0;1;1;1;1;10;Jan;Zlatohlavý
ZLATOHLAVÝ 3;ZLATOHLAVÝ (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Jan Zlatohlavý;2;47818;55;51.6;48;1;1;0;1;1;1;1;10;Jan;Zlatohlavý
ZLATOHLAVÝ 4;ZLATOHLAVÝ (T);Ortopedie;ROZŠÍŘENÁ APONEUREKTOMIE U FORMY DUPUYTRENOVY KONTRAKTURY S KONTRAKTUROU PRSTU;61255;Jan Zlatohlavý;2;7257;50;46.1;3;1;1;0;1;1;1;1;10;Jan;Zlatohlavý
ZLATOHLAVÝ 5;ZLATOHLAVÝ (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Jan Zlatohlavý;2;23355;85;84.0;29;1;1;0;1;1;1;1;10;Jan;Zlatohlavý
PŘIDAL 1;PŘIDAL (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Jaromír Přidal;2;47818;45;41.0;48;1;1;0;1;1;1;1;10;Jaromír;Přidal
PŘIDAL 2;PŘIDAL (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Jaromír Přidal;2;50000;45;44.0;69;1;1;0;1;1;1;1;10;Jaromír;Přidal
PŘIDAL 3;PŘIDAL (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Jaromír Přidal;2;23355;35;35.0;29;1;1;0;1;1;1;1;10;Jaromír;Přidal
PEČENÝ 1;PEČENÝ (M);Ortopedie;HEMIARTROPLASTIKA KOLENE - SÁŇOVÁ PROTÉZA;66649;Jiří Pečený;2;37000;110;109.4;100;1;1;0;1;1;1;1;10;Jiří;Pečený
PEČENÝ 2;PEČENÝ (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Jiří Pečený;2;47818;50;47.3;48;1;1;0;1;1;1;1;10;Jiří;Pečený
PEČENÝ 3;PEČENÝ (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Jiří Pečený;2;50000;60;60.0;69;1;1;0;1;1;1;1;10;Jiří;Pečený
SCHOVANEC 1;SCHOVANEC (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Jiří Schovanec;2;47818;45;41.3;48;1;1;0;1;1;1;1;10;Jiří;Schovanec
SCHOVANEC 2;SCHOVANEC (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Jiří Schovanec;2;50000;50;47.0;69;1;1;0;1;1;1;1;10;Jiří;Schovanec
SCHOVANEC 3;SCHOVANEC (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Jiří Schovanec;2;23355;35;34.1;29;1;1;0;1;1;1;1;10;Jiří;Schovanec
SCHOVANEC 4;SCHOVANEC (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Jiří Schovanec;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;Jiří;Schovanec
SCHOVANEC 5;SCHOVANEC (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Jiří Schovanec;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;Jiří;Schovanec
KILIJÁN 1;KILIJÁN (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Josef Kiliján;2;47818;35;33.3;48;1;1;0;1;1;1;1;10;Josef;Kiliján
ŽÁN 1;ŽÁN (O);Ortopedie;OPERACE EPIKONDYLITIDY;66849;Josef Žán;2;24531;45;40.8;20;1;1;0;1;1;1;1;10;Josef;Žán
ŽÁN 2;ŽÁN (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Josef Žán;2;47818;40;35.5;48;1;1;0;1;1;1;1;10;Josef;Žán
ŽÁN 3;ŽÁN (T);Ortopedie;ROZŠÍŘENÁ APONEUREKTOMIE U FORMY DUPUYTRENOVY KONTRAKTURY S KONTRAKTUROU PRSTU;61255;Josef Žán;2;7257;50;45.8;3;1;1;0;1;1;1;1;10;Josef;Žán
ŽÁN 4;ŽÁN (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Josef Žán;2;23355;35;30.8;29;1;1;0;1;1;1;1;10;Josef;Žán
KOPSOVÁ 1;KOPSOVÁ (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Kristýna Kopsová;2;47818;35;35.0;48;1;1;0;1;1;1;1;10;Kristýna;Kopsová
LUKÁŠ 1;LUKÁŠ (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Ludvík Lukáš;2;47818;45;44.6;48;1;1;0;1;1;1;1;10;Ludvík;Lukáš
LUKÁŠ 2;LUKÁŠ (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Ludvík Lukáš;2;23355;30;27.3;29;1;1;0;1;1;1;1;10;Ludvík;Lukáš
STAŠA 1;STAŠA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Marcel Staša;2;47818;70;66.2;48;1;1;0;1;1;1;1;10;Marcel;Staša
STAŠA 2;STAŠA (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Marcel Staša;2;23355;45;40.3;29;1;1;0;1;1;1;1;10;Marcel;Staša
REICHL 1;REICHL (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Marek Reichl;2;47818;65;64.4;48;1;1;0;1;1;1;1;10;Marek;Reichl
REICHL 2;REICHL (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Marek Reichl;2;23355;35;31.6;29;1;1;0;1;1;1;1;10;Marek;Reichl
DĚRČALÍK 1;DĚRČALÍK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Martin Děrčalík;2;47818;40;38.5;48;1;1;0;1;1;1;1;10;Martin;Děrčalík
DĚRČALÍK 2;DĚRČALÍK (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Martin Děrčalík;2;23355;20;19.2;29;1;1;0;1;1;1;1;10;Martin;Děrčalík
HANUS 1;HANUS (M);Ortopedie;HEMIARTROPLASTIKA KOLENE - SÁŇOVÁ PROTÉZA;66649;Martin Hanus;2;37000;110;110.0;100;1;1;0;1;1;1;1;10;Martin;Hanus
HANUS 2;HANUS (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Martin Hanus;2;47818;45;40.1;48;1;1;0;1;1;1;1;10;Martin;Hanus
HANUS 3;HANUS (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Martin Hanus;2;50000;90;87.8;69;1;1;0;1;1;1;1;10;Martin;Hanus
HANUS 4;HANUS (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Martin Hanus;2;23355;60;59.5;29;1;1;0;1;1;1;1;10;Martin;Hanus
HANUS 5;HANUS (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Martin Hanus;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;Martin;Hanus
HANUS 6;HANUS (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Martin Hanus;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;Martin;Hanus
JELÍNEK 1;JELÍNEK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Matyáš Jelínek;2;47818;35;34.4;48;1;1;0;1;1;1;1;10;Matyáš;Jelínek
JELÍNEK 2;JELÍNEK (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Matyáš Jelínek;2;50000;100;98.0;69;1;1;0;1;1;1;1;10;Matyáš;Jelínek
JELÍNEK 3;JELÍNEK (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Matyáš Jelínek;2;23355;35;35.0;29;1;1;0;1;1;1;1;10;Matyáš;Jelínek
PROCHÁZKA 1;PROCHÁZKA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Miloslav Procházka;2;47818;35;33.3;48;1;1;0;1;1;1;1;10;Miloslav;Procházka
PROCHÁZKA 2;PROCHÁZKA (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Miloslav Procházka;2;23355;40;38.7;29;1;1;0;1;1;1;1;10;Miloslav;Procházka
SMETANA 1;SMETANA (M);Ortopedie;HEMIARTROPLASTIKA KOLENE - SÁŇOVÁ PROTÉZA;66649;Pavel Smetana;2;37000;120;120.0;100;1;1;0;1;1;1;1;10;Pavel;Smetana
SMETANA 2;SMETANA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Pavel Smetana;2;47818;60;59.5;48;1;1;0;1;1;1;1;10;Pavel;Smetana
SMETANA 3;SMETANA (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Pavel Smetana;2;23355;45;43.2;29;1;1;0;1;1;1;1;10;Pavel;Smetana
KONÍČEK 1;KONÍČEK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Petr Koníček;2;47818;65;62.1;48;1;1;0;1;1;1;1;10;Petr;Koníček
KONÍČEK 2;KONÍČEK (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Petr Koníček;2;50000;100;99.9;69;1;1;0;1;1;1;1;10;Petr;Koníček
KONÍČEK 3;KONÍČEK (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Petr Koníček;2;23355;50;45.9;29;1;1;0;1;1;1;1;10;Petr;Koníček
LANDSPERSKÝ 1;LANDSPERSKÝ (N);Ortopedie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Petr Landsperský;2;1584;30;30.0;7;1;1;0;1;1;1;1;10;Petr;Landsperský
LANDSPERSKÝ 2;LANDSPERSKÝ (P);Ortopedie;OPERACE KARPÁLNÍHO TUNELU;61247;Petr Landsperský;2;2785;40;40.0;0;1;1;0;1;1;1;1;10;Petr;Landsperský
LANDSPERSKÝ 3;LANDSPERSKÝ (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Petr Landsperský;2;47818;45;43.2;48;1;1;0;1;1;1;1;10;Petr;Landsperský
LANDSPERSKÝ 4;LANDSPERSKÝ (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Petr Landsperský;2;50000;70;67.0;69;1;1;0;1;1;1;1;10;Petr;Landsperský
LANDSPERSKÝ 5;LANDSPERSKÝ (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Petr Landsperský;2;23355;35;33.4;29;1;1;0;1;1;1;1;10;Petr;Landsperský
MAŠÁT 1;MAŠÁT (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Petr Mašát;2;47818;55;51.0;48;1;1;0;1;1;1;1;10;Petr;Mašát
MAŠÁT 2;MAŠÁT (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Petr Mašát;2;50000;65;63.0;69;1;1;0;1;1;1;1;10;Petr;Mašát
MAŠÁT 3;MAŠÁT (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Petr Mašát;2;23355;35;34.0;29;1;1;0;1;1;1;1;10;Petr;Mašát
MAŠÁT 4;MAŠÁT (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Petr Mašát;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;Petr;Mašát
MAŠÁT 5;MAŠÁT (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Petr Mašát;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;Petr;Mašát
NEPRAŠ 1;NEPRAŠ (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Petr Nepraš;1;47818;35;34.5;48;1;1;0;1;1;1;1;10;Petr;Nepraš
NEPRAŠ 2;NEPRAŠ (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Petr Nepraš;1;23355;30;28.8;29;1;1;0;1;1;1;1;10;Petr;Nepraš
NEPRAŠ 3;NEPRAŠ (V);Ortopedie;SYNOVEKTOMIE ZÁPĚSTÍ A RUKY;66429;Petr Nepraš;1;4020;35;34.7;0;1;1;0;1;1;1;1;10;Petr;Nepraš
NEPRAŠ 4;NEPRAŠ (Y);Ortopedie;UVOLNĚNÍ SVALU / ŠLACHY;67227;Petr Nepraš;1;24531;30;28.0;0;1;1;0;1;1;1;1;10;Petr;Nepraš
NEPRAŠ 5;NEPRAŠ (N);Ortopedie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Petr Nepraš;1;1584;35;33.5;7;1;1;0;1;1;1;1;10;Petr;Nepraš
NEPRAŠ 6;NEPRAŠ (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Petr Nepraš;1;150000;120;120.0;100;1;1;1;1;1;1;1;30;Petr;Nepraš
NEPRAŠ 7;NEPRAŠ (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Petr Nepraš;1;142000;90;90.0;100;1;1;0;1;1;1;1;30;Petr;Nepraš
SKALA 1;SKALA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Petr Skala;2;47818;50;50.0;48;1;1;0;1;1;1;1;10;Petr;Skala
KUBELA 1;KUBELA (O);Ortopedie;OPERACE EPIKONDYLITIDY;66849;Richard Kubela;2;24531;45;44.0;20;1;1;0;1;1;1;1;10;Richard;Kubela
KUBELA 2;KUBELA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Richard Kubela;2;47818;45;43.6;48;1;1;0;1;1;1;1;10;Richard;Kubela
KUBELA 3;KUBELA (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Richard Kubela;2;23355;40;38.9;29;1;1;0;1;1;1;1;10;Richard;Kubela
FREI 1;FREI (M);Ortopedie;HEMIARTROPLASTIKA KOLENE - SÁŇOVÁ PROTÉZA;66649;Robert Frei;2;37000;100;96.6;100;1;1;0;1;1;1;1;10;Robert;Frei
FREI 2;FREI (N);Ortopedie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Robert Frei;2;1584;115;113.0;7;1;1;0;1;1;1;1;10;Robert;Frei
FREI 3;FREI (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Robert Frei;2;47818;55;52.3;48;1;1;0;1;1;1;1;10;Robert;Frei
FREI 4;FREI (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Robert Frei;2;50000;90;87.0;69;1;1;0;1;1;1;1;10;Robert;Frei
FREI 5;FREI (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Robert Frei;2;23355;45;41.0;29;1;1;0;1;1;1;1;10;Robert;Frei
FREI 6;FREI (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Robert Frei;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;Robert;Frei
FREI 7;FREI (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Robert Frei;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;Robert;Frei
KALINA 1;KALINA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Tomáš Kalina;2;47818;40;36.4;48;1;1;0;1;1;1;1;10;Tomáš;Kalina
KALINA 2;KALINA (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Tomáš Kalina;2;23355;40;35.3;29;1;1;0;1;1;1;1;10;Tomáš;Kalina
KASAL 1;KASAL (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Tomáš Kasal;2;47818;50;47.3;48;1;1;0;1;1;1;1;10;Tomáš;Kasal
KASAL 2;KASAL (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Tomáš Kasal;2;23355;45;44.0;29;1;1;0;1;1;1;1;10;Tomáš;Kasal
DVOŘÁK 1;DVOŘÁK (M);Ortopedie;HEMIARTROPLASTIKA KOLENE - SÁŇOVÁ PROTÉZA;66649;Vít Dvořák;2;37000;90;87.7;100;1;1;0;1;1;1;1;10;Vít;Dvořák
DVOŘÁK 2;DVOŘÁK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Vít Dvořák;2;47818;85;80.4;48;1;1;0;1;1;1;1;10;Vít;Dvořák
DVOŘÁK 3;DVOŘÁK (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Vít Dvořák;2;23355;35;33.2;29;1;1;0;1;1;1;1;10;Vít;Dvořák
HAVLAS 1;HAVLAS (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Vojtěch Havlas;2;47818;40;38.6;48;1;1;0;1;1;1;1;10;Vojtěch;Havlas
HAVLAS 2;HAVLAS (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Vojtěch Havlas;2;23355;30;26.0;29;1;1;0;1;1;1;1;10;Vojtěch;Havlas
KOPEČNÝ 1;KOPEČNÝ (M);Ortopedie;HEMIARTROPLASTIKA KOLENE - SÁŇOVÁ PROTÉZA;66649;Zdeněk Kopečný;1;37000;95;93.0;100;1;1;0;1;1;1;1;10;Zdeněk;Kopečný
KOPEČNÝ 2;KOPEČNÝ (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Zdeněk Kopečný;1;47818;35;30.8;48;1;1;0;1;1;1;1;10;Zdeněk;Kopečný
KOPEČNÝ 3;KOPEČNÝ (S);Ortopedie;REVIZNÍ A ZVLÁŠTĚ SLOŽITÁ REKONSTRUKČNÍ ARTROSKOPIE;66043;Zdeněk Kopečný;1;50000;35;33.7;69;1;1;0;1;1;1;1;10;Zdeněk;Kopečný
KOPEČNÝ 4;KOPEČNÝ (V);Ortopedie;SYNOVEKTOMIE ZÁPĚSTÍ A RUKY;66429;Zdeněk Kopečný;1;4020;80;80.0;0;1;1;0;1;1;1;1;10;Zdeněk;Kopečný
KOPEČNÝ 5;KOPEČNÝ (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Zdeněk Kopečný;1;150000;120;120.0;100;1;1;1;1;1;1;1;30;Zdeněk;Kopečný
KOPEČNÝ 6;KOPEČNÝ (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Zdeněk Kopečný;1;142000;90;90.0;100;1;1;0;1;1;1;1;30;Zdeněk;Kopečný
PLZEŇ ORTO 1;PLZEŇ ORTO (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Plzeň Orto;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;Plzeň;Orto
PLZEŇ ORTO 2;PLZEŇ ORTO (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Plzeň Orto;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;Plzeň;Orto
PLZEŇ ORTO 3;PLZEŇ ORTO (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Plzeň Orto;2;47818;45;41.0;48;1;1;0;1;1;1;1;10;Plzeň;Orto
PLZEŇ ORTO 4;PLZEŇ ORTO (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Plzeň Orto;2;23355;35;35.0;29;1;1;0;1;1;1;1;10;Plzeň;Orto
PLZEŇ ORTO 5;PLZEŇ ORTO (V);Ortopedie;SYNOVEKTOMIE ZÁPĚSTÍ A RUKY;66429;Plzeň Orto;2;4020;50;46.0;0;1;1;0;1;1;1;1;10;Plzeň;Orto
PLZEŇ ORTO 6;PLZEŇ ORTO (Y);Ortopedie;UVOLNĚNÍ SVALU / ŠLACHY;67227;Plzeň Orto;2;24531;30;28.0;0;1;1;0;1;1;1;1;10;Plzeň;Orto
PLZEŇ ORTO 7;PLZEŇ ORTO (N);Ortopedie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Plzeň Orto;2;1584;50;49.0;7;1;1;0;1;1;1;1;10;Plzeň;Orto
PASTUCHA 1;PASTUCHA (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Milan Pastucha;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;Milan;Pastucha
PASTUCHA 2;PASTUCHA (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Milan Pastucha;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;Milan;Pastucha
PASTUCHA 3;PASTUCHA (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Milan Pastucha;2;47818;45;41.0;48;1;1;0;1;1;1;1;10;Milan;Pastucha
PASTUCHA 4;PASTUCHA (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Milan Pastucha;2;23355;35;35.0;29;1;1;0;1;1;1;1;10;Milan;Pastucha
PASTUCHA 5;PASTUCHA (V);Ortopedie;SYNOVEKTOMIE ZÁPĚSTÍ A RUKY;66429;Milan Pastucha;2;4020;50;46.0;0;1;1;0;1;1;1;1;10;Milan;Pastucha
PASTUCHA 6;PASTUCHA (Y);Ortopedie;UVOLNĚNÍ SVALU / ŠLACHY;67227;Milan Pastucha;2;24531;30;28.0;0;1;1;0;1;1;1;1;10;Milan;Pastucha
PASTUCHA 7;PASTUCHA (N);Ortopedie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Milan Pastucha;2;1584;50;49.0;7;1;1;0;1;1;1;1;10;Milan;Pastucha
POLEDNÍK 1;POLEDNÍK (X);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KYČELNÍHO KLOUBU;66612;Zdeněk Poledník;2;150000;120;120.0;100;1;1;1;1;1;1;1;30;Zdeněk;Poledník
POLEDNÍK 2;POLEDNÍK (W);Ortopedie TEP;TOTÁLNÍ ENDOPROTÉZA KOLENNÍHO KLOUBU;66651;Zdeněk Poledník;2;142000;90;90.0;100;1;1;0;1;1;1;1;30;Zdeněk;Poledník
POLEDNÍK 3;POLEDNÍK (R);Ortopedie;REKONSTRUKČNÍ ARTROSKOPIE;66041;Zdeněk Poledník;2;47818;45;41.0;48;1;1;0;1;1;1;1;10;Zdeněk;Poledník
POLEDNÍK 4;POLEDNÍK (U);Ortopedie;SLOŽITÁ ARTROSKOPIE;66039;Zdeněk Poledník;2;23355;35;35.0;29;1;1;0;1;1;1;1;10;Zdeněk;Poledník
POLEDNÍK 5;POLEDNÍK (V);Ortopedie;SYNOVEKTOMIE ZÁPĚSTÍ A RUKY;66429;Zdeněk Poledník;2;4020;50;46.0;0;1;1;0;1;1;1;1;10;Zdeněk;Poledník
POLEDNÍK 6;POLEDNÍK (Y);Ortopedie;UVOLNĚNÍ SVALU / ŠLACHY;67227;Zdeněk Poledník;2;24531;30;28.0;0;1;1;0;1;1;1;1;10;Zdeněk;Poledník
POLEDNÍK 7;POLEDNÍK (N);Ortopedie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Zdeněk Poledník;2;1584;50;49.0;7;1;1;0;1;1;1;1;10;Zdeněk;Poledník
ORL 1;ORL TÝM (LA);ORL;OPERACE UŠÍ;XXX;ORL tým;2;10000;60;60.0;10;1;1;0;1;1;1;1;10;ORL;tým
ORL 2;ORL TÝM (LB);ORL;OTOPLASTIKA;XXX;ORL tým;2;20000;70;70.0;10;1;1;0;1;1;1;1;10;ORL;tým
ORL 3;ORL TÝM (LC);ORL;SEPTOPLASTIKA;XXX;ORL tým;2;20000;45;45.0;100;1;1;0;1;1;1;1;10;ORL;tým
ORL 4;ORL TÝM (LD);ORL;ODSTRANĚNÍ KOŽNÍCH ÚTVARŮ KOLEM OKA;XXX;ORL tým;2;4000;30;30.0;10;1;1;0;1;1;1;1;10;ORL;tým
VALEŠOVÁ 1;VALEŠOVÁ (Z);Chirurgie;VYSOKÁ LIGATURA VENAE SAPHENAE MAGNAE + STRIPPING SUBFASCIÁLNÍ LIGATURY VV. PERFORANTES;54930;Jana Valešová;2;35871;60;58.0;4;1;1;0;1;1;1;1;10;Jana;Valešová
KRISTEN 2;KRISTEN (A);Chirurgie;HERNIOPLASTIKA JEDNOSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90796;Michal Kristen;2;47051;85;85.0;96;1;1;0;1;1;1;1;10;Michal;Kristen
KRISTEN 3;KRISTEN (B);Chirurgie;HERNIOPLASTIKA OBOUSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90838;Michal Kristen;2;65000;120;120.0;100;1;1;0;1;1;1;1;10;Michal;Kristen
KRISTEN 4;KRISTEN (C);Chirurgie;CHOLECYSTEKTOMIE PROSTÁ LAPAROSKOPICKY;90818;Michal Kristen;2;51086;95;91.0;100;1;1;0;1;1;1;1;10;Michal;Kristen
KRISTEN 5;KRISTEN (N);Chirurgie;ODSTRANĚNÍ OSTEOSYNTETICKÉHO MATERIÁLU;66813;Michal Kristen;2;1584;50;46.0;7;1;1;0;1;1;1;1;10;Michal;Kristen
KRISTEN 6;KRISTEN (P);Chirurgie;OPERACE KARPÁLNÍHO TUNELU;61247;Michal Kristen;2;2785;40;40.0;0;1;1;0;1;1;1;1;10;Michal;Kristen
KRISTEN 7;KRISTEN (F);Chirurgie;OPERACE KÝLY S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU, OPERACE KÝLY NEBO KÝLY V JIZVĚ S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU;51517;Michal Kristen;2;47039;95;93.0;98;1;1;0;1;1;1;1;10;Michal;Kristen
KRISTEN 8;KRISTEN (G);Chirurgie;OPERACE KÝLY UMBILIKÁLNÍ NEBO EPIGASTRICKÁ - DOSPĚLÍ VČETNĚ RESEKCE OMENTA;51515;Michal Kristen;2;25907;45;43.0;96;1;1;0;1;1;1;1;10;Michal;Kristen
KRISTEN 9;KRISTEN (Q);Chirurgie;OTEVŘENÁ REPOZICE A OSTEOSYNTÉZA ZLOMENINY JEDNÉ KOSTI PŘEDLOKTÍ;53157;Michal Kristen;2;11224;90;90.0;0;1;1;0;1;1;1;1;10;Michal;Kristen
KRISTEN 10;KRISTEN (T);Chirurgie;ROZŠÍŘENÁ APONEUREKTOMIE U FORMY DUPUYTRENOVY KONTRAKTURY S KONTRAKTUROU PRSTU;61255;Michal Kristen;2;7257;90;90.0;3;1;1;0;1;1;1;1;10;Michal;Kristen
KRISTEN 11;KRISTEN (K);Chirurgie;VÝKON LAPAROSKOPICKÝ A TORAKOSKOPICKÝ;51711;Michal Kristen;2;47051;95;92.0;99;1;1;0;1;1;1;1;10;Michal;Kristen
POPÍLKA 1;POPÍLKA (G);Chirurgie;OPERACE KÝLY UMBILIKÁLNÍ NEBO EPIGASTRICKÁ - DOSPĚLÍ VČETNĚ RESEKCE OMENTA;51515;Ivan Popílka;2;25907;25;24.0;96;1;1;0;1;1;1;1;10;Ivan;Popílka
POPÍLKA 2;POPÍLKA (K);Chirurgie;VÝKON LAPAROSKOPICKÝ A TORAKOSKOPICKÝ;51711;Ivan Popílka;2;47051;75;71.0;99;1;1;0;1;1;1;1;10;Ivan;Popílka
OPATRNÝ 1;OPATRNÝ (E);Chirurgie;OPERACE KÝLY INQUINÁLNÍ A FEMORÁLNÍ - DOSPĚLÍ, VČETNĚ INKARCEROVANÝCH;51511;Václav Opatrný;3;36064;60;56.0;0;1;1;0;1;1;1;1;10;Václav;Opatrný
OPATRNÝ 2;OPATRNÝ (F);Chirurgie;OPERACE KÝLY S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU, OPERACE KÝLY NEBO KÝLY V JIZVĚ S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU;51517;Václav Opatrný;3;47039;40;39.0;98;1;1;0;1;1;1;1;10;Václav;Opatrný
OPATRNÝ 3;OPATRNÝ (Z);Chirurgie;VYSOKÁ LIGATURA VENAE SAPHENAE MAGNAE + STRIPPING SUBFASCIÁLNÍ LIGATURY VV. PERFORANTES;54930;Václav Opatrný;3;35871;80;77.0;4;1;1;0;1;1;1;1;10;Václav;Opatrný
PECÁK 1;PECÁK (A);Chirurgie;HERNIOPLASTIKA JEDNOSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90796;Patrik Pecák;2;47051;85;85.0;96;1;1;0;1;1;1;1;10;Patrik;Pecák
PECÁK 2;PECÁK (B);Chirurgie;HERNIOPLASTIKA OBOUSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90838;Patrik Pecák;2;65000;115;114.0;100;1;1;0;1;1;1;1;10;Patrik;Pecák
PECÁK 3;PECÁK (C);Chirurgie;CHOLECYSTEKTOMIE PROSTÁ LAPAROSKOPICKY;90818;Patrik Pecák;2;51086;45;42.0;100;1;1;0;1;1;1;1;10;Patrik;Pecák
PECÁK 4;PECÁK (G);Chirurgie;OPERACE KÝLY UMBILIKÁLNÍ NEBO EPIGASTRICKÁ - DOSPĚLÍ VČETNĚ RESEKCE OMENTA;10114;Patrik Pecák;2;25907;25;24.0;0;1;1;0;1;1;1;1;10;Patrik;Pecák
PECÁK 5;PECÁK (H);Chirurgie;OPERACE ROZSÁHLÉHO PILONIDÁLNÍHO SINU, DERMOIDNÍ CYSTY EXCIZE ROZSÁHLÝCH PERIANÁLNÍCH ČI GLUTEÁLNÍCH ZÁNĚTLIVÝ LÉZÍ;10124;Patrik Pecák;2;25090;50;47.0;0;1;1;0;1;1;1;1;10;Patrik;Pecák
PECÁK 6;PECÁK (G);Chirurgie;OPERACE KÝLY UMBILIKÁLNÍ NEBO EPIGASTRICKÁ - DOSPĚLÍ VČETNĚ RESEKCE OMENTA;51515;Patrik Pecák;2;25907;65;65.0;96;1;1;0;1;1;1;1;10;Patrik;Pecák
PECÁK 7;PECÁK (H);Chirurgie;OPERACE ROZSÁHLÉHO PILONIDÁLNÍHO SINU, DERMOIDNÍ CYSTY EXCIZE ROZSÁHLÝCH PERIANÁLNÍCH ČI GLUTEÁLNÍCH ZÁNĚTLIVÝ LÉZÍ;51813;Patrik Pecák;2;25090;50;48.0;71;1;1;0;1;1;1;1;10;Patrik;Pecák
PECÁK 8;PECÁK (K);Chirurgie;VÝKON LAPAROSKOPICKÝ A TORAKOSKOPICKÝ;51711;Patrik Pecák;2;47051;85;82.0;99;1;1;0;1;1;1;1;10;Patrik;Pecák
ŠEBEK 1;ŠEBEK (A);Chirurgie;HERNIOPLASTIKA JEDNOSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90796;Tomáš Šebek;2;47051;90;87.0;96;1;1;0;1;1;1;1;10;Tomáš;Šebek
ŠEBEK 2;ŠEBEK (C);Chirurgie;CHOLECYSTEKTOMIE PROSTÁ LAPAROSKOPICKY;90818;Tomáš Šebek;2;51086;75;74.0;100;1;1;0;1;1;1;1;10;Tomáš;Šebek
ŠEBEK 3;ŠEBEK (F);Chirurgie;OPERACE KÝLY S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU, OPERACE KÝLY NEBO KÝLY V JIZVĚ S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU;51517;Tomáš Šebek;2;47039;100;96.0;98;1;1;0;1;1;1;1;10;Tomáš;Šebek
ŠEBEK 4;ŠEBEK (G);Chirurgie;OPERACE KÝLY UMBILIKÁLNÍ NEBO EPIGASTRICKÁ - DOSPĚLÍ VČETNĚ RESEKCE OMENTA;51515;Tomáš Šebek;2;25907;50;49.0;96;1;1;0;1;1;1;1;10;Tomáš;Šebek
ŠEBEK 5;ŠEBEK (K);Chirurgie;VÝKON LAPAROSKOPICKÝ A TORAKOSKOPICKÝ;51711;Tomáš Šebek;2;47051;80;78.0;99;1;1;0;1;1;1;1;10;Tomáš;Šebek
KREJČA 1;KREJČA (JA);Chirurgie;AUGUMENTACE PRSU;XXX;Miroslav Krejča;2;115000;120;120.0;100;1;1;0;1;1;1;1;10;Miroslav;Krejča
KREJČA 2;KREJČA (JB);Chirurgie;LIPOSUKCE A ABDOMINOPLASTIKA;XXX;Miroslav Krejča;2;140000;120;120.0;100;1;1;0;1;1;1;1;10;Miroslav;Krejča
KREJČA 3;KREJČA (JC);Chirurgie;PLASTIKA VÍČEK (DOLNÍ NEBO HORNÍ);XXX;Miroslav Krejča;2;18000;90;90.0;0;1;1;0;1;1;1;1;10;Miroslav;Krejča
KREJČA 3;KREJČA (JD);Chirurgie;PLASTIKA VÍČEK (DOLNÍ I HORNÍ);XXX;Miroslav Krejča;2;30000;120;120.0;0;1;1;0;1;1;1;1;10;Miroslav;Krejča
ZEITHAML 1;ZEITHAML (A);Chirurgie;HERNIOPLASTIKA JEDNOSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90796;Petr Zeithaml;1;47051;45;43.3;96;1;1;0;1;1;1;1;10;Petr;Zeithaml
ZEITHAML 2;ZEITHAML (B);Chirurgie;HERNIOPLASTIKA OBOUSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90838;Petr Zeithaml;1;65000;65;61.9;100;1;1;0;1;1;1;1;10;Petr;Zeithaml
ZEITHAML 3;ZEITHAML (C);Chirurgie;CHOLECYSTEKTOMIE PROSTÁ LAPAROSKOPICKY;90818;Petr Zeithaml;1;51086;60;59.4;100;1;1;0;1;1;1;1;10;Petr;Zeithaml
ZEITHAML 4;ZEITHAML (D);Chirurgie;DIAGNOSTICKÁ VIDEOLAPAROSKOPIE A VIDEOTORAKOSKOPIE;51713;Petr Zeithaml;1;55457;60;56.0;100;1;1;0;1;1;1;1;10;Petr;Zeithaml
ZEITHAML 5;ZEITHAML (E);Chirurgie;OPERACE KÝLY INQUINÁLNÍ A FEMORÁLNÍ - DOSPĚLÍ, VČETNĚ INKARCEROVANÝCH;51511;Petr Zeithaml;1;36064;40;39.0;0;1;1;0;1;1;1;1;10;Petr;Zeithaml
ZEITHAML 6;ZEITHAML (F);Chirurgie;OPERACE KÝLY S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU, OPERACE KÝLY NEBO KÝLY V JIZVĚ S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU;51517;Petr Zeithaml;1;47039;45;43.8;98;1;1;0;1;1;1;1;10;Petr;Zeithaml
ZEITHAML 7;ZEITHAML (G);Chirurgie;OPERACE KÝLY UMBILIKÁLNÍ NEBO EPIGASTRICKÁ - DOSPĚLÍ VČETNĚ RESEKCE OMENTA;51515;Petr Zeithaml;1;25907;35;33.9;96;1;1;0;1;1;1;1;10;Petr;Zeithaml
ZEITHAML 8;ZEITHAML (H);Chirurgie;OPERACE ROZSÁHLÉHO PILONIDÁLNÍHO SINU, DERMOIDNÍ CYSTY EXCIZE ROZSÁHLÝCH PERIANÁLNÍCH ČI GLUTEÁLNÍCH ZÁNĚTLIVÝ LÉZÍ;51813;Petr Zeithaml;1;25090;50;48.0;71;1;1;0;1;1;1;1;10;Petr;Zeithaml
ZEITHAML 9;ZEITHAML (K);Chirurgie;VÝKON LAPAROSKOPICKÝ A TORAKOSKOPICKÝ;51711;Petr Zeithaml;1;47051;45;44.3;99;1;1;0;1;1;1;1;10;Petr;Zeithaml
PLZEŇ CHIR 1;PLZEŇ CHIR (A);Chirurgie;HERNIOPLASTIKA JEDNOSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90796;Plzeň Chir;2;47051;70;65.2;96;1;1;0;1;1;1;1;10;Plzeň;Chir
PLZEŇ CHIR 2;PLZEŇ CHIR (B);Chirurgie;HERNIOPLASTIKA OBOUSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90838;Plzeň Chir;2;65000;75;72.0;100;1;1;0;1;1;1;1;10;Plzeň;Chir
PLZEŇ CHIR 3;PLZEŇ CHIR (C);Chirurgie;CHOLECYSTEKTOMIE PROSTÁ LAPAROSKOPICKY;90818;Plzeň Chir;2;51086;70;66.7;100;1;1;0;1;1;1;1;10;Plzeň;Chir
PLZEŇ CHIR 4;PLZEŇ CHIR (D);Chirurgie;DIAGNOSTICKÁ VIDEOLAPAROSKOPIE A VIDEOTORAKOSKOPIE;51713;Plzeň Chir;2;55457;60;56.0;100;1;1;0;1;1;1;1;10;Plzeň;Chir
PLZEŇ CHIR 5;PLZEŇ CHIR (E);Chirurgie;OPERACE KÝLY INQUINÁLNÍ A FEMORÁLNÍ - DOSPĚLÍ, VČETNĚ INKARCEROVANÝCH;51511;Plzeň Chir;2;36,064;50;48.0;0;1;1;0;1;1;1;1;10;Plzeň;Chir
PLZEŇ CHIR 6;PLZEŇ CHIR (F);Chirurgie;OPERACE KÝLY S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU, OPERACE KÝLY NEBO KÝLY V JIZVĚ S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU;51517;Plzeň Chir;2;47039;70;69.9;98;1;1;0;1;1;1;1;10;Plzeň;Chir
PLZEŇ CHIR 7;PLZEŇ CHIR (G);Chirurgie;OPERACE KÝLY UMBILIKÁLNÍ NEBO EPIGASTRICKÁ - DOSPĚLÍ VČETNĚ RESEKCE OMENTA;51515;Plzeň Chir;2;25907;45;41.4;96;1;1;0;1;1;1;1;10;Plzeň;Chir
PLZEŇ CHIR 8;PLZEŇ CHIR (H);Chirurgie;OPERACE ROZSÁHLÉHO PILONIDÁLNÍHO SINU, DERMOIDNÍ CYSTY EXCIZE ROZSÁHLÝCH PERIANÁLNÍCH ČI GLUTEÁLNÍCH ZÁNĚTLIVÝ LÉZÍ;51813;Plzeň Chir;2;25090;50;48.0;71;1;1;0;1;1;1;1;10;Plzeň;Chir
PLZEŇ CHIR  9;PLZEŇ CHIR (K);Chirurgie;VÝKON LAPAROSKOPICKÝ A TORAKOSKOPICKÝ;51711;Plzeň Chir;2;47051;65;61.1;99;1;1;0;1;1;1;1;10;Plzeň;Chir
MOTOL CHIR 1;MOTOL CHIR (A);Chirurgie;HERNIOPLASTIKA JEDNOSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90796;Motol Chir;2;47051;75;72.0;96;1;1;0;1;1;1;1;10;Motol;Chir
MOTOL CHIR 2;MOTOL CHIR (B);Chirurgie;HERNIOPLASTIKA OBOUSTRANNÁ PRIMÁRNÍ LAPAROSKOPICKY;90838;Motol Chir;2;65000;85;83.0;100;1;1;0;1;1;1;1;10;Motol;Chir
MOTOL CHIR 3;MOTOL CHIR (C);Chirurgie;CHOLECYSTEKTOMIE PROSTÁ LAPAROSKOPICKY;90818;Motol Chir;2;51086;75;74.0;100;1;1;0;1;1;1;1;10;Motol;Chir
MOTOL CHIR 4;MOTOL CHIR (D);Chirurgie;DIAGNOSTICKÁ VIDEOLAPAROSKOPIE A VIDEOTORAKOSKOPIE;51713;Motol Chir;2;55457;60;56.0;100;1;1;0;1;1;1;1;10;Motol;Chir
MOTOL CHIR 5;MOTOL CHIR (E);Chirurgie;OPERACE KÝLY INQUINÁLNÍ A FEMORÁLNÍ - DOSPĚLÍ, VČETNĚ INKARCEROVANÝCH;51511;Motol Chir;2;36,064;50;48.0;0;1;1;0;1;1;1;1;10;Motol;Chir
MOTOL CHIR 6;MOTOL CHIR (F);Chirurgie;OPERACE KÝLY S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU, OPERACE KÝLY NEBO KÝLY V JIZVĚ S POUŽITÍM ŠTĚPU ČI IMPLANTÁTU;51517;Motol Chir;2;47039;100;96.0;98;1;1;0;1;1;1;1;10;Motol;Chir
MOTOL CHIR 7;MOTOL CHIR (G);Chirurgie;OPERACE KÝLY UMBILIKÁLNÍ NEBO EPIGASTRICKÁ - DOSPĚLÍ VČETNĚ RESEKCE OMENTA;51515;Motol Chir;2;25907;50;49.0;96;1;1;0;1;1;1;1;10;Motol;Chir
MOTOL CHIR 8;MOTOL CHIR (H);Chirurgie;OPERACE ROZSÁHLÉHO PILONIDÁLNÍHO SINU, DERMOIDNÍ CYSTY EXCIZE ROZSÁHLÝCH PERIANÁLNÍCH ČI GLUTEÁLNÍCH ZÁNĚTLIVÝ LÉZÍ;51813;Motol Chir;2;25090;50;48.0;71;1;1;0;1;1;1;1;10;Motol;Chir
MOTOL CHIR 9;MOTOL CHIR (K);Chirurgie;VÝKON LAPAROSKOPICKÝ A TORAKOSKOPICKÝ;51711;Motol Chir;2;47051;80;78.0;99;1;1;0;1;1;1;1;10;Motol;Chir
`;

export type OjpProcedureListItemBase = {
  duration: number;
  id: string;
};

export type OjpProcedureListItemSurgery = {
  firstIdSurgeonSurgery: string;
  secondIdSurgeonSurgery: string;
  type: string;
  surgery: string;
  surgeryCode: string;
  surgeon: { firstName: string; lastName: string };
  surgeonPriority: number;
  price: number;
  duration: number;
  averageTime: number;
  overnightPercentage: number;
  anesthesiologist: number;
  firstAssistant: number;
  secondAssistant: number;
  surgeryNurse: number;
  anesthetistNurse: number;
  movingNurse: number;
  orderly: number;
  cleaningTime: number;
} & OjpProcedureListItemBase;

export const ojpProcedureListItemSurgeryMap: OjpProcedureListItemSurgery[] = splitCsv(
  ojpProcedureListSurgerySource,
  ojpProcedureListSurgerySourceCols,
).map((cols, index) => {
  const item: OjpProcedureListItemSurgery = {
    id: `${cols["ID operetár / výkon2"]}-${index}`,
    firstIdSurgeonSurgery: cols["ID operetár / výkon"],
    secondIdSurgeonSurgery: cols["ID operetár / výkon2"],
    type: cols.Typ,
    surgery: cols["Operační výkon"],
    surgeryCode: cols["Kód výkonu"],
    surgeon: { firstName: cols["Jméno operatéra"], lastName: cols["Příjmení operatéra"] },
    surgeonPriority: Number(cols["Priorita operatéra"]),
    price: Number(cols.Úhrada),
    duration: Number(cols["Zaokrouhlen čas na sále (min)"]) || 0,
    averageTime: Number(cols["Prům. délka pacienta na sále (min)"]),
    overnightPercentage: Number(cols["% Pacientů, kteří musí zůstat do dalšího dne"]),
    anesthesiologist: Number(cols.Anesteziolog),
    firstAssistant: Number(cols["Asistent 1"]),
    secondAssistant: Number(cols["Asistent 2"]),
    surgeryNurse: Number(cols["Perioperační sestra"]),
    anesthetistNurse: Number(cols["Anesteziolog. sestra"]),
    movingNurse: Number(cols["Obíhácí sestra"]),
    orderly: Number(cols.Sanitář),
    cleaningTime: Number(cols["Úklid sálu"]),
  };
  return item;
});

//----------------------------------------------------------------------------------------------------------------------
//
// Other Slots
//
//----------------------------------------------------------------------------------------------------------------------

export type OjpProcedureListItemOther = {
  description: string;
  idOther: string;
} & OjpProcedureListItemBase;

//export type OjpProcedureListItem = OjpProcedureListItemOther | OjpProcedureListItemSurgery;

const ojpProcedureListOtherSourceCols = ["id", "popis", "délka"] as const;

const ojpProcedureListOtherSource = `
cleaning;Úklid sálu běžný;10
cleaningTEP;Úklid sálu  po TEP;30
lunch;Obědová pauza;60
other;Jiné;30
vacation;Dovolená;60
out_of_service;Mimo provoz;60
public-holiday;Státní svátek;60
 `.trim();

export const ojpProcedureListItemOtherMap: OjpProcedureListItemOther[] = splitCsv(
  ojpProcedureListOtherSource,
  ojpProcedureListOtherSourceCols,
).map((cols, index) => {
  const item: OjpProcedureListItemOther = {
    description: cols.popis,
    duration: Number(cols.délka) || 0,
    id: `${cols["id"]}-${index}`,
    idOther: cols.id,
  };
  return item;
});
