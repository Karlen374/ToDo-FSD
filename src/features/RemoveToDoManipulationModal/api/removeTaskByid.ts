import { hostAxios } from "@shared/api/config";

export const removeTaskById = async (id: number) => {
	const res = await hostAxios.get(`RemoveTask/${id}`);
	return res.status === 200 ? true : false;
};
