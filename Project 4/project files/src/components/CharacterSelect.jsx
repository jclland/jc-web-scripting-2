//row of buttons up top so you can switch which character is selected
function CharacterSelect({ characters, selectedId, onSelect }) {
  return (
    <div className="character-select">
      {characters.map(function (char) {
        //add "selected" class if this is the one thats currently picked
        let btnClass = "char-btn";
        if (char.id === selectedId) {
          btnClass = btnClass + " selected-char";
        }

        return (
          <button
            key={char.id}
            className={btnClass}
            onClick={function () {
              onSelect(char.id);
            }}
          >
            <span className="char-avatar">{char.avatar}</span>
            {char.name}
          </button>
        );
      })}
    </div>
  );
}

export default CharacterSelect;
