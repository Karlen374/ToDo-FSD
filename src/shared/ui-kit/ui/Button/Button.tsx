import React, { useMemo } from "react";
import styles from "./Button.module.scss";
import { IButtonProps } from "../../types/IButtonTypes";
import clsx from "clsx";

export const Button: React.FC<IButtonProps> = ({
	type = "secondary",
	children,
	onClick,
	size = "default"
}) => {

	return (
		<button 
			className={useMemo(() => {
				return clsx(styles.button, {
					[styles.button__primary]: type === "primary",
					[styles.button__secondary]: type === "secondary",
					[styles.button__default]: size === "default",
					[styles.button__small]: size === "small",
				});
			}, [size, type])
			}
				
			onClick={onClick}
		>
			{children}
		</button>
	);
};
