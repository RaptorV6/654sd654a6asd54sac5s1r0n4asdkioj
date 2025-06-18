import { component$, useVisibleTask$ } from "@builder.io/qwik";

import { useSignOut } from "~/routes/plugin@auth";

export default component$(() => {
  const signOut = useSignOut();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    signOut.submit({ redirectTo: "/auth/logout/" });
  });

  return <div>Porbíhá odhlášení...</div>;
});
