<template>
  <main class="container py-4">
    <div class="chat-container">
      <div class="d-flex align-content-center justify-content-evenly mb-3" style="width: 250px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="10px"
          y="10px"
          width="35"
          height="35"
          viewBox="0 0 32 32"
          class=""
        >
          <radialGradient
            id="OtCq8xA9WcMqTYvHIGk1Ca_iBkBIBWE6tfT_gr1"
            cx="22.154"
            cy="24.931"
            r="26.492"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#1ba1e3"></stop>
            <stop offset="0" stop-color="#1ba1e3"></stop>
            <stop offset=".432" stop-color="#5489d6"></stop>
            <stop offset=".777" stop-color="#9b72cb"></stop>
          </radialGradient>
          <path
            fill="url(#OtCq8xA9WcMqTYvHIGk1Ca_iBkBIBWE6tfT_gr1)"
            d="M16,0l0.028,0.722c0.327,8.283,6.967,14.923,15.25,15.25L32,16l-0.722,0.028	c-8.283,0.327-14.923,6.967-15.25,15.25L16,32l-0.028-0.722c-0.327-8.283-6.967-14.923-15.25-15.25L0,16l0.722-0.028	c8.283-0.327,14.923-6.967,15.25-15.25L16,0z"
          ></path>
          <linearGradient
            id="OtCq8xA9WcMqTYvHIGk1Cb_iBkBIBWE6tfT_gr2"
            x1="16"
            x2="16"
            y1="0"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-opacity=".02"></stop>
            <stop offset="1" stop-opacity=".15"></stop>
          </linearGradient>
          <path
            fill="url(#OtCq8xA9WcMqTYvHIGk1Cb_iBkBIBWE6tfT_gr2)"
            d="M31.278,15.972	c-8.283-0.327-14.923-6.967-15.25-15.25L16,0l-0.028,0.722c-0.327,8.283-6.967,14.923-15.25,15.25L0,16l0.722,0.028	c8.283,0.327,14.923,6.967,15.25,15.25L16,32l0.028-0.722c0.327-8.283,6.967-14.923,15.25-15.25L32,16L31.278,15.972z M16,29.174	C14.842,22.487,9.512,17.158,2.826,16C9.512,14.842,14.842,9.512,16,2.826C17.158,9.512,22.488,14.842,29.174,16	C22.488,17.158,17.158,22.487,16,29.174z"
          ></path>
        </svg>
        <h2>Gemini Chat</h2>
      </div>
      <div class="container d-flex flex-column align-items-between justify-content-center w-100">
        <select id="model" class="form-select">
          <option value="gemini-2.5-flash">gemini-2.5-flash</option>
          <option value="gemini-2.5-pro">gemini-2.5-pro</option>
          <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite</option>
        </select>
        <div class="chat-box">
          <div id="chat"></div>
        </div>
        <div class="input-group mt-3">
          <input
            type="text"
            id="prompt"
            class="form-control"
            placeholder="Ask Gemini something..."
          />
          <button class="btn btn-primary" onclick="sendMsg()">Send</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script></script>

<style>
/* Page setup */
body {
  font-family: Arial, sans-serif;
  background: #f7f7f7;
  margin: 0;
  padding: 0;
  height: 100vh;
}

.chat-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px dashed #333;
  padding: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-box {
  background: #fff;
  border-radius: 10px;
  border: 1px dashed #333;
  padding: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Messages */
.msg-ai {
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;
  padding: 10px;
}

.msg-user {
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding: 10px;
}

.user {
  width: auto;
  color: white;
  padding: 6px;
  background: #4cafef;
  text-align: end;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  animation: fadeIn 0.3s ease-in;
}

.ai {
  width: auto;
  color: #333;
  padding: 6px;
  background: #eaeaea;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  animation: fadeIn 0.3s ease-in;
}

/* Input area */
.input-area {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 10px;
  background: #fafafa;
}

#user-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
}

#send-btn {
  background: #4cafef;
  color: white;
  border: none;
  margin-left: 8px;
  padding: 10px 16px;
  border-radius: 50%;
  cursor: pointer;
}

#send-btn:hover {
  background: #2196f3;
}

/* Typing indicator (three bouncing dots) */
.typing {
  display: flex;
  gap: 4px;
  background: #eaeaea;
  padding: 10px 14px;
  border-radius: 15px;
  width: fit-content;
  align-self: flex-start;
}

.typing span {
  width: 8px;
  height: 8px;
  background: #999;
  border-radius: 50%;
  display: inline-block;
  animation: bounce 1.2s infinite;
}

.typing span:nth-child(1) {
  animation-delay: 0s;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.5;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Fade-in animation for messages */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
