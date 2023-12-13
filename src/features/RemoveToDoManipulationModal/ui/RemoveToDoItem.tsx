import { FC, useContext } from "react";
import styles from "./RemoveToDoItem.module.scss";
import React from "react";
import { Modal } from "@shared/components/ui/Modal/Modal";
import { ToDoContext } from "@features/ToDoProvider";
import { IRemoveToDoItem } from "../types/IRemowoToDoItem";
import { removeCategoryById } from "../api/removeCategoryById";
import { ModalFooter } from "@entities/ModalFooter";
import { ErrorContext } from "@features/ErrorBoundary";
import { removeTaskById } from "../api/removeTaskByid";

export const RemoveToDoItem:FC<IRemoveToDoItem> = ({ active, item, type, setActive }) => {
	const setTasks = useContext(ToDoContext).setTasks;
	const tasks = useContext(ToDoContext).tasks;
	const categories = useContext(ToDoContext).categories;
	const setCategories = useContext(ToDoContext).setCategories;
	const errorContext = useContext(ErrorContext);

	const removeItem = () => {
		if (type === "task") {
			removeTaskById(item.id)
				.then(() => {
					setTasks(tasks.filter((task) => task.id !== item.id));
				})
				.catch(() => {
					errorContext.setActive(true);
					errorContext.setErrorMessage(`Ошибка при удалении задачи "${item.name}"`);
				});
		} else {
			removeCategoryById(item.id)
				.then(() => {
					setCategories(categories.filter((category) => category.id !== item.id));
					setTasks(tasks.map((task) => {
						if (task.categoryId === item.id) {
							return {...task, categoryId: 0 };
						} else return task;
					}));
				})
				.catch(() => {
					errorContext.setActive(true);
					errorContext.setErrorMessage(`Ошибка при удалении категории "${item.name}"`);
				});
		}
		setActive(false);
	};

	const contentTitle = (type === "task")
	 	? `Вы уверены, что хотите удалить задачу "${item.name}"?`
		: `Вы уверены, что хотите удалить категорию "${item.name}"?`;

	return (
		<Modal 
			active={active} 
			onClose={() => setActive(false)} 
			title={type === "task" ? "Удаление задачи" : "Удаление категории"}>
			<p className={styles.remove__title}>
				{contentTitle}
			</p>
			<ModalFooter
				onClose={() => setActive(false)}
				submitBtnText="Да"
				onSubmit={removeItem}
			/>
		</Modal>
	);
};
