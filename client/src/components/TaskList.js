import { useEffect, useRef, useState } from "react";
import { useToken } from "../contexts/TokenContext";
import { createTask, getTasks } from "../services/api";
import { Navbar } from "./Navbar";
import { Task } from "./Task";

export function TaskList() {
	const [tasks, setTasks] = useState([]);
	const token = useToken();
	const [content, setContent] = useState("");

	const addTaskInput = useRef();

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
		await createTask({ content, token })
			.then((data) => setTasks((previous) => [...previous, data]))
			.finally(() => {
				resetField();
			});
	};

	function resetField() {
		addTaskInput.current.value = "";
		setContent("");
	}

	return (
		<>
			<Navbar />
			<div className={!token ? "hide" : "task-list"}>
				<div className="task-form">
					<div className="left">
						<div>Add Task</div>
						<form onSubmit={handleAddTask}>
							<input
								ref={addTaskInput}
								className="task-content-input"
								onChange={(event) => setContent(event.target.value)}
								type="text"
								maxLength={90}
							></input>
							<input type="submit"></input>
						</form>
					</div>
					<div className="right">
						<div className="task-total">{tasks.length} Tasks in List</div>
					</div>
				</div>
				<div className="tasks">
					{tasks.length > 0 ? (
						tasks.map((task) => {
							return <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />;
						})
					) : (
						<div className="no-tasks-message">
							{tasks.length > 0 ? "Loading Tasks..." : "No Tasks Found. Why not add some?"}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
