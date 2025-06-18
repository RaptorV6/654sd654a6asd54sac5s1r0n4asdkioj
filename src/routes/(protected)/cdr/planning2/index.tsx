import type { DocumentHead } from "@builder.io/qwik-city";

import { Button, Card, CardBody, CardHeader, CardHeaderTitle, List, ListItem } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

import { DeleteIcon } from "~/components/icons-outline";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";
import { useHref } from "~/lib/use-href";

import { FeatureAction } from "../feature-action";
import { _mock_cdr_createIrisClient } from "./_mock-cdr-client";

export const useStationsData = routeLoader$(async ({ env }) => {
  const { stations } = await _mock_cdr_createIrisClient(env).query({
    stations: {
      id: true,
      name: true,
    },
  });

  return stations;
});

const pageTitle = () => "Plánování";

export const head: DocumentHead = {
  title: pageTitle(),
};

export default component$(() => {
  const href = useHref();
  const stations = useStationsData().value;

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle()}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/cdr/">CDR</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>{pageTitle()}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardHeaderTitle>Výběr oddělení</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            <List>
              {stations.map((station) => (
                <ListItem key={station.id}>
                  <Link class="text-app-text-link" href={href("/cdr/planning2/", station.id)}>
                    {station.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card>
          <CardHeader class="flex items-center gap-4">
            <CardHeaderTitle>Nastavení</CardHeaderTitle>
            <div>
              <Button href="/cdr/planning2/settings/" type="link">
                Přehled
              </Button>
            </div>
          </CardHeader>
          <CardBody class="grid auto-rows-fr grid-cols-4 gap-4">
            <FeatureAction
              colors={{ bg: "rgb(0 188 212 / 0.1)", text: "rgb(0 188 212)" }}
              description="Nastavení zdrojů (zaměstnanců) pro CDR plánování"
              href="/cdr/planning2/settings/schedule-template/"
              icon={DeleteIcon}
              label="Časová šablona programu"
            />
            <FeatureAction
              colors={{ bg: "rgb(0 188 212 / 0.1)", text: "rgb(0 188 212)" }}
              description="Nastavení zdrojů (zaměstnanců) pro CDR plánování"
              href="/cdr/planning2/resources/"
              icon={DeleteIcon}
              label="Zdroje"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
});
