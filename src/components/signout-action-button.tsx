import type { ButtonOwnProps } from "@akeso/ui-components";

import { Button } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";

import { useSession } from "~/routes/plugin@auth";

import { LogoutBoxROutlineIcon } from "./icons-outline";
import { SignoutConfirmDialog } from "./signout-confirm-dialog";

export const SignoutActionButton = component$(
  ({
    hideIcon,
    severity = "none",
    variant = "outline",
    ...props
  }: {
    hideIcon?: boolean;
  } & ButtonOwnProps) => {
    const sessionSig = useSession();
    const showConfirmSig = useSignal(false);

    // Do not display logout button if session does not exists.
    if (sessionSig.value == null) return null;

    return (
      <>
        <Button
          {...props}
          class={["inline-flex items-center", props.class]}
          onClick$={() => {
            showConfirmSig.value = true;
          }}
          severity={severity}
          type="button"
          variant={variant}
        >
          {!hideIcon && <LogoutBoxROutlineIcon class="mr-1 h-4 w-4 shrink-0" />}
          Odhlásit se
        </Button>
        <SignoutConfirmDialog authStrategy={sessionSig.value.strategy} bind:show={showConfirmSig} />
      </>
    );
  },
);
