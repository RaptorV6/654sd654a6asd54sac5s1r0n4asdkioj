import type { ButtonSeverity, ButtonSize, ButtonVariant } from "@akeso/ui-components";
import type { QRL } from "@builder.io/qwik";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogContentTitle,
  AlertDialogFooter,
  Button,
  ButtonLabelIcon,
} from "@akeso/ui-components";
import { component$, Slot, useSignal } from "@builder.io/qwik";

import { DeleteIcon } from "./icons-outline";

type ConfirmDeleteProps = {
  onConfirmed$?: QRL<() => Promise<void> | void>;
  severity?: ButtonSeverity;
  showIconVariant?: "both" | "iconOnly" | "labelOnly";
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export const ConfirmDeleteAction = component$<ConfirmDeleteProps>((props) => {
  return (
    <ConfirmDeleteActionNoMessages {...props}>
      <span q:slot="action-label">Smazat</span>
      <span q:slot="dialog-title">Potvrďte smazání</span>
      <p q:slot="dialog-content">Právě se chystáte smazat záznam.</p>
      <p q:slot="dialog-content">Tato akce nevratně záznam odstraní.</p>
      <p class="mt-2 font-bold" q:slot="dialog-content">
        Skutečně chcete tento záznam smazat?
      </p>
    </ConfirmDeleteActionNoMessages>
  );
});

export const ConfirmDeleteActionNoMessages = component$<ConfirmDeleteProps>(
  ({ onConfirmed$, severity, showIconVariant = "labelOnly", size, variant }) => {
    const showSig = useSignal(false);

    return (
      <>
        <Button
          onClick$={() => {
            showSig.value = true;
          }}
          severity={severity ?? "danger"}
          size={size}
          type="button"
          variant={variant}
        >
          {showIconVariant !== "labelOnly" && <ButtonLabelIcon as={DeleteIcon} sm={size === "sm"} xs={size === "xs"} />}
          <span class={[showIconVariant === "iconOnly" && "sr-only"]}>
            <Slot name="action-label" />
          </span>
        </Button>
        <AlertDialog bind:returnValue={{ value: "" }} bind:show={showSig}>
          <AlertDialogContentTitle>
            <Slot name="dialog-title" />
          </AlertDialogContentTitle>
          <AlertDialogContent class="mt-4 text-sm">
            <Slot name="dialog-content" />
          </AlertDialogContent>
          <AlertDialogFooter>
            <Button
              onClick$={async () => {
                if (onConfirmed$) {
                  await onConfirmed$();
                }
                showSig.value = false;
              }}
              severity="danger"
              type="button"
              variant="contained"
            >
              Ano
            </Button>
            <Button
              onClick$={() => {
                showSig.value = false;
              }}
              type="button"
              variant="outline"
            >
              Ne
            </Button>
          </AlertDialogFooter>
        </AlertDialog>
      </>
    );
  },
);
