import React, { useMemo } from "react";
import clsx from "clsx";
import { ISelectBase, ISelectItemProps } from "../../types/ISelectTypes";
import styles from "./Select.module.scss";

export const SelectItem = <T extends ISelectBase>({option,setIsActive, setSelectedId, selectedId }: ISelectItemProps<T>) => {

	const isActive = useMemo(() => { return option.id === selectedId; }, [option, selectedId]);

	return (
		<div
			className={
				clsx(styles.select__item, 
					{ 
						[styles.select__item_active]: isActive
					})
			}
			onClick={() => {
				setSelectedId(option.id);
				setIsActive(false);
			}}
			key={option.id}
		>
			{option.name}
		</div>
	);
};