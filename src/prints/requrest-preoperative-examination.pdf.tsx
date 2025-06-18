/** @jsxImportSource react */

import { i18nFormatDate } from "@akeso/utils";
import { renderToStaticMarkup } from "react-dom/server";

import styles from "./requrest-preoperative-examination.pdf.css?inline";

export type GetRequestPreoperativeExaminationPdfDataProps = {
  asa: null | number;
  patient: {
    birthRegistrationNumber: null | string;
    firstName: null | string;
    insuranceCompanyNumber: null | string;
    lastName: string;
  };
  surgery: {
    date: Date;
    name: string;
  };
};

export async function getRequestPreoperativeExaminationPdfData(props: GetRequestPreoperativeExaminationPdfDataProps) {
  const html = renderToStaticMarkup(<PdfTemplate styles={styles} {...props} />);

  return {
    html,
    pdfOptions: {
      // displayHeaderFooter: true,
      // headerTemplate: ` `,
      footerTemplate: `
        <div style="padding-top: 0.2cm; padding-bottom: 0.5cm; padding-left: 2.2cm; padding-right: 2.2cm; width: 100%;">
          <div style="text-align: right; font-size: 12px;">
            <span class="pageNumber" style="font-weight: bold;"></span> z <span class="totalPages" style="font-weight: bold;"></span>
          </div>
          <div style="padding-top: 0.25cm; width: 70%; font-size: 10px; color: gray;">
            NH Hospital a.s, Okruhova 1135/14. 15 0 Praine 5- Stodülky; IC: 27872963D; IC: CZ 699004146 SpolecnostjezapsanauMastskei osouluv 7laze,oddilB,viozka13753
          </div>
        </div>
      `,
      // printBackground: false,
      // landscape: false,
      // pageRanges: undefined, // "1-5"
      margin: {
        bottom: "3cm",
        left: "2cm",
        right: "2cm",
        top: "2cm",
      },
      // preferCSSPageSize: false,
    },
  };
}

