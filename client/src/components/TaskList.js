import { useEffect, useState } from "react";
import { getTasks } from "../services/tasks";

export function TaskList({ token }) {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		if (!token) return;
		getTasks(token).then(setTasks);
	}, [token]);

	return (
		<h1>
			{tasks.length > 0
				? tasks.map((task, index) => {
						return (
							<div key={task.id}>
								<h3 style={{ marginBottom: "0px", paddingBottom: "0px" }}>{`Task ${index + 1}`}</h3>
								<p style={{ marginTop: "0px", marginBottom: "0px", fontSize: "24px" }}>{task.content}</p>
								<p style={{ fontSize: "16px" }}>{task.done ? "Task Complete" : "Task Incomplete"}</p>
								<hr />
							</div>
						);
				  })
				: ""}
		</h1>
	);
}
