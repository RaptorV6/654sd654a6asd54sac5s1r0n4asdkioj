/** @jsxImportSource react */

import { dateNextMidnight, datePrevMidnight } from "@akeso/utils";
import { Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import type { BuildPrintSettingsOptionsBase } from "~/lib/pdf/build-print-settings";
import type { PdfPrinterRequestBody } from "~/lib/pdf/pdf-printer";

import { buildPrintSettings } from "~/lib/pdf/build-print-settings";

type PdfData = {
  dates: { date: Date; separated: boolean }[];
  events: {
    assigned: { employee: { fullName: string; id: string } }[];
    dateFrom: Date;
    dateTo: Date;
    id: string;
    level: {
      code: "BASIC" | "COMPLEMENT" | "NEUROSTYMULATION" | "PSYCHOTHERAPY";
    };
    title: string;
  }[];
};

export async function buildCdrProgramPdfPrintSettings(
  data: PdfData,
  hospital: "AP" | "NH" | "RNB",
  options?: BuildPrintSettingsOptionsBase,
): Promise<PdfPrinterRequestBody> {
  const html = renderToStaticMarkup(<PdfTemplate data={data} />);
  const printSettings = buildPrintSettings({
    ...options,
    hospital,
    html,
    pdfOptions: {
      landscape: true,
      margin: {
        bottom: "1cm",
        left: "0.5cm",
        right: "0.5cm",
        top: "1cm",
      },
    },
  });

  return printSettings;
}

function PdfTemplate({ data }: { data: PdfData }) {
  return (
    <html>
      <head>
        <style></style>
      </head>
      <body>
        {/* <h1>Ahoj</h1> */}
        <div style={{ fontSize: "10px" }}>
          {data.dates.map((d) => {
            const dpme = datePrevMidnight(d.date);
            const dnme = dateNextMidnight(d.date);
            const dayEvents = data.events.filter((ev) => ev.dateFrom >= dpme && ev.dateTo <= dnme);
            return (
              <div
                key={d.date.toISOString()}
                style={{
                  border: "1px solid red",
                  display: "grid",
                  gridTemplateColumns: `repeat(${24 * 4}, 1fr)`,
                  gridTemplateRows: `repeat(${dayEvents.length}, 12px auto)`,
                }}
              >
                {/* <div
                  style={{
                    gridColumnEnd: 1,
                    gridColumnStart: 1,
                    gridRowEnd: dayEvents.length * 2 + 1,
                    gridRowStart: 1,
                  }}
                >
                  {i18nFormatDate(d.date)}
                </div> */}
                {/* <div style={{ backgroundColor: "red", height: "10px", width: "150px" }} /> */}
                {dayEvents.map((ev, idx) => {
                  // const colS = (ev.dateFrom.getHours() * 4 + ev.dateFrom.getMinutes()) / (24 * 60);
                  const colS = ev.dateFrom.getHours() * 4;
                  // const colE = (ev.dateTo.getHours() * 60 + ev.dateTo.getMinutes()) / (24 * 60);
                  const colE = (ev.dateTo.getHours() || 24) * 4;

                  let stripColor: string = "green";
                  switch (ev.level.code) {
                    case "BASIC":
                      stripColor = "green";
                      break;
                    case "COMPLEMENT":
                      stripColor = "pink";
                      break;
                    case "NEUROSTYMULATION":
                      stripColor = "bisque";
                      break;
                    case "PSYCHOTHERAPY":
                      stripColor = "mediumpurple";
                      break;
                    default:
                      stripColor = "darkgrey";
                      break;
                  }

                  return (
                    <Fragment key={ev.id}>
                      <div
                        style={{
                          backgroundColor: stripColor,
                          border: "1px solid black",
                          gridColumnEnd: colE + 1,
                          gridColumnStart: colS + 1,
                          gridRowEnd: idx * 2 + 1,
                          gridRowStart: idx * 2 + 1,
                          // overflowX: "visible",
                        }}
                      ></div>
                      <div
                        style={{
                          // border: "1px solid black",
                          gridColumnEnd: colE + 10,
                          gridColumnStart: colS + 1,
                          gridRowEnd: idx * 2 + 2,
                          gridRowStart: idx * 2 + 2,
                          // overflowX: "visible",

                          paddingBottom: "2px",
                          paddingTop: "2px",
                        }}
                      >
                        <p>{ev.title}</p>

                        {/* TODO: je tu nejaky "bug"/problem... iteracie zhodia renderovanie a render sa skonci bez vysledku. Nasledujuci kod je hnusny workaround. */}
                        {ev.assigned.length > 0 && (
                          <ul>
                            {ev.assigned.length > 0 ? <li>{ev.assigned[0].employee.fullName}</li> : null}
                            {ev.assigned.length > 1 ? <li>{ev.assigned[1].employee.fullName}</li> : null}
                            {ev.assigned.length > 2 ? <li>{ev.assigned[2].employee.fullName}</li> : null}
                            {ev.assigned.length > 3 ? <li>{ev.assigned[3].employee.fullName}</li> : null}
                            {ev.assigned.length > 4 ? <li>{ev.assigned[4].employee.fullName}</li> : null}
                            {/* {ev.assigned.length > 5 ? <li>{ev.assigned[5].employee.fullName}</li> : null} */}
                          </ul>
                        )}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>
      </body>
    </html>
  );
}
