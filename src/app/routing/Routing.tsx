import { Route, Routes } from "react-router-dom";
import TasksPage from "@pages/TasksPage";
import CategoriesPage from "@pages/CategoriesPage";
import { CATEGORIES, TASKS } from "@shared/constants/routes";
import React from "react";
import NotFoundPage from "@pages/NotFoundPage";

const Routing = () => {
	return(
		<Routes>
			<Route path={TASKS} element={<TasksPage />} />
			<Route path={CATEGORIES} element={<CategoriesPage />} />
			<Route path="*" element = {<NotFoundPage />} />
		</Routes>
	);
};
export default Routing;