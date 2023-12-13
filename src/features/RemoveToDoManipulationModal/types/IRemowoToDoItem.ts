import { ICategory } from "@shared/types/ICategory";
import { ITask } from "@shared/types/ITask";

export interface IRemoveToDoItem {
  type: "task" | "category"
  item: ITask | ICategory
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}