import { Alert } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";

export default component$(() => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Chirurgické oddělení</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/surgery/">Chirurgické oddělení</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>Příjem pacienta k operaci</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <div>
        <Alert severity="info">
          <p class="text-center font-bold">Vstupní zpráva je vytvořena.</p>
        </Alert>
      </div>
    </>
  );
});
