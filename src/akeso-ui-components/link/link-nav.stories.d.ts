import type { Meta, StoryObj } from "storybook-framework-qwik";
import { type LinkNavProps } from "./link-nav";
declare const meta: Meta<LinkNavProps>;
export default meta;
type Story = StoryObj<LinkNavProps & {
    location?: string;
}>;
export declare const Base: Story;
