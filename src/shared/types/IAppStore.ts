import { ICategory } from "@shared/types/ICategory";
import { ITask } from "@shared/types/ITask";

export interface IAppStore {
	active: boolean, 
	errorMessage: string,
	tasks: ITask[] | null
	categories: ICategory[] | null
}