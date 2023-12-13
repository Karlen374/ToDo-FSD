import React,{ useState } from "react";
import styles from "./Select.module.scss";
import { ISelectBase, ISelectProps } from "@shared/components/types/ISelectTypes";

export const Select = <T extends ISelectBase>({
	selectedId,
	setSelectedId,
	options
}: ISelectProps<T>) => {
	const [isActive, setIsActive] = useState(false);

	const labelStyles = isActive ? [styles.select__label,styles.select__label_active] : [styles.select__label];
	const selectedButtonStyles = [styles.select__btn];
	if (!selectedId) {
		selectedButtonStyles.push(styles.select__placeholder);
	} 
	if (isActive) {
		selectedButtonStyles.push(styles.select__btn_active);
	}

	const buttonText = options.find((option) => option.id === selectedId)?.name || "Выберите категорию";
	return (
		<div className={styles.select} onClick={() => setIsActive(!isActive)}>
			<span className={labelStyles.join(" ")}>Категория</span>
			<div className={selectedButtonStyles.join(" ")}>
        	{buttonText.length > 25 ? buttonText.slice(0, 20) + "..." : buttonText}
			</div>
			{isActive && (
				<div className={styles.select__content}>
					{options.map((option) => (
						<div
							className={option.id === selectedId ? [styles.select__item,styles.select__item_active].join(" ") : styles.select__item}
							onClick={() => {
								setSelectedId(option.id);
								setIsActive(false);
							}}
							key={option.id}
						>
							{option.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
