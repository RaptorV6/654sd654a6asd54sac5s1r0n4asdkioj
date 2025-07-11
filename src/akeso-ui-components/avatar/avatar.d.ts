import type { StatusIndicatorSeverity } from "../status-indicator/status-indicator";
export declare const avatarSizeOptions: readonly ["base", "lg", "sm", "xl", "xs"];
export type AvatarSize = (typeof avatarSizeOptions)[number];
export declare const avatarStatusPositionOptions: readonly ["bottom", "top"];
export type AvatartStatusPosition = (typeof avatarStatusPositionOptions)[number];
export declare const avatarVariantOptions: readonly ["rounded", "square"];
export type AvatarVariant = (typeof avatarVariantOptions)[number];
export type AvatarProps = {
    fullName?: null | string | undefined;
    size?: AvatarSize;
    src?: null | string | undefined;
    status?: StatusIndicatorSeverity;
    statusPosition?: AvatartStatusPosition;
    statusPulse?: boolean;
    variant?: AvatarVariant;
};
export declare const Avatar: import("@builder.io/qwik").Component<AvatarProps>;
