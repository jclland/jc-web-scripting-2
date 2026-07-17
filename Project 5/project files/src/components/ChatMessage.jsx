//one single message bubble. sender is either "user" or "bot"
function ChatMessage(props) {
  return (
    <div className={"message " + props.sender}>
      <span className="sender-label">{props.sender === "user" ? "You" : "Bot"}</span>
      <p>{props.text}</p>
    </div>
  );
}

export default ChatMessage;
