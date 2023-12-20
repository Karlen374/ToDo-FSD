import { Modal } from "@shared/ui-kit";
import styles from "./CategoriesList.module.scss";
import React, { FC } from "react";
import { IRemoveCategoryProps } from "../types/IRemoveCategoryModalProps";
import { useContextSelector, useUpdate } from "@shared/store";
import useToDoServices from "@shared/api/useToDoServices";

export const RemoveCategoryModal:FC<IRemoveCategoryProps> = ({ category, active, setActive }) => {
	const updateStore = useUpdate();
	const categories = useContextSelector((store) => store.categories);
	const tasks = useContextSelector((store) => store.tasks);
	const { removeCategoryById } = useToDoServices();

	const onRemoveCategory = () => {// удаление категории 
		removeCategoryById(category.id)
			.then(() => {
				updateStore({
					categories:categories.filter((item) => category.id !== item.id),
					tasks: tasks.map((task) => {
						if (task.categoryId === category.id) {
							return {...task, categoryId: 0 };
						} else return task;
					})}
				);
			})
			.catch(() => {
				updateStore({ active: true, errorMessage: `Ошибка при удалении категории "${category.name}"` });
			});
	};

	return (
		<Modal 
			submitBtnText="Да"
			onSubmit={onRemoveCategory}
			active={active} 
			onClose={() => setActive(false)} 
			title={"Удаление категории"}>
			<p className={styles.remove__title}>
				{` Вы уверены, что хотите удалить задачу "${category.name}"?`}
			</p>
		</Modal>
	);
};
