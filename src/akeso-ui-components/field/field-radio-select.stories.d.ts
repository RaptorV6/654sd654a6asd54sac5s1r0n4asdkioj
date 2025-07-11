import type { Meta, StoryObj } from "storybook-framework-qwik";
import { type FieldRadioSelectProps } from "./field-radio-select";
type FormValues = {
    fld: string;
};
type Props = Omit<FieldRadioSelectProps<FormValues, any, any>, "name" | "of"> & {
    initialValue?: string | undefined;
};
declare const meta: Meta<Props>;
export default meta;
type Story = StoryObj<Props>;
export declare const Base: Story;
