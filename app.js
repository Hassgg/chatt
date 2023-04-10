const express = require("express");
const app = express();
const openai = require("openai");
const axios = require("axios");

openai.apiKey = "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";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/chat", async (req, res) => {
  const message = req.body.message;

  try {
    // إجراء طلب إلى OpenAI API باستخدام axios
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: message,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openai.apiKey}`,
        },
      }
    );

    // استخراج الاستجابة من البيانات المستلمة
    const responseText = openaiResponse.data.choices[0].text.trim();

    // إرسال الرد للعميل
    res.json({ message: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء معالجة طلبك" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
