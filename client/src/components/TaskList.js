import { useEffect, useState } from "react";
import { getTasks } from "../services/tasks";
import { Task } from "./Task";

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
						return <Task key={task.id} task={task} index={index} token={token} />;
				  })
				: ""}
		</h1>
	);
}
