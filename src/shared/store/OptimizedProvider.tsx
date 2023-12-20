import { IAppStore } from "../types/IAppStore";
import React, { FC } from "react";
import { IAppProviderProps } from "@shared/types/IOptimizeProviderProps";
import { CreateOptimizeContext } from "./CreateOptimizeContext";

export const {
	OptimizedProvider,
	useContextSelector,
	useUpdate,
} = CreateOptimizeContext<IAppStore>();

export const AppOptimizedProvider:FC<IAppProviderProps> = ({ children, store}) => {
	return (
		<OptimizedProvider initialStore={store}>
			{children}
		</OptimizedProvider>
	);
};