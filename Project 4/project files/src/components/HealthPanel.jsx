//handles the health bar,the damage, and heal buttons
function HealthPanel({ character, health, onDamage, onHeal, onReset }) {
  //calcs what percent health they are at for the warning message
  let healthPercent = (health / character.maxHealth) * 100;

  return (
    <div className="health-panel">
      <h2>Health</h2>

      <div className="health-bar-outer">
        <div
          className="health-bar-inner"
          style={{ width: healthPercent + "%" }}
        ></div>
      </div>

      <p className="health-numbers">
        {health} / {character.maxHealth} HP
      </p>

      {/*show if health is low, otherwise dont*/}
      {healthPercent < 25 && (
        <p className="low-health-warning">Health is critically low!</p>
      )}

      <div className="health-buttons">
        <button className="damage-btn" onClick={onDamage}>
          Take 10 Damage
        </button>
        <button className="heal-btn" onClick={onHeal}>
          Heal 10 HP
        </button>
        <button className="reset-btn" onClick={onReset}>
          Reset Health
        </button>
      </div>
    </div>
  );
}

export default HealthPanel;
