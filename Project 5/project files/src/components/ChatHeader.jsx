function ChatHeader(props) {
  return (
    <div className="chat-header">
      <h1>Project 5: AI Chatbot Simulation</h1>
      <p className="header-subtitle">Jaiden Carnahan | Web Scripting II | 2026</p>

      <div className="header-buttons">
        <button onClick={props.onToggleInfo} className="header-btn">
          Info
        </button>
        <button onClick={props.onClearChat} className="header-btn clear-btn">
          Clear Chat
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
