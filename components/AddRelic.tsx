import React, { useState } from "react";
import Select from "react-select";
import relics from "@/app/relic-sets/relics.json";
import stats from "@/app/relic-sets/stats.json";
import { useEffect } from "react";
import styled from "@emotion/styled";

const PartSelect = styled(Select)`
  color: #000000;
  width: 150px;
  margin: 2px;
`;

const PartSelector = ({ part, stats }: { part: string; stats: any }) => {
  const main = getStatsByPart(part, "main", stats);
  const sub = getStatsByPart(part, "sub", stats);
  const [mainS, setMainS] = useState(null);
  const [sub1, setSub1] = useState(null);
  const [sub2, setSub2] = useState(null);
  const [sub3, setSub3] = useState(null);
  const [sub4, setSub4] = useState(null);

  return (
    <div className="flex flex-col p-5">
      {part} Image Placeholder <br />
      {"Main Stat"}
      <PartSelect
        options={main}
        isClearable={true}
        isSearchable={true}
        isDisabled={part === "hat" || part === "glove" ? true : false}
        value={part === "hat" || part === "glove" ? main[0] : mainS}
        onChange={(selectedOption: any) => setMainS(selectedOption)}
      />
      {"Sub Stats"}
      <PartSelect
        options={sub}
        isClearable={true}
        isSearchable={true}
        value={sub1}
        onChange={(selectedOption: any) => setSub1(selectedOption)}
      />
      <PartSelect
        options={sub}
        isClearable={true}
        isSearchable={true}
        value={sub2}
        onChange={(selectedOption: any) => setSub2(selectedOption)}
      />
      <PartSelect
        options={sub}
        isClearable={true}
        isSearchable={true}
        value={sub3}
        onChange={(selectedOption: any) => setSub3(selectedOption)}
      />
      <PartSelect
        options={sub}
        isClearable={true}
        isSearchable={true}
        value={sub4}
        onChange={(selectedOption: any) => setSub4(selectedOption)}
      />
    </div>
  );
};

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: "2px solid #FFFFFF", // Border color
        color: "#FFFFFF", // Text color
        backgroundColor: "#7B67DF", // Background color
        padding: "5px", // Padding
        margin: "10px", // Margin
        borderRadius: "5px", // Rounded corners
        cursor: "pointer", // Pointer cursor on hover
        width: "70px",
      }}
    >
      {text}
    </button>
  );
};

function getTypeByName(name: string, relics: any) {
  for (const key in relics) {
    if (relics[key].name === name) {
      return relics[key].type;
    }
  }
  return null;
}

function getStatsByPart(part: string, query: string, stats: any) {
  for (const key in stats) {
    if (stats[key].part === part) {
      return query === "main" ? stats[key].mainStat : stats[key].subStat;
    }
  }
  return null;
}

const AddRelic = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    // setName("The Ashblazing Grand Duke");
    setName("Space Sealing Station");
  }, []);

  // if no relic is selected - default selection screen
  if (name === "") {
    return (
      <div className="p-2 border">
        <h1 className="text-3xl">Select a set to add</h1>
        {
          // all the sets here to be selected relics.map...
        }
      </div>
    );
  }

  // if a relic is selected
  else {
    const type = getTypeByName(name, relics);

    if (type === "Relic Set") {
      return (
        <>
          <div className="flex flex-col">
            <div className="flex flex-row m-3 items-center">
              <Button text={"< Back"} onClick={() => setName("")} />
              <div className="text-3xl">{name}</div>
            </div>
            <div className="flex flex-row">
              <PartSelector part={"hat"} stats={stats} />
              <PartSelector part={"glove"} stats={stats} />
              <PartSelector part={"shoes"} stats={stats} />
              <PartSelector part={"body"} stats={stats} />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-col">
            <div className="flex flex-row m-3 items-center">
              <Button text={"< Back"} onClick={() => setName("")} />
              <div className="text-3xl">{name}</div>
            </div>
            <div className="flex flex-row">
              <PartSelector part={"sphere"} stats={stats} />
              <PartSelector part={"rope"} stats={stats} />
            </div>
          </div>
        </>
      );
    }
  }
};

export default AddRelic;
