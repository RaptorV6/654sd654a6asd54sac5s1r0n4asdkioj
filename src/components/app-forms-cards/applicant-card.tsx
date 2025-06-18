import { Card, CardBody, CardHeader, CardHeaderTitle, PreviewText } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

interface Props {
  data: {
    departmentName: null | string;
    expertiseCode: null | string;
    fullName: null | string;
    phoneNumber: null | string;
    providerName: null | string;
  };
}

export const ApplicantCard = component$<Props>(({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardHeaderTitle>Žadatel</CardHeaderTitle>
      </CardHeader>
      <CardBody>
        <PreviewText label="Jméno a příjmení" value={data.fullName ?? ""} />
        <PreviewText label="Telefon" value={data.phoneNumber ?? ""} />
        <PreviewText label="Zdravotnické zařízení" value={data.providerName ?? ""} />
        <PreviewText label="Oddělení" value={data.departmentName ?? ""} />
        <PreviewText label="Odbornost" value={data.expertiseCode ?? ""} />
      </CardBody>
    </Card>
  );
});
