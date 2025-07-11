import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { BaseButtonIntrinsicElements, BaseButtonProps } from "./base-button";
declare const meta: Meta<BaseButtonProps<any>>;
type Story<T extends keyof BaseButtonIntrinsicElements> = StoryObj<BaseButtonProps<T>>;
export default meta;
export declare const Button: Story<"button">;
export declare const Link: Story<"link">;
