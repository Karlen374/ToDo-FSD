import { CATEGORIES, TASKS } from "@shared/constants/routes";
import { INavigationItem } from "../types/INavigation";

const headerNavigations: INavigationItem[] = [
	{
		title: "Задачи",
		route: TASKS
	},
	{
		title: "Категории",
		route: CATEGORIES
	},
];

export { headerNavigations };