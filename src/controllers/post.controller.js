const postModel = require('../models/post.model.js');
const generateCaption = require('../service/ai.service.js');
const uploadFile = require('../service/storage.service.js');
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
    const file = req.file;

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');
    const caption = await generateCaption(base64ImageFile);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    //or
    // const [caption, result] = await Promise.all([
    //     generateCaption(base64ImageFile),
    //     uploadFile(file.buffer, `${uuidv4()}`)
    // ])

    const post = await postModel.create({
        caption: caption,
        image: result.url,
        user: req.user._id // Attach the user ID from the authenticated request
    })

    res.status(200).json({
        message: 'Post created successfully',
        post
    });
}

module.exports = {
    createPostController
};