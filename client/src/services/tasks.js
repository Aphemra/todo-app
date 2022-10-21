import { makeRequest } from "./makeRequest";

export function getTasks(token) {
	return makeRequest("/tasks", { token });
}
