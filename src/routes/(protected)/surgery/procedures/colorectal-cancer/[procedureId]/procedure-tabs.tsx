import { Card, CardBody } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { Tabs, TabsTab } from "~/components/tabs";

import { ColorectalCancerChecklist } from "./colorectal-cancer-checklist";

export const ProcedureTabs = component$(() => {
  return (
    <Card>
      <CardBody>
        <Tabs
          class="px-4"
          tabHeaders={[
            "Checklist postupu",
            "Indikační karta pacienta",
            "Problematické vyšetření",
            "Plánované vyšetření",
            "Autorizované žádanky",
            "Karta Pacienta",
            "Seznam vyplněných dotazníků ne starších 3 měsíce",
            "Seznam absolvovaných vyšetření laboratorních",
          ]}
        >
          <TabsTab index={0}>
            <ColorectalCancerChecklist />
          </TabsTab>
          <TabsTab index={1}>
            <h3>Indikační karta pacienta</h3>
          </TabsTab>
          <TabsTab index={2}>
            <h3>Problematické vyšetření</h3>
          </TabsTab>
          <TabsTab index={3}>
            <h3>Plánované vyšetření</h3>
          </TabsTab>
          <TabsTab index={4}>
            <h3>Autorizované žádanky</h3>
          </TabsTab>
          <TabsTab index={5}>
            <h3>Karta Pacienta</h3>
          </TabsTab>
          <TabsTab index={6}>
            <h3>Seznam vyplněných dotazníků ne starších 3 měsíce</h3>
          </TabsTab>
          <TabsTab index={7}>
            <h3>Seznam absolvovaných vyšetření laboratorních</h3>
          </TabsTab>
        </Tabs>
      </CardBody>
    </Card>
  );
});
