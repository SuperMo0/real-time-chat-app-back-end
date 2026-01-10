import "dotenv/config"
import { hash } from '../utils/bcrypt.js';
import prisma from './../lib/prisma.js'

async function alter() {
    try {
        await prisma.user.updateMany({
            data: {
                avatar: 'https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'
            },
            where: {
                avatar: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png'
            }
        })
    } catch (error) {
        console.log(error);
    }
}


async function main() {
    console.log('🌱 Starting seed...');

    // 1. CLEANUP
    // Delete in order of dependencies (Child -> Parent)
    await prisma.request.deleteMany();
    await prisma.message.deleteMany();
    await prisma.chat.deleteMany();
    await prisma.user.deleteMany();

    console.log('🧹 Database cleaned.');

    // 2. GENERATE PASSWORD
    const password = await hash('123');

    // 3. CREATE USERS
    const me = await prisma.user.create({
        data: {
            email: 'me@example.com',
            name: 'My Profile',
            password: password,
            avatar: 'https://i.pravatar.cc/150?u=me',
        },
    });

    const friend1 = await prisma.user.create({
        data: {
            email: 'sarah@example.com',
            name: 'Sarah Lee',
            password: password,
            avatar: 'https://i.pravatar.cc/150?u=sarah',
        },
    });

    const friend2 = await prisma.user.create({
        data: {
            email: 'john@example.com',
            name: 'John Doe',
            password: password,
            avatar: 'https://i.pravatar.cc/150?u=john',
        },
    });

    const stranger = await prisma.user.create({
        data: {
            email: 'stranger@example.com',
            name: 'Stranger Danger',
            password: password,
            avatar: 'https://i.pravatar.cc/150?u=stranger',
        },
    });

    console.log('👤 Users created.');

    // 4. CREATE FRIENDSHIPS
    // Connect Me <-> Sarah
    await prisma.user.update({
        where: { id: me.id },
        data: {
            friendsTo: { connect: [{ id: friend1.id }] },
        },
    });
    await prisma.user.update({
        where: { id: friend1.id },
        data: {
            friendsTo: { connect: [{ id: me.id }] },
        },
    });

    // Connect Me <-> John (So they can chat)
    await prisma.user.update({
        where: { id: me.id },
        data: {
            friendsTo: { connect: [{ id: friend2.id }] },
        },
    });
    await prisma.user.update({
        where: { id: friend2.id },
        data: {
            friendsTo: { connect: [{ id: me.id }] },
        },
    });

    // 5. CREATE REQUESTS
    await prisma.request.create({
        data: {
            senderId: stranger.id,
            receiverId: me.id,
        },
    });

    // 6. CREATE CHATS & MESSAGES
    // Strategy: Create Chat -> Create Message -> Update Chat with lastMessageId

    // --- Chat 1: Me & Sarah (Active conversation) ---
    const chat1 = await prisma.chat.create({
        data: {
            users: { connect: [{ id: me.id }, { id: friend1.id }] },
        },
    });

    // Old message
    await prisma.message.create({
        data: {
            content: "Hey Sarah! Long time no see.",
            chatId: chat1.id,
            senderId: me.id,
            timestamp: new Date(Date.now() - 100000), // older
            isRead: true,
        },
    });

    // Newest message (The "Last Message")
    const lastMsg1 = await prisma.message.create({
        data: {
            content: "I know right? How have you been?",
            chatId: chat1.id,
            senderId: friend1.id,
            timestamp: new Date(), // now
            isRead: false,
        },
    });

    // Update Chat 1 with the last message relation
    await prisma.chat.update({
        where: { id: chat1.id },
        data: {
            lastMessageId: lastMsg1.id
            // lastMessageTimestamp is removed as requested
        },
    });

    // --- Chat 2: Me & John (Previously empty, now has 1 message) ---
    const chat2 = await prisma.chat.create({
        data: {
            users: { connect: [{ id: me.id }, { id: friend2.id }] },
        },
    });

    // We must create a message to fulfill the "each chat should have last message" rule
    const lastMsg2 = await prisma.message.create({
        data: {
            content: "Yo John, we are friends now!",
            chatId: chat2.id,
            senderId: me.id,
            timestamp: new Date(),
            isRead: true,
        },
    });

    // Update Chat 2
    await prisma.chat.update({
        where: { id: chat2.id },
        data: {
            lastMessageId: lastMsg2.id
        },
    });

    console.log('✅ Seeding finished.');
}



/*main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });*/

