import React from "react";
import { Task } from "./Task";
import styles from "./TasksList.module.scss";
import { Loader } from "@shared/ui-kit";
import { useContextSelector } from "@shared/store";

export const TasksList: React.FC = () => {
	const tasks = useContextSelector((store) => store.tasks);

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

