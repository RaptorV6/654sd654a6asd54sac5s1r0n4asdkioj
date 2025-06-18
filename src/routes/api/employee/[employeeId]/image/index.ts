import type { RequestHandler } from "@builder.io/qwik-city";

import { createIrisClient } from "~/iris";

export const onGet: RequestHandler = async ({ env, params, send }) => {
  const { employeeId } = params;

  try {
    const { employee } = await createIrisClient(env).query({
      employee: {
        __args: {
          id: employeeId,
        },
        image: {
          imageBase64: true,
        },
      },
    });

    if (!employee || !employee.image || !employee.image.imageBase64) {
      send(404, "Not Found");
    } else {
      send(200, btoa(employee.image.imageBase64));
    }
  } catch (err) {
    console.error("Employee image resolving failed with error", err);
    send(500, "Internal Server Error");
  }
};
