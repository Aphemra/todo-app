import { useRef } from "react";
import { useUpdateActiveUser, useUpdateToken } from "../contexts/TokenContext";
import { login } from "../services/api";

export function Login({ nickname, setNickname, password, setPassword }) {
	const usernameInput = useRef();
	const passwordInput = useRef();

	const setToken = useUpdateToken();
	const setActiveUser = useUpdateActiveUser();

	const handleLogIn = async (event) => {
		event.preventDefault();
		if (!nickname || !password) return;
		await login({
			nickname,
			password,
		})
			.then((data) => setToken(data?.token || null))
			.finally(() => {
				setActiveUser(nickname || null);
				resetFields();
			});
	};

	function resetFields() {
		usernameInput.current.value = "";
		passwordInput.current.value = "";
		setNickname("");
		setPassword("");
	}

	return (
		<>
			<h2 className="title">Log in</h2>
			<form onSubmit={handleLogIn}>
				<div className="username">
					<label>Username: </label>
					<input ref={usernameInput} type="text" onChange={(event) => setNickname(event.target.value)} />
				</div>
				<div className="password">
					<label>Password: </label>
					<input ref={passwordInput} type="password" onChange={(event) => setPassword(event.target.value)} />
				</div>
				<div className="submit">
					<input type="submit" value="Log In" />
				</div>
			</form>
		</>
	);
}
