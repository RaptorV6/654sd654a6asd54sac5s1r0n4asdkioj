import "@akeso/tailwind-css-kit-plugin/css/production-app.css";
import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";

import { RouterHead } from "./components/router-head";
import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && <link href={`${import.meta.env.BASE_URL}manifest.json`} rel="manifest" />}
        <RouterHead />
      </head>
      <body lang="cs">
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
