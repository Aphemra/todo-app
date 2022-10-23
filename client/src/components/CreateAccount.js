import { useRef } from "react";
import { useUpdateToken } from "../contexts/TokenContext";
import { createAccount } from "../services/api";

export function CreateAccount({ setActiveUser, nickname, setNickname, password, setPassword }) {
	const usernameInput = useRef();
	const passwordInput = useRef();

	const setToken = useUpdateToken();

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
		<div>
			<h2>Create New Account</h2>
			<form onSubmit={handleCreateAccount}>
				<div>
					<label>Username: </label>
					<input ref={usernameInput} type="text" onChange={(event) => setNickname(event.target.value)} />
				</div>
				<div>
					<label>Password: </label>
					<input ref={passwordInput} type="password" onChange={(event) => setPassword(event.target.value)} />
				</div>
				<div>
					<input type="submit" />
				</div>
			</form>
		</div>
	);
}
