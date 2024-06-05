// the relic pop up form
import React, { useState } from "react";
import relics from "@/app/relic-sets/relics.json";
// import Button from "@/components/Button";
import { useEffect } from "react";

function Head() {
  return (
    <div className="flex flex-col p-5">
      {"image"} <br />
      {"mainstat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"}
    </div>
  );
}

function Arm() {
  return (
    <div className="flex flex-col p-5">
      {"image"} <br />
      {"mainstat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"}
    </div>
  );
}

function Feet() {
  return (
    <div className="flex flex-col p-5">
      {"image"} <br />
      {"mainstat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"}
    </div>
  );
}

function Body() {
  return (
    <div className="flex flex-col p-5">
      {"image"} <br />
      {"mainstat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"}
    </div>
  );
}

function Sphere() {
  return (
    <div className="flex flex-col p-5">
      {"image"} <br />
      {"mainstat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"}
    </div>
  );
}

function Rope() {
  return (
    <div className="flex flex-col p-5">
      {"image"} <br />
      {"mainstat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"} <br />
      {"substat"}
    </div>
  );
}

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

const AddRelic = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
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
              <Head />
              <Arm />
              <Body />
              <Feet />
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
              <Sphere />
              <Rope />
            </div>
          </div>
        </>
      );
    }
  }
};

export default AddRelic;
