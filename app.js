const express = require("express");
const app = express();
const openai = require("openai");
const axios = require("axios");

openai.apiKey = "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";

// إعداد وظيفة الدردشة
async function chat(prompt) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return "عذراً، لا يمكنني الرد حالياً.";
  }
}

// إعداد مسارات التطبيق
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/chat", async (req, res) => {
  const message = req.body.message;
  const reply = await chat(message);
  res.json({ reply: reply });
});

// بدء تشغيل خادم التطبيق
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
