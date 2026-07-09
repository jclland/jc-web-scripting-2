//shows the inventory list, can be toggled open or closed
function InventoryPanel({ character, showInventory, onToggle }) {
  return (
    <div className="inventory-panel">
      <div className="inventory-header-row">
        <h2>Inventory</h2>
        <button className="toggle-btn" onClick={onToggle}>
          {showInventory ? "Hide Items" : "Show Items"}
        </button>
      </div>

      {/*only render the list stuff if showInventory is true*/}
      {showInventory && (
        <div className="inventory-list-wrap">
          {character.inventory.length === 0 ? (
            <p className="no-items-msg">No items in inventory.</p>
          ) : (
            <ul className="inventory-list">
              {character.inventory.map(function (item, i) {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default InventoryPanel;
