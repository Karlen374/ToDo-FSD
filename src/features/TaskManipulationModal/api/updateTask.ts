import { hostAxios } from "@shared/api/config";
import { ITask } from "@shared/types/ITask";

export const updateTask = async (task: ITask) => {
	const res = await hostAxios.post<ITask>("/UpdateTask", task);
	return res.data;
};