// import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
// import { useLocation } from "@builder.io/qwik-city";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { NewApplicationFormCreateForm } from "./new-application-form-create-form";

export { useFormInitialData, usePreviewData } from "./new-application-form-create-loaders";

const pageTitle = "Odbavení neplánovaných žádanek";

export default component$(() => {
  // const location = useLocation();
  // const pathname = location.url.pathname;
  // const search = location.url.search;

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>
      {/* <div>
        <p>Vyberte typ žádanky</p>
        <ul>
          <li>
            <Button href={`${pathname}ct/${search}`} type="link">
              CT
            </Button>
          </li>
          <li>
            <Button href={`${pathname}mri/${search}`} type="link">
              MRi
            </Button>
          </li>
          <li>
            <Button href={`${pathname}rtg/${search}`} type="link">
              RTG
            </Button>
          </li>
          <li>
            <Button href={`${pathname}uz/${search}`} type="link">
              UZ
            </Button>
          </li>
        </ul>
      </div> */}
      <NewApplicationFormCreateForm />
    </>
  );
});
