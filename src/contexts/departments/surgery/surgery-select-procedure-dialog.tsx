import { BaseButton, Card, Dialog, DialogBody, DialogHeader, InputText, List } from "@akeso/ui-components";
import { component$, Fragment, Resource, useResource$, useSignal } from "@builder.io/qwik";
import { server$, useNavigate } from "@builder.io/qwik-city";

import { serverProceduresMetaAutocomplete } from "~/server/rpc/procedure-meta";

import { useSurgeryDepartmentContext } from "./surgery-context";

const findProcedure$ = server$(serverProceduresMetaAutocomplete);

export const SurgerySelectProcedureDialog = component$(() => {
  const { selectProcedureDialogOpenSig } = useSurgeryDepartmentContext();
  const inputTextSig = useSignal<string>("");
  const navigate = useNavigate();

  const resultResource = useResource$(async ({ cleanup, track }) => {
    const q = track(() => inputTextSig.value);
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    return await findProcedure$(abortController.signal, "surgery", q);
  });

  return (
    <Dialog bind:show={selectProcedureDialogOpenSig}>
      <DialogHeader>Vyberte postup</DialogHeader>
      <DialogBody>
        <div class="form-styles">
          <InputText
            error=""
            label="Vyhledání postupu"
            labelSrOnly
            name="search"
            onInput$={(_: any, target: HTMLInputElement) => {
              inputTextSig.value = target.value;
            }}
            placeholder="Zadejte název postupu"
            type="text"
            value={inputTextSig.value}
          />
        </div>
        <Card class="mt-4" divided={false} toEdge>
          <Resource
            // onPending={() => <Spinner />}
            onResolved={(data) => (
              <List variant="plain">
                {data.map(
                  (group) =>
                    group.procedures.length > 0 && (
                      <Fragment key={group.code}>
                        <li class="list-item-group">{group.name}</li>
                        {group.procedures.map((proc) => (
                          <li class="hover:bg-app-surface-raised" key={`${group.code}-${proc.kind}`}>
                            <BaseButton
                              class="-m-4 block p-4 sm:-mx-6 sm:px-6"
                              onClick$={async () => {
                                await navigate(`${proc.href}create/`);
                                selectProcedureDialogOpenSig.value = false;
                              }}
                              type="button"
                            >
                              {proc.name}
                            </BaseButton>
                          </li>
                        ))}
                      </Fragment>
                    ),
                )}
              </List>
            )}
            value={resultResource}
          />
        </Card>
      </DialogBody>
    </Dialog>
  );
});
