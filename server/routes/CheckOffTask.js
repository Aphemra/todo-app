const Authenticate = require("../middleware/Authenticate")
const Validate = require("../middleware/Validate")
const y = require("yup")
const db = require("../utils/db")

module.exports = [
	Authenticate,
	Validate(
		y.object({
			task: y.string().required(),
		})
	),
	async (req, res, next) => {
		const { task } = req.body
		const found = await db.task.findUnique({
			where: {
				id: task,
			},
		})
		if (!found) {
			return next(new y.ValidationError("Failed to find the provided task.", task))
		} else if (found.accountId != req.user) {
			return next(new y.ValidationError("Failed to fetch resource.", task))
		}

		const resp = await db.task.update({
			where: {
				id: task,
			},
			data: {
				done: !found.done,
			},
			select: {
				id: true,
				content: true,
				done: true,
			},
		})

		return res.json(resp)
	},
]
