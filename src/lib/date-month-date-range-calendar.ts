import { dateNextMidnight, datePrevMidnight } from "@akeso/utils";

export function dateMonthDateRangeCalendar(
  dateOfMonth: Date,
  options?: { midnightEdges?: true },
): [from: Date, to: Date] {
  // Selected moth first date...
  const requestedDateFrom = new Date(dateOfMonth.getFullYear(), dateOfMonth.getMonth(), 1);
  const requestedDateTo = new Date(dateOfMonth.getFullYear(), dateOfMonth.getMonth() + 1, 0);
  const firstDateDay = requestedDateFrom.getDay() || 7;
  const lastDateDay = requestedDateTo.getDay() || 7;

  // Get num of days to prepend from prev month
  const firstDateOffset = 1 - firstDateDay;
  const lastDateOffset = 7 - lastDateDay;

  let calendarDateFrom = new Date(
    requestedDateFrom.getFullYear(),
    requestedDateFrom.getMonth(),
    requestedDateFrom.getDate() + firstDateOffset,
  );
  let calendarDateTo = new Date(
    requestedDateTo.getFullYear(),
    requestedDateTo.getMonth(),
    requestedDateTo.getDate() + lastDateOffset,
  );

  if (options) {
    if (options.midnightEdges) {
      calendarDateFrom = datePrevMidnight(calendarDateFrom);
      calendarDateTo = dateNextMidnight(calendarDateTo);
    }
  }

  return [calendarDateFrom, calendarDateTo];
}
