import axios from "axios";
import { useState } from "react";

// async function login(credentials) {
// 	return fetch(`${process.env.REACT_APP_SERVER_URL}/account/login`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(credentials),
// 	}).then((data) => data.json());
// }

async function login(credentials) {
	return axios
		.post(`${process.env.REACT_APP_SERVER_URL}/account/login`, credentials, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((response) => response.data);
}

export function Login({ token, setToken }) {
	const [nickname, setNickname] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const token = await login({
			nickname,
			password,
		});
		setToken(token?.token || null);
	};

	return (
		<div>
			<h1>{token ? `Loggied in as ${nickname}.` : "Logged out."}</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username: </label>
					<input type="text" onChange={(event) => setNickname(event.target.value)} />
				</div>
				<div>
					<label>Password: </label>
					<input type="password" onChange={(event) => setPassword(event.target.value)} />
				</div>
				<div>
					<input type="submit" />
				</div>
			</form>
			<button type="button" onClick={() => setToken(null)}>
				Logout
			</button>
		</div>
	);
}
