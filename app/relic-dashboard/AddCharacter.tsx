import characters from "@/app/characters/characters.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddRelic from "@/app/relic-dashboard/AddRelic";
import Button from "@/components/Button";

const AddCharacter = ({ charData, closePopup, backToChar }: any) => {
  const [charSelected, setCharSelected] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState(characters);
  const [unfilteredCharacters, setUnfilteredCharacters] = useState(characters);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | undefined>(
    undefined,
  );

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
    } else {
      setFilteredCharacters(characters);
      setUnfilteredCharacters([]);
    }
  }, [charData]);

  if (charSelected === "") {
    return (
      <div className="flex flex-col p-4">
        <div className="mb-4">
          <Button text="Close" onClick={closePopup} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Select a character to add</h2>
        <div className="h-0.5 w-12 rounded-full bg-gradient-accent mb-4" />

        <h3 className="text-base font-semibold mb-3" style={{ color: "var(--foreground-muted)" }}>
          Add a new set
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {filteredCharacters.map((character) => (
            <div key={character.name}>
              <Image
                src={`/char-images/${character.name.replaceAll(" ", "_")}.png`}
                alt={character.name}
                width={160}
                height={188}
                style={{
                  width: 64,
                  height: 73.5,
                  borderRadius: 14,
                  cursor: "pointer",
                  border: hoveredCharacter === character.name
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setCharSelected(character.name)}
                onMouseEnter={() => setHoveredCharacter(character.name)}
                onMouseLeave={() => setHoveredCharacter(undefined)}
              />
            </div>
          ))}
        </div>
        {unfilteredCharacters.length > 0 && (
          <>
            <h3 className="text-base font-semibold mt-6 mb-3" style={{ color: "var(--foreground-muted)" }}>
              Add another set
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {unfilteredCharacters.map((character) => (
                <div key={character.name}>
                  <Image
                    src={`/char-images/${character.name.replaceAll(" ", "_")}.png`}
                    alt={character.name}
                    width={160}
                    height={188}
                    style={{
                      width: 64,
                      height: 73.5,
                      borderRadius: 14,
                      cursor: "pointer",
                      border: hoveredCharacter === character.name
                        ? "2px solid var(--accent)"
                        : "2px solid transparent",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setCharSelected(character.name)}
                    onMouseEnter={() => setHoveredCharacter(character.name)}
                    onMouseLeave={() => setHoveredCharacter(undefined)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <AddRelic
        charSelected={charSelected}
        closePopup={closePopup}
        backToChar={backToChar}
      />
    );
  }
};

export default AddCharacter;
