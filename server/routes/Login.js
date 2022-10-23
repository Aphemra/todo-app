const Validate = require("../middleware/Validate")
const y = require("yup")
const argon2 = require("argon2")
const db = require("../utils/db")
const authToken = require("../utils/authToken")

module.exports = [
	Validate(
		y.object({
			nickname: y.string().required(),
			password: y.string().required(),
		})
	),
	async (req, res, next) => {
		const { nickname, password } = req.body

		const found = await db.account.findUnique({
			where: { nickname },
			select: { id: true, nickname: true, password: true },
		})

		try {
			if (found && (await argon2.verify(found.password, password, { secret: Buffer.from(process.env.SECRET) }))) {
				return res.status(201).json({ id: found.id, nickname: found.nickname, token: authToken.generate(found.id) })
			} else {
				throw new Error("Bad credentials")
			}
		} catch (err) {
			return next(new y.ValidationError("Bad account credentials", nickname))
		}
	},
]
