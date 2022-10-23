import useLocalState from "../hooks/useLocalState";
import { useState } from "react";
import { useToken, useUpdateToken } from "../contexts/TokenContext";
import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";

export function TabbedMenu() {
	const [activeUser, setActiveUser] = useLocalState("activeUser");

	const [nickname, setNickname] = useState();
	const [password, setPassword] = useState();
	const [activeTab, setActiveTab] = useState(1);

	const token = useToken();
	const setToken = useUpdateToken();

	const welcomeMessage = token ? (
		<h1>
			Logged in as <span style={{ textTransform: "capitalize" }}>{activeUser}</span>.
		</h1>
	) : (
		<h1>Logged out.</h1>
	);

	const handleLogOut = () => {
		setToken(null);
		setActiveUser(null);
	};

	return (
		<div>
			{welcomeMessage}
			<div onClick={() => setActiveTab(1)}>Log In</div>
			<div onClick={() => setActiveTab(2)}>Create Account</div>
			<div className={activeTab === 1 ? "" : "hide"}>
				<Login
					setActiveUser={setActiveUser}
					nickname={nickname}
					setNickname={setNickname}
					password={password}
					setPassword={setPassword}
				/>
			</div>
			<div className={activeTab === 2 ? "" : "hide"}>
				<CreateAccount
					setActiveUser={setActiveUser}
					nickname={nickname}
					setNickname={setNickname}
					password={password}
					setPassword={setPassword}
				/>
			</div>
			<div className={!token ? "hide" : ""}>
				<button type="button" onClick={handleLogOut}>
					Logout
				</button>
			</div>
		</div>
	);
}
