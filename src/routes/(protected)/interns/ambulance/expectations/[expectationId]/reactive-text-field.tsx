import type { QRL } from "@builder.io/qwik";

import { component$, useId, useSignal, useStore, useTask$ } from "@builder.io/qwik";

type ReactiveTextFieldProps<TEntity extends { id: string }, TKey extends keyof Omit<TEntity, "id">> = {
  editable?: boolean;
  entity: TEntity;
  label: string;
  labelSrOnly?: boolean;
  name: TKey;
  update$: QRL<(id: string, data: Record<TKey, string>) => void>;
};

export const ReactiveTextField = component$(
  <TEntity extends { id: string }, TKey extends keyof Omit<TEntity, "id">>({
    editable,
    entity,
    label,
    labelSrOnly,
    name,
    update$,
  }: ReactiveTextFieldProps<TEntity, TKey>) => {
    const id = useId();
    const store = useStore<{ field: { dirty: boolean; value: string } }>({
      field: {
        dirty: false,
        value: (entity[name] || "").toString(),
      },
    });

    useTask$(({ track }) => {
      const nv = track(() => (entity[name] || "").toString());
      store.field = { dirty: false, value: nv };
    });

    const updateTimeout = useSignal<number>();
    useTask$(({ cleanup, track }) => {
      track(() => store.field.value);
      if (store.field.dirty) {
        clearTimeout(updateTimeout.value);

        updateTimeout.value = Number(
          setTimeout(async () => {
            store.field.dirty = false;
            await update$(entity.id, { [name]: store.field.value } as any);
          }, 8000),
        );

        cleanup(() => clearTimeout(updateTimeout.value));
      }
    });

    return (
      <div class="form-group">
        <label class={[labelSrOnly && "sr-only"]} for={id}>
          {label}
        </label>
        <div class="input-group">
          <input
            disabled={!editable}
            id={id}
            onBlur$={async (_, el) => {
              if (store.field.dirty) {
                store.field = { dirty: false, value: el.value };
                await update$(entity.id, { [name]: store.field.value } as any);
              }
            }}
            onInput$={async (_, el) => {
              store.field = { dirty: true, value: el.value };
            }}
            type="text"
            value={store.field.value}
          />
        </div>
      </div>
    );
  },
);
