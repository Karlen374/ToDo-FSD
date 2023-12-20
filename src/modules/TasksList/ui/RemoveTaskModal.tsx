import React, { FC } from "react";
import { ITaskRemoveModal } from "../types/ITaskRemoveModal";
import { Modal } from "@shared/ui-kit";
import styles from "./TasksList.module.scss";
import { useContextSelector, useUpdate } from "@shared/store";
import useToDoServices from "@shared/api/useToDoServices";

export const RemoveTaskModal:FC<ITaskRemoveModal> = ({ task, active, setActive }) => {
	const tasks = useContextSelector((store) => store.tasks);
	const { removeTaskById } = useToDoServices();
	const updateStore = useUpdate();

	const onRemoveTask = () => { // удление задачи
		removeTaskById(task.id)
			.then(() => {
				updateStore({
					tasks:tasks.filter((item) => task.id !== item.id),
				});
			})
			.catch(() => {
				updateStore({ active: true, errorMessage: `Ошибка при удалении задачи "${task.name}"` });
			});
	};

	return (
		<Modal 
			submitBtnText="Да"
			onSubmit={onRemoveTask}
			active={active} 
			onClose={() => setActive(false)} 
			title={"Удаление задачи"}>
			<p className={styles.remove__title}>
				{` Вы уверены, что хотите удалить задачу "${task.name}"?`}
			</p>
		</Modal>
	);
};
