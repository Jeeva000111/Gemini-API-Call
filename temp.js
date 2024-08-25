// Make sure to include these imports:
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("Gemini API KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


async() => {
    const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContent(prompt);

    console.log(result);
}
