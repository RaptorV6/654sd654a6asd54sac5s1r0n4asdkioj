// TODO: REMOVE this plage is obsolete now. After all source is recycled move this file away.

import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { AkesoLogo, CdrLogo, DiagnostickeCentrumLogo, HoroviceLogo, MultiscanLogo } from "~/components/icons-akeso";

import { useSession } from "../plugin@auth";

export default component$(() => {
  const sessionSig = useSession();

  return (
    <>
      <div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
        <div class="mx-auto max-w-2xl flex-shrink-0 bg-red-300 lg:mx-0 lg:max-w-xl lg:pt-8">
          <AkesoLogo class="h-24 w-24 text-white lg:hidden" />

          <h1 class="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Vítejte na zdravotním portálu Sirona od Akeso
          </h1>

          {/* <p class="mt-6 text-lg leading-8 text-gray-300">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat aliqua.
          </p> */}

          <div class="mt-20 flex items-center justify-center gap-x-6">
            {sessionSig.value == null ? (
              <Button
                class="inline-flex flex-1 justify-center"
                href="/auth/login/"
                severity="accent"
                size="xl"
                type="link"
                variant="contained"
              >
                Přihlásit se
              </Button>
            ) : (
              <Button
                class="inline-flex flex-1 justify-center"
                href="/"
                severity="highlight"
                size="xl"
                type="link"
                variant="contained"
              >
                Přejít na Dashboard
              </Button>
            )}
          </div>
        </div>

        <div class="mx-auto mt-16 hidden max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:flex lg:max-w-none lg:flex-none xl:ml-32">
          <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <AkesoLogo class="h-96 w-96 text-white" />
          </div>
        </div>
      </div>

      {/* Logo cloud */}
      <div class="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
        {/* <h2 class="text-center text-lg font-semibold leading-8 text-white">
          The world’s most innovative companies use our app
        </h2> */}
        <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <a
            class="col-span-2 h-full w-full text-white hover:text-blue-100 lg:col-span-1"
            href="https://www.nemocnice-horovice.cz/"
            rel="noreferrer"
            target="_blank"
            title="Nemocnice Hořovice"
          >
            <HoroviceLogo class="h-12 w-full object-contain object-center text-current" />
          </a>
          <a
            class="col-span-2 h-full w-full text-white hover:text-blue-100 lg:col-span-2"
            href="https://www.dcnh.cz/"
            rel="noreferrer"
            target="_blank"
            title="Diagnostické centrum"
          >
            <DiagnostickeCentrumLogo class="h-12 w-full object-contain object-center text-current" />
          </a>
          <a
            class="col-span-2 h-full w-full text-white hover:text-blue-100 lg:col-span-2"
            href="https://www.cdr-akeso.cz/"
            rel="noreferrer"
            target="_blank"
            title="Centrum duševní rehabilitace"
          >
            <CdrLogo class="h-12 w-full object-contain object-center text-current" />
          </a>
          <a
            class="col-span-2 h-full w-full text-white hover:text-blue-100 lg:col-span-1"
            href="https://www.multiscan.cz/"
            rel="noreferrer"
            target="_blank"
            title="Multiscan"
          >
            <MultiscanLogo class="h-12 w-full object-contain object-center text-current" />
          </a>
        </div>
      </div>

      {/* Separator */}
      <div class="h-16" />
    </>
  );
});
