import ChatMessage from "./ChatMessage";

//main box that shows all of the messages
function ChatWindow(props) {
  let messages = props.messages;

  return (
    <div className="chat-window">
      {/* conditional rendering. show a welcome message if there are no messages yet */}
      {messages.length === 0 && (
        <div className="welcome-message">
          <p>Welcome! Type something below to start chatting with the bot.</p>
        </div>
      )}

      {messages.map(function (message) {
        return <ChatMessage key={message.id} sender={message.sender} text={message.text} />;
      })}

      {/* conditional rendering. typing indicator only shows while waiting on the bot */}
      {props.isTyping && (
        <div className="message bot">
          <p className="typing-indicator">Bot is typing...</p>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
