export type Service = {
  id: string;
  label: string;
};

export const services: Service[] = [
  { id: "mammologie", label: "Mammologie" },
  { id: " PraktickyLekarproDeti", label: "Praktický lékař pro děti a dorost" },
  { id: "PraktickyLekarproDetiKraluvDvur", label: "Praktický lékař pro děti a dorost Králův Dvůr" },
  { id: "Detskagynekologie", label: "Dětská gynekologie" },
  { id: "Gynekologie", label: "Gynekologie" },
  { id: "GynekologieUltrazvuk", label: "Gynekologie - ultrazvuk" },
  { id: "ZavodniAPraktickyLekar", label: "Závodní a praktický lékař" },
  { id: "Urologie", label: "Urologie" },
  { id: "Stomatologie", label: "Stomatologie" },
  { id: "DermatologieDermatovenerologie", label: "Dermatologie a dermatovenerologie" },
  { id: "PraktickyLekar", label: "Praktický lékař" },
  { id: "DetskaKardiologie", label: "Dětská kardiologie" },
  { id: "Kardiologie", label: "Kardiologie" },
  { id: "Diabetologie", label: "Diabetologie" },
  { id: "VyzivovePoradenstvi", label: "Výživové poradenství" },
  { id: "NutricniPoradna", label: "Nutriční poradna" },
  { id: "Bariatrie", label: "Bariatrie" },
  { id: "ChirurgieRadnice", label: "Chirurgie Radnice" },
  { id: "ObezitologickaPoradna", label: "Obezitologická poradna" },
  { id: "CentrumInkontinence", label: "Centrum inkontinence" },
  { id: "Psychologie", label: "Psychologie" },
  { id: "DetskaPoradnaProVyzivu", label: "Dětská poradna pro výživu" },
  { id: "EstetickaMedicína", label: "Estetická medicína" },
  { id: "IntegrativniPediatrie", label: "Integrativní pediatrie" },
  { id: "PlastickaChirurgie", label: "Plastická chirurgie" },
  { id: "VitaminovaTerapie", label: "Vitaminová terapie" },
  { id: "HojeniChronickychRan", label: "Hojení chronických ran" },
  { id: "ChirurgieRukyAZapesti", label: "Chirurgii ruky a zápěstí" },
  { id: "CevniAmbulance", label: "Cévní ambulance" },
  { id: "ChronickaVseobecnaChirurgie", label: "Chronická všeobecná chirurgie" },
  { id: "Koloproktologie", label: "Koloproktologie" },
  { id: "KylniPoradna", label: "Kýlní poradna" },
  { id: "MaleAmbulantniOperacniVykony", label: "Malé ambulantní operační výkony" },
  { id: "PerianatalniPoradna", label: "Perianální poradna" },
  { id: "PoradnaProZilniPorty", label: "Poradna pro žilní porty" },
  { id: "Traumatologie", label: "Traumatologie" },
  { id: "AdenotomieAMyringotomie", label: "Adenotomie a myringotomie (odstranění nosní mandle)" },
  { id: "DetskaEndokrinologie", label: "Dětská endokrinologie" },
  { id: "KonzultaceDetskymChirurgem", label: "Konzultace dětským chirurgem" },
  { id: "Nefrologie", label: "Nefrologie" },
  { id: "DetskaAlergologieAPneumologie", label: "Dětská alergologie a pneumologie" },
  { id: "DetskaNeurologie", label: "Dětská neurologie" },
  { id: "Fyzioterapie", label: "Fyzioterapie" },
  { id: "Gastroenterologie", label: "Gastroenterologie" },
  { id: "PoradnaProPacientysIBD", label: "Poradna pro pacienty s IBD" },
  { id: "PoradnaProRizikoveTehotne", label: "Poradna pro rizikové těhotné" },
  { id: "Alergologie", label: "Alergologie" },
  { id: "Denzitometrie", label: "Denzitometrie" },
  { id: "InternaJedna", label: "Interna I." },
  { id: "InternaDvaVseobecna", label: "Interna II. (všeobecná)" },
  { id: "InternaOdpoledni", label: "Interna odpolední" },
  { id: "Osteologie", label: "Osteologie" },
  { id: "Pneumologie", label: "Pneumologie (plicní)" },
  { id: "SppankovaLaborator", label: "Spánková laboratoř" },
  { id: "Logopedie", label: "Logopedie" },
  { id: "Neurologie", label: "Neurologie" },
  { id: "SpecializovanePoradny", label: "Specializované poradny" },
  { id: "SpankovaAmbulance", label: "Spánková ambulance" },
  { id: "SpecializovaneORL", label: "Specializované ORL" },
  { id: "DetskaOrtopedie", label: "Dětská ortopedie" },
  { id: "OrtopedieJedna", label: "Ortopedie I." },
  { id: "OrtopedieDva", label: "Ortopedie II." },
  { id: "ChirurgieAProktologie", label: "Chirurgie a proktologie" },
  { id: "ChirurgieProLecbuRrefluxniNemociJicnu", label: "Chirurgie pro léčbu refluxní nemoci jícnu a bráničních kýl" },
  { id: "DetskaCHirurgie", label: "Dětská chirurgie" },
  { id: "DetskaFFyzioterapie", label: "Dětská fyzioterapie" },
  { id: "DetskaGastroenterologie", label: "Dětská gastroenterologie" },
  { id: "DetskaPoradnaProHemangiomy", label: "Dětská poradna pro hemangiomy" },
  { id: "DetskaPsychiatrie", label: "Dětská psychiatrie" },
  { id: "DetskaRevmatologie", label: "Dětská revmatologie" },
  { id: "DetskaUrologickaPoradna", label: "Dětská urologická poradna" },
  { id: "Lymfoterapie", label: "Lymfoterapie" },
  { id: "PoradnaProRizikoveNovorozence", label: "Poradna pro rizikové novorozence" },
  { id: "PoradnaProCelistníKloub", label: "Poradna pro čelistní kloub" },
  { id: "PaterniChirurgie", label: "Páteřní chirurgie" },
  { id: "Rehabilitace", label: "Rehabilitace" },
  { id: "RevmatologieCentrumBioLecby", label: "Revmatologie - Centrum biologické léčby" },
  { id: "Pohotovost", label: "Pohotovost" },
  { id: "Radiodiagnostika", label: "Radiodiagnostika" },
  { id: "CentralniOdbery", label: "Centrální odběry" },
  { id: "MagnetickaRezonance", label: "Magnetická rezonance" },
  { id: "Centrum1denniPece", label: "Centrum jednodenní péče" },
  { id: "EchokardiografickaAmbulance", label: "Echokardiografická ambulance" },
  { id: "AmbulanceFunkcniDiagnostiky", label: "Ambulance funkční diagnostiky" },
  { id: "Ultrazvuk", label: "Ultrazvuk" },
];
