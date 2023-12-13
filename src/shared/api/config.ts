import axios from "axios";

export const hostAxios = axios.create({
	baseURL: "http://localhost:8089/api/ToDoList/",
});

