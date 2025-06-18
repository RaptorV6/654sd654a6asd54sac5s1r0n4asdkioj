import { $ } from "bun";
import { customScalars } from "../src/iris/scalar-codecs";

const x = Object.entries(customScalars)
  .map(([sn, sd]) => `-S '${sn}:${sd.type}'`)
  .join(" ");

// @see https://genql.dev/docs/cli-reference
await $`node_modules/.bin/genql --endpoint ${process.env.IRIS_URL_GRAPHQL} --output ./src/iris/client ${{ raw: x }}`;
