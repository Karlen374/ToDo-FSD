import { Input, Textarea, Modal } from "@shared/ui-kit";
import React, { useState, FC, useEffect, useMemo } from "react";
import { ICategoryManipulationProps } from "../types/ICategoryManipulationProps";
import { getUniqNumberId } from "@shared/helpers/getUniqNumberId";
import { IError } from "@shared/types/IError";
import { checkFormErrors } from "../helpers/checkFormErrors";
import { useContextSelector, useUpdate } from "@shared/store";
import useToDoServices from "@shared/api/useToDoServices";

export const CategoryManipulationModal:FC<ICategoryManipulationProps> = ({ category = null, active, onClose }) => {
	const { updateCategory, createCategory } = useToDoServices();
	const [description, setDescription] = useState(category?.description || "");
	const [descriptionError, setDescriptionError] = useState<IError>({status: false, errorMessage: ""});
	const [name, setName] = useState(category?.name || "");
	const [nameError, setNameError] = useState<IError>({status: false, errorMessage: ""});
	const [nameBlur, setNameBlur] = useState(false);
	const categories = useContextSelector((store) => store.categories);
	const updateStore = useUpdate();

	useEffect(() => {// для реактивной проверки валидности формы 
		isFormValid();
	}, [name,description,nameBlur]);


	// обновление или добавление категории 
	const onSubmit = () => {
		if (isFormValid()) {//если валидно
			if (category) {
				updateCategory({...category, description, name })
					.then((updatedCategory) => {	
						const changedCategoryIndex = categories.findIndex((item) => item.id === updatedCategory.id);
						const updatedCategories = [...categories];
						updatedCategories.splice(changedCategoryIndex,1,updatedCategory);
						updateStore({
							categories: updatedCategories
						});
					}).catch(() => {
						updateStore({ active: true, errorMessage:"Ошибка при редактировании категории" });
					});
				
			} else {
				createCategory({ name, description, id: getUniqNumberId()})
					.then((newCategory) => {
						updateStore({categories: [...categories, newCategory]});
					}).catch(() => {
						updateStore({ active: true, errorMessage:"Ошибка при редактировании категории" });
					});
			}
			onClose();
		} else {
			setNameBlur(true);
		}
	};

	/* 
		Проверка валидности формы  
	**/
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
	
	const submitBtntext = useMemo(() => {return category && category.id > 0 ? "Сохранить": "Создать"; }, [category]);
	const title = useMemo(() => {return category && category.id > 0  ? "Редактирование категории" : "Создание категории"; }, [category]);

	return (
		<Modal  
			submitBtnText={submitBtntext}
			onSubmit={onSubmit}
			title={title} 
			active={active}
			onClose={onClose} 
		>
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
		</Modal>
	);
};