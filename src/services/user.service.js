const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getUser = async ()=>{
    const user = await prisma.User.findMany()  // trouver toute les user
    return user
}

const createUser = async (payload)=>{
    const {name, email, password, role} = payload // les donnée utlis

    const password_hasher = await bcrypt.hash(password, 10) // crypter le password

    return await prisma.User.create({
        data: {
            name: name,
            email: email,
            password: password_hasher,
            role: role
        }
    })
}


const UpdateUser = async (id, data)=>{ 

    
    if(data.password){
        const salt = await bcrypt.genSalt(10)

        data.password = await bcrypt.hash(data.password, salt)
    }
    return await prisma.User.update({
        where: { id },
        data
    })
}

const deleteUser = async (id)=>{
    return await prisma.User.delete({
        where: { id }
    })
}

module.exports = {getUser, createUser, UpdateUser, deleteUser}