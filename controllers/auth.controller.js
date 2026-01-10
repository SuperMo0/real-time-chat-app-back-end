import { sign, verify } from "../utils/jwt.js";
import { validateNewUser } from "../middlewares/validate.js";
import * as model from "../models/auth.model.js"
import { compare, hash } from "../utils/bcrypt.js";


export async function login(req, res) {

    let user;
    try {
        const { email, password } = req.body;

        user = await model.getUserByEmail(email);

        let originalPassword = user.password;

        await compare(password, originalPassword)

    } catch (error) {
        return res.status(401).json({ message: "wrong credentials" })
    }

    try {
        await sign(user, res);
        res.status(201).json({ user: { name: user.name, email: user.email, avatar: user.avatar, id: user.id } });

    } catch (error) {
        console.log("error in login > sign token");
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function signup(req, res) {

    let { name, email, password } = req.body;

    const { error, ok } = validateNewUser(name, email, password);

    if (!ok) return res.status(401).json({ message: "Invalid request" })
    let user;
    try {
        password = await hash(password);
        user = await model.insertUser(name, email, password);
    } catch (error) {
        return res.status(401).json({ message: "Email already Exists" })
    }

    try {
        await sign(user, res);
        res.status(201).json({ user });

    } catch (error) {
        console.log("error in signup > sign token");
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function check(req, res) {
    try {
        const { jwt } = req.cookies;
        let userId = await verify(jwt);
        let user = await model.getUserById(userId);
        return res.json({ user });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}