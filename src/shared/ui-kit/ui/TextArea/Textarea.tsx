import React, { useMemo } from "react";
import { ITextAreaProps } from "../../types/ITextAreaProps";
import styles from "./TextArea.module.scss";
import clsx from "clsx";

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
				className={useMemo(() => {
					return clsx(styles.label, 
						{
							[styles.label__error]: error
						});
				}, [error])
				}
				htmlFor="textarea">
				{label}
			</label>
			<textarea
				id="textarea"
				className={useMemo(() => {
					return clsx(styles.textarea, 
						{
							[styles.textarea__error]: error
						});
				}, [error])}
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
