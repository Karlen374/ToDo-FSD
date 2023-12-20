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

	const createCategory = async (category: ICategory) => {
	  const res = await hostAxios.post<ICategory>("/AddCategory", category);
	  return res.data;
	};
  
	const updateCategory = async (category: ICategory) => {
		const res = await hostAxios.post<ITask>("/UpdateCategory", category);
		return res.data;
	};

	const createTask = async (task: ITask) => {
		const params = task.categoryId ? task : { name: task.name, desription: task.description, id: task.id };
		const res = await hostAxios.post<ITask>("/Addtask", params);
		return res.data;
	};

	const updateTask = async (task: ITask) => {
		const res = await hostAxios.post<ITask>("/UpdateTask", task);
		return res.data;
	};

	const removeTaskById = async (id: number) => {
		const res = await hostAxios.get(`RemoveTask/${id}`);
		return res.status === 200 ? true : false;
	};

	const removeCategoryById = async (id: number) => {
		const res = await hostAxios.get(`RemoveCategory/${id}`);
		return res.status === 200 ? true : false;
	};
  
	return {
		getTasks,
		getCategories,
		createCategory,
		updateCategory,
		createTask,
		updateTask,
		removeTaskById,
		removeCategoryById
	};
};

export default useToDoServices;
