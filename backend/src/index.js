require("dotenv").config();
import express from "express";
import OpenAI from "openai";
import { getSystemPrompt ,BASE_PROMPT } from "./prompts";
import {basePrompt as nodeBasePrompt} from "./defaults/node";
import {basePrompt as reactBasePrompt} from "./defaults/react";
import cors from "cors";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Now using the environment variable
});

const app = express();
app.use(express.json())
app.use(cors())


app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;
    
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        store: true,
        stream: true,
        system: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }

    const answer = response.content[0].text; 

if (answer === "react") {
    res.json({
        prompts: [
            BASE_PROMPT,
            `Here is an artifact that contains all files of the project visible to you.
            Consider the contents of ALL files in the project.
            
            ${reactBasePrompt}
            
            Here is a list of files that exist on the file system but are not being shown to you:
            
              - .gitignore
              - package-lock.json
            `
        ],
        uiPrompts: [reactBasePrompt]
    });
    return;
}

if (answer === "node") {
    res.json({
        prompts: [
            `Here is an artifact that contains all files of the project visible to you.
            Consider the contents of ALL files in the project.
            
            ${reactBasePrompt}
            
            Here is a list of files that exist on the file system but are not being shown to you:
            
              - .gitignore
              - package-lock.json
            `
        ],
        uiPrompts: [nodeBasePrompt]
    });
    return;
}
res.status(403).json({message: "You cant access this"})
    return;


})

app.post("/chat" , async(req,res) => {
    const messages = req.body.messages;
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        store: true,
        stream: true,
        system: getSystemPrompt()
    })
    console.log(response);

    res.json({
        response: response.content[0]?.text 
    });
    

})

app.listen(3000);






// async function sendMessage() {
    
//     for await (const chunk of stream) {
//         process.stdout.write(chunk.choices[0]?.delta?.content || "");
//     }
// }

// sendMessage();

