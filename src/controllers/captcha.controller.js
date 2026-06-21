const {generateCaptcha,validateCaptcha} = require("../services/captcha.service")

const generate = async (req,res)=>{
    try {
        const fingerPrint = req.headers['user-agent']
        const captcha = await generateCaptcha(fingerPrint)
        return res.status(200).json({captcha})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const validate = async (req,res)=>{
    try {
        const { id, answer } = req.body
        const fingerPrint = req.headers['user-agent']

        if(!id || !answer){
            return res.status(400).json({message: "les champs sont requis"})
        }

        await validateCaptcha(id,answer,fingerPrint)
        return res.status(200).json({success: true})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {generate,validate}