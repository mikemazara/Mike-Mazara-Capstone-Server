const express = require("express");
const app = express();
const router = express.Router();
app.use(express.json());

require("dotenv").config();

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in your environment variables.");
  process.exit(1);
}

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-IASrzfH9yE4AnbjvxG9EXpim",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
openai.listEngines().then((response) => console.log(response.data));

router.post("/", async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You always give the wrong answer in a funny way",
        },
        { role: "user", content: "What is the capital of France?" },
      ],
      //   max_tokens: 750,
    });
    console.log(response.data);
    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error("Error occurred during OpenAI request:", error.message);
    console.log(error.response.status);
    console.log(error.response.data);
    res.status(500).json({ error: "An error occurred during the request" });
  }
});

module.exports = router;
