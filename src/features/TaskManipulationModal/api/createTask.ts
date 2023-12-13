import { hostAxios } from "@shared/api/config";
import { ITask } from "@shared/types/ITask";

export const createTask = async (task: ITask) => {
	const params = task.categoryId ? task : { name: task.name, desription: task.description, id: task.id };
	const res = await hostAxios.post<ITask>("/Addtask", params);
	return res.data;
};