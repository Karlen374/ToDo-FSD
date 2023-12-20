import { object, string } from "yup";

export const categoryManipulationFormSchema = object({
	name: string().max(255, "максимальная длина до 255 символов").required("Это поле обязательное"),
	description: string().max(512, "максимальная длина до 512 символов"),
});
