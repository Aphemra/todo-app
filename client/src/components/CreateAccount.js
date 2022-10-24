import { useRef } from "react";
import { useUpdateActiveUser, useUpdateToken } from "../contexts/TokenContext";
import { createAccount } from "../services/api";

export function CreateAccount({ nickname, setNickname, password, setPassword }) {
	const usernameInput = useRef();
	const passwordInput = useRef();

	const setToken = useUpdateToken();
	const setActiveUser = useUpdateActiveUser();

	const handleCreateAccount = async (event) => {
		event.preventDefault();
		if (!nickname || !password) return;
		await createAccount({
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
			<h2 className="title">Create New Account</h2>
			<form onSubmit={handleCreateAccount}>
				<div className="label username">
					<label>Username: </label>
					<input ref={usernameInput} type="text" onChange={(event) => setNickname(event.target.value)} />
				</div>
				<div className="label password">
					<label>Password: </label>
					<input ref={passwordInput} type="password" onChange={(event) => setPassword(event.target.value)} />
				</div>
				<div className="submit">
					<input type="submit" value="Create" />
				</div>
			</form>
		</>
	);
}
