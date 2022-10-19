const db = require("../utils/db")
const y = require("yup")
const argon2 = require("argon2")
const Validate = require("../middleware/Validate")
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

		const existing = await db.account.findUnique({
			where: {
				nickname,
			},
		})

		if (existing) {
			return next(new y.ValidationError("Nickname already exists.", nickname))
		}

		try {
			const hashed = await argon2.hash(password, { secret: Buffer.from(process.env.SECRET) })
			const account = await db.account.create({
				data: {
					nickname,
					password: hashed,
				},
				select: {
					nickname: true,
					id: true,
				},
			})

			return res.status(200).json({...account, token: authToken.generate(account.id)})
		} catch (err) {
			return next(err)
		}
	},
]
