import { ICategory } from "@shared/types/ICategory";
import { ITask } from "@shared/types/ITask";

export interface IToDoContext {
  tasks: ITask[]
  categories: ICategory[]
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

export interface IToDoProviderProps {
  children: React.ReactNode
}