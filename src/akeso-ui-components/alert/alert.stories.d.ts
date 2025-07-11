import type { Meta, StoryObj } from "storybook-framework-qwik";
import { type AlertProps } from "./alert";
declare const meta: Meta<AlertProps<"div">>;
type Story = StoryObj<AlertProps<"div">>;
export default meta;
export declare const Base: Story;
export declare const WithSeverity: Story;
