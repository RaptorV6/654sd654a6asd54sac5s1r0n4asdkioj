import { component$ } from "@builder.io/qwik";

import { FeatureNavigationCardContainer } from "~/components/feature-navigation-card-container";
import { FeatureNavigationCardInternsAmbulanceExpectations } from "~/components/feature-navigation-card-interns-ambulance-expectations";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";

export default component$(() => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Ambulance interního oddělení</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/interns/">Interní oddělení</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>Ambulance</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <FeatureNavigationCardContainer>
        <FeatureNavigationCardInternsAmbulanceExpectations />
      </FeatureNavigationCardContainer>
    </>
  );
});
