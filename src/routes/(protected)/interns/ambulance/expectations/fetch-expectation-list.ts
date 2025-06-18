import type { IrisClient } from "~/iris";

export const fetchExpectationList = (iris: IrisClient) =>
  iris.query({
    internsAmbExpectations: {
      __args: {
        status: "OPEN",
      },
      id: true,
      patient: {
        birthRegistrationNumber: true,
        fullName: true,
      },
      priority: true,
    },
  });

export type ExpectationListItem = Awaited<ReturnType<typeof fetchExpectationList>>["internsAmbExpectations"][number];
