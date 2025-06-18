// typový import pro nastavení hlavičky dokumentu
import type { DocumentHead } from "@builder.io/qwik-city";

// import vlastních komponent pro tvorbu UI + import základních funkcí z QWIKU
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
// import valibot

// import vlastních komponent pro hlavičku a navigaci a import klienta pro práci s Iris API
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";

// importy vlastních funkcí a typů

import { serverGetCard } from "../palliative-cards-rpc";
import { cardDataToDisplay } from "../palliative-functions";
import { PalliativeCardActive } from "./palliative-card-active";
import { PalliativeCardProvider } from "./palliative-card-context";
import { PalliativeCardInactive } from "./palliative-card-inactive";

// loader pro načtení dat karty pro hlavičku stránky a komponenty
export const useCardLoader = routeLoader$(async ({ env, fail, params }) => {
  const { cardId } = params;
  try {
    const card = await serverGetCard(env, cardId);
    // Ošetření null hodnoty
    if (card === null) {
      console.error(`V useCardLoader: Nebyla nalezena karta s id ${cardId}`);
      return fail(404, { errorMessage: "Karta nenalezena" });
    }
    return cardDataToDisplay(card);
  } catch (error) {
    console.error(`V useCardLoader: Nebyla nalezena karta s id ${cardId}:`, error);
    return fail(404, { errorMessage: "Chyba v loaderu při hledání karty", failed: true });
  }
});

// titulek dokumentu
const sectionTitle = "Paliativní péče";

const fullPageTitle = (
  selectedCard:
    | { errorMessage?: string; failed?: boolean }
    | { patient?: { birthRegistrationNumber: null | string | undefined; fullName: string | undefined } }
    | null
    | undefined,
): string => {
  if (!selectedCard) {
    return `Neexistující karta - ${sectionTitle}`;
  } else if ("errorMessage" in selectedCard && selectedCard.errorMessage) {
    return `${selectedCard.errorMessage} - ${sectionTitle}`;
  } else if ("patient" in selectedCard && selectedCard.patient) {
    const patientName = [
      selectedCard.patient.fullName ?? "Neznámé jméno",
      selectedCard.patient.birthRegistrationNumber ?? "Nezadané rodné číslo",
    ]
      .filter((s): s is string => !!s)
      .join(" ");

    return `${patientName} - ${sectionTitle}`;
  } else {
    return `Neznámý pacient - ${sectionTitle}`;
  }
};

// definice titulku stránky - metadata
export const head: DocumentHead = ({ resolveValue }) => {
  const title = fullPageTitle(resolveValue(useCardLoader));
  return {
    title,
  };
};

// hlavní komponenta
export default component$(() => {
  const cardSig = useCardLoader();

  const pageTitle = cardSig.value.errorMessage ?? fullPageTitle(cardSig.value);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/palliative/">Paliativní péče</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>{pageTitle.replace(" - Paliativní péče", "")}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>
      {cardSig.value.failed ? (
        <div>{cardSig.value.errorMessage}</div>
      ) : (
        <PalliativeCardProvider card={cardSig.value}>
          {cardSig.value.endAt == null ? <PalliativeCardActive /> : <PalliativeCardInactive />}
        </PalliativeCardProvider>
      )}
    </>
  );
});
