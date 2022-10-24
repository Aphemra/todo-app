import { useState } from "react";
import { useToken } from "../contexts/TokenContext";
import { checkOffTask, deleteTask } from "../services/api";

export function Task({ task, setTasks }) {
	const [complete, setComplete] = useState(task.done);
	const token = useToken();

	const handleStatusToggle = async () => {
		await checkOffTask({ task, token }).then((data) => {
			setComplete(data.done);
		});
	};

	const handleDeleteTask = async () => {
		await deleteTask({ task, token }).then((data) => {
			setTasks((previous) => previous.filter((task) => task.id !== data.id));
		});
	};

	return (
		<div className="task">
			<div className={complete ? "status done" : "status not-done"}>{complete ? "Done" : "Not Done"}</div>
			<div className="content">{task.content}</div>
			<div className="buttons">
				<button type="button" onClick={handleStatusToggle}>
					Toggle Done
				</button>
				<button type="button" onClick={handleDeleteTask}>
					Delete Task
				</button>
			</div>
		</div>
	);
}
