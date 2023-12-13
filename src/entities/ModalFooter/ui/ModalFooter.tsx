import { Button } from "@shared/components";
import { IModalFooterProps } from "../types/IModalFooter";
import React from "react";
import styles from "./ModalFooter.module.scss";


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