function PdfTemplate({
  asa,
  patient,
  styles,
  surgery,
}: { styles?: string } & GetRequestPreoperativeExaminationPdfDataProps) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: styles || "" }} />
      </head>
      <body>
        <div className="flex">
          <div className="text-accent flex-1">
            <NHLogo />
          </div>
          <div className="">
            <div style={{ border: "1px solid black", height: "2.5cm", padding: "4px", width: "5cm" }}>
              <span style={{ fontSize: "8px" }}>Razítko odbornosti, jmenovka a podpis indikujícího lékaře </span>
            </div>
          </div>
        </div>

        <h1 className="text-accent text-bold mt-16 text-center">ŽÁDOST - PŘEDOPERAČNÍ VYŠETŘENÍ</h1>

        <table className="bordered pagebreak-avoid">
          <colgroup>
            <col span={1} style={{ width: "30% " }} />
            <col span={1} style={{ width: "70% " }} />
          </colgroup>

          <tbody>
            <tr>
              <td className="text-bold">Jméno</td>
              <td>{patient.firstName}</td>
            </tr>
            <tr>
              <td className="text-bold">Příjmení </td>
              <td>{patient.lastName}</td>
            </tr>
            <tr>
              <td className="text-bold">Rodné číslo</td>
              <td>{patient.birthRegistrationNumber}</td>
            </tr>
            <tr>
              <td className="text-bold">Pojišťovna</td>
              <td>{patient.insuranceCompanyNumber}</td>
            </tr>
            <tr>
              <td className="text-bold">Druh operace</td>
              <td>{surgery.name}</td>
            </tr>
            <tr>
              <td className="text-bold">Datum přijetí do nemocnice </td>
              <td>{i18nFormatDate(surgery.date)}</td>
            </tr>
          </tbody>
        </table>

        <p className="text-bold mt-4">Pokyny pro pacienta</p>
        <ul>
          <li>
            S tímto listem se dostavte ke svému praktickému lékaři, který Vám zajistí předoperační interní vyšetření.
          </li>
          <li>Pouze s kompletním a dokončeným vyšetřením můžete být zařazen/a do operačního programu.</li>
          <li>V určený termín se dostavte k hospitalizaci.</li>
          <li>
            <span>S sebou přineste:</span>
            <ul>
              <li>předoperační vyšetření,</li>
              <li>vyplněný a podepsaný předoperační dotazník,</li>
              <li>občanský průkaz,</li>
              <li>průkaz zdravotní pojišťovny,</li>
              <li>potvrzení pracovní neschopnosti,</li>
              <li>léky, které trvale užíváte.</li>
            </ul>
          </li>
        </ul>

        <table className="bordered pagebreak-avoid mt-4">
          <colgroup>
            <col span={1} style={{ width: "20% " }} />
            <col span={1} style={{ width: "60% " }} />
            <col span={1} style={{ width: "20% " }} />
          </colgroup>

          <thead>
            <tr>
              <th className="text-left" colSpan={3}>
                Odstup operačního výkonu po prodělaném infektu{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lehčí typ</td>
              <td>katar horních dýchacích cest, nachlazení, apod.</td>
              <td>2 - 3 týdny</td>
            </tr>
            <tr>
              <td>Těžší typ</td>
              <td>záněty plic, apod.</td>
              <td>4 - 6 týdnů</td>
            </tr>
          </tbody>
        </table>

        <table className="bordered pagebreak-avoid mt-4">
          <colgroup>
            <col span={1} style={{ width: "30% " }} />
            <col span={1} style={{ width: "70% " }} />
          </colgroup>

          <thead>
            <tr>
              <th className="text-left" colSpan={2}>
                Vysazování léků před operačním výkonem{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>betablokátory</td>
              <td>nevysazovat</td>
            </tr>
            <tr>
              <td>kardiotonika</td>
              <td>nevysazovat</td>
            </tr>
            <tr>
              <td>metformin</td>
              <td>2 dny</td>
            </tr>
            <tr>
              <td>Warfarin</td>
              <td>5 dnů (event. přejít na nízko-molekulární heparin)</td>
            </tr>
            <tr>
              <td>rivaroxaban (Xarelto)</td>
              <td>48 hodin</td>
            </tr>
            <tr>
              <td>dabigatran (Pradaxa)</td>
              <td>2-5 dnů po domluvě s předepisujícím lékařem</td>
            </tr>
            <tr>
              <td>apixaban (Eliquis)</td>
              <td>48 hodin </td>
            </tr>
            <tr>
              <td>clopidogrel</td>
              <td>5 dnů</td>
            </tr>
            <tr>
              <td>selegilin</td>
              <td>3 týdny</td>
            </tr>
            <tr>
              <td>hormonální antikoncepce</td>
              <td>1 měsíc</td>
            </tr>
          </tbody>
        </table>

        <table className="bordered pagebreak-avoid mt-4">
          <colgroup>
            <col span={1} style={{ width: "30% " }} />
            <col span={1} style={{ width: "70% " }} />
          </colgroup>

          <thead>
            <tr>
              <th colSpan={2}>
                <div className="flex">
                  <div>
                    {asa === 1 ? <IconCheckboxChecked /> : <IconCheckboxBlank />}
                    {" ASA I"}
                  </div>
                  <div className="flex-1 text-left">
                    Doba platnosti předoperačního vyšetření - 1 měsíc, není-li důvod vyžadovat nové vyšetření (např. při
                    změně zdravotního stavu od posledního vyšetření), u dětí 2 týdny.
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Předoperační vyšetření</td>
              <td className="space-y-1">
                <div className="text-bold">praktický lékař</div>
                <div className="text-bold">internista</div>
              </td>
            </tr>
            <tr>
              <td>Laboratorní vyšetření</td>
              <td className="space-y-1">
                <div className="text-bold">moč chemicky + sediment</div>
                <div>
                  <span className="text-bold">urologické výkony moč K+C</span> (případný infekt přeléčit dle citlivosti)
                </div>
                <div className="text-bold">ORL výkony KO, INR, APTT</div>
                <div className="text-bold">Císařský řez KO, INR, APTT</div>
              </td>
            </tr>
            <tr>
              <td>Věk nad 40 let</td>
              <td className="space-y-1">
                <div className="text-bold">EKG</div>
                <div>
                  <span className="text-bold">RTG S+P</span> u aktivního kuřáka
                </div>
              </td>
            </tr>
            <tr>
              <td>Věk nad 60 let</td>
              <td className="space-y-1">
                <div className="text-bold">EKG</div>
                <div>
                  <span className="text-bold">RTG S+P</span> (ne starší 12 měsíců)
                </div>
                <div className="text-bold">KO, urea, kreatinin, Na, K, glykémie</div>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="bordered pagebreak-avoid mt-4">
          <colgroup>
            <col span={1} style={{ width: "30% " }} />
            <col span={1} style={{ width: "70% " }} />
          </colgroup>

          <thead>
            <tr>
              <th className="text-left" colSpan={2}>
                {asa != null && asa > 1 ? <IconCheckboxChecked /> : <IconCheckboxBlank />}
                {" ASA II a více"}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Předoperační vyšetření</td>
              <td>
                <div className="text-bold">ASA 2 - praktický lékař, internista</div>
                <div className="text-bold">ASA 3 - internista se specializovanou způsobilostí</div>
              </td>
            </tr>
            <tr>
              <td>Laboratorní vyšetření</td>
              <td className="space-y-1">
                <div className="text-bold">KO</div>
                <div className="text-bold">APTT, INR</div>
                <div>
                  <span className="text-bold">
                    AST, ALT, GMT, ALP, urea, kreatinin, Na, K, Cl, glykémie, albumin, celková bílkovina
                  </span>{" "}
                  - nádory střev, zánětlivé střevní choroby (velké výkony), malnutrice
                </div>
                <div className="text-bold">moč chemicky + sediment</div>
                <div className="text-bold">urologické výkony moč K+C</div>
              </td>
            </tr>
            <tr>
              <td>Ostatní vyšetření</td>
              <td className="space-y-1">
                <div className="flex">
                  <div className="text-bold whitespace-nowrap">RTG S + P</div>
                  <div className="ml-2">
                    <div>{">"} 40 let u aktivního kuřáka</div>
                    <div>{">"} 60 let, malignity, prodělané akutní respirační a plicní onemocnění</div>
                  </div>
                </div>
                <div>
                  <span className="text-bold">EKG + popis</span> (u nestabilních pacientů ne starší 48hod.)
                </div>
              </td>
            </tr>
            <tr>
              <td>Doplňující vyšetření</td>
              <td className="space-y-1">
                <div>
                  <span className="text-bold">konsiliární vyš. specialistou</span> dle charakteru onemocnění
                </div>
                <div className="flex">
                  <span className="text-bold">spirometrie</span>
                  <span className="ml-2">u plicních onemocnění (CHOPN, restrikční onemocnění), extrémní obezita</span>
                </div>
                <div>
                  <span className="text-bold">spirometrie v zatažení</span> (ventrální kýly)
                </div>
                <div>
                  <span className="text-bold">echokardiografie</span> u srdečních vad a šelestů
                </div>
                <div>
                  <span className="text-bold">FW, CRP</span> (po čerstvě prodělaném infektu)
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="bordered pagebreak-avoid mt-4">
          <colgroup>
            <col span={1} style={{ width: "30% " }} />
            <col span={1} style={{ width: "70% " }} />
          </colgroup>

          <thead>
            <tr>
              <th className="text-left" colSpan={2}>
                Speciální výkony
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TEP, HYE, velké výkony na GIT</td>
              <td className="text-bold">KO, KS, krevní protilátky</td>
            </tr>
            <tr>
              <td>velké cévní výkony, neuroaxiální blokády</td>
              <td className="text-bold">INR, APTT</td>
            </tr>
          </tbody>
        </table>

        <table className="bordered pagebreak-avoid mt-4 text-left">
          <colgroup>
            <col span={1} style={{ width: "15% " }} />
            <col span={1} style={{ width: "85% " }} />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2}>ASA klasifikace</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-bold">ASA I</td>
              <td>
                Zdravý pacient bez patologického klinického a laboratorního nálezu. Chorobný proces, jenž je indikací k
                operaci, je lokalizovaný a nezpůsobuje systémovou poruchu.
              </td>
            </tr>
            <tr>
              <td className="text-bold">ASA II</td>
              <td>
                Mírné až středně závažné systémové onemocnění, pro které je pacient operován, případně vyvolané jiným
                patofyziologickým procesem (např. ICHS, lehká hypertenze, pokročilý věk, obezita, chronická bronchitida,
                diabetes mellitus, anémie atd.).
              </td>
            </tr>
            <tr>
              <td className="text-bold">ASA III</td>
              <td>
                Závažné systémové onemocnění jakékoliv etiologie, omezující aktivitu nemocného (např. angina pectoris,
                stav po infarktu myokardu, závažná forma diabetu, srdeční selhání).
              </td>
            </tr>
            <tr>
              <td className="text-bold">ASA IV</td>
              <td>
                Závažné, život ohrožující systémové onemocnění (srdeční dekompenzace, nestabilní angina pectoris, akutní
                myokarditida, pokročilá forma plicní, ledvinné, jaterní a endokrinní nedostatečnosti, hemoragický šok,
                peritonitida, ileus).
              </td>
            </tr>
            <tr>
              <td className="text-bold">ASA V</td>
              <td>Moribundní nemocný, u něhož je operace poslední možností záchrany života.</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

function IconCheckboxBlank(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 2v14h14V5H5Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

function IconCheckboxChecked(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 2v14h14V5H5Zm6.003 11L6.76 11.757l1.414-1.414l2.829 2.829l5.657-5.657l1.414 1.414L11.003 16Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

function NHLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="15.16944mm" viewBox="0 0 236.2541 43" width="83.3452mm" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>logo</title>
      <path
        d="M28.668,25.00919h8.6v5.931A3.98035,3.98035,0,0,0,41.02432,35.092a3.98035,3.98035,0,0,0,3.75632-4.15172V11.46667a3.98035,3.98035,0,0,0-3.75632-4.15172A3.98035,3.98035,0,0,0,37.268,11.46667v5.931h-8.6v-5.931a3.98035,3.98035,0,0,0-3.75632-4.15172,3.98035,3.98035,0,0,0-3.75632,4.15172v8.89655L12.2588,8.89655A4.526,4.526,0,0,0,8.89788,7.31494a3.96035,3.96035,0,0,0-2.27356.7908,4.45214,4.45214,0,0,0-.88966.98851,3.9406,3.9406,0,0,0-.692,2.37241V30.84138A3.98035,3.98035,0,0,0,8.799,34.9931a3.98035,3.98035,0,0,0,3.75632-4.15172V21.846l8.9954,11.46667a3.93189,3.93189,0,0,0,1.58161,1.18621,4.02792,4.02792,0,0,0,1.77931.49425,3.13007,3.13007,0,0,0,1.58161-.3954,4.29785,4.29785,0,0,0,.692-0.3954,3.87028,3.87028,0,0,0,.7908-0.98851l0.09885-.09885V33.01609a4.145,4.145,0,0,0,.49425-2.17471V25.00919m12.554,15.12414a8.82273,8.82273,0,0,1-8.10574-5.53563,2.16069,2.16069,0,0,1-.29655.49425l-0.29655.5931a7.689,7.689,0,0,1-1.977,2.37242,9.794,9.794,0,0,1-1.68046,1.08735c-0.09885,0-.1977.09885-0.29655,0.09885l-1.28506.49425a7.70883,7.70883,0,0,1-2.17471.29655,8.97006,8.97006,0,0,1-4.15172-1.08735A9.80892,9.80892,0,0,1,17.69559,36.377L16.70708,35.092a8.85793,8.85793,0,0,1-7.8092,4.84368,9.14071,9.14071,0,0,1-8.89655-9.292v-19.177A9.55025,9.55025,0,0,1,1.38524,6.52414,8.388,8.388,0,0,1,3.4611,4.05287a8.081,8.081,0,0,1,1.977-1.18621L6.822,2.37241a13.45486,13.45486,0,0,1,2.07586-.1977,9.51713,9.51713,0,0,1,7.31494,3.55862l0.98851,1.28506a8.73022,8.73022,0,0,1,7.71035-4.74483A8.92712,8.92712,0,0,1,33.01743,7.8092a8.82273,8.82273,0,0,1,8.10575-5.53563,9.14071,9.14071,0,0,1,8.89655,9.292V30.94023a9.18322,9.18322,0,0,1-8.89655,9.1931m43.3954-23.823H76.01743a0.85042,0.85042,0,0,1-.79081-0.7908V3.45977a0.85042,0.85042,0,0,1,.79081-0.7908h8.50115a0.692,0.692,0,0,1,0,1.38391H76.80823v4.646h6.82069a0.692,0.692,0,0,1,0,1.38391H76.80823v4.74483h7.8092a0.67568,0.67568,0,0,1,.692.659q0.00041,0.01648,0,.033a0.84549,0.84549,0,0,1-.79081.7908m92.72183,0h-8.50116a0.85043,0.85043,0,0,1-.79081-0.7908V3.45977a0.85042,0.85042,0,0,1,.79081-0.7908h8.4023a0.692,0.692,0,0,1,0,1.38391H169.4312v4.646h6.82068a0.692,0.692,0,0,1,0,1.38391H169.4312v4.74483h7.80919a0.67568,0.67568,0,0,1,.692.659q0.00041,0.01647,0,.03294a0.70505,0.70505,0,0,1-.692.7908M60.89326,16.4092a0.764,0.764,0,0,1-.692-0.7908V3.45977a0.85042,0.85042,0,0,1,.7908-0.7908h0.1977a0.88044,0.88044,0,0,1,.7908.49425l8.20462,10.47816V3.36092a0.77967,0.77967,0,0,1,.76838-0.7908q0.01122-.00016.02243,0a0.76394,0.76394,0,0,1,.692.7908V15.71724a0.67568,0.67568,0,0,1-.659.692q-0.01647.0004-.03294,0H70.87719a1.008,1.008,0,0,1-.79081-0.49425L61.68409,5.14023v10.577a0.764,0.764,0,0,1-.7908.692m38.84828,0a0.85042,0.85042,0,0,1-.79081-0.7908V5.53563l-4.34943,6.42529a0.71478,0.71478,0,0,1-.5931.3954,0.85656,0.85656,0,0,1-.692-0.3954L88.96685,5.53563V15.71724a0.77967,0.77967,0,0,1-.76839.7908q-0.01121.00016-.02242,0a0.705,0.705,0,0,1-.692-0.7908V3.45977A0.85042,0.85042,0,0,1,88.2749,2.669h0.1977a0.83215,0.83215,0,0,1,.692.3954l4.84368,7.31494,4.84368-7.31494a0.74622,0.74622,0,0,1,.692-0.3954h0.1977a0.85042,0.85042,0,0,1,.79081.7908V15.71724a0.83879,0.83879,0,0,1-.79081.692m34.89426,0a0.764,0.764,0,0,1-.692-0.7908V3.45977a0.85042,0.85042,0,0,1,.79081-0.7908h0.1977a0.88045,0.88045,0,0,1,.79081.49425l8.30344,10.577V3.36092a0.77967,0.77967,0,0,1,.76838-0.7908q0.01122-.00016.02243,0a0.764,0.764,0,0,1,.692.7908V15.71724a0.67568,0.67568,0,0,1-.659.692q-0.01647.0004-.03294,0h-0.09886a1.008,1.008,0,0,1-.79081-0.49425L135.52548,5.14023v10.577a1.0553,1.0553,0,0,1-.88965.692m15.02528,0a0.85043,0.85043,0,0,1-.79081-0.7908V3.36092a0.79081,0.79081,0,0,1,1.58162,0V15.61839a0.72754,0.72754,0,0,1-.79081.7908M110.21972,3.954a5.3876,5.3876,0,0,0-5.34342,5.43141q0.00084,0.10158.00549,0.20308h0a5.44711,5.44711,0,0,0,5.25543,5.63225l0.0825,0.00223a5.3876,5.3876,0,0,0,5.34342-5.43141q-0.00084-.10158-0.00549-0.20308h0a5.38759,5.38759,0,0,0-5.13486-5.629q-0.10147-.00466-0.20308-0.00549m0,12.65287a6.836,6.836,0,0,1-6.92145-6.74954q-0.00169-.13443.00191-0.26886h0a6.92023,6.92023,0,0,1,13.83908-.19571q0.00138,0.09785,0,.19571h0a6.836,6.836,0,0,1-6.65069,7.01649q-0.13439.0036-.26885,0.00191m15.91494,0a6.75829,6.75829,0,0,1-6.82537-6.69054q-0.00164-.164.00468-0.32785h0A6.838,6.838,0,0,1,125.96863,2.572q0.1324-.0035.26488-0.00188a6.90746,6.90746,0,0,1,4.84367,1.77931,0.70457,0.70457,0,0,1,.29655.5931,0.85042,0.85042,0,0,1-.79081.7908,0.75507,0.75507,0,0,1-.49425-0.1977A5.91383,5.91383,0,0,0,126.23351,3.954a5.3699,5.3699,0,0,0-5.24424,5.49269q0.00164,0.07093.00516,0.1418h0a5.3699,5.3699,0,0,0,5.09728,5.62933q0.07086,0.00352.1418,0.00516a5.59877,5.59877,0,0,0,4.05288-1.68046,0.75507,0.75507,0,0,1,.49425-0.1977,0.764,0.764,0,0,1,.692.7908,0.85443,0.85443,0,0,1-.29655.5931,7.67483,7.67483,0,0,1-5.04138,1.87816m34.0046,0a6.7583,6.7583,0,0,1-6.82537-6.69053q-0.00163-.164.00469-0.32786h0A6.838,6.838,0,0,1,159.97321,2.572q0.13242-.00351.26491-0.00188a6.90746,6.90746,0,0,1,4.84367,1.77931,0.70456,0.70456,0,0,1,.29655.5931,0.85042,0.85042,0,0,1-.79081.7908,0.75507,0.75507,0,0,1-.49425-0.1977A5.91383,5.91383,0,0,0,160.23812,3.954a5.36991,5.36991,0,0,0-5.24424,5.49269q0.00165,0.07093.00516,0.1418h0a5.3699,5.3699,0,0,0,5.09728,5.62933q0.07086,0.00352.1418,0.00516a5.59881,5.59881,0,0,0,4.05288-1.68046,0.75507,0.75507,0,0,1,.49425-0.1977,0.764,0.764,0,0,1,.692.7908,0.85444,0.85444,0,0,1-.29655.5931,7.29043,7.29043,0,0,1-5.04139,1.87816m-59.11265,7.01839h-0.79081a1.29423,1.29423,0,0,1-1.1862-.5931l-1.38391-1.68046a1.31687,1.31687,0,0,1-.29655-0.49425,0.48686,0.48686,0,0,1,.55879-0.40226l0.03431,0.00686a2.13071,2.13071,0,0,1,1.58161.5931l1.08735,0.88965,1.08735-.88965a2.13071,2.13071,0,0,1,1.58161-.5931,0.48685,0.48685,0,0,1,.58624.36107l0.00686,0.03433a0.67466,0.67466,0,0,1-.29655.49425l-1.38391,1.68046a1.54061,1.54061,0,0,1-1.1862.5931m75.71955,15.61839H168.245a1.30851,1.30851,0,0,1-1.28506-1.28506V25.9977a1.30851,1.30851,0,0,1,1.28506-1.28506h8.4023a1.1907,1.1907,0,0,1,0,2.37241h-7.11724v3.75632h6.22759a1.202,1.202,0,0,1,1.1862,1.18621,1.12191,1.12191,0,0,1-1.15411,1.08875l-0.0321-.0014h-6.22759v3.954H176.845a1.08969,1.08969,0,1,1,.0037,2.17937q-0.05136.00009-.10255-0.00466m-105.96781.09885a1.3085,1.3085,0,0,1-1.28506-1.28506V33.11494H62.57372v4.94253a1.28506,1.28506,0,1,1-2.57011.00265V25.89885a1.28506,1.28506,0,1,1,2.57011-.00265v4.84633h6.91954V25.89885a1.28506,1.28506,0,0,1,2.57011,0V38.15632a1.17014,1.17014,0,0,1-1.28506,1.18621M97.468,27.08506v4.84368h3.75632c1.77931,0,2.96552-.98851,2.96552-2.47126h0c0-1.58161-1.08735-2.37241-2.96552-2.37241H97.468m8.0069,12.25747a1.54266,1.54266,0,0,1-1.28506-.692l-3.55862-4.54712H97.468v3.954a1.28506,1.28506,0,0,1-2.57011,0V25.9977a1.3085,1.3085,0,0,1,1.28506-1.28506h5.14023a5.46143,5.46143,0,0,1,4.15172,1.48276,4.32723,4.32723,0,0,1,1.1862,3.16322h0A4.31055,4.31055,0,0,1,103.399,33.708l2.76782,3.55862a1.75629,1.75629,0,0,1,.3954.98851,0.98895,0.98895,0,0,1-1.08735,1.08735m39.63907,0a1.30851,1.30851,0,0,1-1.28506-1.28506V25.89885a1.28506,1.28506,0,0,1,2.57012,0h0V38.15632a1.17014,1.17014,0,0,1-1.28506,1.18621m-11.269.09885h-0.09886a1.61871,1.61871,0,0,1-1.48276-.98851L127.222,26.492a1.25378,1.25378,0,0,1-.09886-0.5931,1.32149,1.32149,0,0,1,2.57012-.3954L133.845,35.98161l4.25058-10.577a1.33489,1.33489,0,0,1,1.1862-.7908,1.22574,1.22574,0,0,1,1.28419,1.16438L140.56683,25.8a4.28149,4.28149,0,0,1-.09886.49425L135.32775,38.354a1.40977,1.40977,0,0,1-1.48276,1.08735M83.53007,26.78851a4.86264,4.86264,0,0,0-4.8516,4.87365q0.00031,0.13337.00792,0.26658h0a4.94161,4.94161,0,0,0,4.739,5.13624q0.10171,0.00409.20354,0.004a4.86264,4.86264,0,0,0,4.8516-4.87365q-0.00031-.13337-0.00792-0.26658h0a5.06476,5.06476,0,0,0-4.94253-5.14023M83.43122,39.54023a7.32671,7.32671,0,0,1-7.51264-7.13595q-0.00484-.18832,0-0.3767h0a7.46887,7.46887,0,0,1,7.4236-7.51387q0.094-.00057.18789,0.00123a7.32672,7.32672,0,0,1,7.51264,7.13595q0.00484,0.18831,0,.3767h0a7.46888,7.46888,0,0,1-7.4236,7.51387q-0.09394.00057-.18789-0.00123M117.337,26.78851a4.86264,4.86264,0,0,0-4.8516,4.87365q0.00031,0.13337.00792,0.26658h0a4.94161,4.94161,0,0,0,4.739,5.13624q0.10171,0.00409.20354,0.004a4.86264,4.86264,0,0,0,4.8516-4.87365q-0.00031-.13337-0.00792-0.26658h0a4.93939,4.93939,0,0,0-4.73445-5.13615q-0.104-.00423-0.20808-0.00408m0,12.75173a7.32671,7.32671,0,0,1-7.51264-7.13595q-0.00484-.18832,0-0.3767h0a7.46887,7.46887,0,0,1,7.4236-7.51387q0.094-.00057.18789,0.00123a7.32672,7.32672,0,0,1,7.51264,7.13595q0.00484,0.18831,0,.3767h0a7.46886,7.46886,0,0,1-7.42358,7.51387q-0.094.00057-.18791-0.00123m40.331,0a7.30474,7.30474,0,0,1-7.41592-7.19184q-0.00247-.16041.00213-0.3208h0a7.32671,7.32671,0,0,1,7.13594-7.51264q0.18833-.00484.37671,0a7.23663,7.23663,0,0,1,4.94253,1.68046,1.21663,1.21663,0,0,1,.49425.98851,1.30851,1.30851,0,0,1-1.28506,1.28506,0.973,0.973,0,0,1-.79081-0.29655,5.32854,5.32854,0,0,0-3.45977-1.28506,4.84448,4.84448,0,0,0-4.75307,4.93421q0.00192,0.10309.00824,0.206h0a4.84448,4.84448,0,0,0,4.53881,5.132q0.10292,0.00631.206,0.00824a5.247,5.247,0,0,0,3.65747-1.38391,1.12244,1.12244,0,0,1,.79081-0.29655,1.202,1.202,0,0,1,1.1862,1.18621,1.253,1.253,0,0,1-.3954.88966,7.40794,7.40794,0,0,1-5.23908,1.977"
        fill="currentColor"
      />
      <rect fill="currentColor" height="43" width="1.12083" x="191.27719" />
      <path
        d="M232.94147,8.90761a16.28183,16.28183,0,0,0-4.08-3.92844q-0.4192-.281-0.85538-0.53592a15.73954,15.73954,0,0,0-15.70583-.17686,14.4175,14.4175,0,0,0-7.16148,14.92572,13.10078,13.10078,0,0,0,10.79116,10.68881,11.794,11.794,0,0,0,9.92672-3.17529,11.18787,11.18787,0,0,0,3.19613-8.87608,9.185,9.185,0,0,0-3.87746-6.65547,8.74382,8.74382,0,0,0-8.54859-1.07772,7.56537,7.56537,0,0,0-4.52033,5.9686,6.65522,6.65522,0,0,0,1.422,4.82242,5.38025,5.38025,0,0,0,3.66533,1.99917,4.78221,4.78221,0,0,0,4.38883-2.08824,3.40778,3.40778,0,0,0-.02786-3.698,1.605,1.605,0,0,0-2.90936.391,1.5709,1.5709,0,0,0-.06288.58091c0.0257,0.24982.13213,0.4829,0.13571,0.73872a0.76181,0.76181,0,0,1-.43191.72734,1.61244,1.61244,0,0,1-.78714.15231,2.138,2.138,0,0,1-1.48243-.833,3.42663,3.42663,0,0,1-.71636-2.45024,4.31219,4.31219,0,0,1,2.61163-3.3676,5.49016,5.49016,0,0,1,5.35821.71354,5.86019,5.86019,0,0,1,2.53828,4.37211,7.75336,7.75336,0,0,1-2.23877,6.29473,8.54841,8.54841,0,0,1-7.20522,2.28246,9.8443,9.8443,0,0,1-8.07525-8.06938A11.35048,11.35048,0,0,1,213.8876,7.05287a12.69321,12.69321,0,0,1,12.49618.16075,13.08748,13.08748,0,0,1,4.119,3.81075c2.39466,3.43329,2.53421,7.18794,2.53216,11.20775-0.00039,1.0238-.00089,2.45535-0.0014,3.47915v2.68216h0.00024l-0.00024.00422a1.6061,1.6061,0,0,0,3.21221.00407V28.39766l-0.00024-.00422h0.00024V25.71124c0.01036-5.74923.2815-11.8832-3.30432-16.80361"
        fill="currentColor"
      />
      <path
        d="M208.9143,37.37451l-0.87482-2.083-0.87482,2.083h1.74964Zm-3.90479,1.74966,2.20029-4.96885a0.85813,0.85813,0,0,1,.81168-0.55008h0.08115a0.84628,0.84628,0,0,1,.8026.55l2.20041,4.96885a0.67834,0.67834,0,0,1,.07208.27946,0.65812,0.65812,0,0,1-.64875.66735l-0.00946.00006a0.70708,0.70708,0,0,1-.66743-0.478l-0.42386-.99176h-2.77749l-0.44187,1.03694a0.68185,0.68185,0,0,1-.64032.433,0.639,0.639,0,0,1-.64028-0.63765l0.00008-.01161a0.73588,0.73588,0,0,1,.08115-0.29761"
        fill="currentColor"
      />
      <path
        d="M212.097,34.34464a0.69437,0.69437,0,1,1,1.38874,0v2.11929l2.56116-2.543a0.78227,0.78227,0,0,1,.586-0.27051,0.62573,0.62573,0,0,1,.64044.61066q0.00034,0.01477,0,.02954a0.69549,0.69549,0,0,1-.25262.523l-1.77645,1.65926,1.93887,2.4347a0.74,0.74,0,0,1,.18937.487,0.67109,0.67109,0,0,1-.665.67711q-0.01923.00018-.03843-0.00075a0.70133,0.70133,0,0,1-.58614-0.33364l-1.80367-2.36272-0.79354.73948v1.26263a0.69437,0.69437,0,0,1-1.38874,0v-5.032Z"
        fill="currentColor"
      />
      <path
        d="M218.34588,39.32244V34.39869a0.689,0.689,0,0,1,.68369-0.69425h3.50976a0.6235,0.6235,0,0,1,.62218.62218,0.61591,0.61591,0,0,1-.61856.61326l-0.00362,0h-2.81378v1.28039h2.40781a0.62356,0.62356,0,0,1,.62218.62243,0.61572,0.61572,0,0,1-.6183.61313l-0.00388,0h-2.40781v1.32559h2.85876a0.62352,0.62352,0,0,1,.62231.62218,0.61594,0.61594,0,0,1-.6186.61326l-0.00371,0h-3.54407a0.689,0.689,0,0,1-.69436-0.68357V39.3224"
        fill="currentColor"
      />
      <path
        d="M224.09,39.34956a0.64878,0.64878,0,0,1-.26159-0.52315,0.63909,0.63909,0,0,1,.63789-0.64028l0.01151,0.00008a0.66706,0.66706,0,0,1,.39677.12637,2.66232,2.66232,0,0,0,1.61417.568c0.56812,0,.91083-0.22538.91083-0.59521V38.26748c0-.35179-0.21648-0.53209-1.27156-0.80261-1.27158-.32469-2.09207-0.67648-2.09207-1.92991V35.517a1.97457,1.97457,0,0,1,2.03146-1.916q0.08921,0.00261.17792,0.01327a3.66554,3.66554,0,0,1,2.002.55893,0.64268,0.64268,0,0,1-.34271,1.19043,0.66661,0.66661,0,0,1-.35178-0.09916,2.62618,2.62618,0,0,0-1.32559-.42385,0.66694,0.66694,0,0,0-.80143.49733q-0.00613.02617-.01014,0.05277v0.018c0,0.41491.27052,0.55011,1.36179,0.8297,1.28052,0.33351,2.002.79353,2.002,1.89375v0.018c0,1.25343-.95608,1.95688-2.31761,1.95688a4.07481,4.07481,0,0,1-2.37177-.7575"
        fill="currentColor"
      />
      <path
        d="M234.79391,36.8786v-0.018a1.918,1.918,0,0,0-1.85084-1.9828l-0.06094-.00113a1.888,1.888,0,0,0-1.89547,1.88059q-0.00016.04276,0.0016,0.08549v0.01789a1.91808,1.91808,0,0,0,1.85091,1.983l0.061,0.00113a1.888,1.888,0,0,0,1.89533-1.88056q0.00018-.04277-0.0016-0.08552m-5.25738,0V36.86058a3.35614,3.35614,0,0,1,6.70925-.01789v0.01789a3.35615,3.35615,0,0,1-6.70925.018"
        fill="currentColor"
      />
    </svg>
  );
}
