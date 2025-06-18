import { $ } from "bun";

await $`rm -rf dist && rm -rf server && rm -rf tmp`;
