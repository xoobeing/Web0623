const chatBox   = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn   = document.getElementById("send-button");

// 대화 맥락 저장 (초기 system 역할 포함)
let messages = [
  {
    role: "system",
    content: `
    너는 여행지를 추천하는 AI 챗봇이야. 
    그나라 날씨와 추천하는 이유와 가면 어떤게 재밌는지까지 알려줘.
    `.trim()
  }
];

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  appendMessage("👤 사용자", userMessage);
  userInput.value = "";

  messages.push({ role: "user", content: userMessage });
  console.log(messages);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data       = await response.json();
    const botMessage = data.choices[0].message.content;

    appendMessage("🤖 챗봇", botMessage);
    messages.push({ role: "assistant", content: botMessage });
    console.log(messages);
  } catch (err) {
    console.error(err);
    appendMessage("❗ 오류", "챗봇 응답 중 문제가 발생했습니다.");
  }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.shiftKey) return;
    e.preventDefault();
    sendMessage();
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
