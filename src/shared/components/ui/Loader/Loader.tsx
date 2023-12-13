import React from "react";
import styles from "./Loader.module.scss";

export const Loader = () => {
	return (
		<div className={styles.loader}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};