export type EmployeeBrief = {
  email: string;
  firstName: string;
  fullName: string;
  id: string;
  lastName: string;
};

export async function serverGetEmployeeBrief(input: { employeeId: string }): Promise<EmployeeBrief | null> {
  if (input.employeeId === "dbc59d3f42a24c099589458db865d651") {
    return {
      email: "orhalmi@nemocnice-horovice.cz",
      firstName: "Julius",
      fullName: "Julius Örhalmi",
      id: "dbc59d3f42a24c099589458db865d651",
      lastName: "Örhalmi",
    };
  }

  if (input.employeeId === "3371566702ee49c787c9c52f81ed3bf4") {
    return {
      email: "sestra@nember.cz",
      firstName: "Sestra",
      fullName: "Sestra Jedna",
      id: "3371566702ee49c787c9c52f81ed3bf4",
      lastName: "Jedna",
    };
  }

  if (input.employeeId === "3371566702ee49c787c9c52f81ed3bf4") {
    return {
      email: "administrative@nember.cz",
      firstName: "Administratíva",
      fullName: "Administratíva Jedna",
      id: "3371566702ee49c787c9c52f81ed3bf4",
      lastName: "Jedna",
    };
  }

  return null;
}

export async function serverFindEmployeeBriefs(input: { employeeIds: string[] }) {
  const res: EmployeeBrief[] = [];

  for (const employeeId of input.employeeIds) {
    const e = await serverGetEmployeeBrief({ employeeId });
    if (e) {
      res.push(e);
    }
  }

  return res;
}
