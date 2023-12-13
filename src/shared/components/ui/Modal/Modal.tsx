import React from "react";
import styles from "./Modal.module.scss";
import { ModalHeader } from "./ModalHeader";
import { IModalProps } from "@shared/components/types/IModal";

export const Modal: React.FC<IModalProps> = ({
	active,
	onClose,
	title,
	children,
}) => {
	return (
		<div
			className={active ? [styles.modal, styles.modal__active].join(" ") : styles.modal}
			onClick={onClose}
		>
			<div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
				<ModalHeader
					onClose={onClose}
					title={title}
				/>
				{children}
			</div>
		</div>
	);
};