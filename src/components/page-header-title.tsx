import { component$, Slot, useStyles$ } from "@builder.io/qwik";

export const PageHeaderTitle = component$(() => {
  useStyles$(`
    .page-header-title {
      font-weight: bold;
      text-decoration-color: hsl(var(--a-color-accent-text-contrast) / 1);
      text-shadow: rgba(28, 32, 37, 0.3) 0px 1px 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }  
  `);

  return (
    <h1 class="page-header-title">
      <Slot />
    </h1>
  );
});
