import { useEffect, useState } from "react";
import { useToken } from "../contexts/TokenContext";
import { createTask, getTasks } from "../services/api";
import { Task } from "./Task";

export function TaskList() {
	const [tasks, setTasks] = useState([]);
	const token = useToken();
	const [content, setContent] = useState("");

	useEffect(() => {
		if (!token) return;
		getTasks({ token }).then(setTasks);
	}, [token]);

	const handleAddTask = async (event) => {
		event.preventDefault();
		if (!content) return;
		await createTask({ content, token }).then((data) => setTasks((previous) => [...previous, data]));
	};

	return (
		<div>
			<h2>Add Task</h2>
			<form onSubmit={handleAddTask}>
				<input onChange={(event) => setContent(event.target.value)} type="text"></input>
				<input type="submit"></input>
			</form>
			<h2>Tasks</h2>
			{tasks.length > 0
				? tasks.map((task, index) => {
						return <Task key={task.id} task={task} index={index} setTasks={setTasks} />;
				  })
				: ""}
		</div>
	);
}
