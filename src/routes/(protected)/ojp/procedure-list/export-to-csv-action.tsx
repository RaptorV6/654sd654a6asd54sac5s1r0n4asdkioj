//
import type { QRL } from "@builder.io/qwik";

import { Button, ButtonLabelIcon, useToaster } from "@akeso/ui-components";
import { $, component$ } from "@builder.io/qwik";

import { CopyIcon } from "~/icons";

import type { OJPOtherSlot, OJPSurgerySlot } from ".";

type ExportToCsvActionProps = {
  slots: OJPOtherSlot[] | OJPSurgerySlot[];
};

export const ExportToCsvAction = component$<ExportToCsvActionProps>(({ slots }) => {
  const { toastError$ } = useToaster();
  const handleExport = $(() => {
    if (!Array.isArray(slots) || !slots.length) {
      toastError$("Nejsou k dispozici data k exportu");
      return;
    }
    const isSurgery = "surgeon" in slots[0];
    const csvData = isSurgery
      ? (slots as OJPSurgerySlot[]).map((slot) => ({
          ID: slot.id,
          Jméno: slot.surgeon.firstName || "",
          Příjmení: slot.surgeon.lastName || "",
          // eslint-disable-next-line perfectionist/sort-objects
          Oddělení: slot.type || "",
          "Operační výkon": slot.surgery || "",
          // eslint-disable-next-line perfectionist/sort-objects
          "Délka výkonu [min]": slot.duration,
        }))
      : (slots as OJPOtherSlot[]).map((slot) => ({
          ID: slot.id,
          Popis: slot.description || "",
          // eslint-disable-next-line perfectionist/sort-objects
          "Doba trvání [min]": slot.duration,
        }));

    exportToCsv("slots.csv", csvData);
  });

  return <ExportButton disabled={slots.length === 0} handleExport={handleExport} />;
});

type ExportButtonProps = {
  disabled: boolean;
  handleExport: QRL<() => void>;
};

const ExportButton = component$<ExportButtonProps>(({ disabled, handleExport }) => {
  return (
    <Button
      class="inline-flex items-center"
      disabled={disabled}
      onClick$={handleExport}
      severity="accent"
      type="button"
      variant="contained"
    >
      <ButtonLabelIcon as={CopyIcon} />
      Exportovat do CSV
    </Button>
  );
});

function exportToCsv(filename: string, rows: Record<string, any>[]) {
  if (!rows.length) return;

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((field) => `"${String(row[field] ?? "").replace(/"/g, '""')}"`).join(",")),
  ].join("\n");

  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8" });

  const link = Object.assign(document.createElement("a"), {
    download: filename,
    href: URL.createObjectURL(blob),
  });

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
