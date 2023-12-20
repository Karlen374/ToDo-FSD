import React from "react";
import styles from "./Modal.module.scss";
import { ModalHeader } from "./ModalHeader";
import { IModalProps } from "../../types/IModal";
import clsx from "clsx";
import { ModalFooter } from "./ModalFooter";

export const Modal: React.FC<IModalProps> = ({
	active,
	onClose,
	title,
	children,
	submitBtnText,
	onSubmit
}) => {
	return (
		<div
			className={clsx(styles.modal, { [styles.modal__active]: active })}
			onClick={onClose}
		>
			<div 
				className={styles.modal__content} 
				onClick={(e) => e.stopPropagation()}
			>
				<ModalHeader
					onClose={onClose}
					title={title}
				/>
				{children}
				<ModalFooter onClose={onClose} submitBtnText={submitBtnText} onSubmit={onSubmit} />
			</div>
		</div>
	);
};