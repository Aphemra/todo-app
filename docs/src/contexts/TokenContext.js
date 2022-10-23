import React, { useContext } from "react";
import useLocalState from "../hooks/useLocalState";

const TokenContext = React.createContext();
const TokenUpdateContext = React.createContext();

export function useToken() {
	return useContext(TokenContext);
}

export function useUpdateToken() {
	return useContext(TokenUpdateContext);
}

export function UserProvider({ children }) {
	const [token, setToken] = useLocalState("token");

	return (
		<TokenContext.Provider value={token}>
			<TokenUpdateContext.Provider value={setToken}>{children}</TokenUpdateContext.Provider>
		</TokenContext.Provider>
	);
}
