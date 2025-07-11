import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { FieldPhoneNumberProps } from "./field-phone-number";
type FormValues = {
    fld: string;
};
type Props = Omit<FieldPhoneNumberProps<FormValues, any, any>, "name" | "of"> & {
    initialValue?: string | undefined;
};
declare const meta: Meta<Props>;
export default meta;
type Story = StoryObj<Props>;
export declare const Base: Story;
