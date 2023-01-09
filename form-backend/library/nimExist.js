import User from "../models/User.js"

const nimExist = async (nim) => {
    const user = await User.findOne({ nim: nim })

    if (user) { return true }
    return false
}

export default nimExist