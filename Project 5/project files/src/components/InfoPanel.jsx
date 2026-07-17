//sidebar panel with some example topics you can ask the bot about
function InfoPanel() {
  let topics = ["react", "props", "state", "forms", "html", "css", "js"];

  return (
    <div className="info-panel">
      <h3>Try asking about:</h3>
      <ul>
        {topics.map(function (topic, index) {
          return <li key={index}>{topic}</li>;
        })}
      </ul>
      <p className="info-note">This bot doesn't connect to a real AI, its just keyword matching.</p>
    </div>
  );
}

export default InfoPanel;
