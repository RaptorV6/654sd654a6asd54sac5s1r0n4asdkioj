import type { Signal } from "@builder.io/qwik";

import {
  ActionButton,
  AlertDialogContent,
  AlertDialogContentDescription,
  AlertDialogContentTitle,
  AlertDialogFooter,
  Button,
  Dialog,
} from "@akeso/ui-components";
import { component$, useTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

import type { AuthStrategy } from "~/routes/plugin@auth";

import { useAuthEndsession, useSignOut } from "~/routes/plugin@auth";

type SignoutConfirmDialogProps = {
  authStrategy: AuthStrategy;
  "bind:show": Signal<boolean>;
};

export const SignoutConfirmDialog = component$(
  ({ authStrategy, "bind:show": showConfirmSig }: SignoutConfirmDialogProps) => {
    const signoutAction = useSignOut();
    const endsessionAction = useAuthEndsession();
    const navigate = useNavigate();

    useTask$(async ({ track }) => {
      const esav = track(() => endsessionAction.value);
      if (esav && esav.url) {
        await navigate(esav.url);
      }
    });

    return (
      <Dialog bind:show={showConfirmSig} closeButton={false} disableCloseOnBakdropClick>
        <AlertDialogContent>
          <AlertDialogContentTitle>Potvrďte odhlášení</AlertDialogContentTitle>
          <AlertDialogContentDescription>Skutečně se chcete odhlásit?</AlertDialogContentDescription>
        </AlertDialogContent>
        <AlertDialogFooter class="block pt-4">
          <div class="mx-auto flex flex-col gap-y-4">
            <div>
              <Button
                class="inline-flex w-full justify-center"
                onClick$={() => {
                  showConfirmSig.value = false;
                }}
                severity="success"
                type="button"
                variant="soft"
              >
                Ne, chci pokračovat
              </Button>
            </div>
            <div>
              <ActionButton
                action={signoutAction}
                class="inline-flex w-full justify-center"
                params={{
                  redirectTo: "/auth/logout/",
                }}
                severity="danger"
              >
                Ano, chci se odhlásit z aplikace
              </ActionButton>
            </div>
            {authStrategy === "akesoauth" && (
              <div>
                <ActionButton
                  action={endsessionAction}
                  class="inline-flex w-full justify-center"
                  params={{}}
                  severity="danger"
                  size="sm"
                  variant="outline"
                >
                  Ano, chci se odhlásit z aplikace i z Akeso účtu.
                </ActionButton>
              </div>
            )}
          </div>
        </AlertDialogFooter>
      </Dialog>
    );
  },
);
