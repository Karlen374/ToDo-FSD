import React from "react";
import ImportantIcon from "@shared/assets/icons/ImportantIcon";
import styles from "./Input.module.scss";
import { IInputProps } from "@shared/components/types/IInputTypes";

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
				className={error ? [styles.input, styles.input_error].join(" ") : styles.input}
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={onBlur}
				
			/>
			{label && required && <ImportantIcon />}
			{label && 
        <label 
        	className={error ? [styles.label, styles.label_error].join(" "): styles.label} 
        	htmlFor="input"
        >
        	{label}
        </label>
			}
			{error && errorMessage && <span className={styles.input__errorMessage}>{errorMessage}</span>}
		</div>
	);
};
