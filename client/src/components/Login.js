import { useState } from "react";
import { useToken, useUpdateToken } from "../contexts/TokenContext";
import useLocalState from "../hooks/useLocalState";
import { login } from "../services/api";

export function Login() {
	const [nickname, setNickname] = useLocalState("nickname");
	const [password, setPassword] = useState();
	const token = useToken();
	const setToken = useUpdateToken();

	const handleLogIn = async (event) => {
		event.preventDefault();
		const token = await login({
			nickname,
			password,
		});
		setToken(token?.token || null);
	};

	const handleLogOut = () => {
		setToken(null);
		setNickname(null);
	};

	return (
		<div>
			<h1>{token ? `Logged in as ${nickname}.` : "Logged out."}</h1>
			<form onSubmit={handleLogIn}>
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
			<button type="button" onClick={handleLogOut}>
				Logout
			</button>
		</div>
	);
}
