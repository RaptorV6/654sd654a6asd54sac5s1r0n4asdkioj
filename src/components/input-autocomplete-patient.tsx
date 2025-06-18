import type { InputAutocompleteOption, InputBasePropsSetFieldValueRequired } from "@akeso/ui-components";

import { InputAutocomplete } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import type { Patient as GqlPatient, PatientConnectionSortBy, PatientGenqlSelection } from "~/iris";

import { createIrisClient } from "~/iris";

const PatientFragment = {
  birthRegistrationNumber: true,
  emailAddress: true,
  fullName: true,
  id: true,
  insuranceNumber: true,
} satisfies PatientGenqlSelection;

type PatientFragmentKeys = keyof typeof PatientFragment;

type PatientAutocompleteOption = InputAutocompleteOption & Pick<GqlPatient, PatientFragmentKeys>;

const getSelectedPatient = server$(async function (id: string) {
  const iris = createIrisClient(this.env);
  const { patient } = await iris.query({
    patient: {
      __args: {
        id: id,
      },
      ...PatientFragment,
    },
  });

  if (patient == null) return null;

  return {
    ...patient,
    disabled: false,
    key: patient.id,
  } satisfies PatientAutocompleteOption;
});

const searchPatients = server$(async function (
  search: string | undefined,
  sortBy: PatientConnectionSortBy = { direction: "ASC", field: "FULL_NAME" },
) {
  const { patients } = await createIrisClient(this.env).query({
    patients: {
      __args: {
        filter: {
          search,
        },
        first: 7,
        sortBy,
      },
      nodes: {
        ...PatientFragment,
      },
    },
  });

  return patients.nodes.map((patient): PatientAutocompleteOption => {
    return {
      ...patient,
      disabled: false,
      key: patient.id,
    } satisfies PatientAutocompleteOption;
  });
});

type PatietAutocompleteProps = {} & InputBasePropsSetFieldValueRequired<string>;

export const InputAutocompletePatient = component$((fieldProps: PatietAutocompleteProps) => {
  return (
    <InputAutocomplete<PatientAutocompleteOption, string>
      {...fieldProps}
      findOptions$={searchPatients}
      findSelected$={getSelectedPatient}
      optionContent={OptionContent}
      renderInputValue$={(v) => `${v.fullName} - (${v.birthRegistrationNumber})`}
      selectedToValue$={(v) => v?.id}
    />
  );
});

type OptionContentProps = {
  option: PatientAutocompleteOption;
};
const OptionContent = component$(({ option }: OptionContentProps) => {
  return (
    <>
      <p class="text-sm">{option.fullName || <span class="italic">Jméno a příjmení neuvedeno</span>}</p>
      <p class="inline-flex w-full items-center justify-between text-xs">
        <span>RČ: {option.birthRegistrationNumber}</span>
        <span>ČP: {option.insuranceNumber}</span>
      </p>
    </>
  );
});
