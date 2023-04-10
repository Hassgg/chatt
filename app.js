function sendMessageToServer(message) {
    // استبدل هذا الرابط برابط خادم النهاية الخلفية الخاص بك
    const serverURL = "https://hassgg.github.io/chatt/api/chat";

    const data = { message: message };
  
    fetch(serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // أضف رسالة المستخدم إلى مربع الدردشة
        appendMessage("user", message);
  
        // أضف رد الخادم (الرد من OpenAI) إلى مربع الدردشة
        appendMessage("server", data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  // دالة لإلحاق رسالة إلى مربع الدردشة
  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
  
    // اضبط التمرير تلقائيًا لأسفل مربع الدردشة
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  