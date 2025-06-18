import type { Signal } from "@builder.io/qwik";

import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { CloseIcon } from "~/icons";
import { useAuthUser } from "~/routes/plugin@auth";

type RequestListItemHeaderActionProps = {
  employeeResponsibleIdSig: Signal<null | string>;
  showRequestFullSig: Signal<boolean>;
};

export const RequestListItemHeaderAction = component$<RequestListItemHeaderActionProps>(
  ({ employeeResponsibleIdSig, showRequestFullSig }) => {
    const user = useAuthUser();

    return (
      <div class="ml-auto">
        {!employeeResponsibleIdSig.value && (
          <Button
            onClick$={() => {
              showRequestFullSig.value = !showRequestFullSig.value;
              employeeResponsibleIdSig.value = user.id;
            }}
            type="button"
            variant="contained"
          >
            Převzít
          </Button>
        )}
        {employeeResponsibleIdSig.value && showRequestFullSig.value && (
          <Button
            onClick$={() => {
              showRequestFullSig.value = !showRequestFullSig.value;
              employeeResponsibleIdSig.value = null;
            }}
            type="button"
            variant="outline"
          >
            <span class="flex items-center justify-center gap-2">
              <CloseIcon />
              <span> Zrušit převzetí</span>
            </span>
          </Button>
        )}
      </div>
    );
  },
);
