// const express = require('express');
// const cors = require('cors'); 
// const app = express();
// const port = 8000; 
// require('dotenv').config();


// const { GoogleGenerativeAI } = require('@google/generative-ai'); 

// app.use(cors()); 
// app.use(express.json()); 

// async function generateStoryWithAI(genre, keywords, episodic) {
//     let prompt = `Write a compelling ${genre} story. `;

//     if (keywords && keywords.length > 0 && keywords[0] !== '') {
//         prompt += `It must include the following elements: ${keywords.join(', ')}. `;
//     }

//     if (episodic) {
//         prompt += `The story should be structured episodically, with clear breaks between parts. `;
//     } else {
//         prompt += `The story should be a single, continuous narrative. `;
//     }

//     prompt += `Make it imaginative, unique, and engaging. Keep the story between 250-400 words.`;

//     try {

//         if (process.env.GEMINI_API_KEY) {
//             const API_KEY = process.env.GEMINI_API_KEY;
//             const genAI = new GoogleGenerativeAI(API_KEY);
//             const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//             console.log("Sending prompt to Gemini:", prompt);
//             const result = await model.generateContent(prompt);
//             const response = await result.response;
//             const text = response.text();
//             console.log("Received story from Gemini:", text.substring(0, 100) + "..."); 
//             return text;
//         }
//         else {
//             console.warn("No Generative AI API key (GEMINI_API_KEY or OPENAI_API_KEY) found in .env.");
//             const mockStories = {
//                 "mystery": "Detective Miles Corbin stared at the dusty, antique locket. The The old man's journal lay open, hinting at a truth far darker than anyone imagined. The silence screamed answers, but only to those who dared to listen.",
//                 "sci-fi": "The chrome glinted under the twin suns of Kepler-186f. Unit 734-Alpha, a sentient repair bot, scanned the damaged hyperdrive. Its primary directive: survive. But a strange, resonant hum from the planet's core suggested a new, unplanned mission was about to begin.",
//                 "romance": "Elara traced the condensation on her coffee cup, lost in thought. Across the bustling cafe, Liam's laughter cut through the din, a melody she'd unexpectedly fallen in love with. Their eyes met, and in that fleeting moment, the world outside seemed to fade, leaving only the quiet promise of a shared future.",
//                 "thriller": "The ticking was faint, but relentless. Sarah pressed herself against the cold brick wall, her breath hitched in her throat. She had only moments to disarm the device, moments before the city plunged into chaos. The red light pulsed, mocking her racing heart.",
//             };

//             let generatedStory = mockStories[genre] || `A compelling ${genre} story is brewing... `;

//             if (keywords && keywords.length > 0 && keywords[0] !== '') {
//                 generatedStory += `\n\n(Incorporating elements like: ${keywords.join(', ')})`;
//             }
//             if (episodic) {
//                 generatedStory += "\n\n(This would be an episodic narrative.)";
//             }
//             return generatedStory;
//         }

//     } catch (error) {
//         console.error("Error generating story with AI:", error.message);
//         if (error.response && error.response.status) {
//             return `Failed to generate story. AI service responded with status: ${error.response.status}. Please check your API key or usage limits.`;
//         }
//         return "Failed to generate story due to an internal AI error. Please check backend console for details.";
//     }
// }

// app.post('/generate-story', async (req, res) => {
//     const { genre, keywords, episodic } = req.body;

//     if (!genre) {
//         return res.status(400).json({ error: "Genre is required." });
//     }

//     console.log(`Received request - Genre: ${genre}, Keywords: ${keywords}, Episodic: ${episodic}`);

//     try {
//         const storyContent = await generateStoryWithAI(genre, keywords, episodic);
//         res.json({ story: storyContent });
//     } catch (error) {
//         console.error("Error in /generate-story endpoint:", error);
//         res.status(500).json({ error: "Failed to generate story. Please try again." });
//     }
// });

// app.listen(port, () => {
//     console.log(`Story Generator backend listening at http://localhost:${port}`);
//     console.log("Ensure your .env file in the 'backend' directory contains GEMINI_API_KEY or OPENAI_API_KEY.");
// });