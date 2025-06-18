import type { QRL } from "@builder.io/qwik";

import { component$, useId } from "@builder.io/qwik";

type ReactiveSelectFieldProps<TEntity extends { id: string }, TKey extends keyof Omit<TEntity, "id">> = {
  editable?: boolean;
  entity: TEntity;
  hideDefaultOption?: boolean;
  label: string;
  labelSrOnly?: boolean;
  name: TKey;
  options: {
    label: string;
    value: string;
  }[];
  update$: QRL<(id: string, data: Record<TKey, string>) => void>;
};

export const ReactiveSelectField = component$(
  <TEntity extends { id: string }, TKey extends keyof Omit<TEntity, "id">>({
    editable,
    entity,
    hideDefaultOption,
    label,
    labelSrOnly,
    name,
    options,
    update$,
  }: ReactiveSelectFieldProps<TEntity, TKey>) => {
    const id = useId();

    return (
      <div class="form-group">
        <label class={[labelSrOnly && "sr-only"]} for={id}>
          {label}
        </label>
        <div class="input-group">
          <select
            disabled={!editable}
            id={id}
            onInput$={async (_, el) => {
              const nextValue = el.value;
              await update$(entity.id, { [name]: nextValue } as any);
            }}
            value={(entity[name] || "").toString()}
          >
            {!hideDefaultOption && <option value="">-- vyberte --</option>}
            {options.map((o) => (
              <option key={o.value} selected={(entity[name] || "").toString() === o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  },
);
