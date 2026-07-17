import { useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import InfoPanel from "./components/InfoPanel";
import "./App.css";

//prewritten bot answers
function getBotResponse(userInput) {
  let lowerInput = userInput.toLowerCase();

  if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
    return "Hey! What do you want to know about web scripting?";
  }

  if (lowerInput.includes("react")) {
    return "React is a JavaScript library that helps build user interfaces out of components.";
  }

  if (lowerInput.includes("props")) {
    return "Props are basically how a parent component passes data down into a child component.";
  }

  if (lowerInput.includes("state")) {
    return "State is data that a component keeps track of, and when it changes React re-renders.";
  }

  if (lowerInput.includes("form")) {
    return "A controlled form is when React state controls the value of the input instead of the DOM.";
  }

  if (lowerInput.includes("html")) {
    return "HTML is what structures the content on a webpage, like the skeleton of the page.";
  }

  if (lowerInput.includes("css")) {
    return "CSS is for styling. It's what makes this chat app look purple instead of plain white.";
  }

  if (lowerInput.includes("js") || lowerInput.includes("javascript")) {
    return "JavaScript is the programming language that makes web pages interactive and dynamic. It's what powers the logic behind everything you see.";
  }

  if (lowerInput.includes("jsx")) {
    return "JSX looks like HTML but lives inside JavaScript. It lets you write UI components in a more readable way before React compiles it down.";
  }

  if (lowerInput.includes("vite")) {
    return "Vite is a modern build tool that makes starting and developing web projects super fast. Think of it as your project's turbo engine!";
  }

  if (lowerInput.includes("web scripting")) {
    return "Web scripting just means using code like JavaScript to add behavior, interactivity, and logic to websites beyond static HTML and CSS.";
  }

  if (lowerInput.includes("json")) {
    return "JSON is a lightweight data format used to store and exchange information. It looks like JavaScript objects but is strictly text-based for safe communication between systems.";
  }

  if (lowerInput.includes("github")) {
    return "GitHub is where developers host code, collaborate on projects, and track changes using Git. It's basically the social network for programmers!";
  }

  if (lowerInput.includes("bye")) {
    return "See you later! Good luck on the rest of the project.";
  }

  //generic responses if none of the keywords matched
  let genericResponses = [
    "That's interesting, tell me more.",
    "Hmm, I am not sure about that one yet.",
    "Can you explain that a little more?",
    "Try asking me about Web Scripting concepts.",
    "I am still learning, but that sounds cool."
  ];
  let randomIndex = Math.floor(Math.random() * genericResponses.length);
  return genericResponses[randomIndex];
}

function App() {
  //array of all the messages in the chat, each one has id/sender/text
  const [messages, setMessages] = useState([]);

  //controlled input state
  const [input, setInput] = useState("");

  //error message for validation
  const [error, setError] = useState("");

  //shows a little "bot is typing..." message before the response shows up
  const [isTyping, setIsTyping] = useState(false);

  //toggles the info panel on the side
  const [showInfo, setShowInfo] = useState(false);

  function handleInputChange(event) {
    setInput(event.target.value);
    //clear the error once they start typing again
    if (error !== "") {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    let trimmedInput = input.trim();

    //validation. no empty messages allowed
    if (trimmedInput === "") {
      setError("Message cannot be empty.");
      return;
    }

    //validation. also dont let them send something super short
    if (trimmedInput.length < 2) {
      setError("Message must be at least 2 characters long.");
      return;
    }

    setError("");

    let userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedInput,
    };

    //add the user message right away
    setMessages(function (prevMessages) {
      return [...prevMessages, userMessage];
    });

    setInput("");
    setIsTyping(true);

    //fake delay so it feels like the bot is actually thinking
    setTimeout(function () {
      let botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotResponse(trimmedInput),
      };

      setMessages(function (prevMessages) {
        return [...prevMessages, botMessage];
      });

      setIsTyping(false);
    }, 900);
  }

  function handleClearChat() {
    setMessages([]);
    setError("");
  }

  function handleToggleInfo() {
    setShowInfo(!showInfo);
  }

  return (
    <div className="app-container">
      <ChatHeader onClearChat={handleClearChat} onToggleInfo={handleToggleInfo} />

      <div className="main-area">
        {/* conditional rendering. only show info panel when the button was clicked */}
        {showInfo && <InfoPanel />}

        <ChatWindow messages={messages} isTyping={isTyping} />
      </div>

      <ChatInput
        input={input}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
