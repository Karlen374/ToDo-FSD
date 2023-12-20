import React, { useState } from "react";
import styles from "./Header.module.scss";
import { CATEGORIES } from "@shared/constants/routes";
import { useLocation } from "react-router-dom";
import { Button } from "@shared/ui-kit";
import { TaskManipulationModal as TaskCreateModal } from "@components/TaskManipulationModal";
import { CategoryManipulationModal as CreateCategoryModal } from "@components/CategoryManipulationModal";
import { HeaderNavigation } from "./HeaderNavigation";

export const Header = () => {
	const { pathname } = useLocation();
	const isCategories = pathname.includes(CATEGORIES);
	const [addNewTaskModal, setAddNewTaskModal] = useState(false);
	const [addNewCategoryModal, setAddNewCategoryModal] = useState(false);

	return (
		<header className={styles.header}>
			<div className={styles.header__nav}>
				<h1 className={styles.header__title}>ToDo List</h1>
				<HeaderNavigation />
			</div>

			{isCategories 
				? <Button type="primary" onClick={() => setAddNewCategoryModal(true)}>Добавить категорию</Button>
				: <Button type="primary" onClick={() => setAddNewTaskModal(true)}>Добавить задачу</Button>
			}

			{addNewTaskModal && 
				<TaskCreateModal 
					active={addNewTaskModal} 
					onClose={() => setAddNewTaskModal(false)}
				/>}
			{addNewCategoryModal && 
				<CreateCategoryModal 
					active={addNewCategoryModal} 
					onClose={() => setAddNewCategoryModal(false)} 
				/>}
		</header>
	);
};