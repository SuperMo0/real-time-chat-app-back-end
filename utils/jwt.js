import jwt from 'jsonwebtoken'


export async function sign(user, res) {

    return await new Promise((resolve, reject) => {
        jwt.sign({ id: user.id }, "secret", { expiresIn: "2 days" }, (error, token) => {
            if (error) return reject(error);

            res.cookie("jwt", token, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true })
            resolve(token);
        });
    })
}

export async function verify(token) {
    return await new Promise((res, rej) => {
        jwt.verify(token, "secret", (error, token) => {
            if (error) return rej(error);
            res(token.id);
        })
    })


}