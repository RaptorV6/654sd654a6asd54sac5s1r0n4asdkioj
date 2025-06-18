// TODO: MOVE to ui-components

import type { ButtonProps } from "@akeso/ui-components";
import type { JSXOutput } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@akeso/ui-components";
import { component$, Slot, useSignal } from "@builder.io/qwik";

type ButtonWithConfirmationProps = {
  dialogActionCancelLabel?: JSXOutput;
  dialogActionConfirmLabel?: JSXOutput;
  dialogAlertText?: JSXOutput;
  dialogTitle?: JSXOutput;
} & Omit<ButtonProps<"button">, "type">;

export const ButtonWithConfirmation = component$<ButtonWithConfirmationProps>(
  ({
    dialogActionCancelLabel,
    dialogActionConfirmLabel,
    dialogAlertText,
    dialogTitle,
    onClick$,
    severity,
    ...buttonProps
  }) => {
    const showDialogSig = useSignal(false);

    return (
      <>
        <Button
          {...buttonProps}
          onClick$={() => {
            showDialogSig.value = true;
          }}
          severity={severity ?? "danger"}
          type="button"
        >
          <Slot />
        </Button>
        <Dialog bind:show={showDialogSig}>
          <DialogHeader>{dialogTitle ?? "Potvrzení smazání"}</DialogHeader>
          <DialogBody>
            <p class="font-bold">{dialogAlertText ?? "Skutečně smazat?"}</p>
          </DialogBody>
          <DialogFooter>
            <Button
              onClick$={() => {
                showDialogSig.value = false;
              }}
              type="button"
            >
              {dialogActionCancelLabel ?? "Zrušit"}
            </Button>
            <Button
              onClick$={async (a, b) => {
                await onClick$(a, b);
                showDialogSig.value = false;
              }}
              severity={severity ?? "danger"}
              type="button"
            >
              {dialogActionConfirmLabel ?? "Smazat"}
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
);
