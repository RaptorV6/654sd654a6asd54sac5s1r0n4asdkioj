// TODO: move `dateWeekNumber` to lib `@akeso/utils`.
export function dateWeekNumber(date?: Date) {
  const currentDate = typeof date === "object" ? date : new Date();
  const tempDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  const day = tempDate.getUTCDay() || 7; // nedele je 0, pro ISO tyden musi byt 7
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - day); // nastavit na ctvrtek v aktualnim tydnu
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNumber;
}
