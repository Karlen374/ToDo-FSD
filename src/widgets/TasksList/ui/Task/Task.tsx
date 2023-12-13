import React,{ useContext, useState } from "react";
import { ITaskProps } from "../../types/ITaskProps";
import styles from "./Task.module.scss";
import { ToDoContext } from "@features/ToDoProvider";
import RemoveIcon from "@shared/assets/icons/RemoveIcon";
import EditIcon from "@shared/assets/icons/EditIcon";
import { TaskManipulationModal } from "@features/TaskManipulationModal";
import { RemoveTaskModal } from "@features/RemoveToDoManipulationModal";
import FolderIcon from "@shared/assets/icons/FolderIcon";

export const Task: React.FC<ITaskProps> = ({ task }) => {
	const categories = useContext(ToDoContext).categories;
	const [removeModal, setRemoveModal] = useState(false);
	const [editModal, setEditModal] = useState(false);

	return (
		<li className={styles.task}>
			<div>
				<div className={styles.task__headerBlock}>
					<h3 className={styles.task__name}>{task.name}</h3>
					{task.categoryId !== 0 && categories.find((category) => category.id === task.categoryId)?.name && (
						<div className={styles.task__category}>
							<div className={styles.task__icon}>
								<FolderIcon />
							</div>
							<span>{
								categories.find((category) => category.id === task.categoryId)?.name
							}</span>
						</div>
					)}
				</div>
				<div className={styles.task__description}>{task.description}</div>
			</div>
			<div className={styles.task__buttons}>
				<button
					className={styles.task__button}
					onClick={() => {
						setEditModal(true);
					}}
				>
					<EditIcon />
				</button>
				<button
					className={styles.task__button}
					onClick={() => {
						setRemoveModal(true);
					}}
				>
					<RemoveIcon />
				</button>
			</div>
			{editModal && <TaskManipulationModal 
				task={task} 
				active={editModal} 
				onClose={() => setEditModal(false)}
			/>}
			{removeModal && <RemoveTaskModal
				item={task}
				type="task"
				active={removeModal}
				setActive={setRemoveModal}
			/>}
		</li>
	);
};