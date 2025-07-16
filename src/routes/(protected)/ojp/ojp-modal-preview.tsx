import { Button, Card, CardBody, FieldNumber } from "@akeso/ui-components";
import { $, component$, useTask$ } from "@builder.io/qwik";
import { setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

type SeparatorType = {
  duration: number;
  id: string;
  name: string;
};

// ✅ Schema pro preview form
const PreviewFormSchema = v.object({
  repeatCount: v.pipe(v.number("Počet musí být číslo"), v.minValue(1, "Minimum je 1"), v.maxValue(10, "Maximum je 10")),
});

type PreviewFormValues = v.InferInput<typeof PreviewFormSchema>;

type OjpModalPreviewProps = {
  activeTab: "pauzy" | "pridat" | "vlastni";
  data: any;
};

export const OjpModalPreview = component$<OjpModalPreviewProps>(({ activeTab, data }) => {
  // ✅ Vytvoření formStore pro preview
  const [previewFormStore, { Form }] = useForm<PreviewFormValues>({
    loader: {
      value: {
        repeatCount: data.repeatCount || 1,
      },
    },
    validate: valiForm$(PreviewFormSchema),
  });

  const separatorOptions: SeparatorType[] = [
    { duration: 15, id: "us-basic", name: "ÚS" },
    { duration: 30, id: "us-tep", name: "ÚS TEP" },
    { duration: 45, id: "us-extended", name: "ÚS+" },
  ];

  const handleSeparatorChange = $((index: number, separator: SeparatorType) => {
    if (!data.separators) data.separators = {};
    data.separators[index] = separator;
  });

  // ✅ Tracking změn repeatCount pomocí useTask$
  useTask$(({ track }) => {
    const repeatCount = track(() => previewFormStore.internal.fields.repeatCount?.value);

    if (repeatCount !== undefined && repeatCount !== data.repeatCount) {
      data.repeatCount = repeatCount;

      // Aktualizuj separators
      const newSeparators: Record<number, SeparatorType> = {};
      for (let i = 1; i <= repeatCount; i++) {
        newSeparators[i] = data.separators?.[i] || separatorOptions[0];
      }
      data.separators = newSeparators;
    }
  });

  // ✅ Synchronizace data.repeatCount -> formStore
  useTask$(({ track }) => {
    track(() => data.repeatCount);

    if (data.repeatCount !== previewFormStore.internal.fields.repeatCount?.value) {
      setValue(previewFormStore, "repeatCount", data.repeatCount || 1);
    }
  });

  if (!data.procedure) return null;

  if (activeTab === "pauzy" || activeTab === "vlastni") {
    return (
      <Card class="mt-6">
        <CardBody>
          <div class="text-sm">
            <span class="font-medium">Délka:</span> {data.procedure.duration} min
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card class="mt-6">
      <CardBody>
        <div class="mb-4 text-sm">
          <span class="font-medium">Délka jedné operace:</span> {data.procedure.duration} min
        </div>

        <div class="border-t pt-4">
          <Form class="form-styles">
            <FieldNumber
              class="w-32"
              label="Počet opakování"
              max={10}
              min={1}
              name="repeatCount"
              of={previewFormStore}
              required
            />
          </Form>

          {data.repeatCount >= 1 && (
            <div class="mt-4">
              <h5 class="mb-2 text-sm font-medium">Úklid po každé operaci:</h5>
              {Array.from({ length: data.repeatCount }, (_, i) => {
                const operationNumber = i + 1;
                const currentSeparator = data.separators?.[operationNumber] || separatorOptions[0];

                return (
                  <div class="mb-2 flex items-center gap-2" key={i}>
                    <span class="text-sm">Po {operationNumber}. operaci:</span>
                    <div class="flex gap-1">
                      {separatorOptions.map((sep) => (
                        <Button
                          class="h-8 px-2 text-xs"
                          key={sep.id}
                          onClick$={() => handleSeparatorChange(operationNumber, sep)}
                          severity={currentSeparator.id === sep.id ? "accent" : "none"}
                          size="xs"
                          type="button"
                          variant={currentSeparator.id === sep.id ? "contained" : "outline"}
                        >
                          {sep.name} ({sep.duration}min)
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p class="mt-2 text-xs text-gray-500">
            Celková doba:{" "}
            {(() => {
              let total = data.procedure.duration * data.repeatCount;
              for (let i = 1; i <= data.repeatCount; i++) {
                const separator = data.separators?.[i] || separatorOptions[0];
                total += separator.duration;
              }
              return total;
            })()}{" "}
            min
          </p>
        </div>
      </CardBody>
    </Card>
  );
});
