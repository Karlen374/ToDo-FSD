import React from "react";
import { ITextAreaProps } from "../../types/ITextAreaProps";
import styles from "./TextArea.module.scss";

export const Textarea: React.FC<ITextAreaProps> = ({
	value,
	setValue,
	placeholder = "",
	label = "",
	error = false,
	errorMessage = "",
}) => {
	return (
		<div className={styles.wrapper}>
			<label 
				className={error ? [styles.label, styles.label__error].join(" ") : styles.label} 
				htmlFor="textarea">
				{label}
			</label>
			<textarea
				id="textarea"
				className={error ? [styles.textarea,  styles.textarea__error].join(" ") :  styles.textarea}
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			{error && errorMessage && <span className={styles.wrapper__errorMessage}>
				{errorMessage}
			</span>}
		</div>
	);
};                                                                                                                                    
