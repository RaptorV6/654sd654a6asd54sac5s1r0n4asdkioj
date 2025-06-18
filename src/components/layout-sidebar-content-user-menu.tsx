import { Avatar, Menu, MenuItem, useFloating } from "@akeso/ui-components";
import { component$, useId, useSignal } from "@builder.io/qwik";

import { useSession } from "~/routes/plugin@auth";

import { LogoutBoxROutlineIcon } from "./icons-outline";
import { SignoutConfirmDialog } from "./signout-confirm-dialog";

type LayoutSidebarContentUserMenuProps = {
  userFullName: null | string | undefined;
  userImage: null | string | undefined;
};

export const LayoutSidebarContentUserMenu = component$(
  ({ userFullName, userImage }: LayoutSidebarContentUserMenuProps) => {
    const sessionSig = useSession();
    const anchorRef = useSignal<HTMLButtonElement>();
    const popoverRef = useSignal<HTMLElement>();
    const popoverId = useId();

    const showSignoutDialog = useSignal(false);

    useFloating(anchorRef, popoverRef, { placement: "top" });

    return (
      <>
        <button
          class="flex w-full items-center gap-x-2 px-6 py-1.5 text-sm font-normal leading-4 text-app-text-base hover:bg-app-nav-hover"
          popovertarget={popoverId}
          popovertargetaction="toggle"
          ref={anchorRef}
          type="button"
        >
          <Avatar fullName={userFullName} size="xs" src={userImage} />
          <span class="sr-only">Your profile</span>
          <span aria-hidden="true" class="truncate">
            {userFullName}
          </span>
        </button>
        <Menu id={popoverId} ref={popoverRef}>
          {/* <MenuItem
            href="/user/"
            onClick$={() => {
              popoverRef.value?.hidePopover();
            }}
            type="link"
          >
            Profil
          </MenuItem> */}
          {sessionSig.value && (
            <>
              {/* <MenuSeparator /> */}
              <MenuItem
                class="flex w-full items-center gap-x-2"
                onClick$={() => {
                  showSignoutDialog.value = true;
                }}
                type="button"
              >
                <LogoutBoxROutlineIcon class="-ml-1 h-5 w-5 shrink-0" />
                <span aria-hidden="true" class="truncate">
                  Odhlásit se
                </span>
              </MenuItem>
            </>
          )}
        </Menu>
        {sessionSig.value && (
          <SignoutConfirmDialog authStrategy={sessionSig.value.strategy} bind:show={showSignoutDialog} />
        )}
      </>
    );
  },
);
