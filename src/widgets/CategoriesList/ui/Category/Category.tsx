import React, { useState } from "react";
import styles from "./Category.module.scss";
import RemoveIcon from "@shared/assets/icons/RemoveIcon";
import EditIcon from "@shared/assets/icons/EditIcon";
import { UpdateCategoryModal } from "@features/CategoryManipulationModal";
import { RemoveCategoryModal } from "@features/RemoveToDoManipulationModal";
import { ICategoryProps } from "../../types/ICategoryProps";

export const Category = React.memo(function CategoryComponent({ category }:ICategoryProps) {
	const [editModal, setEditModal] = useState(false);
	const [removeModal, setRemoveModal] = useState(false);

	return (
		<li className={styles.category}>
			<div className={styles.category__headerBlock}>
				<h3 className={styles.category__name}>{category.name}</h3>
				<div className={styles.category__description}>{category.description}</div>
			</div>
			<div className={styles.category__buttons}>
				<button
					className={styles.category__button}
					onClick={() => {
						setEditModal(true);
					}}
				>
					<EditIcon />
				</button>
				<button
					className={styles.category__button}
					onClick={() => {
						setRemoveModal(true);
					}}
				>
					<RemoveIcon />
				</button>
			</div>
			{editModal &&<UpdateCategoryModal 
				category={category} 
				active={editModal} 
				onClose={() => setEditModal(false)}
			/>}
			{removeModal && <RemoveCategoryModal 
				item={category} 
				type="category" 
				active={removeModal} 
				setActive={setRemoveModal} 
			/>}
		</li>
	);
}
);
			