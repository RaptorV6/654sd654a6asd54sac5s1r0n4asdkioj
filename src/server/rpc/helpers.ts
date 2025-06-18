export function procedureStepToDb(step: { major: number; minor?: number }): string {
  return [step.major, step.minor ?? 0].map((i) => (i ? `${i}`.padStart(2, "0") : "")).join(".");
}

export function procedureStepFromDb(stepDb: string): { major: number; minor: number } {
  const [major, minor] = stepDb.split(".").map((i) => Number(i));
  return { major, minor };
}
