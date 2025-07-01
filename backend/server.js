const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 8000; 
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

app.use(cors()); 
app.use(express.json()); 

async function generateStoryWithAI(genre, keywords, episodic) {
    let prompt = `Write a compelling ${genre} story. `;

    if (keywords && keywords.length > 0 && keywords[0] !== '') {
        prompt += `It must include the following elements: ${keywords.join(', ')}. `;
    }

    if (episodic) {
        prompt += `The story should be structured episodically, with clear breaks between parts. `;
    } else {
        prompt += `The story should be a single, continuous narrative. `;
    }

    prompt += `Make it imaginative, unique, and engaging. Keep the story between 250-400 words.`;

    try {
        if (process.env.GEMINI_API_KEY) {
            const API_KEY = process.env.GEMINI_API_KEY;
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            console.log("Sending prompt to Gemini:", prompt);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log("Received story from Gemini:", text.substring(0, 100) + "...");
            return text;
        } else {
            throw new Error("No Generative AI API key (GEMINI_API_KEY) found in .env.");
        }
    } catch (error) {
        console.error("Error generating story with AI:", error.message);
        if (error.response && error.response.status) {
            return `Failed to generate story. AI service responded with status: ${error.response.status}. Please check your API key or usage limits.`;
        }
        throw new Error("Failed to generate story due to an internal AI error. Please check backend console for details.");
    }
}

app.post('/generate-story', async (req, res) => {
    const { genre, keywords, episodic } = req.body;

    if (!genre) {
        return res.status(400).json({ error: "Genre is required." });
    }

    console.log(`Received request - Genre: ${genre}, Keywords: ${keywords}, Episodic: ${episodic}`);

    try {
        const storyContent = await generateStoryWithAI(genre, keywords, episodic);
        res.json({ story: storyContent });
    } catch (error) {
        console.error("Error in /generate-story endpoint:", error);
        res.status(500).json({ error: "Failed to generate story. Please try again." });
    }
});

app.listen(port, () => {
    console.log(`Story Generator backend listening at http://localhost:${port}`);
    console.log("Ensure your .env file in the 'backend' directory contains GEMINI_API_KEY.");
});
