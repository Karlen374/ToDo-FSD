import { ICategory } from "@shared/types/ICategory";

export interface ICategoryManipulationProps {
  category?: null | ICategory
  onClose: () => void
  active: boolean
}