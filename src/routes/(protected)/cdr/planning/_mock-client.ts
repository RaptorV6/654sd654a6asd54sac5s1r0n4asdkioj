import type { _Mock_MedicalProcedurePlanEvent, _Mock_OrganizationHierarchy } from "./_mock-data";

import { _mock_medicalProcedurePlanEvents, _mock_organizationHierarchy } from "./_mock-data";

export async function _mockClient_organizationHierarchy(rootId?: string) {
  const _rootId = rootId ?? null;
  const res: _Mock_OrganizationHierarchy[] = ((r) => (r ? [r] : []))(
    _mock_organizationHierarchy.find((i) => i.id === _rootId),
  );

  const traverse = (parentId: null | string) => {
    const items = _mock_organizationHierarchy.filter((i) => i.parentId === parentId);
    res.push(...items);
    for (const item of items) {
      traverse(item.id);
    }
  };

  traverse(rootId ?? null);

  return { organizationHierarchy: res };
}

export async function _mockClient_organizationHierarchyItem(id: string) {
  const item = _mock_organizationHierarchy.find((i) => i.id === id);

  return { organizationHierarchyItem: item ?? null };
}

export async function _mockClient_medicalProcedurePlan(
  segmentId: string,
  dateFrom: Date,
  dateTo?: Date,
): Promise<{
  medicalProcedurePlan: {
    events: _Mock_MedicalProcedurePlanEvent[];
    organizationHierarchyItem: _Mock_OrganizationHierarchy;
    timeHourEnd: number;
    timeHourStart: number;
  } | null;
}> {
  const organizationHierarchyItem = _mock_organizationHierarchy.find((i) => i.id === segmentId);
  if (organizationHierarchyItem == null) return { medicalProcedurePlan: null };

  const timeHourStart = 8;
  const timeHourEnd = Math.min(20, 24);

  dateTo = dateTo ?? new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 1);

  const events = _mock_medicalProcedurePlanEvents.filter(
    (e) =>
      e.dateFrom >= dateFrom && ((e.dateTo == null && e.dateFrom < dateTo) || (e.dateTo != null && e.dateTo < dateTo)),
  );

  return { medicalProcedurePlan: { events, organizationHierarchyItem, timeHourEnd, timeHourStart } };
}
