import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// POSTs

export async function login(credentials) {
	return api
		.post("/account/login", credentials)
		.then((response) => response.data)
		.catch((error) => console.log(error));
}

export async function createAccount(credentials) {
	return api
		.post("/account/create", credentials)
		.then((response) => response.data)
		.catch((error) => console.log(error));
}

export async function createTask(requestBody) {
	return api
		.post(
			"/tasks",
			{ content: requestBody.content },
			{
				headers: {
					Authorization: `Bearer ${requestBody.token}`,
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => console.log(error));
}

// GETs

export async function getTasks(requestBody) {
	return api
		.get("/tasks", {
			headers: {
				Authorization: `Bearer ${requestBody.token}`,
			},
		})
		.then((response) => response.data)
		.catch((error) => console.log(error));
}

// PUTs

export async function checkOffTask(requestBody) {
	return api
		.put(
			"/tasks",
			{ task: requestBody.task.id },
			{
				headers: {
					Authorization: `Bearer ${requestBody.token}`,
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => console.log(error));
}

// DELETEs

export async function deleteTask(requestBody) {
	return api({
		method: "delete",
		url: "/tasks",
		data: { task: requestBody.task.id },
		headers: { Authorization: `Bearer ${requestBody.token}` },
	})
		.then((response) => response.data)
		.catch((error) => console.log(error));
}
