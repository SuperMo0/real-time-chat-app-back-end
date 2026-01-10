import * as model from './../models/user.model.js'
import v2 from './../lib/cloudinary.js'

export async function updateProfile(req, res) {
    try {

        const { name } = req.body;

        const avatar = req.file;
        const userId = req.userId;

        v2.uploader.upload_stream({ format: 'png', resource_type: 'image' }, async (err, result) => {
            if (err) return res.status(500).json({ message: 'error uploading' });
            let newUser = await model.updateProfile(userId, name, result.url);
            return res.json({ user: newUser });
        }).end(avatar.buffer)

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}