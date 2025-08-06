const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateCaption(base64ImageFile) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: base64ImageFile,
                },
            },
            {
                text: "You are an expert in generating captions for images. You will generate single-line captions for the images provided. The caption should be concise and descriptive. Use hashtags and emojis in the caption.Do not use any other text in the caption.Do not even new line characters.",
            },
        ]);

        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Caption generation error:", error);
        return "Unable to generate caption.";
    }
}

module.exports = generateCaption;