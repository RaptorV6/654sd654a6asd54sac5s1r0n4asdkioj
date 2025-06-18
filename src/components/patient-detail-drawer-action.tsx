import type { ButtonProps } from "@akeso/ui-components";
import type { ClassList } from "@builder.io/qwik";

import { BaseButton, Button } from "@akeso/ui-components";
import { component$, Slot } from "@builder.io/qwik";

import { usePatientDetailDrawerContext } from "~/contexts/patient-detail-drawer/patient-detail-drawer-provider";

type PatientDetailDrawerActionProps = {
  class?: ClassList;
  patientId: string;
  unstyled?: boolean;
} & Omit<ButtonProps<"button">, "onClick$" | "type">;

export const PatientDetailDrawerAction = component$(
  ({
    class: pClass,
    patientId,
    pill,
    severity,
    size,
    unstyled,
    variant,
    ...baseButtonProps
  }: PatientDetailDrawerActionProps) => {
    const { patientIdSig } = usePatientDetailDrawerContext();

    if (unstyled) {
      return (
        <BaseButton
          {...baseButtonProps}
          class={pClass}
          onClick$={() => {
            patientIdSig.value = patientId;
          }}
          type="button"
        >
          <Slot />
        </BaseButton>
      );
    }

    return (
      <>
        <Button
          {...baseButtonProps}
          class={pClass}
          onClick$={() => {
            patientIdSig.value = patientId;
          }}
          pill={pill}
          severity={severity}
          size={size}
          type="button"
          variant={variant}
        >
          <Slot />
        </Button>
      </>
    );
  },
);
