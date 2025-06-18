import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import { FeatureNavigationCardContainer } from "~/components/feature-navigation-card-container";
import { FeatureNavigationCardSurgeryAdmission } from "~/components/feature-navigation-card-surgery-admission";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";
import { asPermission } from "~/config/permissions";
import { useUserHasPermission } from "~/routes/use-user-has-permission";

export const head: DocumentHead = {
  // Head title will expose department layout.
  title: "",
};

export default component$(() => {
  const uhp = useUserHasPermission();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Chirurgické oddělení</PageHeaderTitle>
        <PageHeaderActions>{/* <AddSurgeryProcedureAction /> */}</PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>Chirurgické oddělení</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <FeatureNavigationCardContainer>
        {uhp(asPermission("surgeryAdmission")) && <FeatureNavigationCardSurgeryAdmission />}
      </FeatureNavigationCardContainer>

      {/* <Card class="mt-4">
        <CardHeader>
          <CardHeaderTitle>Karticka</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <Button href="/surgery/preop/colorectal-cancer/create/" type="link">
            Kolorektální karcinom
          </Button>
        </CardBody>
      </Card> */}

      {/* <div>Lékař</div>
      <div class="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardHeaderTitle>Dnešní návštěvy</CardHeaderTitle>
          </CardHeader>
          <CardBody>Seznam naplánovaných návštěv z AMOS</CardBody>
        </Card>
      </div>

      <div>Sestra</div>
      <div class="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardHeaderTitle>Právě ukončené návštěvy</CardHeaderTitle>
            <CardBody>
              <p>Seznam právě ukončených návštěv, které potřebují doplnit poučení nebo něco.</p>
              <List>
                <ListItem>
                  <div>Návštěva 1</div>
                  <div>Toto není úkol... toto je něco jiného... Ale co?</div>
                  <div>toto je cely stage, ktorý mám vyplniť</div>
                </ListItem>
              </List>
            </CardBody>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardHeaderTitle>Dnešní návštěvy</CardHeaderTitle>
          </CardHeader>
          <CardBody>Seznam naplánovaných návštěv z AMOS</CardBody>
        </Card>
      </div>

      <div>Administrativa</div>
      <div class="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardHeaderTitle>Právě ukončené návštěvy</CardHeaderTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardHeaderTitle>Zanedbané návštěvy</CardHeaderTitle>
          </CardHeader>
        </Card>
      </div> */}
    </>
  );
});
