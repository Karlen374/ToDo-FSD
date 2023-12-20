import React, { FC, useEffect } from "react";
import { IToDoWrapperProps } from "../types/IToDoWrapperProps";
import { Alert } from "@shared/ui-kit";
import { useContextSelector, useUpdate } from "@shared/store";
import useToDoServices from "@shared/api/useToDoServices";
import { ITask } from "@shared/types/ITask";
import { ICategory } from "@shared/types/ICategory";


export const ToDoWrapper:FC<IToDoWrapperProps> = ({ children }) => {
	const updateStore = useUpdate();
	const { getTasks, getCategories } = useToDoServices();
	const active = useContextSelector((store) => store.active);
	const errorMessage = useContextSelector((store) => store.errorMessage);
  
	const getAllToDoData = async () => {
		let tasks:null | ITask[] = null;

		await getTasks().then((data) => {
			tasks = data;
		}).catch(() => {
			updateStore({ active: true, errorMessage: "Ошибка при получении данных задач" });
		});

		let categories: null | ICategory[] = null;

		await getCategories().then((data) => {
			categories = data;
		}).catch(() => {
			updateStore({ active: true, errorMessage: "Ошибка при получении данных Категорий" });
		});

		if (tasks && categories) {
			updateStore({ tasks, categories });
		}	
	};

	useEffect(() => {// получение категорий и задач
		getAllToDoData();
	}, []);
  
	return (
		<div>
			{
				active && 
				<Alert
					position={"bottom-left"} 
					active={active}
					message={errorMessage}
					onClose={() => updateStore({ active: false })}
				/>
			}
			{children}
		</div>
	);
};