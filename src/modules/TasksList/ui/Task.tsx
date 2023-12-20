import React, { useState } from "react";
import { ITaskProps } from "../types/ITaskProps";
import styles from "./TasksList.module.scss";
import RemoveIcon from "@shared/assets/icons/RemoveIcon";
import EditIcon from "@shared/assets/icons/EditIcon";
import { TaskManipulationModal as UpdateTaskModal } from "@components/TaskManipulationModal";
import { RemoveTaskModal } from "./RemoveTaskModal";
import FolderIcon from "@shared/assets/icons/FolderIcon";
import { useContextSelector } from "@shared/store";

export const Task: React.FC<ITaskProps> = ({ task }) => {
	const categories = useContextSelector((store) => store.categories);
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
							<span>
								{
									categories.find((category) => category.id === task.categoryId)?.name
								}
							</span>
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
			{editModal && <UpdateTaskModal
				task={task} 
				active={editModal} 
				onClose={() => setEditModal(false)}
			/>}
			{removeModal && <RemoveTaskModal
				task={task}
				active={removeModal}
				setActive={setRemoveModal}
			/>}
		</li>
	);
};