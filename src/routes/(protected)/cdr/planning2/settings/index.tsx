import { component$ } from "@builder.io/qwik";

import { DeleteIcon } from "~/components/icons-outline";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { FeatureAction } from "../../feature-action";

export default component$(() => {
  const pageTitle = "Nastavení plánování programů";

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/cdr/">CDR</PageBreadcrumbsLink>
        <PageBreadcrumbsLink href="/cdr/planning2/">Plánování</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <div class="grid auto-rows-fr grid-cols-4 gap-4">
        <FeatureAction
          colors={{
            bg: "rgb(0 188 212 / 0.1)",
            text: "rgb(0 188 212)",
          }}
          description="Nastavení šablon programů pro jednotlivé stanice"
          href="/cdr/planning2/settings/schedule-template/"
          icon={DeleteIcon}
          label="Šablony programů"
        />
        <FeatureAction
          colors={{
            bg: "rgb(0 188 212 / 0.1)",
            text: "rgb(0 188 212)",
          }}
          description="Ide sa do lesa na medvede a uvidime co sa este urodi na poli nasich buduch ludskych zdrojov"
          href="/cdr/planning2/stations/"
          icon={DeleteIcon}
          label="Stanice"
        />
      </div>
    </>
  );
});
