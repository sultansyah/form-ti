import User from "../models/User.js"

const noIndukExist = async (noInduk) => {
    const user = await User.findOne({ noInduk: noInduk })

    if (user) { return true }
    return false
}

export default noIndukExist