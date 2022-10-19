const Authenticate = require("../middleware/Authenticate")
const Validate = require("../middleware/Validate")
const db = require("../utils/db")
const y = require("yup")

module.exports = [
	Authenticate,
	Validate(
		y.object({
			content: y.string().required(),
		})
	),
	async (req, res, next) => {
		const { content } = req.body

		try {
			const task = await db.task.create({
				data: {
					content,
					accountId: req.user,
				},
				select: {
					id: true,
					content: true,
				},
			})
			return res.json(task)
		} catch (err) {
			next(err)
		}
	},
]
