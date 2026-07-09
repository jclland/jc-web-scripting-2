import { useState } from "react";
import Header from "./components/Header.jsx";
import StatCard from "./components/StatCard.jsx";
import CharacterSelect from "./components/CharacterSelect.jsx";
import HealthPanel from "./components/HealthPanel.jsx";
import InventoryPanel from "./components/InventoryPanel.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

//sample data for the characters
const characterList = [
  {
    id: 1,
    name: "Hoarah Loux",
    class: "Warrior",
    maxHealth: 250,
    avatar: "🛡️",
    inventory: ["Great Axe", "Steel Armor"]
  },
  {
    id: 2,
    name: "Ranni the Witch",
    class: "Mage",
    maxHealth: 120,
    avatar: "🔮",
    inventory: ["Spell Tome", "Starlight Shard", "Moonlight Greatsword"]
  },
  {
    id: 3,
    name: "Patches",
    class: "Rogue",
    maxHealth: 90,
    avatar: "🗡️",
    inventory: ["Spear", "Greatshield"]
  }
];

function App() {
  //keeps track of which character is currently picked
  const [selectedId, setSelectedId] = useState(characterList[0].id);

  //keeps track of health for EACH character, not just the one selected
  //so switching characters doesn't reset their health back to full
  const [healthMap, setHealthMap] = useState(function () {
    let startingHealth = {};
    for (let i = 0; i < characterList.length; i++) {
      startingHealth[characterList[i].id] = characterList[i].maxHealth;
    }
    return startingHealth;
  });

  //toggle for showing/hiding the inventory section
  const [showInventory, setShowInventory] = useState(false);

  //grab the full character object that matches selectedId
  function getSelectedCharacter() {
    for (let i = 0; i < characterList.length; i++) {
      if (characterList[i].id === selectedId) {
        return characterList[i];
      }
    }
    return characterList[0];
  }

  let selectedCharacter = getSelectedCharacter();
  let currentHealth = healthMap[selectedId];

  //when a damage button is clicked, subtract 10 but dont go below 0
  function handleDamage() {
    let newHealth = currentHealth - 10;
    if (newHealth < 0) {
      newHealth = 0;
    }
    setHealthMap({ ...healthMap, [selectedId]: newHealth });
  }

  //heal 10 but dont go over the characters max health
  function handleHeal() {
    let newHealth = currentHealth + 10;
    if (newHealth > selectedCharacter.maxHealth) {
      newHealth = selectedCharacter.maxHealth;
    }
    setHealthMap({ ...healthMap, [selectedId]: newHealth });
  }

  //puts the health back to full for the selected character
  function handleReset() {
    setHealthMap({ ...healthMap, [selectedId]: selectedCharacter.maxHealth });
  }

  function handleSelectCharacter(id) {
    setSelectedId(id);
  }

  function toggleInventory() {
    setShowInventory(!showInventory);
  }

  return (
    <>
      <Header />

      <main className="dashboard-main">
        <CharacterSelect
          characters={characterList}
          selectedId={selectedId}
          onSelect={handleSelectCharacter}
        />

        {/*stat cards up top, reusing the same component with different props*/}
        <div className="stat-cards-row">
          <StatCard
            title="Class"
            value={selectedCharacter.class}
            description="Current character class"
          />
          <StatCard
            title="Health"
            value={currentHealth + " HP"}
            description={"Out of " + selectedCharacter.maxHealth + " max"}
          />
          <StatCard
            title="Items"
            value={selectedCharacter.inventory.length}
            description="Items in inventory"
          />
        </div>

        <div className="panels-row">
          <HealthPanel
            character={selectedCharacter}
            health={currentHealth}
            onDamage={handleDamage}
            onHeal={handleHeal}
            onReset={handleReset}
          />

          <InventoryPanel
            character={selectedCharacter}
            showInventory={showInventory}
            onToggle={toggleInventory}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
