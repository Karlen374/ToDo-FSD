import { ToDoContext } from "@features/ToDoProvider";
import { Input, Select, Textarea } from "@shared/components";
import React, { useState, useContext, FC, useEffect } from "react";
import { ITaskManipulationProps } from "../types/ITaskManipulation";
import { Modal } from "@shared/components/ui/Modal/Modal";
import styles from "./TaskManipulationModal.module.scss";
import { updateTask } from "../api/updateTask";
import { createTask } from "../api/createTask";
import { getUniqNumberId } from "@shared/helpers/getUniqNumberId";
import { IError } from "@shared/types/IError";
import { checkFormErrors } from "../helpers/checkFormErrors";
import { ModalFooter } from "@entities/ModalFooter";
import { ErrorContext } from "@features/ErrorBoundary";

export const TaskManipulationModal:FC<ITaskManipulationProps> = ({ task = null, active, onClose }) => {

	const [description, setDescription] = useState(task?.description || "");
	const [descriptionError, setDescriptionError] = useState<IError>({status: false, errorMessage: ""});
	const [name, setName] = useState(task?.name || "");
	const [nameError, setNameError] = useState<IError>({status: false, errorMessage: ""});
	const [nameBlur, setNameBlur] = useState(false);
	const [selectedId, setSelectedId] = useState(task?.categoryId || null);
	const errorContext = useContext(ErrorContext);
	const categories = useContext(ToDoContext).categories;
	const tasks = useContext(ToDoContext).tasks;
	const setTasks = useContext(ToDoContext).setTasks;

	useEffect(() => {
		if(task) {
			setDescription(task.description);
			setName(task.name);
			setSelectedId(task.categoryId || null);
		}
	}, [active]);

	useEffect(() => {
		isFormValid();
	}, [name, description, nameBlur]);

	const onCloseModal = () => {
		if (task) {
			setName(task.name);
			setDescription(task.description);
			setSelectedId(task.categoryId || null);
		} else {	
			setName("");
			setDescription("");
			setSelectedId(null);
		}
		setNameBlur(false);
		setNameError({status: false, errorMessage: ""});
		onClose();
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

	const onSubmit = () => {
		if (isFormValid()) {
			if (task) {
				updateTask({...task, categoryId: selectedId, description, name })
					.then((updatedTask) => {
						setTasks(tasks.map((item) => item.id !== updatedTask.id ? item : updatedTask));
					}).catch(() => {
						errorContext.setActive(true);
						errorContext.setErrorMessage(`Ошибка при редактировании задачи "${name}"`);
					});
			} else {
				createTask({ name, description, id: getUniqNumberId(), categoryId: selectedId })
					.then((newTask) => {
						setTasks([...tasks, newTask]);
					}).catch(() => {
						errorContext.setActive(true);
						errorContext.setErrorMessage(`Ошибка при добавлении новой задачи "${name}"`);
					});
			}
			onCloseModal();
		} else {
			setNameBlur(true);
		}
	};

	if (!categories) return null;
	return (
		<Modal  title={task ? "Редактирование задачи" : "Создание задачи"} active={active} onClose={onCloseModal} >
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
			<ModalFooter
				onClose={onCloseModal}
				submitBtnText={task ? "Сохранить": "Создать"}
				onSubmit={onSubmit}
			/>
		</Modal>
	);
};
