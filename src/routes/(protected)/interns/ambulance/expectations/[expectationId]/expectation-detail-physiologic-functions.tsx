import { component$ } from "@builder.io/qwik";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { ExpectationDetailPhysiologicFunctionsCreateForm } from "./expectation-detail-physiologic-functions-create-form";
import { ExpectationDetailPhysiologicFunctionsList } from "./expectation-detail-physiologic-functions-list";

export const ExpectationDetailPhysiologicFunctions = component$(() => {
  return (
    <ExpectationBlock>
      <ExpectationBlockTitle class="mb-4">Fyziologické funkce</ExpectationBlockTitle>
      <ExpectationDetailPhysiologicFunctionsCreateForm />
      <ExpectationDetailPhysiologicFunctionsList />
    </ExpectationBlock>
  );
});
