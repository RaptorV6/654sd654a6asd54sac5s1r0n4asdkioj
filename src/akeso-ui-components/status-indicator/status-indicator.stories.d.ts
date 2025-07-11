import type { Meta, StoryObj } from "storybook-framework-qwik";
import { type StatusIndicatorProps } from "./status-indicator";
declare const meta: Meta<StatusIndicatorProps<"span">>;
type Story = StoryObj<StatusIndicatorProps<"span">>;
export default meta;
export declare const Base: Story;
export declare const Severity: Story;
export declare const Large: Story;
export declare const Pulse: Story;
