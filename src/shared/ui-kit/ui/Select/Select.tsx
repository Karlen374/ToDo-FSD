import React,{ useState, useMemo } from "react";
import styles from "./Select.module.scss";
import { ISelectBase, ISelectProps } from "../../types/ISelectTypes";
import clsx from "clsx";
import { SelectItem } from "./SelectItem";

export const Select = <T extends ISelectBase>({
	selectedId,
	setSelectedId,
	options
}: ISelectProps<T>) => {
	const [isActive, setIsActive] = useState(false);

	const buttonText = useMemo(() => options.find((option) => option.id === selectedId)?.name || "Выберите категорию", [selectedId]);

	return (
		<div className={styles.select} onClick={() => setIsActive(!isActive)}>
			<span 
				className={useMemo(() => {
					return (
						clsx(styles.select__label, 
							{
								[styles.select__label_active]: isActive
							})
					);
				}, [])	
				}
			>
				Категория
			</span>
			<div 
				className={
					useMemo(() => {
						return clsx(styles.select__btn, 
							{
								[styles.select__placeholder]: !selectedId,
						 		[styles.select__btn_active]: isActive 
							});
					}, [selectedId, isActive])
				}
			>
        	{buttonText.length > 25 ? buttonText.slice(0, 20) + "..." : buttonText}
			</div>
			{isActive && (
				<div className={styles.select__content}>
					{options.map((option) => (
						<SelectItem 
							key={option.id}
							option={option} 
							selectedId={selectedId} 
							setIsActive={setIsActive} 
							setSelectedId={setSelectedId}
						/>
					))}
				</div>
			)}
		</div>
	);
};
