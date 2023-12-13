import { hostAxios } from "@shared/api/config";

export const removeCategoryById = async (id: number) => {
	const res = await hostAxios.get(`RemoveCategory/${id}`);
	return res.status === 200 ? true : false;
};
