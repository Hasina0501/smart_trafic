const {PrismaClient} = require('@prisma/client')
const bcrypt = require("bcrypt")
const svg_captcha = require("svg-captcha")


const prisma = new PrismaClient()

const generateCaptcha = async (fingerPrint)=>{


    const captcha = svg_captcha.create({
        size: 5,
        noise: 4,
        color: true,
        background: 'turquoise',
        ignoreChars: 'Oo1il',
        fontSize: 50,
        width: 150,
        height: 50
    })
    
    console.log(captcha.text)
    const hashed_answer = await bcrypt.hash(captcha.text, 10)
    const expiresAt = new Date(Date.now() + 2*60*1000)
    const dbCaptcha = await prisma.Captcha.create({
        data:{
            answers: hashed_answer,
            fingerprint: fingerPrint,
            expiresAt: expiresAt
        }
    })

    return {
        id: dbCaptcha.id,
        image: captcha.data
    }
}


const validateCaptcha = async (id, answer, fingerPrint)=>{
    const captcha = await prisma.Captcha.findUnique({
        where: {id}
    })

    if(!captcha){
        throw new Error("invalid captcha")
    }
    if(new Date() > captcha.expiresAt){
        await prisma.Captcha.delete({where: {id}})
        throw new Error("captcha éxpirer")
    }
    if(captcha.fingerprint !== fingerPrint){
        throw new Error("utilisateur suspicieux")
    }
    if(captcha.attempts >= 5){
        await prisma.Captcha.delete({where: {id}})
        throw new Error("tentative max atteint")
    }

    await prisma.Captcha.update({
        where: {id},
        data: {attemps: {increment: 1}}
    })

    const isValid = await bcrypt.compare(answer, captcha.answers)

    if(!isValid){
        throw new Error("Wrong answer")
    }

    await prisma.Captcha.delete({where: {id}})
    return true
}

module.exports = {generateCaptcha,validateCaptcha}