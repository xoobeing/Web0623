// basicChatbotMain.js
console.log("✅ 환경변수 확인:", import.meta.env.VITE_OPENAI_API_KEY);


const chatBox   = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn   = document.getElementById("send-button");

// 메인 전송 함수 (클릭 + 엔터 둘 다 사용)
async function sendMessage() {
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

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data       = await response.json();
    const botMessage = data.choices[0].message.content;
    appendMessage("🤖 챗봇", botMessage);
  } catch (err) {
    console.error(err);
    appendMessage("❗ 오류", "챗봇 응답 중 문제가 발생했습니다.");
  }
}

// ▶ 버튼 클릭 시 전송
sendBtn.addEventListener("click", sendMessage);

// ▶ Enter 키 전송 & Shift+Enter 줄바꿈
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.shiftKey) return;   // Shift+Enter = 줄바꿈
    e.preventDefault();       // 폼 제출·개행 방지
    sendMessage();
  }
});

// 채팅창에 메시지 추가
function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
