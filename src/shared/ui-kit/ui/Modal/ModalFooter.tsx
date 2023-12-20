import { Button } from "@shared/ui-kit";
import React from "react";
import styles from "./Modal.module.scss";
import { IModalFooterProps } from "../../types/IModal";

export const ModalFooter: React.FC<IModalFooterProps> = ({
	onClose,
	submitBtnText,
	onSubmit,
}) => {
	return (
		<div className={styles.footer}>
			<Button size="small" type="primary" onClick={onSubmit}>
				{submitBtnText}
			</Button>
			<Button
				onClick={onClose}
				size="small"
			>
        Закрыть
			</Button>
		</div>
	);
};
