// src/routes/card-exist-application-form.tsx

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  FieldDate,
  FieldNumber,
  FieldRadio,
  FieldText,
} from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { type FormStore } from "@modular-forms/qwik";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";

interface CardExistApplicationProps {
  formStore: FormStore<any>;
}

export const CardExistApplication = component$(({ formStore }: CardExistApplicationProps) => {
  const urgency2: Record<string, string> = {
    RUTINA: "RUTINA",
    STATIM: "STATIM",
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardHeaderTitle>
            <div class="flex w-full items-center justify-between">
              <span>Pacient</span>
            </div>
          </CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <div class="grid grid-cols-1 items-baseline gap-x-6 md:grid-cols-2">
            <FieldText inputType="text" label="Jméno a příjmení" name="jmeno" of={formStore} required={false} />
            <FieldNumber label="Číslo pojištěnce" maxLength={10} name="cp" of={formStore} required={true} />
            <FieldText inputType="text" label="DG" name="dg" of={formStore} required={false} />
            <FieldNumber label="Výška" name="vyska" of={formStore} required={false} />
            <FieldNumber label="Váha" name="vaha" of={formStore} required={false} />
            <FieldText inputType="textarea" label="Alergie" name="alergie" of={formStore} required={true} />
          </div>
        </CardBody>
      </Card>

      <Card class="mt-5">
        <CardHeader>
          <CardHeaderTitle>
            <div class="flex w-full items-center justify-between">
              <span>Žadatel</span>
            </div>
          </CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <div class="grid grid-cols-1 items-center gap-x-6 md:grid-cols-2">
            <FieldNumber label="IČP" maxLength={8} name="icp" of={formStore} required={true} />
            <FieldNumber label="Odbornost" maxLength={3} name="odbornost" of={formStore} required={true} />
            <FieldDate label="Datum vystavení" name="issueDate" of={formStore} required={true} />
            <FieldRadio
              direction="vertical"
              label="Naléhavost"
              name="urgency2"
              of={formStore}
              options={Object.entries(urgency2).map(([value, label]) => ({
                label,
                value,
              }))}
            />
          </div>
        </CardBody>
        <div class="flex gap-2 px-4 pb-4">
          <Button class="flex-1" severity="accent" type="submit" variant="contained">
            Naplánovat
          </Button>
          <ButtonWithConfirmation
            class="bg-zinc-400 hover:!bg-zinc-500"
            dialogActionCancelLabel="Ne"
            dialogActionConfirmLabel="Ano"
            dialogAlertText=""
            dialogTitle="Chcete skutečně zrušit žádanku?"
            onClick$={() => {}}
            severity="accent"
            size="xs"
            variant="contained"
          >
            Zrušit žádanku
          </ButtonWithConfirmation>
        </div>
      </Card>
    </>
  );
});
