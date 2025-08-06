const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : "public_0qcnFz5H7P8XHAK0i/BrMXpQXPQ=",
    privateKey : "private_9bauyqXBDgZWQ3PTch1EAdfkid8=",
    urlEndpoint : "https://ik.imagekit.io/A7N17I67/"
});

async function uploadFile(file, filename){

    const response = await imagekit.upload({
        file: file, // required
        fileName: filename, // required
        folder: "cohort_ai_social"
    })
    return response;
}

module.exports = uploadFile;