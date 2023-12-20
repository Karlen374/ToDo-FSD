import { CATEGORIES, TASKS } from "@shared/constants/routes";

export interface INavigationItem {
  title: string,
  route: typeof CATEGORIES | typeof TASKS
}