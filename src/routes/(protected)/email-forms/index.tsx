import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  DataTable,
  DataTableBody,
  DataTableBodyCol,
  DataTableBodyRow,
  DataTableHead,
  DataTableHeadCol,
} from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import nodemailer from "nodemailer";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";
import { createIrisClient } from "~/iris";

export const usePatients = routeLoader$(async ({ env }) => {
  const iris = createIrisClient(env);

  const { patients } = await iris.query({
    patients: {
      __args: {
        first: 12,
      },
      nodes: {
        birthRegistrationNumber: true,
        fullName: true,
        id: true,
      },
    },
  });

  return patients.nodes;
});

export const useSendEmail = routeAction$(
  async (data) => {
    const searchParams = new URLSearchParams();
    searchParams.set("patientId", data.patientId);

    const link = new URL(`http://sirona.localdev.me/salus/protected/email-forms/biolab?${searchParams}`);

    // do something
    const transporter = nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      secure: false,
    });

    try {
      await transporter.sendMail({
        from: "noreply@akeso.online",
        html: `
          <p>Dobrý den,</p>
          <p style="margin-top: 16px;">Dne DD.MM.YYYY jste objednán/objednána na odběr v Biometrické laboratoři.</p>
          <p>Před návštěvou vás poprosíme o vyplnění formuláře, který naleznete na odkazu níže.</p>
          <p style="padding-left: 48px; margin-tom: 32px; margin-bottom: 32px;"><a href="${link}" style="padding: 8px; background-color: #3b82f6; color: #ffffff; align: center;">Pro vyplneni kliknete</a></p>
          <p style="margin-top: 16px;"Přejeme Vám hezký den,</p>
          <p>Akeso, váše zdravotní skupina...</p>
          <p style="margin-top: 32px; text-size: 8px;">Tento email byl generován automaticky. Neodpovídejte na něj prosím.</p>
      `,
        subject: "Vyplnte formular",
        to: "test@local.local",
      });
    } catch (err) {
      console.error("Sent email error", err);
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  },
  zod$({
    patientId: z.string(),
  }),
);

export default component$(() => {
  const patientsSig = usePatients();
  const sendEmailAction = useSendEmail();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Odeslaní formulárů</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>Odeslaní formulárů</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <Card class="mt-4">
        <CardHeader>
          <CardHeaderTitle>Odešlete formulář</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <DataTable>
            <DataTableHead>
              <DataTableHeadCol left>Pacient</DataTableHeadCol>
              <DataTableHeadCol right>Akce</DataTableHeadCol>
            </DataTableHead>
            <DataTableBody>
              {patientsSig.value.map((patient) => (
                <DataTableBodyRow key={patient.id}>
                  <DataTableBodyCol>{`${patient.fullName} (${patient.birthRegistrationNumber})`}</DataTableBodyCol>
                  <DataTableBodyCol class="flex flex-col items-end justify-end gap-2 md:flex-row md:items-center" right>
                    <Form action={sendEmailAction}>
                      <input name="patientId" type="hidden" value={patient.id} />
                      <Button size="xs" type="submit">
                        Send email
                      </Button>
                    </Form>
                    <Button
                      href={`/salus/protected/email-forms/nh-dotanik-op-vykon/?patientId=${patient.id}`}
                      size="xs"
                      type="link"
                    >
                      Operační výkon
                    </Button>
                    <Button
                      href={`/salus/protected/email-forms/nh-zadost-predoperacni-vysetreni/?patientId=${patient.id}`}
                      size="xs"
                      type="link"
                    >
                      Žádost - předoperační vyšetření
                    </Button>
                    <Button
                      href={`/salus/protected/email-forms/rodokmenovy-dotaznik/?patientId=${patient.id}`}
                      size="xs"
                      type="link"
                    >
                      Rodokmenový dotazník
                    </Button>
                  </DataTableBodyCol>
                </DataTableBodyRow>
              ))}
            </DataTableBody>
          </DataTable>
        </CardBody>
      </Card>
    </>
  );
});
