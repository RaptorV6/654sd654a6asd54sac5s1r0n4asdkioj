import type { Meta, StoryObj } from "storybook-framework-qwik";
import { type FieldRadioProps } from "./field-radio";
type FormValues = {
    fld: string;
};
type Props = Omit<FieldRadioProps<FormValues, any, any>, "name" | "of"> & {
    initialValue?: string | undefined;
};
declare const meta: Meta<Props>;
export default meta;
type Story = StoryObj<Props>;
export declare const Base: Story;
