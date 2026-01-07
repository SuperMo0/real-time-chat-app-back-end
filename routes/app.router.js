import { Router } from "express";
import protect from './../middlewares/protect.js'
import * as controller from './../controllers/app.controller.js'


const router = Router();

router.use(protect)

router.get('/friends', controller.getUserFriends);

router.get('/chats', controller.getUserChats);

router.get('/chat/:chatId/messages', controller.getChatMessages);




export default router


