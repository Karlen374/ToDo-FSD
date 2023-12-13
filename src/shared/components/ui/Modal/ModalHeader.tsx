import React from "react";
import CloseIcon from "@shared/assets/icons/CloseIcon";
import { IModalHeaderProps } from "@shared/components/types/IModal";
import styles from "./Modal.module.scss";

export const ModalHeader: React.FC<IModalHeaderProps> = ({
	onClose,
	title,
}) => {
	return (
		<header className={styles.modal__header}>
			<h4 className={styles.modal__title}>{title}</h4>
			<button
				className={styles.modal__headerBtn}
				onClick={onClose}
			>
        
				<CloseIcon />
			</button>
		</header>
	);
};