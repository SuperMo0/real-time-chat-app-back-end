import * as model from './../models/app.model.js'
export async function getUserFriends(req, res) {


    let friends = await model.getUserFriends(req.userId);

    res.json({ friends });

}
export async function getUserChats(req, res) {

    let chats = await model.getUserChats(req.userId);

    res.json({ chats });
}


export async function getChatMessages(req, res) {

    try {
        const { chatId } = req.params;
        let messages = await model.getChatMessages(chatId);
        res.json({ messages });
    } catch (error) {



    }

}