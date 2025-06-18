export type CalendarDatesRangeOptions = {
  dateFrom: Date;
  dateTo: Date;
  onlyWordDays?: boolean;
  separate?: "weeks";
  timeHourFrom?: number;
  timeHourTo?: number;
};

export type CalendarDatesRangeResult = {
  dates: CalendarDatesRange;
  calendarDateFrom: Date;
  calendarDateTo: Date;
  times: CalendarTimesRange;
  calendarHourFrom: number;
  calendarHourTo: number;
};

export type CalendarDatesRange = CalendarDatesRangeItem[];
export type CalendarDatesRangeItem = { date: Date; separated: boolean };
export type CalendarTimesRange = CalendarTimesRangeItem[];
export type CalendarTimesRangeItem = { time: Date };

export function calendarDatesRange(options: CalendarDatesRangeOptions): CalendarDatesRangeResult {
  const { dateFrom: requestedDateFrom, dateTo: requestedDateTo } = options;

  // Selected moth first date...
  const firstDateDay = requestedDateFrom.getDay() || 7;
  const lastDateDay = requestedDateTo.getDay() || 7;

  // Get num of days to prepend from prev month
  const firstDateOffset = 1 - firstDateDay;
  const lastDateOffset = 7 - lastDateDay;

  const calendarDateFrom = new Date(
    requestedDateFrom.getFullYear(),
    requestedDateFrom.getMonth(),
    requestedDateFrom.getDate() + firstDateOffset,
  );
  const calendarDateTo = new Date(
    requestedDateTo.getFullYear(),
    requestedDateTo.getMonth(),
    requestedDateTo.getDate() + lastDateOffset,
  );
  const calendarDatesCount =
    Math.ceil((calendarDateTo.getTime() - calendarDateFrom.getTime()) / (24 * 60 * 60 * 1000)) + 1;

  // Calculate dates for current calendar view
  const dates: CalendarDatesRangeItem[] = Array.from(
    { length: calendarDatesCount },
    (_, i): CalendarDatesRangeItem | null => {
      const d = new Date(calendarDateFrom.getFullYear(), calendarDateFrom.getMonth(), calendarDateFrom.getDate() + i);
      // date is outh of range of currenct month...
      // if (d.getMonth() === planStartDateMonth) return null;
      const day = d.getDay();
      const lastDayToSeparate = options.onlyWordDays ? 5 : 0;

      if (options.onlyWordDays) {
        // skip week-end days
        if (day < 1 || day > 5) return null;
      }

      return { date: d, separated: options.separate ? day === lastDayToSeparate : false };
    },
  ).filter((d): d is { date: Date; separated: boolean } => d != null);

  const calendarHourFrom = Math.max(0, options.timeHourFrom ?? 0);
  const calendarHourTo = Math.min(24, options.timeHourTo ?? 24);
  const times: CalendarTimesRange = Array.from({ length: calendarHourTo - calendarHourFrom + 1 }, (_, i) => ({
    time: new Date(1990, 0, 1, calendarHourFrom + i, 0, 0),
  }));

  return { calendarDateFrom, calendarDateTo, dates, times, calendarHourFrom, calendarHourTo };
}
