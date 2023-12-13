import React, { FC, useEffect, useState, createContext, useContext } from "react";
import { ITask } from "@shared/types/ITask";
import { ICategory } from "@shared/types/ICategory";
import { IToDoContext, IToDoProviderProps } from "../types/IToDoContext";
import useToDoServices from "../api/useToDoServices";
import { ErrorContext } from "@features/ErrorBoundary";

export const ToDoContext = createContext<null | IToDoContext>(null);

export const ToDoProvider:FC<IToDoProviderProps> = ({ children }) => {
	const { getTasks, getCategories } = useToDoServices();
	const [tasks, setTasks] = useState<null | ITask[]>(null);
	const [categories, setCategories] = useState<null | ICategory[]>(null);
	const errorContext = useContext(ErrorContext);

	const getAllToDoData = async () => {
		let tasks:null | ITask[] = null;
		await getTasks().then((data) => {
			tasks = data;
		}).catch(() => {
			errorContext.setActive(true);
			errorContext.setErrorMessage("Ошибка при получении данных задач");
		});
		let categories: null | ICategory[] = null;
		await getCategories().then((data) => {
			categories = data;
		}).catch(() => {
			errorContext.setActive(true);
			errorContext.setErrorMessage("Ошибка при получении данных Категорий");

		});
		if (tasks && categories) {
			setTasks(tasks);
			setCategories(categories);
		}
		
	};

	useEffect(() => {
		getAllToDoData();
	}, []);

	return ( 
		<ToDoContext.Provider value={{tasks, categories, setTasks, setCategories}}>
			{children}
		</ToDoContext.Provider>
	);
};
