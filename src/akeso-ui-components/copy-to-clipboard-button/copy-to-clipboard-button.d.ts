import type { ButtonSeverity, ButtonSize, ButtonVariant } from "../button/button";
export type CopyToClipboardButtonProps = {
    severity?: ButtonSeverity;
    size?: ButtonSize;
    text: string;
    variant?: ButtonVariant;
};
export declare const CopyToClipboardButton: import("@builder.io/qwik").Component<CopyToClipboardButtonProps>;
