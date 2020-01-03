const User = require('../models/user')
const jwt = require('jsonwebtoken')
const auth = async function (req, res, next) {

    try {
        let token = req.cookies.token
        const user_id = jwt.verify(token, 'chat')
        const user = await User.findOne({ _id: user_id._id, 'tokens.token': token })
        if (!user)
            throw new Error("not found")
        req.user = user
        req.token = token
        next()
    }
    catch (e) {
        console.log(e)
        res.render('login')
    }
}
module.exports = auth