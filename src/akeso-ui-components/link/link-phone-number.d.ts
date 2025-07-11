import type { ClassList, JSXOutput, QwikIntrinsicElements } from "@builder.io/qwik";
import type { CountryCode } from "libphonenumber-js";
export type LinkPhoneNumberProps = Omit<QwikIntrinsicElements["a"], "href"> & {
    class?: ClassList;
    defaultCountry?: CountryCode;
    fallback?: JSXOutput;
    phoneNumber: null | string | undefined;
};
export declare const LinkPhoneNumber: import("@builder.io/qwik").Component<LinkPhoneNumberProps>;
