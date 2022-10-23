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
		<h1 className="welcome-msg">
			Logged in as <span className="capitalize">{activeUser}</span>.
		</h1>
	) : (
		<></>
	);

	const handleLogOut = () => {
		setToken(null);
		setActiveUser(null);
	};

	return (
		<div>
			{welcomeMessage}
			<div className={token ? "tab-group hide" : "tab-group"}>
				<div className="tab-nav">
					<div className={activeTab === 1 ? "tab one active" : "tab one"} onClick={() => setActiveTab(1)}>
						Log In
					</div>
					<div className={activeTab === 2 ? "tab two active" : "tab two"} onClick={() => setActiveTab(2)}>
						Create Account
					</div>
				</div>
				<div className={activeTab === 1 ? "tab-content" : "tab-content hide"}>
					<Login
						setActiveUser={setActiveUser}
						nickname={nickname}
						setNickname={setNickname}
						password={password}
						setPassword={setPassword}
					/>
				</div>
				<div className={activeTab === 2 ? "tab-content" : "tab-content hide"}>
					<CreateAccount
						setActiveUser={setActiveUser}
						nickname={nickname}
						setNickname={setNickname}
						password={password}
						setPassword={setPassword}
					/>
				</div>
			</div>
			<div className={!token ? "hide" : ""}>
				<button type="button" onClick={handleLogOut}>
					Logout
				</button>
			</div>
		</div>
	);
}
