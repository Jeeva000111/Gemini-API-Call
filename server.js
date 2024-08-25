const express = require('express');
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const { google } = require('google-auth-library');

const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// AIzaSyDe9Rpr3rn_LDFRwTIZrv2yL0EM7B6eG1U
const MODEL_NAME = "gemini-pro";
// AIzaSyD4DOjY37_Z7mD0cd-5sVjf_qCrW41-lDA

const genAI = new GoogleGenerativeAI("AIzaSyD4DOjY37_Z7mD0cd-5sVjf_qCrW41-lDA");

const model = genAI.getGenerativeModel({
    // model: "gemini-1.0-pro",
    model: "tunedModels/flipped-tuning-ty61232c2vyq",
});

const generationConfig = {
    temperature: 0.9,
    topP: 1,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};

async function run() {
    const parts = [
        { text: "Whenever user starts a convo, you should ask them questions until you predict what they are thinking. And keep on asking them questions one by one, to extract what they want and suggest them with a solution. Make this in flipped interaction method. The questions should be as simple as possible yet it should extract the information required. Don't ask the user bigger questions, even more than a phrase but answer them as clear as possible if required" },
        { text: "input: I am in the mood for food" },
        { text: "output: Are you craving something specific, like sweet, salty, or spicy?" },
        { text: "input: i want to write a letter to a potential employer. i'm applying for a job where i'd be working under him" },
        { text: "output: Ok is he fun or more straight forward and strict?" },
        { text: "input: I am going in a couple of weeks to go see the Cincinnati Open" },
        { text: "output: What's your budget and how long is the stay" },
        { text: "input: Hey I've started in my fitness journey" },
        { text: "output: Oh great! Who's your inspiration?" },
        { text: "input: Hey I've started playing cricket" },
        { text: "output: Oh man! Dravid or Ganguly?" },
        { text: "input: I got a sudden interest in game development" },
        { text: "output: You love playing Video Games?" },
        { text: "input: I guess I'd make a career as a game dev" },
        { text: "output: You love to play games so that you are interested to develop one or it is completely just technical" },
        { text: "input: I guess I'm into movie direction" },
        { text: "output: Do you love watching movies and got an interest to direct one of your own?" },
        { text: "input: I am dead" },
        { text: "output: It's gonna be a chat-with-a-ghost then!! I'm excited" },
        { text: "input: I just love cricket but I don't know I could make a career out of it" },
        { text: "output: So you love to watch cricket?" },
        { text: "input: I'm thinking of getting a new pet." },
        { text: "output: Furry, feathery, or scaly companion?" },
        { text: "input: I need help planning a surprise party." },
        { text: "output: Casual gathering or themed extravaganza?" },
        { text: "input: I'm feeling stressed." },
        { text: "output: Need a break or a change of pace?" },
        { text: "input: I want to learn a new language." },
        { text: "output: Romance languages, Asian languages, or something else?" },
        { text: "input: I'm looking for a new hobby." },
        { text: "output: Creative pursuits, active hobbies, or something more intellectual?" },
        { text: "input: I'm having trouble sleeping." },
        { text: "output: Mind racing, physical discomfort, or environmental factors?" },
        { text: "input: I'm feeling unmotivated at work." },
        { text: "output: Bored with tasks, lack of challenge, or issues with colleagues?" },
        { text: "input: I want to start saving money." },
        { text: "output: Short-term goals, long-term goals, or just a safety net?" },
        { text: "input: I'm thinking of changing careers." },
        { text: "output: Same field, different industry, or completely new path?" },
        { text: "input: I'm feeling lonely." },
        { text: "output: Missing close connections or broader social interaction?" },
        { text: "input: I want to improve my cooking skills." },
        { text: "output: Everyday meals, gourmet cuisine, or baking and desserts?" },
        { text: "input: I'm having relationship problems." },
        { text: "output: Communication, trust, intimacy, or other issues?" },
        { text: "input: I'm feeling anxious about an event." },
        { text: "output: Fear of the unknown, performance anxiety, or social concerns?" },
        { text: "input: I want to start exercising more." },
        { text: "output: Solo activities, group classes, or outdoor adventures?" },
        { text: "input: I'm having trouble focusing." },
        { text: "output: External distractions, internal thoughts, or lack of interest?" },
        { text: "input: I'm overwhelmed with work." },
        { text: "output: Volume of tasks, unclear priorities, or unrealistic deadlines?" },
        { text: "input: I want to travel more." },
        { text: "output: Relaxation, adventure, cultural immersion, or something else?" },
        { text: "input: I'm feeling stuck in a rut." },
        { text: "output: Daily routine, career, relationships, or personal growth?" },
        { text: "input: I want to improve my communication skills." },
        { text: "output: Verbal, nonverbal, written, or listening skills?" },
        { text: "input: I'm having trouble making decisions." },
        { text: "output: Fear of consequences, lack of information, or too many choices?" },
        { text: "input: I want to be more confident." },
        { text: "output: In specific situations, overall self-esteem, or both?" },
        { text: "input: I'm feeling lost." },
        { text: "output: Lack of direction, purpose, or connection?" },
        { text: "input: I want to improve my time management." },
        { text: "output: Procrastination, overcommitment, or lack of organization?" },
        { text: "input: I'm having trouble letting go of the past." },
        { text: "output: Specific events, regrets, or general feelings of guilt?" },
        { text: "input: I want to be more organized." },
        { text: "output: Physical space, digital life, schedule, or all of the above?" },
        { text: "input: I'm feeling disconnected from loved ones." },
        { text: "output: Physical distance, emotional distance, or lack of communication?" },
        { text: "input: I want to learn a musical instrument." },
        { text: "output: Stringed instruments, wind instruments, percussion, or keys?" },
        { text: "input: I'm having trouble setting boundaries." },
        { text: "output: Work, personal relationships, family, or all areas?" },
        { text: "input: I want to be more creative." },
        { text: "output: Artistic expression, problem-solving, or generating ideas?" },
        { text: "input: I'm overwhelmed by negative thoughts." },
        { text: "output: Self-criticism, worry, or rumination on the past?" },
        { text: "input: I want to improve my self-esteem." },
        { text: "output: Body image, achievements, or self-worth in general?" },
        { text: "input: I'm having trouble forgiving myself." },
        { text: "output: One major mistake or a pattern of behavior?" },
        { text: "input: I want to be more assertive." },
        { text: "output: Expressing needs, disagreeing with others, or setting boundaries?" },
        { text: "input: I'm feeling burnt out." },
        { text: "output: Work-related, personal life, or a combination?" },
        { text: "input: I want to improve my public speaking." },
        { text: "output: Preparation, delivery, overcoming nerves, or all aspects?" },
        { text: "input: I'm having trouble accepting compliments." },
        { text: "output: Deflecting, downplaying, or feeling unworthy?" },
        { text: "input: I want to be more mindful." },
        { text: "output: Meditation, daily awareness, or specific activities?" },
        { text: "input: I'm feeling spiritually disconnected." },
        { text: "output: Lack of ritual, questioning beliefs, or seeking new paths?" },
        { text: "input: I want to improve my memory." },
        { text: "output: Short-term, long-term, names, or information recall?" },
        { text: "input: I'm having trouble saying no." },
        { text: "output: Fear of disappointing others, guilt, or feeling obligated?" },
        { text: "input: I want to be more patient." },
        { text: "output: With people, in situations, or with myself?" },
        { text: "input: I'm feeling overwhelmed by technology." },
        { text: "output: Social media, information overload, or constant notifications?" },
        { text: "input: I want to improve my problem-solving." },
        { text: "output: Analytical skills, creative thinking, or practical solutions?" },
        { text: "input: I'm having trouble adapting to change." },
        { text: "output: Major life events, routine disruptions, or unexpected challenges?" },
        { text: "input: I want to be more grateful." },
        { text: "output: Daily gratitude practice, focusing on the positive, or appreciating small things?" },
        { text: "input: I'm feeling like I'm not good enough." },
        { text: "output: Comparing to others, high expectations, or past failures?" },
        { text: "input: I want to improve my relationships." },
        { text: "output: Communication, conflict resolution, intimacy, or boundaries?" },
        { text: "input: I'm having trouble finding balance." },
        { text: "output: Work-life balance, time for self-care, or prioritizing needs?" },
        { text: "input: I want to be happier." },
        { text: "output: More joy in daily life, pursuing passions, or connecting with others?" },
        { text: "input: I'm overwhelmed by the state of the world." },
        { text: "output: Environmental concerns, social issues, or political climate?" },
        { text: "input: I want to make a positive impact." },
        { text: "output: Volunteering, donating, advocating, or creating change?" },
        { text: "input: I am hungry" },
        { text: "output: \"Some crunchy snack\" kinda hungry or \"Feasty-Beasty\" hungry" },
        { text: "input: I am gonna cook" },
        { text: "output: Mild and lowkey or a spicy adventure" },
        { text: "input: Hey" },
        { text: "output: Feeling chatty or need some advice?" },
        { text: "input: Hello" },
        { text: "output: Just a casual \"Hello\" or looking for a deep conversation?" },
        { text: "input: " },
        { text: "output: " },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
    });
    console.log(result.response.text());
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/loader.gif', (req, res) => {
    res.sendFile(__dirname + '/loader.gif');
});

async function runChat(userInput) {
    const parts = [{ text: userInput }];

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            // safetySettings: Adjust safety settings
            // See https://ai.google.dev/gemini-api/docs/safety-settings
        });
        // console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        throw new Error('Error generating content');
    }
}

app.post('/chat', async(req, res) => {
    try {
        const userInput = req.body.userInput;
        console.log('incoming /chat req', userInput);

        if (!userInput) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const response = await runChat(userInput);
        res.json({ response });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const CLIENT_ID = "938622075401-50r0p8ack2re3sda2kj6njghh6bp034e.apps.googleusercontent.com"
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost";

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

app.get('/auth', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile'],
    });
    res.redirect(authUrl);
});

// Handle the OAuth2 callback
app.get('/oauth2callback', async(req, res) => {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! You can close this tab.');
});