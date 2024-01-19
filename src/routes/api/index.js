const router = require('express').Router()

router.use("/auth", require("./authRouter"))
router.use("/user", require("./userRouter"))
router.use("/post", require("./postRouter"))

router.get("/", (_, res) => {
    res.json({ msg: "Hello world" })
})

module.exports = router
