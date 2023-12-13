import { ToDoContext } from "@features/ToDoProvider";
import React, { useContext } from "react";
import styles from "./CategoriesList.module.scss";
import { Loader } from "@shared/components";
import { Category } from "../Category/Category";

export const CategoriesList: React.FC = () => {
	const categories = useContext(ToDoContext).categories;

	if (!categories) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}
	return (
		<ul className={styles.categories}> 
			{categories.map((category) => (
				<Category key={category.id} category={category}/>
			))} 
		</ul>
	);
};
