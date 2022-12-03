import mongoose from "mongoose"
import Form from "../models/Form.js"
import Answer from "../models/Answer.js"
import answerDuplicate from "../library/answerDuplicate.js"
import checkQuestionIsRequiredAndIsValueEmpty from "../library/checkQuestionIsRequiredAndIsValueEmpty.js"

class AnswerController {
    async store(req, res) {
        try {
            if(!req.params.formId) {throw {code: 400, message: "REQUIRED_FORM_ID"}}
            if(!mongoose.Types.ObjectId.isValid(req.params.formId)) {throw {code: 400, message: "INVALID_ID"}}

            const form = await Form.findById(req.params.formId)

            const isDuplicate = await answerDuplicate(req.body.answers)
            if(isDuplicate) {throw {code: 400, message: "DUPLICATE_ANSWER"}}

            const questionRequiredEmpty = await checkQuestionIsRequiredAndIsValueEmpty(form, req.body.answers)
            if(questionRequiredEmpty) {throw {code: 400, message: "QUESTION_REQUIRED_BUT_EMPTY"}}

            let fields = {}

            req.body.answers.forEach(answer => {
                fields[answer.questionId] = answer.value
            })

            const answers = await Answer.create({
                formId: req.params.formId,
                userId: req.jwt.id,
                ...fields
            })

            if(!answers) {throw {code: 400, message: "ANSWER_FAILED"}}

            return res.status(200)
                .json({
                    status: true,
                    message: "ANSWER_SUCCESS",
                    answers
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

export default new AnswerController()