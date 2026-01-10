import prisma from './../lib/prisma.js'

export async function updateProfile(userId, name, avatar) {

    try {
        const user = await prisma.user.update({
            data: {
                name: name,
                avatar: avatar,
            },
            where: {
                id: userId
            },
            select: {
                name: true,
                avatar: true,
                id: true,
            }
        })

    } catch (error) {
        throw "error updating user profile ";
    }



}