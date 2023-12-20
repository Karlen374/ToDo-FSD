import React from "react";
import { NavLink } from "react-router-dom";
import { headerNavigations } from "../../../shared/constants/navigaationRoutes";
import styles from "./Header.module.scss";

export const HeaderNavigation = () => {
	return (
		<ul className={styles.headerList}>
			{
				headerNavigations.map((headerItem) => {
					return (
						<li key={headerItem.title} className={styles.headerList__item}>
							<NavLink 
								style={({isActive})=>({ color: isActive ? "#8fb6ff" : "inherit", borderBottom: isActive ? "2px solid #8fb6ff" : "2px solid #dbe2ef" })} 
								to={headerItem.route}>
								{headerItem.title}
							</NavLink>
						</li> 
					);
				})
			}
		</ul>
	);
};