import { Card, CardBody, CardHeader, CardHeaderTitle, PreviewText } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

interface Props {
  data: {
    address: string;
    birthRegistrationNumber: string;
    fullName: string;
    insuranceCompanyNumber: string;
    insuranceNumber: string;
    phoneNumber: string;
    state: string;
  };
}

export const PacientCard = component$<Props>(({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardHeaderTitle>Pacient</CardHeaderTitle>
      </CardHeader>
      <CardBody>
        <PreviewText label="Jméno a příjmení" value={data.fullName} />
        <PreviewText label="Rodné číslo" value={data.birthRegistrationNumber} />
        <PreviewText label="Bydliště" value={data.address} />
        <PreviewText label="Stát" value={data.state} />
        <PreviewText label="Číslo pojištěnce" value={data.insuranceNumber} />
        <PreviewText label="Zdravotní pojišťovna" value={data.insuranceCompanyNumber} />
        <PreviewText label="Telefonní číslo" value={data.phoneNumber} />
      </CardBody>
    </Card>
  );
});
