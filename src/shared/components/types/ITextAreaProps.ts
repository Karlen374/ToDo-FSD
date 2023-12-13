import { IInputProps } from "./IInputTypes";

export type ITextAreaProps = Omit<IInputProps, "required" | "onBlur">