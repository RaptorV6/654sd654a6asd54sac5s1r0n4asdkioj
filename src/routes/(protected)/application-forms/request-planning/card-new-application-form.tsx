// src/routes/card-new-application-form.tsx
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
import { $, component$, useVisibleTask$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { type FormStore, reset } from "@modular-forms/qwik";

interface CardNewApplicationProps {
  formStore: FormStore<any>;
  onAddRequest$: (values: any) => Promise<void> | void;
}

export const CardNewApplication = component$(({ formStore, onAddRequest$ }: CardNewApplicationProps) => {
  useVisibleTask$(() => {
    reset(formStore);
  });

  const urgency2: Record<string, string> = {
    RUTINA: "RUTINA",
    STATIM: "STATIM",
  };

  return (
    <Form
      onSubmit$={$(async (values: any) => {
        // eslint-disable-next-line qwik/valid-lexical-scope
        await onAddRequest$(values);
      })}
    >
      {/* --- ČÁST „PACIENT“ --- */}
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
            <FieldText inputType="text" label="Jméno a příjmení" name="jmeno" of={formStore} required={true} />
            <FieldNumber label="Číslo pojištěnce" maxLength={10} name="cp" of={formStore} required={true} />
            <FieldText inputType="text" label="DG" name="dg" of={formStore} required={true} />
            <FieldNumber label="Výška" name="vyska" of={formStore} required={false} />
            <FieldNumber label="Váha" name="vaha" of={formStore} required={false} />
            <FieldText inputType="textarea" label="Alergie" name="alergie" of={formStore} required={true} />
          </div>
        </CardBody>
      </Card>
      {/* --- ČÁST „ŽADATEL“ --- */}
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
            <FieldDate label="Datum vystavení" name="issueDate" of={formStore} required={false} />
            <FieldRadio
              direction="horizontal"
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
            Zařadit externí žádanku do fronty
          </Button>
        </div>
      </Card>
    </Form>
  );
});
