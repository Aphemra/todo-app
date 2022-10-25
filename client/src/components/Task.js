import { useState } from "react";
import { useToken } from "../contexts/TokenContext";
import { checkOffTask, deleteTask } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSquareCheck as unchecked } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck as checked } from "@fortawesome/free-solid-svg-icons";

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
			<div className={complete ? "content done" : "content"}>{task.content}</div>
			<div className="buttons">
				<div className="icons">
					<div className="icon toggle" onClick={handleStatusToggle}>
						<FontAwesomeIcon icon={complete ? checked : unchecked} />
					</div>
					<div className="icon delete" onClick={handleDeleteTask}>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
				</div>
			</div>
		</div>
	);
}
