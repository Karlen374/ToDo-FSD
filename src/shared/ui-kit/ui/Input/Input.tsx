import React from "react";
import ImportantIcon from "@shared/assets/icons/ImportantIcon";
import styles from "./Input.module.scss";
import { IInputProps } from "../../types/IInputTypes";
import clsx from "clsx";

export const Input: React.FC<IInputProps> = ({
	value,
	setValue,
	placeholder = "",
	label = "",
	required = false,
	error = false,
	errorMessage = "",
	onBlur
}) => {

	return (
		<div
			className={styles.inputWrapper}
		>
			<input
				id="input"
				className={React.useMemo(() => clsx(styles.input, {[styles.input_error]: error }), [])}
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={onBlur}
				
			/>
			{label && required && <ImportantIcon />}
			{label && 
        <label 
        	className={React.useMemo(() => clsx(styles.label, {[styles.label_error]: error}), [])} 
        	htmlFor="input"
        >
        	{label}
        </label>
			}
			{error && errorMessage && <span className={styles.input__errorMessage}>{errorMessage}</span>}
		</div>
	);
};
