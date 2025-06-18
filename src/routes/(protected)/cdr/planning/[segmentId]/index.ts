import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ redirect }) => {
  const currentDate = new Date();
  const prependZero = (v: number | string, len = 2): string => v.toString().padStart(len, "0");
  const buildDateParam = (y: number, m: number): string => `${y}-${prependZero(m + 1)}`;
  const dateParam = buildDateParam(currentDate.getFullYear(), currentDate.getMonth());
  throw redirect(303, dateParam);
};
