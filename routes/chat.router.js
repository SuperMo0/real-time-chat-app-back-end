import { Router } from "express";
import protect from '../middlewares/protect.js'
import * as controller from '../controllers/chat.controller.js'


const router = Router();

router.use(protect)

router.get('/friends', controller.getUserFriends);

router.get('/users', controller.getAllUsers);

router.get('/chats', controller.getUserChats);

router.get('/chat/:chatId/messages', controller.getChatMessages);

router.get('/requests/to', controller.getUserFriendsRequestsTo);

router.get('/requests/by', controller.getUserFriendsRequestsBy);

router.post('/request/:receiverId', controller.createFriendReqesut);

router.post('/message/:chatId', controller.createNewMessage);

router.put('/request/:requestId', controller.acceptFriendRequest);

router.put('/chat/:chatId/read', controller.markChatAsRead);








export default router


