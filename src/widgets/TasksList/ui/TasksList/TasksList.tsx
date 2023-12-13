import { ToDoContext } from "@features/ToDoProvider";
import React, { useContext } from "react";
import { Task } from "../Task/Task";
import styles from "./TasksList.module.scss";
import { Loader } from "@shared/components";

export const TasksList: React.FC = () => {
	const tasks = useContext(ToDoContext).tasks;

	if (!tasks) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}
	return (
		<ul className={styles.tasks}>
			{tasks.map((task) => (
				<Task key={task.id} task={task}/>
			))}
		</ul>
	);
};

