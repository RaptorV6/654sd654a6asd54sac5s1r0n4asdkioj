import type { Signal } from "@builder.io/qwik";

import { createContextId } from "@builder.io/qwik";

export const LayoutMobileMenuOpenContextId = createContextId<Signal<boolean>>("layout-mobile-menu-context");
// export const LayoutSidebarWideContext = createContextId<Signal<boolean>>("layout-sidebar-wide-context");
