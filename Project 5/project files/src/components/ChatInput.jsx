//the form at the bottom where you type your message
function ChatInput(props) {
  return (
    <form className="chat-input-form" onSubmit={props.onSubmit}>
      {/* conditional rendering. error only shows up when there actually is one */}
      {props.error && <p className="error-message">{props.error}</p>}

      <div className="input-row">
        <input
          type="text"
          value={props.input}
          onChange={props.onInputChange}
          placeholder="Type a message..."
          className="chat-text-input"
        />
        <button type="submit" className="send-btn" disabled={props.input.trim() === ""}>
          Send
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
