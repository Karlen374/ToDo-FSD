import React, { FC } from "react";
import { IErrorAlertProps } from "../types/IErrorAlertProps";
import CloseIcon from "@shared/assets/icons/CloseIcon";
import styles from "./ErrorAlert.module.scss";

export const ErrorAlert:FC<IErrorAlertProps> = ({ errorMessage, active, setActive }) => {

	return (
		<div className={active ? styles.error : styles.hide}>
			<div className={styles.error__content}>
				<p>{errorMessage}</p>
				<button onClick={() => setActive(false)}>
					<CloseIcon />
				</button>
			</div>
		</div>
	);
};