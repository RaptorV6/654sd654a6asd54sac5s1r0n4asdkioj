import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { AkesoLogo } from "~/components/icons-akeso";

export default component$(() => {
  return (
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <AkesoLogo class="mx-auto h-10 w-10 text-white" />
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">Odhlášení</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="card w-full max-w-md">
          <div class="card-body w-full">
            <p>Odhlášení se systému proběhlo úspěšně.</p>
            <p class="mt-4">Z bezpečnostních důvodů ještě doporučujeme uzavřít okno prohlížeče.</p>
            <div class="mt-12 flex items-center justify-center gap-x-2">
              <Button
                class="inline-flex flex-auto justify-center"
                href="/auth/login/"
                severity="none"
                type="link"
                variant="outline"
              >
                Přihlásit se znovu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
