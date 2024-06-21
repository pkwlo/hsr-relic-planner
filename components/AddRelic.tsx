import React, { useState, useEffect } from "react";
import Select from "react-select";
import relics from "@/app/relic-sets/relics.json";
import stats from "@/app/relic-sets/stats.json";
import styled from "@emotion/styled";
import Image from "next/image";

const PartSelect = styled(Select)`
  color: #000000;
  width: 150px;
  margin: 2px;
`;

const customStyles = {
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: "200px",
  }),
};

const PartSelector = ({
  part,
  stats,
  mainS,
  setMainS,
  sub1,
  setSub1,
  sub2,
  setSub2,
  sub3,
  setSub3,
  sub4,
  setSub4,
}: {
  part: string;
  stats: any;
  mainS: any;
  setMainS: any;
  sub1: any;
  setSub1: any;
  sub2: any;
  setSub2: any;
  sub3: any;
  setSub3: any;
  sub4: any;
  setSub4: any;
}) => {
  const main = getStatsByPart(part, "main", stats);
  const sub = getStatsByPart(part, "sub", stats);

  return (
    <div className="flex flex-col p-5">
      {part} Image Placeholder <br />
      {"Main Stat"}
      <PartSelect
        options={main}
        isClearable={true}
        isSearchable={true}
        value={mainS}
        onChange={(selectedOption) => setMainS(selectedOption)}
        styles={customStyles}
      />
      {"Sub Stats"}
      <PartSelect
        options={sub}
        isClearable={true}
        isSearchable={true}
        value={sub1}
        onChange={(selectedOption) => setSub1(selectedOption)}
        styles={customStyles}
      />
      <PartSelect
        options={sub}
        isClearable={true}
        isSearchable={true}
        value={sub2}
        onChange={(selectedOption) => setSub2(selectedOption)}
        styles={customStyles}
      />
      <PartSelect
        options={sub}
        isClearable={true}
        isSearchable={true}
        value={sub3}
        onChange={(selectedOption) => setSub3(selectedOption)}
        styles={customStyles}
      />
      <PartSelect
        options={sub}
        isClearable={true}
        isSearchable={true}
        value={sub4}
        onChange={(selectedOption) => setSub4(selectedOption)}
        styles={customStyles}
      />
    </div>
  );
};

const Button = ({ onClick, text }: { onClick: () => void; text: string }) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: "2px solid #FFFFFF",
        color: "#FFFFFF",
        backgroundColor: "#7B67DF",
        padding: "5px",
        margin: "10px",
        borderRadius: "5px",
        cursor: "pointer",
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

