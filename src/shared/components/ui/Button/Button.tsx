import React from "react";
import styles from "./Button.module.scss";
import { IButtonProps } from "@shared/components/types/IButtonTypes";

export const Button: React.FC<IButtonProps> = ({
	type = "secondary",
	children,
	onClick,
	size = "default"
}) => {
	const btnStyle = [styles.button];
	if (type === "primary") {
		btnStyle.push(styles.button__primary);
	}
	if (type === "secondary") {
		btnStyle.push(styles.button__secondary);
	}
	if (size === "default") {
		btnStyle.push(styles.button__default);
	}
	if (size === "small") {
		btnStyle.push(styles.button__small);
	}

	return (
		<button className={btnStyle.join(" ")} onClick={onClick}>
			{children}
		</button>
	);
};
