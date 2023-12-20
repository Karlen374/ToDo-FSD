import { ReactNode } from "react";
import { IAppStore } from "./IAppStore";

export interface IOptimizedProviderProps<T> {
  children: ReactNode
  initialStore: T
}

export interface IAppProviderProps {
  children: ReactNode
  store: IAppStore
}