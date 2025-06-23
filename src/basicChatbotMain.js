const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  appendMessage("👤 사용자", userMessage);
  userInput.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    appendMessage("🤖 챗봇", botMessage);
  } catch (error) {
    console.error("Error:", error);
    appendMessage("❗ 오류", "챗봇 응답 중 문제가 발생했습니다.");
  }
});

function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
