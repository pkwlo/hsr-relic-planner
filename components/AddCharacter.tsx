import characters from "@/app/characters/characters.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddRelic from "@/components/AddRelic";

const AddCharacter = ({ charData }: any) => {
  const [charSelected, setCharSelected] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState(characters);
  const [unfilteredCharacters, setUnfilteredCharacters] = useState(characters);

  useEffect(() => {
    if (charData && charData.length > 0) {
      const charNamesToExclude = charData.map((char: any) => char.char);
      setFilteredCharacters(
        characters.filter(
          (character) => !charNamesToExclude.includes(character.name),
        ),
      );
      setUnfilteredCharacters(
        characters.filter((character) =>
          charNamesToExclude.includes(character.name),
        ),
      );
    }
  }, [charData]); // Run this effect only when charData changes

  const handleCharacterSelect = (characterName: string) => {
    setCharSelected(characterName);
  };

  if (charSelected === "") {
    return (
      <div className="flex flex-col p-2">
        <h1 className="text-3xl py-3">Select a character to add</h1>
        <h1 className="text-xl py-3">Add a new set</h1>
        <div className="flex flex-wrap">
          {filteredCharacters.map((character) => (
            <div key={character.name}>
              <Image
                src={`/char-images/${character.name.replaceAll(" ", "_")}.png`}
                alt={character.name}
                width={160}
                height={188}
                style={{
                  width: 75,
                  height: 86.25,
                  border: "1px solid #FFFFFF",
                  borderRadius: 20,
                  margin: 5,
                  cursor: "pointer",
                }}
                onClick={() => handleCharacterSelect(character.name)}
              />
            </div>
          ))}
        </div>
        <h1 className="text-xl py-3">Add another set</h1>
        <div className="flex flex-wrap">
          {unfilteredCharacters.map((character) => (
            <div key={character.name}>
              <Image
                src={`/char-images/${character.name.replaceAll(" ", "_")}.png`}
                alt={character.name}
                width={160}
                height={188}
                style={{
                  width: 75,
                  height: 86.25,
                  border: "1px solid #FFFFFF",
                  borderRadius: 20,
                  margin: 5,
                  cursor: "pointer",
                }}
                onClick={() => handleCharacterSelect(character.name)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <AddRelic charSelected={charSelected} />;
  }
};

export default AddCharacter;
