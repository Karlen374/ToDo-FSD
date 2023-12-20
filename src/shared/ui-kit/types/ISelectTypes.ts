export interface ISelectProps <T>{
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  options: T[]
}

export interface ISelectItemProps <T>{
  option: T
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: number | null
}
export type ISelectBase = {
  id: number;
  name: string;
}