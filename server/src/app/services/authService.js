const User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../../../config/env')
const { setResponse, response_401 } = require('../lib/apiResponseFormat')

module.exports = {
    verifyAUth: async (req, res, next) => {
        var token = req.headers['x-access-token'];
        if (!token) {
            setResponse(res, response_401({ auth: false, message: 'No token provided.' }));
        }
        try {
            const decoded = await jwt.verify(token, config.secret);
            const user = await User.findById(decoded.id);
            if (!user) {
                setResponse(resp, response_401("UnAUthorised Access"));
            }
            req.userId = user.id;
            next()
        } catch (error) {
            console.log("Error in logging in the USer", err.message);
            setResponse(res, response_500("Error in verifying AUTH the USer", err.message));
        }

    }
}