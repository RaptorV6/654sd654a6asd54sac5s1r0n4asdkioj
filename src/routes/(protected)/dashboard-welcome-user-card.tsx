import { Avatar } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import AkesoPattern from "~/assets/pattern.svg?jsx";
import { useAuthUser } from "~/routes/plugin@auth";

export const DashboardWelcomeUserCard = component$(() => {
  const authUser = useAuthUser();

  return (
    <div class="relative mt-4 rounded border border-app-border-hover shadow-sm shadow-accent-base">
      <figure class="absolute inset-0 overflow-hidden">
        <AkesoPattern />
      </figure>
      <div class="relative flex items-center font-bold text-accent-text-contrast">
        <div class="m-8 w-full rounded-md border border-app-border-base bg-white/10 p-8 backdrop-blur-sm">
          <div class="flex items-center">
            <Avatar fullName={authUser.name} size="xl" src={authUser.image} variant="square" />
            <div class="ml-4">
              <div class="text-3xl">Vítejte</div>
              <div>{authUser.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
