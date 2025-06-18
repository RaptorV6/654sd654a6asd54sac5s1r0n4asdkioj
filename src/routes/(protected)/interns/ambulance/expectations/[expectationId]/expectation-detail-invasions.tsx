import { component$ } from "@builder.io/qwik";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { ExpectationDetailInvasionsCreateForm } from "./expectation-detail-invasions-create-form";
import { ExpectationDetailInvasionsList } from "./expectation-detail-invasions-list";

export const ExpectationDetailInvasions = component$(() => {
  return (
    <ExpectationBlock>
      <ExpectationBlockTitle class="mb-4">Invaze</ExpectationBlockTitle>

      <ExpectationDetailInvasionsCreateForm />
      <ExpectationDetailInvasionsList />
    </ExpectationBlock>
  );
});
