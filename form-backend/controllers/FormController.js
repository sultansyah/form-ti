import mongoose from "mongoose"
import Form from "../models/Form.js"
import User from "../models/User.js"

class FormController {
    async index(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10
            const page = parseInt(req.query.page) || 1

            const form = await Form.paginate({ userId: req.jwt.id }, {limit: limit, page: page})
            if(!form) { throw { code: 404, message: "FORMS_NOT_FOUND" } }

            return res.status(200)
                .json({
                    status: true,
                    message: "FORMS_FOUND",
                    total: form.length,
                    totalDocs: form.length,
                    forms: form
                })
        } catch (error){
            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message
                })
        }
    }

    async store(req, res) {
        try {
            const form = await Form.create({
                userId: req.jwt.id,
                title: 'Untitled form',
                description: null,
                public: true,
            })
            if(!form) { throw { code: 500, message: 'FAILED_CREATE_FORM' } }
            
            return res.status(200)
                .json({
                    status: true,
                    message: 'SUCCESS_CREATE_FORM',
                    form
                })
        } catch (error) {
            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message,
                })
        }
    }

    async show(req, res) {
        try {
            if(!req.params.id) { throw { code: 400, message: "REQUIRED_FORM_ID" } }
            if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }

            const form = await Form.findOne({ _id: req.params.id, userId: req.jwt.id })
            if(!form) { throw { code: 404, message: "FORM_NOT_FOUND" } }

            return res.status(200)
                .json({
                    status: true,
                    message: "FORM_FOUND",
                    form
                })
        } catch (error){
            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message
                })
        }
    }

    async update(req, res) {
        try {
            if(!req.params.id) {throw {code: 400, message: "REQUIRED_FORM_ID"}}
            if(!mongoose.Types.ObjectId.isValid(req.params.id)) {throw {code: 400, message: "INVALID_ID"}}

            const form = await Form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id}, req.body, { new: true })
            if(!form) {throw {code: 404, message: "FORM_UPDATE_FAILED"}}

            return res.status(200)
                .json({
                    status: true,
                    message: "FORM_UPDATE_SUCCES",
                    form
                })
        } catch (error) {
            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message
                })
        }
    }

    async destroy(req, res) {
        try {
            if(!req.params.id) {throw {code: 400, message: "REQUIRED_FORM_ID"}}
            if(!mongoose.Types.ObjectId.isValid(req.params.id)) {throw {code: 400, message: "INVALID_ID"}}

            const form = await Form.findOneAndDelete({_id: req.params.id, userId: req.jwt.id})
            if(!form) {throw {code: 404, message: "FORM_DELETE_FAILED"}}

            return res.status(200)
                .json({
                    status: true,
                    message: "FORM_DELETE_SUCCESS",
                    form
                })
        } catch (error) {
            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message
                })
        }
    }

    async showToUser(req, res) {
        try {
            if(!req.params.id) { throw { code: 400, message: "REQUIRED_FORM_ID" } }
            if(!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_ID" } }

            const form = await Form.findOne({ _id: req.params.id})
            if(!form) { throw { code: 404, message: "FORM_NOT_FOUND" } }

            if (req.jwt.id != form.userId && form.public === false) {
                const user = await User.findOne({_id: req.jwt.id})

                if(!form.invites.includes(user.email)) {throw {code: 401, message: "YOU_ARE_NOT_INVITE"}}
            }

            form.invites = []

            return res.status(200)
                .json({
                    status: true,
                    message: "FORM_FOUND",
                    form
                })
        } catch (error){
            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message
                })
        }
    }

}

export default new FormController()