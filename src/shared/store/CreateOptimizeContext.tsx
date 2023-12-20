import ContextStore from "@shared/store/ContextStore";
import React, { useMemo, createContext, useContext, useState, useRef, useEffect } from "react";
import { IOptimizedProviderProps } from "../types/IOptimizeProviderProps";

export function CreateOptimizeContext<T>() {
	const OptimizedContext = createContext<ContextStore<T> | null>(null);

	const OptimizedProvider = ({ initialStore, children }: IOptimizedProviderProps<T>) => {
		const store = useMemo(() => new ContextStore(initialStore), []);

		return (
			<OptimizedContext.Provider value={store}>
				{children}
			</OptimizedContext.Provider>
		);
	};

	const useStore = () => {
		const store = useContext(OptimizedContext);
		if (!store) {
			throw new Error("Оберни в Provider");
		}
		return store;
	};

	const useContextSelector = <R extends any>(selector: (state: T) => R): R => {
		const store = useStore();
		const [value, setValue] = useState(() => selector(store.getStore()));
		const selectorRef = useRef(selector);
		const oldValueRef = useRef(value);

		useEffect(() => {
			const unsubscribe = store.subscribe(() => {
				const changedValue = selectorRef.current(store.getStore());
				
				if (oldValueRef.current === changedValue) {//если  старое значение не изменилось ничего не делаем
				
					return;
				}
				
				setValue(changedValue);
			});
			return () => unsubscribe();// когда элемента больше нет на странице то отписываемся

		}, [store]);
	
		return value;
	};

	const useUpdate = () => {
		const store = useStore();
		return store.updateStore;
	};
  
	return {
		OptimizedProvider,
		useContextSelector,
		useUpdate
	};
}