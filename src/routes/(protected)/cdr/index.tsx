import { component$ } from "@builder.io/qwik";

import { DeleteIcon } from "~/components/icons-outline";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { FeatureAction } from "./feature-action";

export default component$(() => {
  const pageTitle = "CDR";

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <div class="grid auto-rows-fr grid-cols-4 gap-4">
        <FeatureAction
          colors={{
            bg: "rgb(0 188 212 / 0.1)",
            text: "rgb(0 188 212)",
          }}
          description="Ide sa do lesa na medvede"
          href="/cdr/planning2/"
          icon={DeleteIcon}
          label="Plánování"
        />
        <FeatureAction
          colors={{
            bg: "rgb(0 188 212 / 0.1)",
            text: "rgb(0 188 212)",
          }}
          description="Ide sa do lesa na medvede a uvidime co sa este urodi na poli nasich buduch ludskych zdrojov"
          href="/cdr/planning2/"
          icon={DeleteIcon}
          label="Plánování"
        />
      </div>
    </>
  );
});
