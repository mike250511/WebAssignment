import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

function AiChatBot({ addBook }) {
  //constants
  const apiKey = useRef(null);
  const genAI = useRef(null);
  const model = useRef(null);
  const [isApiKeyFetched, setIsApiKeyFetched] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    getApiKey();
  }, []);

  async function getApiKey() {
    try {
      const snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
      if (snapshot.exists()) {
        apiKey.current = snapshot.data().key;
        setIsApiKeyFetched(true);
        console.log("API Key fetched successfully");
      } else {
        console.error("No API key found in Firebase.");
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
    }
  }

  async function askChatBot(request) {
    if (!isApiKeyFetched) {
      appendMessage("API Key is not loaded yet.");
      return;
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.current}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: request }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.choices[0]?.message?.content;
      if (!botReply) {
        appendMessage("No response from the chatbot. Please try again.");
        return;
      }

      appendMessage(botReply);

    } catch (error) {
      console.error("Error calling chatbot:", error);
      appendMessage("An error occurred. Please try again later.");
    }
  }

  function appendMessage(message) {
    setChatHistory((prevHistory) => [...prevHistory, message]);
  }

  function aiChatBotHandler() {
    const aiInput = document.getElementById("chat-input");
    let prompt = aiInput.value.trim().toLowerCase();

    if (prompt) {
      if (!ruleChatBot(prompt)) {
        askChatBot(prompt);
      }
    } else {
      appendMessage("Please enter a prompt.");
    }
  }

  function ruleChatBot(request) {
    if (request.startsWith("add book")) {
      let bookDetails = request.replace("add book", "").trim();
      const bookRegex = /"([^"]+)" by ([a-zA-Z\s.]+),\s*Genre:\s*([a-zA-Z\s]+)/i;
      const match = bookDetails.match(bookRegex);

      if (match) {
        const title = match[1].trim();
        const author = match[2].trim();
        const genre = match[3].trim();

        if (title && author && genre) {
          addBook({ title, author, genre });
          appendMessage(`Book added: "${title}" by ${author}, Genre: ${genre}`);
        } else {
          appendMessage("Please provide valid book details (Title, Author, Genre).");
        }
      } else {
        appendMessage("Invalid book details format. Please use: 'add book \"Title\" by Author, Genre: Genre'.");
      }
      return true;
    }
    return false;
  }

  return (
    <div id="chatbot-container" style={{ width: '300px', border: '1px solid #ccc', padding: '10px', position: 'fixed', bottom: '20px', right: '20px', background: 'white', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div id="chat-history" style={{ height: '200px', overflowY: 'auto', borderBottom: '1px solid #ccc', marginBottom: '10px', padding: '5px' }}>
        {chatHistory.map((msg, index) => (
          <div key={index} className="history">{msg}</div>
        ))}
      </div>
      <input type="text" id="chat-input" style={{ width: 'calc(100% - 60px)', padding: '5px', marginRight: '5px' }} />
      <button id="send-btn" style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={aiChatBotHandler}>Send</button>
    </div>
  );
}

export default AiChatBot;
