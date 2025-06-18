//  tlačítko, které při kliknutí otevře dialog pro přidání nové karty paliativní péče
// způsobí to nová hodnota newPalliativeCardDialogOpenSig, kt. se nastaví na true)

import { Button, ButtonLabelIcon } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

import { AddOutlineIcon } from "~/components/icons-outline";

export const AddPalliativeCardAction = component$(() => {
  const navigate = useNavigate();

  return (
    <Button
      class="inline-flex items-center"
      onClick$={() => navigate("/palliative/new-card")}
      severity="accent"
      type="button"
      variant="contained"
    >
      <ButtonLabelIcon as={AddOutlineIcon} /> {/* na tlačítku se zobrazí ikona "+"" */}
      Přidat pacienta
    </Button>
  );
});
