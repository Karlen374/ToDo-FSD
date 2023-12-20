import { Input, Select, Textarea, Modal } from "@shared/ui-kit";
import React, { useState, FC, useEffect, useMemo } from "react";
import { ITaskManipulationProps } from "../types/ITaskManipulation";
import styles from "./TaskManipulationModal.module.scss";
import { getUniqNumberId } from "@shared/helpers/getUniqNumberId";
import { IError } from "@shared/types/IError";
import { checkFormErrors } from "../helpers/checkFormErrors";
import { useContextSelector, useUpdate } from "@shared/store";
import useToDoServices from "@shared/api/useToDoServices";

export const TaskManipulationModal:FC<ITaskManipulationProps> = ({ task = null, active, onClose }) => {
	const { updateTask, createTask } = useToDoServices();
	const [description, setDescription] = useState(task?.description || "");
	const [descriptionError, setDescriptionError] = useState<IError>({status: false, errorMessage: ""});
	const [name, setName] = useState(task?.name || "");
	const [nameError, setNameError] = useState<IError>({status: false, errorMessage: ""});
	const [nameBlur, setNameBlur] = useState(false);
	const [selectedId, setSelectedId] = useState(task?.categoryId || null);

	const tasks = useContextSelector((store) => store.tasks);
	const categories = useContextSelector((store) => store.categories);
	const updateStore = useUpdate();

	if (!categories) return null;

	useEffect(() => {// для реактивной проверки валидности формы 
		isFormValid();
	}, [name, description, nameBlur]);

	//проверка валидности формы
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

	const onSubmit = () => {// отправка формы для создания или редактирования задач
		if (isFormValid()) {
			if (task) {
				updateTask({...task, categoryId: selectedId, description, name })
					.then((updatedTask) => {
						const changedElementIndex = tasks.findIndex((task) => task.id === updatedTask.id);
						const updatedTasks = [...tasks];
						updatedTasks.splice(changedElementIndex,1,updatedTask);
						updateStore({tasks: updatedTasks});
					}).catch(() => {
						updateStore({ active: true, errorMessage: `Ошибка при редактировании задачи "${name}"`});
					});
			} else {
				createTask({ name, description, id: getUniqNumberId(), categoryId: selectedId })
					.then((newTask) => {
						updateStore({tasks: [...tasks, newTask]});
					}).catch(() => {
						updateStore({ active: true, errorMessage: `Ошибка при добавлении новой задачи "${name}"`});
					});
			}
			onClose();
		} else {
			setNameBlur(true);
		}
	};

	

	const submitBtnText = useMemo(() => task && task.id > 0 ? "Сохранить": "Создать", [task]);
	const title = useMemo(() => task && task.id > 0  ? "Редактирование задачи" : "Создание задачи", [task]);

	return (
		<Modal 
			submitBtnText={submitBtnText}
			onSubmit={onSubmit} 
			title={title} 
			active={active} 
			onClose={onClose} 
		>
			<div className={styles.modal__categoryBlock}>
				<div className={styles.modal__items}>
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
				<div className={styles.modal__items}>
					<Select options={categories} selectedId={selectedId} setSelectedId={setSelectedId} />
				</div>
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
