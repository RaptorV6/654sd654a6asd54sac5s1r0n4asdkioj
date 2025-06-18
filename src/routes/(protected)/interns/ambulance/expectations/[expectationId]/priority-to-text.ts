import type { ExpectationDetailData } from "./fetch-expectation-detail";

export const priorityToText = (priority: ExpectationDetailData["priority"]) => {
  if (priority === "CRITICAL") return "A";
  if (priority === "HIGH") return "B";
  if (priority === "STABILIZED") return "C";
  return "";
};
