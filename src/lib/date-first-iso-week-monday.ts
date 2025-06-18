export function dateFirstIsoWeekMonday(year: number): Date {
  // Vytvoríme dátum 4. januára daného roka — tento deň vždy patrí do 1. ISO týždňa
  const fourthJan = new Date(year, 0, 4);
  const day = fourthJan.getDay() || 7; // Nedeľa (0) -> 7, pondelok = 1
  const monday = new Date(fourthJan);
  monday.setDate(fourthJan.getDate() - (day - 1));
  return monday;
}
