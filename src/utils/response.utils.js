const success = async (res, data, message = "Success", status = 200)=>{
    return res.status(status).json({
        success: true,
        message,
        data
    })
}

const error = async (res, message = "Error", status = 500) => {
    return res.status(status).json({
        success: false,
        message
    })
}

module.exports = {success, error}