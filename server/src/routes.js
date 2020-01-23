const router = require('express').Router(),
    userRoute = require('./app/controllers/api/v1/user/userRoute'),
    queryRoute = require('./app/controllers/api/v1/serviceRequest/serviceRequestRoute')

router.use('/v1/user', userRoute)

module.exports = router
