const config = require('../../../../../../config/env'),
    TimeSheet = require('../../../../models/timeSheet'),
    User = require('../../../../models/user'),
    logger = require('../../../../lib/logger')
const { setResponse, response_200, response_500 } = require('../../../../lib/apiResponseFormat')

module.exports = {
    addTimeSheet: async (req, res) => {
        try {
            logger.debug('Entered AddTimeSheet method')
            await TimeSheet.create({
                date: new Date(req.body.date),
                hours: req.body.hours,
                projectId: req.body.projectId,
                ActivityId: req.body.ActivityId,
                USERId: req.userId
            })
            logger.debug('TimeSheet has been added successfully')
            setResponse(res, response_200("Time sheet has been added successfully"))
        } catch (error) {
            logger.error(`Error while adding TimeSheet: ${error}`)
            setResponse(res, response_500("Error while adding TimeSheet", error.message))
        }
    },
    deleteTimeSheet: async (req, res) => {
        try {
            logger.debug('Entered deleteTimeSheet method')
            await TimeSheet.destroy({
                where: {
                    id: req.body.ids
                }
            })
            logger.debug(`TimeSheet has been deleted successfully, ids: ${JSON.stringify(req.body.ids)}`)
            setResponse(res, response_200("Time sheet has been added successfully"))
        } catch (error) {
            logger.error(`Error while adding TimeSheet: ${error}`)
            setResponse(res, response_500("Error while adding TimeSheet", error.message))
        }
    },
    getTimeSheetPerUser: async (req, res) => {
        try {
            logger.debug('Entered getTimeSheetPerUser method')
            const timeSheets = await User.findOne({
                where: {
                    id: req.query.userId
                },
                include: [{
                    model: TimeSheet,
                    include: [Project, Activity]
                }]
            })
            logger.debug(`successfully fetched timesheets for user: ${req.query.userId}`)
            setResponse(res, response_200({ timeSheets }))
        } catch (error) {
            logger.error(`Error while fetching data for user: ${req.query.userId}, Error: ${error}`)
            setResponse(res, response_500(`Error while fetching data for user: ${req.query.userId}`))
        }
    },
    getAllUserTimeSheet: async (req, res) => {
        try {
            logger.debug('Entered getAllUserTimeSheet method')
            const timeSheets = await User.findAll({
                include: [{
                    model: TimeSheet,
                    include: [Project, Activity]
                }]
            })
            logger.debug(`successfully fetched timesheets for all user`)
            setResponse(res, response_200({ timeSheets }))
        } catch (error) {
            logger.error(`Error while fetching data for all users, Error: ${error}`)
            setResponse(res, response_500(`Error while fetching data for all users`))
        }
    }

}