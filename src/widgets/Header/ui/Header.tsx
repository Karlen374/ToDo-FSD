import React, { useState } from "react";
import styles from "./Header.module.scss";
import { CATEGORIES } from "@shared/constants/routes";
import { useLocation } from "react-router-dom";
import { Button } from "@shared/components";
import { TaskManipulationModal } from "@features/TaskManipulationModal";
import { CreateCategoryModal } from "@features/CategoryManipulationModal";
import { HeaderNavigation } from "./HeaderNavigation";

export const Header = () => {
	const { pathname } = useLocation();
	const isCategories = pathname.includes(CATEGORIES);
	const [addNewTaskModal, setAddNewTaskModal] = useState(false);
	const [addNewCaategoryModal, setAddNewCategoryModal] = useState(false);

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

			{addNewTaskModal && <TaskManipulationModal active={addNewTaskModal} onClose={() => setAddNewTaskModal(false)} />}
			{addNewCaategoryModal && <CreateCategoryModal active={addNewCaategoryModal} onClose={() => setAddNewCategoryModal(false)} />}
		</header>
	);
};