import { ICategory } from "@shared/types/ICategory";

export interface IRemoveCategoryProps {
  category: ICategory
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}