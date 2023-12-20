import React from "react";
import styles from "./CategoriesList.module.scss";
import { Loader } from "@shared/ui-kit";
import { Category } from "./Category";
import { useContextSelector } from "@shared/store";

export const CategoriesList: React.FC = () => {
	const categories = useContextSelector((store) => store.categories);

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
