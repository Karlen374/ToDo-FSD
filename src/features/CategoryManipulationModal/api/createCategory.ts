import { hostAxios } from "@shared/api/config";
import { ICategory } from "@shared/types/ICategory";

export const createCategory = async (category: ICategory) => {
	const res = await hostAxios.post<ICategory>("/AddCategory", category);
	return res.data;
};