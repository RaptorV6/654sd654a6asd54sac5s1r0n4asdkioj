import { component$ } from "@builder.io/qwik";

interface DisabledCheckboxProps {
  checked: boolean;
  label?: string;
}

export const DisabledCheckbox = component$<DisabledCheckboxProps>(({ checked, label }) => {
  return (
    <label class="inline-flex">
      <input checked={checked} class="form-checkbox" disabled type="checkbox" />
      {label && <span class="ml-2 text-sm">{label}</span>}
    </label>
  );
});