const AddRelic = ({ charSelected }: { charSelected: string }) => {
  const [name, setName] = useState("");
  const [hatStats, setHatStats] = useState({
    mainS: null,
    sub1: null,
    sub2: null,
    sub3: null,
    sub4: null,
  });
  const [gloveStats, setGloveStats] = useState({
    mainS: null,
    sub1: null,
    sub2: null,
    sub3: null,
    sub4: null,
  });
  const [shoesStats, setShoesStats] = useState({
    mainS: null,
    sub1: null,
    sub2: null,
    sub3: null,
    sub4: null,
  });
  const [bodyStats, setBodyStats] = useState({
    mainS: null,
    sub1: null,
    sub2: null,
    sub3: null,
    sub4: null,
  });
  const [sphereStats, setSphereStats] = useState({
    mainS: null,
    sub1: null,
    sub2: null,
    sub3: null,
    sub4: null,
  });
  const [ropeStats, setRopeStats] = useState({
    mainS: null,
    sub1: null,
    sub2: null,
    sub3: null,
    sub4: null,
  });

  const clear = () => {
    setHatStats({
      mainS: null,
      sub1: null,
      sub2: null,
      sub3: null,
      sub4: null,
    });
    setGloveStats({
      mainS: null,
      sub1: null,
      sub2: null,
      sub3: null,
      sub4: null,
    });
    setShoesStats({
      mainS: null,
      sub1: null,
      sub2: null,
      sub3: null,
      sub4: null,
    });
    setBodyStats({
      mainS: null,
      sub1: null,
      sub2: null,
      sub3: null,
      sub4: null,
    });
    setSphereStats({
      mainS: null,
      sub1: null,
      sub2: null,
      sub3: null,
      sub4: null,
    });
    setRopeStats({
      mainS: null,
      sub1: null,
      sub2: null,
      sub3: null,
      sub4: null,
    });
  };

  async function save() {
    const user = localStorage.getItem("email");
    const extractValues = (stats: {
      mainS: any;
      sub1: any;
      sub2: any;
      sub3: any;
      sub4: any;
    }) => ({
      mainS: stats.mainS ? stats.mainS.value : null,
      sub1: stats.sub1 ? stats.sub1.value : null,
      sub2: stats.sub2 ? stats.sub2.value : null,
      sub3: stats.sub3 ? stats.sub3.value : null,
      sub4: stats.sub4 ? stats.sub4.value : null,
    });

    try {
      const res = await fetch("/api/saveRelic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          name,
          type: getTypeByName(name, relics),
          hatStats: extractValues(hatStats),
          gloveStats: extractValues(gloveStats),
          shoesStats: extractValues(shoesStats),
          bodyStats: extractValues(bodyStats),
          sphereStats: extractValues(sphereStats),
          ropeStats: extractValues(ropeStats),
          character: charSelected,
        }),
      });

      const data = await res.json();

      if (data) {
        if (typeof window !== "undefined") {
          window.location.href = "/relic-dashboard";
        }
      }
    } catch (error) {
      console.error("Error saving relic:", error);
    }
  }

  if (name === "") {
    return (
      <div className="p-2 flex flex-col">
        <h1 className="text-3xl">Select a set to add</h1>
        <h1 className="text-3xl">Relics</h1>
        <div className="flex flex-wrap">
          {relics.map((relic: any) =>
            relic.type === "Relic Set" ? (
              <div
                key={relic.name}
                className="flex flex-col items-center p-2 cursor-pointer"
                onClick={() => setName(relic.name)}
              >
                <Image
                  src={relic.local}
                  alt={relic.name}
                  width={50}
                  height={50}
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="text-sm ml-3" style={{ width: 120 }}>
                  {relic.name}
                </div>
              </div>
            ) : null,
          )}
        </div>
        <h1 className="text-3xl">Ornaments</h1>
        <div className="flex flex-wrap">
          {relics.map((relic: any) =>
            relic.type === "Planetary Ornament Set" ? (
              <div
                key={relic.name}
                className="flex flex-col items-center p-2 cursor-pointer"
                onClick={() => setName(relic.name)}
              >
                <Image
                  src={relic.local}
                  alt={relic.name}
                  width={50}
                  height={50}
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="text-sm ml-3" style={{ width: 120 }}>
                  {relic.name}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    );
  } else {
    const type = getTypeByName(name, relics);

    if (type === "Relic Set") {
      return (
        <div className="flex flex-col">
          <div className="flex flex-row m-3 items-center">
            <Button text={"< Back"} onClick={() => setName("")} />
            <div className="text-3xl">{name}</div>
          </div>
          <div className="flex flex-row">
            <PartSelector
              part={"hat"}
              stats={stats}
              mainS={hatStats.mainS}
              setMainS={(val: any) =>
                setHatStats((prev) => ({ ...prev, mainS: val }))
              }
              sub1={hatStats.sub1}
              setSub1={(val: any) =>
                setHatStats((prev) => ({ ...prev, sub1: val }))
              }
              sub2={hatStats.sub2}
              setSub2={(val: any) =>
                setHatStats((prev) => ({ ...prev, sub2: val }))
              }
              sub3={hatStats.sub3}
              setSub3={(val: any) =>
                setHatStats((prev) => ({ ...prev, sub3: val }))
              }
              sub4={hatStats.sub4}
              setSub4={(val: any) =>
                setHatStats((prev) => ({ ...prev, sub4: val }))
              }
            />
            <PartSelector
              part={"glove"}
              stats={stats}
              mainS={gloveStats.mainS}
              setMainS={(val: any) =>
                setGloveStats((prev) => ({ ...prev, mainS: val }))
              }
              sub1={gloveStats.sub1}
              setSub1={(val: any) =>
                setGloveStats((prev) => ({ ...prev, sub1: val }))
              }
              sub2={gloveStats.sub2}
              setSub2={(val: any) =>
                setGloveStats((prev) => ({ ...prev, sub2: val }))
              }
              sub3={gloveStats.sub3}
              setSub3={(val: any) =>
                setGloveStats((prev) => ({ ...prev, sub3: val }))
              }
              sub4={gloveStats.sub4}
              setSub4={(val: any) =>
                setGloveStats((prev) => ({ ...prev, sub4: val }))
              }
            />
            <PartSelector
              part={"shoes"}
              stats={stats}
              mainS={shoesStats.mainS}
              setMainS={(val: any) =>
                setShoesStats((prev) => ({ ...prev, mainS: val }))
              }
              sub1={shoesStats.sub1}
              setSub1={(val: any) =>
                setShoesStats((prev) => ({ ...prev, sub1: val }))
              }
              sub2={shoesStats.sub2}
              setSub2={(val: any) =>
                setShoesStats((prev) => ({ ...prev, sub2: val }))
              }
              sub3={shoesStats.sub3}
              setSub3={(val: any) =>
                setShoesStats((prev) => ({ ...prev, sub3: val }))
              }
              sub4={shoesStats.sub4}
              setSub4={(val: any) =>
                setShoesStats((prev) => ({ ...prev, sub4: val }))
              }
            />
            <PartSelector
              part={"body"}
              stats={stats}
              mainS={bodyStats.mainS}
              setMainS={(val: any) =>
                setBodyStats((prev) => ({ ...prev, mainS: val }))
              }
              sub1={bodyStats.sub1}
              setSub1={(val: any) =>
                setBodyStats((prev) => ({ ...prev, sub1: val }))
              }
              sub2={bodyStats.sub2}
              setSub2={(val: any) =>
                setBodyStats((prev) => ({ ...prev, sub2: val }))
              }
              sub3={bodyStats.sub3}
              setSub3={(val: any) =>
                setBodyStats((prev) => ({ ...prev, sub3: val }))
              }
              sub4={bodyStats.sub4}
              setSub4={(val: any) =>
                setBodyStats((prev) => ({ ...prev, sub4: val }))
              }
            />
          </div>
          <div className="flex flex-row px-3 justify-center">
            <Button text={"Clear"} onClick={clear} />
            <Button text={"Save"} onClick={save} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col">
          <div className="flex flex-row m-3 items-center">
            <Button text={"< Back"} onClick={() => setName("")} />
            <div className="text-3xl">{name}</div>
          </div>
          <div className="flex flex-row">
            <PartSelector
              part={"sphere"}
              stats={stats}
              mainS={sphereStats.mainS}
              setMainS={(val: any) =>
                setSphereStats((prev) => ({ ...prev, mainS: val }))
              }
              sub1={sphereStats.sub1}
              setSub1={(val: any) =>
                setSphereStats((prev) => ({ ...prev, sub1: val }))
              }
              sub2={sphereStats.sub2}
              setSub2={(val: any) =>
                setSphereStats((prev) => ({ ...prev, sub2: val }))
              }
              sub3={sphereStats.sub3}
              setSub3={(val: any) =>
                setSphereStats((prev) => ({ ...prev, sub3: val }))
              }
              sub4={sphereStats.sub4}
              setSub4={(val: any) =>
                setSphereStats((prev) => ({ ...prev, sub4: val }))
              }
            />
            <PartSelector
              part={"rope"}
              stats={stats}
              mainS={ropeStats.mainS}
              setMainS={(val: any) =>
                setRopeStats((prev) => ({ ...prev, mainS: val }))
              }
              sub1={ropeStats.sub1}
              setSub1={(val: any) =>
                setRopeStats((prev) => ({ ...prev, sub1: val }))
              }
              sub2={ropeStats.sub2}
              setSub2={(val: any) =>
                setRopeStats((prev) => ({ ...prev, sub2: val }))
              }
              sub3={ropeStats.sub3}
              setSub3={(val: any) =>
                setRopeStats((prev) => ({ ...prev, sub3: val }))
              }
              sub4={ropeStats.sub4}
              setSub4={(val: any) =>
                setRopeStats((prev) => ({ ...prev, sub4: val }))
              }
            />
          </div>
          <div className="flex flex-row px-3 justify-center">
            <Button text={"Clear"} onClick={clear} />
            <Button text={"Save"} onClick={save} />
          </div>
        </div>
      );
    }
  }
};

export default AddRelic;
