export type Hospital = {
  id: string;
  name: string;
};

export const _mockHospitals = [
  {
    id: "Hor12",
    name: "Nemocnice Hořovice",
  },
  {
    id: "Buto36",
    name: "AKESO Poliklinika",
  },
  {
    id: "Rehaberoun44",
    name: "Rehabilitační nemocnice Beroun",
  },
] satisfies Hospital[];
