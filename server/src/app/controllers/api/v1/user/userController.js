const User = require('../../../../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../../../../../../config/env')
const { setResponse, response_200, response_401, response_500 } = require('../../../../lib/apiResponseFormat')

module.exports = {
    register: async (req, res) => {
        try {
            const user = await User.create({
                name: req.body.username,
                email: req.body.email,
                role: req.body.role ? req.body.role : 'USER',
                password: req.body.password ? req.body.password : '',
                active: true,
                emp_joined_date: new Date().getTime()
            })
            return setResponse(res, response_200({ msg: "User Registered successfully" }))
        } catch (error) {
            console.log(error)
            setResponse(res, response_500({ msg: `Error while registering user: ${error.message}`, token: null }))
        }
    },
    login: async (req, res, next) => {
        try {
            var user = await User.findOne({ where: { email: req.body.email } })
            if (!user) {
                return setResponse(res, response_401("No User Found, Please check the credentials"));
            }

            if (!user.validatePassword(user.password, req.body.password)) {
                return setResponse(res, response_401("UnAuthorised Access"));
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 60000
            });
            setResponse(res, response_200({ auth: true, token }));
        } catch (error) {
            console.log("Error in logging in the USer", error);
            setResponse(res, response_500("Error in logging in the USer", error.message));
        }
    },

    logout: async (req, res) => {
        setResponse(res, response_200({ auth: false, token: null }));
    }
}