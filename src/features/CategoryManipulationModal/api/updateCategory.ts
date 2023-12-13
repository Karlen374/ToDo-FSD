import { hostAxios } from "@shared/api/config";
import { ICategory } from "@shared/types/ICategory";
import { ITask } from "@shared/types/ITask";

export const updateCategory = async (category: ICategory) => {
	const res = await hostAxios.post<ITask>("/UpdateCategory", category);
	return res.data;
};