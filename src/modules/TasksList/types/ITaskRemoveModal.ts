import { ITask } from "@shared/types/ITask";

export interface ITaskRemoveModal {
  task: ITask
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}