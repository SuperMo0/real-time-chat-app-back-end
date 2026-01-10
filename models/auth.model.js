import prisma from '../lib/prisma.js'

export async function insertUser(name, email, password) {
    try {
        let user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
            }
        })
        return user

    } catch (error) {
        throw (error)
    }
}

/*export async function checkCredentials(email, password) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                AND: [{ email: email }, { password: password }]
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
            }
        })
        return user

    } catch (error) {
        throw error
    }
}*/

export async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        return user;

    } catch (error) {
        throw error
    }
}


export async function getUserById(id) {

    try {
        const user = prisma.user.findUnique({
            where: {
                id: id
            }, select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
            }
        })
        return user;

    } catch (error) {
        throw error;
    }
}