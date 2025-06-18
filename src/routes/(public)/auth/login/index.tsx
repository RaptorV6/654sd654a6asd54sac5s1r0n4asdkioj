import type { RequestHandler } from "@builder.io/qwik-city";

import { Alert, Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { Form, useLocation } from "@builder.io/qwik-city";

import { AkesoLogo } from "~/components/icons-akeso";
import { serverGetSession, useSignIn } from "~/routes/plugin@auth";

export const onRequest: RequestHandler = (event) => {
  const session = serverGetSession(event, true);
  if (session && new Date(session.expires) > new Date()) {
    const redirectTo = event.url.searchParams.get("redirectTo") ?? "/";
    throw event.redirect(302, redirectTo);
  }
};

export default component$(() => {
  const signIn = useSignIn();
  const location = useLocation();

  const searchParams = location.url.searchParams;
  const redirectTo = searchParams.get("redirectTo") ?? "/";
  const signinError = searchParams.get("error");

  return (
    <div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
      <div class="mx-auto hidden max-w-2xl flex-shrink-0 lg:mx-0 lg:block lg:max-w-xl lg:pt-8">
        <AkesoLogo class="h-24 w-24 text-white" />

        <h1 class="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Vítejte na zdravotním portálu SIRONA od Akeso
        </h1>
      </div>

      <div class="mx-auto mt-12 max-w-4xl sm:mt-24 lg:mt-0 lg:flex lg:max-w-none lg:flex-none">
        <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <div>
            <AkesoLogo class="mx-auto h-10 w-auto text-white lg:hidden" />
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Přihlášte se k aplikaci
            </h2>
          </div>

          <div class="mx-auto mt-8 w-96">
            <div class="card w-full max-w-md">
              <div class="card-body w-full">
                <div class="space-y-4">
                  {signinError === "CredentialsSignin" && (
                    <Alert class="flex justify-center" severity="error">
                      Nesprávně zadané uživatelské jméno, nebo heslo.
                    </Alert>
                  )}
                  <p class="text-center font-bold text-app-text-weak">Doménovým účtem</p>
                  <Form action={signIn} class="form-styles mt-4">
                    <div class="form-group">
                      <label for="ldap.username">Užívatelské jméno</label>
                      <div class="input-group">
                        <input autoComplete="off" id="ldap.username" name="options.username" type="text" />
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="ldap.password">Heslo</label>
                      <div class="input-group">
                        <input autoComplete="off" id="ldap.password" name="options.password" type="password" />
                      </div>
                    </div>
                    <input name="providerId" type="hidden" value="credentials" />
                    <input name="redirectTo" type="hidden" value={`${location.url.origin}${redirectTo}`} />
                    <input name="options.redirectTo" type="hidden" value={`${location.url.origin}${redirectTo}`} />
                    <input name="options.callbackUrl" type="hidden" value={`${location.url.origin}${redirectTo}`} />
                    <input name="options.strategy" type="hidden" value="ldap" />
                    <div class="mt-8">
                      <Button
                        class="inline-flex w-full items-center justify-center"
                        severity="accent"
                        type="submit"
                        variant="contained"
                      >
                        Přihlásit se doménovým účtem
                      </Button>
                    </div>
                  </Form>
                </div>
                {/* )} */}

                <div class="mb-4">
                  <div class="relative mt-10">
                    <div aria-hidden="true" class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-200"></div>
                    </div>
                    <div class="relative flex justify-center text-sm font-medium leading-6">
                      <span class="bg-app-surface-base px-6 text-app-text-base">Nebo pomocí</span>
                    </div>
                  </div>

                  <Form action={signIn} class="mt-4">
                    <input name="providerId" type="hidden" value="authentik" />
                    <input name="redirectTo" type="hidden" value={`${location.url.origin}${redirectTo}`} />
                    <input name="options.redirectTo" type="hidden" value={`${location.url.origin}${redirectTo}`} />
                    <Button
                      class="inline-flex w-full items-center justify-center"
                      severity="highlight"
                      type="submit"
                      variant="contained"
                    >
                      Akeso účetem
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
