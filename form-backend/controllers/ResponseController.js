import mongoose from "mongoose"
import Form from "../models/Form.js"
import Answer from "../models/Answer.js"

class ResponseController {
    async lists(req, res) {
        try {
            if(!req.params.formId) {throw {error: 400, message: 'REQUIRED_FORM_ID'}}
            if(!mongoose.Types.ObjectId.isValid(req.params.formId)) {throw {error: 400, message: 'INVALID_ID'}}

            const form = await Form.findOne({_id: req.params.formId, userId: req.jwt.id}).populate('answers')
            if(!form) {throw {error: 404, message: 'FORM_NOT_FOUND'}}

            // const answers = await Answer.find({formId: req.params.formId})
            // if(!answers) {throw {error: 404, message: 'ANSWER_NOT_FOUND'}}

            return res.status(200)
                .json({
                    status: true,
                    message: 'ANSWER_FOUND',
                    form,
                    total: form.answers.length,
                    answers: form.answers
                })
        } catch (error) {
            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message
                })
        }
    }
}

export default new ResponseController()