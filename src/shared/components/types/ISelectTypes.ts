export interface ISelectProps <T>{
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  options: T[]
}

export type ISelectBase = {
  id: number;
  name: string;
}