export declare const spinnerSizeOptions: readonly ["adaptive", "base", "lg", "sm", "xl"];
export type SpinnerSize = (typeof spinnerSizeOptions)[number];
export type SpinnerProps = {
    class?: string;
    ending?: boolean;
    label?: string;
    size?: SpinnerSize;
    standalone?: boolean;
};
/**
 * Spinner provide a visual cue that an action is being processed.
 */
export declare const Spinner: import("@builder.io/qwik").Component<SpinnerProps>;
