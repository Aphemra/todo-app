import { useActiveUser, useToken, useUpdateActiveUser, useUpdateToken } from "../contexts/TokenContext";

export function Navbar() {
	const token = useToken();
	const setToken = useUpdateToken();
	const activeUser = useActiveUser();
	const setActiveUser = useUpdateActiveUser();

	const welcomeMessage = token ? (
		<h1 className="welcome-msg">
			Logged in as <span className="active-user capitalize">{activeUser}</span>.
		</h1>
	) : (
		<></>
	);

	const handleLogOut = () => {
		setToken(null);
		setActiveUser(null);
	};

	return (
		<div className={!token ? "hide" : "navbar"}>
			<div className="left">{welcomeMessage}</div>
			<div className="right">
				<button type="button" onClick={handleLogOut}>
					Logout
				</button>
			</div>
		</div>
	);
}
