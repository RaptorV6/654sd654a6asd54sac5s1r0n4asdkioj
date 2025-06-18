import { InputRadioSelect } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { useSelectStationAction } from "./_actions";
import { useLoadStations } from "./_loaders";

type SelectStationProps = {
  selectedStationId: null | string;
};
export const SelectStation = component$<SelectStationProps>(({ selectedStationId }) => {
  const stations = useLoadStations();
  const selectStationAction = useSelectStationAction();

  return (
    <div class="form-styles">
      <InputRadioSelect
        error=""
        label="Vyberte stanici"
        name="_selectStation_"
        onInput$={(_: any, el: HTMLInputElement) => {
          selectStationAction.submit({ stationId: el.value });
        }}
        options={stations.value.map((station) => ({
          label: station.code,
          value: station.id,
        }))}
        value={selectedStationId ?? undefined}
      />
    </div>
  );
});
