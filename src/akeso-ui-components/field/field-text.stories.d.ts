import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { FieldTextProps } from "./field-text";
type FormValues = {
    fld: string;
};
type Props = Omit<FieldTextProps<FormValues, any, any>, "name" | "of"> & {
    initialValue?: string | undefined;
};
declare const meta: Meta<Props>;
export default meta;
type Story = StoryObj<Props>;
export declare const SingleLine: Story;
export declare const Multiline: Story;
export declare const Email: Story;
export declare const Password: Story;
