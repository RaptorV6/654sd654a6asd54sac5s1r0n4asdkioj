// TODO: move `dateEqDates` to lib `@akeso/utils`.
export function dateEqDates(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
