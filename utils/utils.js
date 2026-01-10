export function getReceiver(userId, chat) {
    return chat.users.filter((u) => u.id != userId)[0];
}