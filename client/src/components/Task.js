import { useState } from "react";
import { useToken } from "../contexts/TokenContext";
import { checkOffTask, deleteTask } from "../services/api";

export function Task({ task, index, setTasks }) {
	const [complete, setComplete] = useState(task.done);
	const token = useToken();

	const handleStatusToggle = async () => {
		await checkOffTask({ task, token }).then((data) => setComplete(data.done));
	};

	const handleDeleteTask = async () => {
		await deleteTask({ task, token }).then((data) => setTasks((previous) => previous.filter((task) => task.id !== data.id)));
		// await deleteTask({ task, token }).then((data) => console.log(data));
	};

	return (
		<div>
			<h3 style={{ marginBottom: "0px", paddingBottom: "0px" }}>{`Task ${index + 1}`}</h3>
			<p style={{ marginTop: "0px", marginBottom: "0px", fontSize: "24px" }}>{task.content}</p>
			<p style={{ fontSize: "16px" }}>{complete ? "Task Complete" : "Task Incomplete"}</p>
			<button type="button" onClick={handleStatusToggle}>
				{complete ? "Uncomplete Task" : "Complete Task"}
			</button>
			<button type="button" onClick={handleDeleteTask}>
				Delete Task
			</button>
			<hr />
		</div>
	);
}
