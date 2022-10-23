import { TabbedMenu } from "./components/TabbedMenu";
import { TaskList } from "./components/TaskList";
import { UserProvider } from "./contexts/TokenContext";
import "./styles/App.css";

export default function App() {
	return (
		<UserProvider>
			<TabbedMenu />
			<TaskList />
		</UserProvider>
	);
}
