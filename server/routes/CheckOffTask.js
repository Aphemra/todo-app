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
		const { task: taskId } = req.body
		const found = await db.task.findUnique({
			where: {
				id: taskId,
			},
		})
		if (!found) {
			return next(new y.ValidationError("Failed to find the provided task.", taskId))
		} else if (found.accountId != req.user) {
			return next(new y.ValidationError("Failed to fetch resource.", taskId))
		}

		const resp = await db.task.update({
			where: {
				id: taskId,
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
