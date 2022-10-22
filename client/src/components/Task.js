import axios from "axios";
import { useState } from "react";

async function checkTask(options) {
	return axios
		.put(
			`${process.env.REACT_APP_SERVER_URL}/tasks`,
			{ task: options.task.id },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${options.token}`,
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => console.log(error));
}

export function Task({ task, index, token }) {
	const [complete, setComplete] = useState(task.done);

	const handleClick = async (event) => {
		const done = await checkTask({ task, token });
		setComplete(done.done);
	};

	return (
		<div>
			<h3 style={{ marginBottom: "0px", paddingBottom: "0px" }}>{`Task ${index + 1}`}</h3>
			<p style={{ marginTop: "0px", marginBottom: "0px", fontSize: "24px" }}>{task.content}</p>
			<p style={{ fontSize: "16px" }}>{complete ? "Task Complete" : "Task Incomplete"}</p>
			<button type="button" onClick={handleClick}>
				{complete ? "Uncomplete Task" : "Complete Task"}
			</button>
			<hr />
		</div>
	);
}
