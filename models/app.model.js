import prisma from '../lib/prisma.js'




const userProfileSelect = {
    name: true,
    avatar: true,
    id: true,
}
export async function getUserFriends(userId) {
    try {
        let result = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                friendsTo: { select: userProfileSelect },
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
                            select: userProfileSelect
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
            where: { chatId: chatId },
            orderBy: { timestamp: 'asc' }

        })
        // console.log(result);
        return result;

    } catch (error) {
        throw "error while getting chat messages"
    }

}
export async function getUserFriendsRequestsTo(userId) {
    try {
        let result = await prisma.request.findMany({
            where: { receiverId: userId }
        })
        return result;
    } catch (error) {
        throw "error while getting friends request sent to the user "
    }
}

export async function getUserFriendsRequestsBy(userId) {
    try {
        let result = await prisma.request.findMany({
            where: { senderId: userId }
        })
        return result;
    } catch (error) {
        throw "error while getting friends request sent by the user "
    }
}

export async function markMessageAsRead(messageId) {
    try {
        let result = await prisma.message.update({
            data: {
                isRead: true,
                readAt: new Date()
            },
            where: { id: messageId },
            include: { chat: true }

        })
        return result;
    } catch (error) {
        console.log(error);

        throw "error marking message as read"
    }
}

export async function createFriendRequest(senderId, receiverId) {
    try {
        let result = await prisma.request.create({
            data: {
                senderId: senderId,
                receiverId: receiverId,
            },
        })
        return result;
    } catch (error) {
        throw "error sending friend request"
    }
}

export async function acceptFriendRequest(requestId) {

    try {
        let request = await prisma.request.findUnique({
            where: { id: requestId }
        })

        if (!request) throw "request was not found"

        const { senderId, receiverId } = request;

        const [_, sender, receiver, chat] = await prisma.$transaction([
            prisma.request.delete({
                where: { id: requestId }
            }),
            prisma.user.update({
                data: { friendsTo: { connect: { id: receiverId } } },
                where: { id: senderId },
                select: userProfileSelect
            }),
            prisma.user.update({
                data: { friendsTo: { connect: { id: senderId } } },
                where: { id: receiverId },
                select: userProfileSelect
            }),
            prisma.chat.create()
        ])

        await prisma.chat.update({
            data: {
                users: {
                    connect: [{ id: senderId }, { id: receiverId }]
                }
            },
            where: {
                id: chat.id,
            }
        })

        return [sender, receiver]

    } catch (error) {
        console.log(error);
        throw "error accepting friends request"
    }
}

export async function createNewMessage(chatId, senderId, content) {
    try {
        let result = await prisma.message.create({
            data: {
                senderId: senderId,
                chatId: chatId,
                content: content
            },
        })
        return result;
    } catch (error) {
        throw "error creating a new message"
    }
}

export async function getAllUsers(userId) {

    try {
        let result = await prisma.user.findMany(
            {
                where: {
                    id: { not: userId }
                }
            }
        )
        return result

    } catch (error) {
        throw 'error getting All users'
    }



}

export async function updateChatLastMessage(chatId, lastMessage) {

    try {
        const result = await prisma.chat.update({
            where: { id: chatId },
            data: {
                lastMessageId: lastMessage.id
            },
            select: {
                users: {
                    select: userProfileSelect
                },
                lastMessage: true,
                name: true,
                id: true,
            }
        })
        return result

    } catch (error) {
        throw 'error updating chat lastMessage'
    }



}
