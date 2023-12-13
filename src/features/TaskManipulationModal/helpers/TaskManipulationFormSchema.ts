import { object, string, number } from "yup";

export const taskManipulationFormSchema = object({
	name: string().max(255, "максимальная длина до 255 символов").required("Это поле обязательное"),
	description: string().max(1536, "максимальная длина до 1536 символов").nullable(),
	categoryId: number().nullable()
});
