const Authenticate = require("../middleware/Authenticate")
const db = require("../utils/db")

module.exports = [
	Authenticate,
	async (req, res, next) => {
		try {
			const results = await db.task.findMany({
				where: {
					accountId: req.user,
				},
			})

			return res.json(results)
		} catch (err) {
			next(err)
		}
	},
]
