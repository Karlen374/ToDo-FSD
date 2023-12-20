import React, { FC, useMemo } from "react";
import CloseIcon from "@shared/assets/icons/CloseIcon";
import styles from "./Alert.module.scss";
import { IAlertProps } from "../../types/IAlert";
import clsx from "clsx";

export const Alert:FC<IAlertProps> = ({ message, active, position, onClose }) => {

	return (
		<div 
			className={useMemo(() => {
				return clsx({
					[styles.alert]: active,
					[styles.hide]: !active,
					[styles.alert__topRight]: position === "top-right",
					[styles.alert__topLeft]: position === "top-left",
					[styles.alert__bottomLeft]: position === "bottom-left",
					[styles.alert__bottomRight]: position === "bottom-right"
				});
			}, [active, position])
			}
		>
			<div className={styles.alert__content}>
				<p>{message}</p>
				<button onClick={onClose}>
					<CloseIcon />
				</button>
			</div>
		</div>
	);
};