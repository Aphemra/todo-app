import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

export function makeRequest(url, options) {
	const config = {
		headers: {
			Authorization: `Bearer ${options.token}`,
		},
	};

	return api(url, config)
		.then((response) => response.data)
		.catch((error) => Promise.reject(error?.response?.data?.message ?? "Client-side Error."));
}
