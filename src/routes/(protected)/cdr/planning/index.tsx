import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

import { _mockClient_organizationHierarchy } from "./_mock-client";

type OrganizationHierarchyItem = {
  children: null | OrganizationHierarchyItem[];
  id: string;
  name: string;
};

export const useOrganizationHierarchy = routeLoader$(async () => {
  const rootId = "CDR";

  // TODO: load hierarchy
  const { organizationHierarchy } = await _mockClient_organizationHierarchy("CDR");
  type OrganizationHierarchyItemProto = (typeof organizationHierarchy)[number];

  const traverse = (item: OrganizationHierarchyItemProto): OrganizationHierarchyItem => {
    const children = organizationHierarchy.filter((i) => i.parentId === item.id).map((i) => traverse(i));
    return {
      ...item,
      children,
    };
  };

  const item = organizationHierarchy.find((i) => i.id === rootId);
  const organizationHierarchyRoot = item ? traverse(item) : null;

  return { organizationHierarchyRoot };
});

export default component$(() => {
  const data = useOrganizationHierarchy().value;

  return (
    <div>
      <div>Výběr oddělení</div>
      {data.organizationHierarchyRoot == null ? (
        <div>No fields</div>
      ) : (
        <X item={data.organizationHierarchyRoot} level={0} />
      )}
    </div>
  );
});

type XProps = {
  item: OrganizationHierarchyItem;
  level: number;
};

const X = component$<XProps>(({ item, level }) => {
  return (
    <ul class="ml-4">
      <li>
        {level > 1 ? (
          <Link class="text-app-text-link" href={`/cdr/planning/${item.id}/`}>
            {item.name}
          </Link>
        ) : (
          item.name
        )}
      </li>
      {item.children?.map((si) => <X item={si} key={si.id} level={level + 1} />)}
    </ul>
  );
});
