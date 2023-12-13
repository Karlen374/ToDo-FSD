import { ITask } from "@shared/types/ITask";

export interface ITaskManipulationProps {
  task?: null | ITask
  onClose: () => void
  active: boolean
}