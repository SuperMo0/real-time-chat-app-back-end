import prisma from './../utils/prisma.js'

export async function getUserFriends(userId) {
    try {
        let result = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                friendsTo: { select: { id: true, avatar: true, name: true } },
            }
        })
        return result.friendsTo

    } catch (error) {
        throw "error while getting user Friends"
    }

}

export async function getUserChats(userId) {
    try {
        let result = await prisma.user.findUnique({
            select: {
                chats: {
                    select: {
                        id: true,
                        lastMessage: true,
                        name: true,
                        users: {
                            select: {
                                id: true,
                                avatar: true,
                                name: true
                            }
                        }
                    }
                },
            },
            where: { id: userId },
        })
        return result.chats;
    } catch (error) {
        throw "error while gettin user chats"


    }
}


export async function getChatMessages(chatId) {
    try {
        let result = await prisma.message.findMany({
            where: { chatId: chatId }

        })
        return result;

    } catch (error) {
        throw "error while getting user Friends"
    }

}