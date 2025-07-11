import type { ClassList, Signal } from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";
export declare function useLinkNavIsActive(): Signal<boolean>;
export type LinkNavProps = Omit<LinkProps, "children"> & {
    activeClass?: ClassList;
    end?: boolean;
};
export declare const LinkNav: import("@builder.io/qwik").Component<LinkNavProps>;
