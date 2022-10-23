import { TabbedMenu } from "./components/TabbedMenu";
import { TaskList } from "./components/TaskList";
import { UserProvider } from "./contexts/TokenContext";

export default function App() {
	return (
		<div className="app">
			<UserProvider>
				<TabbedMenu />
				<TaskList />
			</UserProvider>
		</div>
	);
}
