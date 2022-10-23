import { Login } from "./components/Login";
import { TaskList } from "./components/TaskList";
import { UserProvider } from "./contexts/TokenContext";

export default function App() {
	return (
		<UserProvider>
			<Login />
			<TaskList />;
		</UserProvider>
	);
}
