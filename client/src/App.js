import { Login } from "./components/Login";
import { TaskList } from "./components/TaskList";
import useLocalState from "./hooks/useLocalState";

function App() {
	const [token, setToken] = useLocalState("token");

	return (
		<>
			<Login token={token} setToken={setToken} />
			<TaskList token={token} />;
		</>
	);
}

export default App;
