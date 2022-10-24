import React, { useContext } from "react";
import useLocalState from "../hooks/useLocalState";

const TokenContext = React.createContext();
const TokenUpdateContext = React.createContext();
const ActiveUserContext = React.createContext();
const ActiveUserUpdateContext = React.createContext();

export function useToken() {
	return useContext(TokenContext);
}

export function useUpdateToken() {
	return useContext(TokenUpdateContext);
}

export function useActiveUser() {
	return useContext(ActiveUserContext);
}

export function useUpdateActiveUser() {
	return useContext(ActiveUserUpdateContext);
}

export function UserProvider({ children }) {
	const [token, setToken] = useLocalState("token");
	const [activeUser, setActiveUser] = useLocalState("activeUser");

	return (
		<TokenContext.Provider value={token}>
			<TokenUpdateContext.Provider value={setToken}>
				<ActiveUserContext.Provider value={activeUser}>
					<ActiveUserUpdateContext.Provider value={setActiveUser}>{children}</ActiveUserUpdateContext.Provider>
				</ActiveUserContext.Provider>
			</TokenUpdateContext.Provider>
		</TokenContext.Provider>
	);
}
