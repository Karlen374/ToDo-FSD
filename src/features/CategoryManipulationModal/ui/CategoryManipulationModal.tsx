import { ToDoContext } from "@features/ToDoProvider";
import { Input, Textarea } from "@shared/components";
import React, { useState, useContext, FC, useEffect } from "react";
import { Modal } from "@shared/components/ui/Modal/Modal";
import { ICategoryManipulationProps } from "../types/ICategoryManipulationProps";
import { updateCategory } from "../api/updateCategory";
import { createCategory } from "../api/createCategory";
import { getUniqNumberId } from "@shared/helpers/getUniqNumberId";
import { IError } from "@shared/types/IError";
import { ModalFooter } from "@entities/ModalFooter";
import { ErrorContext } from "@features/ErrorBoundary";
import { checkFormErrors } from "../helpers/checkFormErrors";

export const CategoryManipulationModal:FC<ICategoryManipulationProps> = ({ category = null, active, onClose }) => {
	const [description, setDescription] = useState(category?.description || "");
	const [descriptionError, setDescriptionError] = useState<IError>({status: false, errorMessage: ""});
	const [name, setName] = useState(category?.name || "");
	const [nameError, setNameError] = useState<IError>({status: false, errorMessage: ""});
	const [nameBlur, setNameBlur] = useState(false);
	const categories = useContext(ToDoContext).categories;
	const setCategories = useContext(ToDoContext).setCategories;
	const errorContext = useContext(ErrorContext);

	useEffect(() => {
		isFormValid();
	}, [name,description,nameBlur]);

	useEffect(() => {
		if(category) {
			setDescription(category.description);
			setName(category.name);
		}
	}, [active]);

	const onCloseModal = () => {
		if (category) {
			setName(category.name);
			setDescription(category.description);
		} else {	
			setName("");
			setDescription("");
		}
		setNameBlur(false);
		setNameError({status: false, errorMessage: ""});
		onClose();
	};

	const onSubmit = () => {
		if (isFormValid()) {
			if (category) {
				updateCategory({...category, description, name })
					.then((updatedCategory) => {
						setCategories(categories.map((item) => item.id !== updatedCategory.id ? item : updatedCategory));
					}).catch(() => {
						errorContext.setActive(true);
						errorContext.setErrorMessage("Ошибка при редактировании категории");
					});
				
			} else {
				createCategory({ name, description, id: getUniqNumberId(),})
					.then((newCategory) => {
						setCategories([...categories, newCategory]);
					}).catch(() => {
						errorContext.setActive(true);
						errorContext.setErrorMessage("Ошибка при создании категории");
					});
			}
			onCloseModal();
		} else {
			setNameBlur(true);
		}
	};

	const isFormValid = () => {
		const errorsArray = checkFormErrors({name, description});
		if (errorsArray) {
			errorsArray.forEach((error) => {
				if (error.path === "name" && nameBlur) {
					setNameError({status: true, errorMessage: error.message});
				}
				if (error.path === "description") {
					setDescriptionError({status: true, errorMessage: error.message});
				}
			});
			return false;
		} else {
			setDescriptionError({status: false, errorMessage: ""});
			setNameError({status: false, errorMessage: ""});
			return true;
		}
	};
	
	if (!categories) return null;
	return (
		<Modal  title={category ? "Редактирование категории" : "Создание категории"} active={active} onClose={onCloseModal} >
			<div>
				<Input 
					error={nameError.status} 
					errorMessage={nameError.errorMessage} 
					label="Имя" 
					required 
					value={name} 
					setValue={setName}
					onBlur={() => setNameBlur(true)}
				/>
			</div>
			<Textarea 
				value={description} 
				setValue={setDescription}
				label="Описание"
				error={descriptionError.status}
				errorMessage={descriptionError.errorMessage}
			/>
			<ModalFooter
				onClose={onCloseModal}
				submitBtnText={category ? "Сохранить": "Создать"}
				onSubmit={onSubmit}
			/>
		</Modal>
	);
};