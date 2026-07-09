//reusable card, gets used with different props
function StatCard({ title, value, description }) {
  return (
    <div className="stat-card">
      <h2>{title}</h2>
      <p className="value">{value}</p>
      <p className="stat-desc">{description}</p>
    </div>
  );
}

export default StatCard;
