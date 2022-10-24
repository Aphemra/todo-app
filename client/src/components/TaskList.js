import { useEffect, useState } from "react";
import { useToken } from "../contexts/TokenContext";
import { createTask, getTasks } from "../services/api";
import { Navbar } from "./Navbar";
import { Task } from "./Task";

export function TaskList() {
	const [tasks, setTasks] = useState([]);
	const token = useToken();
	const [content, setContent] = useState("");

	useEffect(() => {
		if (!token) {
			setTasks([]);
			return;
		}
		getTasks({ token }).then(setTasks);
	}, [token]);

	const handleAddTask = async (event) => {
		event.preventDefault();
		if (!content) return;
		await createTask({ content, token }).then((data) => setTasks((previous) => [...previous, data]));
	};

	return (
		<>
			<Navbar />
			<div className={!token ? "hide" : "task-list"}>
				<div className="task-form">
					<div>Add Task</div>
					<form onSubmit={handleAddTask}>
						<input onChange={(event) => setContent(event.target.value)} type="text"></input>
						<input type="submit"></input>
					</form>
				</div>
				<div className="tasks">
					{tasks.length > 0
						? tasks.map((task, index) => {
								return <Task key={task.id} task={task} index={index} setTasks={setTasks} />;
						  })
						: "Loading..."}
				</div>
			</div>
		</>
	);
}
