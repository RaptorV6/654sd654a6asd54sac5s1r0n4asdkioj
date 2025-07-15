import { Button, Card, CardBody, InputNumber } from "@akeso/ui-components";
import { $, component$ } from "@builder.io/qwik";

type SeparatorType = {
  duration: number;
  id: string;
  name: string;
};

type OjpModalPreviewProps = {
  activeTab: "pauzy" | "pridat" | "vlastni";
  data: any;
};

export const OjpModalPreview = component$<OjpModalPreviewProps>(({ activeTab, data }) => {
  const separatorOptions: SeparatorType[] = [
    { duration: 15, id: "us-basic", name: "ÚS" },
    { duration: 30, id: "us-tep", name: "ÚS TEP" },
    { duration: 45, id: "us-extended", name: "ÚS+" },
  ];

  const handleSeparatorChange = $((index: number, separator: SeparatorType) => {
    if (!data.separators) data.separators = {};
    data.separators[index] = separator;
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
          {/* ✅ InputNumber místo FieldNumber */}
          <InputNumber
            error=""
            label="Počet opakování"
            max={10}
            min={1}
            name="repeatCount"
            onInput$={(_: any, target: any) => {
              const newCount = parseInt(target.value) || 1;
              data.repeatCount = newCount;

              const newSeparators: Record<number, SeparatorType> = {};
              for (let i = 1; i <= newCount; i++) {
                newSeparators[i] = data.separators?.[i] || separatorOptions[0];
              }
              data.separators = newSeparators;
            }}
            required
            value={data.repeatCount}
          />

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
