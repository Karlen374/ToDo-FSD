import { ValidationError } from "yup";
import { IFormCheckingProps, IFormError } from "../types/IFormCheckingProps";
import { categoryManipulationFormSchema } from "./CategoryManipulationFormSchema";

export const checkFormErrors = ({name, description }:IFormCheckingProps): IFormError[] | null => {
	let errorsArray: null | IFormError[] = null;
	try {
		categoryManipulationFormSchema.validateSync({name, description}, { abortEarly: false });
	} catch(e) {
		if (e instanceof ValidationError) {
			errorsArray = (e.inner.map((item) => {
				return { path: item.path, message: item.message };
			}));
		}
	}
	return errorsArray;
};