import { ITask } from "@shared/types/ITask";
import { hostAxios } from "@shared/api/config";
import { ICategory } from "@shared/types/ICategory";

const useToDoServices = () => {
	const getTasks = async () => {
		const res = await hostAxios.get<ITask[]>("/GetTasks");
		return res.data;
	};

	const getCategories = async () => {
		const res = await hostAxios.get<ICategory[]>("/GetCategories");
		return res.data;
	};

	return {
		getTasks,
		getCategories
	};
};

export default useToDoServices;

