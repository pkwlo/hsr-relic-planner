import React, { useState, useEffect } from "react";
import Select from "react-select";
import relics from "@/app/relic-sets/relics.json";
import stats from "@/app/relic-sets/stats.json";
import styled from "@emotion/styled";
import Image from "next/image";
import Button from "@/components/ButtonWithDisable";
import { saveRelic as saveRelicToStorage } from "@/lib/storage";

const PartSelect = styled(Select)`
  color: #e8eaed;
  width: 150px;
  margin: 2px;
`;

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "var(--bg-secondary, #161822)",
    borderColor: state.isFocused
      ? "var(--accent, #6c63ff)"
      : "var(--border, rgba(255, 255, 255, 0.06))",
    borderRadius: 8,
    minHeight: 34,
    boxShadow: state.isFocused ? "0 0 0 1px var(--accent, #6c63ff)" : "none",
    "&:hover": {
      borderColor: state.isFocused
        ? "var(--accent, #6c63ff)"
        : "var(--border, rgba(255, 255, 255, 0.06))",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#e8eaed",
    fontSize: "0.8rem",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--bg-surface, #1c1f2e)",
    border: "1px solid var(--border, rgba(255, 255, 255, 0.06))",
    borderRadius: 8,
  }),
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: "200px",
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--accent, #6c63ff)"
      : state.isFocused
        ? "var(--bg-surface-hover, #252839)"
        : "transparent",
    color: state.isSelected ? "white" : "#e8eaed",
    fontSize: "0.8rem",
    "&:active": {
      backgroundColor: "var(--accent, #6c63ff)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#e8eaed",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "rgba(232, 234, 237, 0.4)",
    fontSize: "0.8rem",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "rgba(232, 234, 237, 0.4)",
    "&:hover": {
      color: "#e8eaed",
    },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: "rgba(232, 234, 237, 0.4)",
    "&:hover": {
      color: "#e8eaed",
    },
  }),
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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

  const selectedSubs = [sub1, sub2, sub3, sub4];
  const filterSubs = (currentIndex: number) => {
    const picked = selectedSubs
      .filter((_, i) => i !== currentIndex)
      .map((s) => s?.value)
      .filter(Boolean);
    return sub?.filter((opt: any) => !picked.includes(opt.value)) ?? [];
  };

  const portalTarget =
    typeof document !== "undefined" ? document.body : undefined;

  return (
    <div className="flex flex-col p-4 rounded-lg" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
      <span className="text-sm font-semibold mb-2 capitalize" style={{ color: "var(--foreground)" }}>{part}</span>
      <span className="text-xs font-medium mb-1" style={{ color: "var(--foreground-muted)" }}>Main Stat</span>
      <PartSelect
        options={main}
        isClearable={true}
        isSearchable={true}
        value={mainS}
        onChange={(selectedOption) => setMainS(selectedOption)}
        styles={customStyles}
        menuPortalTarget={portalTarget}
        menuPosition="fixed"
      />
      <span className="text-xs font-medium mt-2 mb-1" style={{ color: "var(--foreground-muted)" }}>Sub Stats</span>
      <PartSelect
        options={filterSubs(0)}
        isClearable={true}
        isSearchable={true}
        value={sub1}
        onChange={(selectedOption) => setSub1(selectedOption)}
        styles={customStyles}
        menuPortalTarget={portalTarget}
        menuPosition="fixed"
      />
      <PartSelect
        options={filterSubs(1)}
        isClearable={true}
        isSearchable={true}
        value={sub2}
        onChange={(selectedOption) => setSub2(selectedOption)}
        styles={customStyles}
        menuPortalTarget={portalTarget}
        menuPosition="fixed"
      />
      <PartSelect
        options={filterSubs(2)}
        isClearable={true}
        isSearchable={true}
        value={sub3}
        onChange={(selectedOption) => setSub3(selectedOption)}
        styles={customStyles}
        menuPortalTarget={portalTarget}
        menuPosition="fixed"
      />
      <PartSelect
        options={filterSubs(3)}
        isClearable={true}
        isSearchable={true}
        value={sub4}
        onChange={(selectedOption) => setSub4(selectedOption)}
        styles={customStyles}
        menuPortalTarget={portalTarget}
        menuPosition="fixed"
      />
    </div>
  );
};

const RelicListLengthOne = ({
  charSelected,
  selectedRelics,
  hatStats,
  gloveStats,
  shoesStats,
  bodyStats,
  sphereStats,
  ropeStats,
  setShoesStats,
  setBodyStats,
  setSphereStats,
  setRopeStats,
  setHatStats,
  setGloveStats,
  setNext,
  closePopup,
}: {
  charSelected: string;
  selectedRelics: any;
  hatStats: any;
  gloveStats: any;
  shoesStats: any;
  bodyStats: any;
  sphereStats: any;
  ropeStats: any;
  setShoesStats: any;
  setBodyStats: any;
  setSphereStats: any;
  setRopeStats: any;
  setHatStats: any;
  setGloveStats: any;
  setNext: any;
  closePopup: any;
}) => {
  const name = Object.keys(selectedRelics)[0];
  const name2 = "";
  const name3 = "";

  const type = getTypeByName(name, relics);

  const partStates: { [key: string]: [any, any] } = {
    hat: [hatStats, setHatStats],
    glove: [gloveStats, setGloveStats],
    shoes: [shoesStats, setShoesStats],
    body: [bodyStats, setBodyStats],
    sphere: [sphereStats, setSphereStats],
    rope: [ropeStats, setRopeStats],
  };

  const parts =
    type === "Relic Set"
      ? ["hat", "glove", "shoes", "body"]
      : ["sphere", "rope"];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col m-3">
        <div className="flex justify-start pb-2">
          <Button
            text="< Back"
            onClick={() => setNext(false)}
            disable={false}
          />
          <Button text={"Close"} onClick={closePopup} disable={false} />
        </div>
        <div className="text-2xl">{name}</div>
      </div>
      <div className="flex flex-row">
        {parts.map((part) => (
          <PartSelector
            key={part}
            part={part}
            stats={stats}
            mainS={partStates[part][0].mainS}
            setMainS={(val: any) =>
              partStates[part][1]((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={partStates[part][0].sub1}
            setSub1={(val: any) =>
              partStates[part][1]((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={partStates[part][0].sub2}
            setSub2={(val: any) =>
              partStates[part][1]((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={partStates[part][0].sub3}
            setSub3={(val: any) =>
              partStates[part][1]((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={partStates[part][0].sub4}
            setSub4={(val: any) =>
              partStates[part][1]((prev: any) => ({ ...prev, sub4: val }))
            }
          />
        ))}
      </div>
      <div className="flex flex-row px-3 justify-center">
        <Button
          text="Clear"
          onClick={() =>
            clear(
              setHatStats,
              setGloveStats,
              setShoesStats,
              setBodyStats,
              setSphereStats,
              setRopeStats,
            )
          }
          disable={false}
        />
        <Button
          text="Save"
          onClick={() =>
            saveAll(
              name,
              name2,
              name3,
              charSelected,
              hatStats,
              gloveStats,
              shoesStats,
              bodyStats,
              sphereStats,
              ropeStats,
            )
          }
          disable={
            type === "Relic Set"
              ? !hatStats.mainS ||
                !gloveStats.mainS ||
                !shoesStats.mainS ||
                !bodyStats.mainS
              : !sphereStats.mainS || !ropeStats.mainS
          }
        />
      </div>
    </div>
  );
};

const RelicListLengthTwo = ({
  charSelected,
  selectedRelics,
  hatStats,
  gloveStats,
  shoesStats,
  bodyStats,
  sphereStats,
  ropeStats,
  setShoesStats,
  setBodyStats,
  setSphereStats,
  setRopeStats,
  setHatStats,
  setGloveStats,
  setNext,
  closePopup,
}: {
  charSelected: string;
  selectedRelics: any;
  hatStats: any;
  gloveStats: any;
  shoesStats: any;
  bodyStats: any;
  sphereStats: any;
  ropeStats: any;
  setShoesStats: any;
  setBodyStats: any;
  setSphereStats: any;
  setRopeStats: any;
  setHatStats: any;
  setGloveStats: any;
  setNext: any;
  closePopup: any;
}) => {
  const [nextSection, setNextSection] = useState(false);
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const name3 = "";

  const type = getTypeByName(Object.keys(selectedRelics)[0], relics);
  const type2 = getTypeByName(Object.keys(selectedRelics)[1], relics);

  const relicCounter = Object.keys(selectedRelics).filter(
    (r) => getTypeByName(r, relics) === "Relic Set",
  ).length;

  useEffect(() => {
    if (type === "Planetary Ornament Set" && type2 === "Relic Set") {
      setName2(Object.keys(selectedRelics)[0]);
      setName(Object.keys(selectedRelics)[1]);
    } else {
      setName(Object.keys(selectedRelics)[0]);
      setName2(Object.keys(selectedRelics)[1]);
    }
  }, [selectedRelics, type, type2]);

  const partStates: { [key: string]: [any, any] } = {
    hat: [hatStats, setHatStats],
    glove: [gloveStats, setGloveStats],
    shoes: [shoesStats, setShoesStats],
    body: [bodyStats, setBodyStats],
    sphere: [sphereStats, setSphereStats],
    rope: [ropeStats, setRopeStats],
  };

  const parts = nextSection
    ? type2 === "Relic Set"
      ? ["hat", "glove", "shoes", "body"]
      : ["sphere", "rope"]
    : ["hat", "glove", "shoes", "body"];

  if (relicCounter === 1) {
    return (
      // relic -> ornament -> save both
      // !nextSection = relic, nextSection = ornament
      !nextSection ? (
        <div className="flex flex-col">
          <div className="flex flex-col m-3">
            <div className="flex justify-start pb-2">
              <Button
                text="< Back"
                onClick={() => setNext(false)}
                disable={false}
              />
              <Button text={"Close"} onClick={closePopup} disable={false} />
            </div>
            <div className="text-2xl">{name}</div>
          </div>
          <div className="flex flex-row">
            {parts.map((part) => (
              <PartSelector
                key={part}
                part={part}
                stats={stats}
                mainS={partStates[part][0].mainS}
                setMainS={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, mainS: val }))
                }
                sub1={partStates[part][0].sub1}
                setSub1={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, sub1: val }))
                }
                sub2={partStates[part][0].sub2}
                setSub2={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, sub2: val }))
                }
                sub3={partStates[part][0].sub3}
                setSub3={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, sub3: val }))
                }
                sub4={partStates[part][0].sub4}
                setSub4={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, sub4: val }))
                }
              />
            ))}
          </div>
          <div className="flex flex-row px-3 justify-center">
            <Button
              text="Clear"
              onClick={() =>
                clear(
                  setHatStats,
                  setGloveStats,
                  setShoesStats,
                  setBodyStats,
                  setSphereStats,
                  setRopeStats,
                )
              }
              disable={false}
            />
            <Button
              text={"Next"}
              onClick={() => setNextSection(true)}
              disable={
                type === "Relic Set"
                  ? !hatStats.mainS ||
                    !gloveStats.mainS ||
                    !shoesStats.mainS ||
                    !bodyStats.mainS
                  : !sphereStats.mainS || !ropeStats.mainS
              }
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col m-3">
            <div className="flex justify-start pb-2">
              <Button
                text={"< Back"}
                onClick={() => setNextSection(false)}
                disable={false}
              />
              <Button text={"Close"} onClick={closePopup} disable={false} />
            </div>
            <div className="text-2xl">{name2}</div>
          </div>
          <div className="flex flex-row">
            {parts.map((part) => (
              <PartSelector
                key={part}
                part={part}
                stats={stats}
                mainS={partStates[part][0].mainS}
                setMainS={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, mainS: val }))
                }
                sub1={partStates[part][0].sub1}
                setSub1={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, sub1: val }))
                }
                sub2={partStates[part][0].sub2}
                setSub2={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, sub2: val }))
                }
                sub3={partStates[part][0].sub3}
                setSub3={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, sub3: val }))
                }
                sub4={partStates[part][0].sub4}
                setSub4={(val: any) =>
                  partStates[part][1]((prev: any) => ({ ...prev, sub4: val }))
                }
              />
            ))}
          </div>
          <div className="flex flex-row px-3 justify-center">
            <Button
              text="Clear"
              onClick={() =>
                clear(
                  setHatStats,
                  setGloveStats,
                  setShoesStats,
                  setBodyStats,
                  setSphereStats,
                  setRopeStats,
                )
              }
              disable={false}
            />
            <Button
              text="Save"
              onClick={() =>
                saveAll(
                  name,
                  name2,
                  name3,
                  charSelected,
                  hatStats,
                  gloveStats,
                  shoesStats,
                  bodyStats,
                  sphereStats,
                  ropeStats,
                )
              }
              disable={
                !sphereStats.mainS || !ropeStats.mainS
              }
            />
          </div>
        </div>
      )
    );
  } else {
    return (
      // relic 2pc -> save both
      <div className="flex flex-col">
        <div className="flex flex-col m-3">
          <div className="flex justify-start pb-2">
            <Button
              text={"< Back"}
              onClick={() => setNext(false)}
              disable={false}
            />
            <Button text={"Close"} onClick={closePopup} disable={false} />
          </div>
          <div className="text-2xl">{"2pc " + name + " / 2pc " + name2}</div>
        </div>
        <div className="flex flex-row">
          {parts.map((part) => (
            <PartSelector
              key={part}
              part={part}
              stats={stats}
              mainS={partStates[part][0].mainS}
              setMainS={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, mainS: val }))
              }
              sub1={partStates[part][0].sub1}
              setSub1={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub1: val }))
              }
              sub2={partStates[part][0].sub2}
              setSub2={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub2: val }))
              }
              sub3={partStates[part][0].sub3}
              setSub3={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub3: val }))
              }
              sub4={partStates[part][0].sub4}
              setSub4={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub4: val }))
              }
            />
          ))}
        </div>
        <div className="flex flex-row px-3 justify-center">
          <Button
            text="Clear"
            onClick={() =>
              clear(
                setHatStats,
                setGloveStats,
                setShoesStats,
                setBodyStats,
                setSphereStats,
                setRopeStats,
              )
            }
            disable={false}
          />
          <Button
            text="Save"
            onClick={() =>
              saveAll(
                name,
                name2,
                name3,
                charSelected,
                hatStats,
                gloveStats,
                shoesStats,
                bodyStats,
                sphereStats,
                ropeStats,
              )
            }
            disable={
              !hatStats.mainS ||
              !gloveStats.mainS ||
              !shoesStats.mainS ||
              !bodyStats.mainS
            }
          />
        </div>
      </div>
    );
  }
};

const RelicListLengthThree = ({
  charSelected,
  selectedRelics,
  hatStats,
  gloveStats,
  shoesStats,
  bodyStats,
  sphereStats,
  ropeStats,
  setShoesStats,
  setBodyStats,
  setSphereStats,
  setRopeStats,
  setHatStats,
  setGloveStats,
  setNext,
  closePopup,
}: {
  charSelected: string;
  selectedRelics: any;
  hatStats: any;
  gloveStats: any;
  shoesStats: any;
  bodyStats: any;
  sphereStats: any;
  ropeStats: any;
  setShoesStats: any;
  setBodyStats: any;
  setSphereStats: any;
  setRopeStats: any;
  setHatStats: any;
  setGloveStats: any;
  setNext: any;
  closePopup: any;
}) => {
  const [nextSection, setNextSection] = useState(false);
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");

  const type = getTypeByName(Object.keys(selectedRelics)[0], relics);
  const type2 = getTypeByName(Object.keys(selectedRelics)[1], relics);
  const type3 = getTypeByName(Object.keys(selectedRelics)[2], relics);

  useEffect(() => {
    if (type === "Planetary Ornament Set") {
      setName(Object.keys(selectedRelics)[1]);
      setName2(Object.keys(selectedRelics)[2]);
      setName3(Object.keys(selectedRelics)[0]);
    } else if (type2 === "Planetary Ornament Set") {
      setName(Object.keys(selectedRelics)[0]);
      setName2(Object.keys(selectedRelics)[2]);
      setName3(Object.keys(selectedRelics)[1]);
    } else if (type3 === "Planetary Ornament Set") {
      setName(Object.keys(selectedRelics)[0]);
      setName2(Object.keys(selectedRelics)[1]);
      setName3(Object.keys(selectedRelics)[2]);
    }
  }, [selectedRelics, type, type2, type3]);

  const partStates: { [key: string]: [any, any] } = {
    hat: [hatStats, setHatStats],
    glove: [gloveStats, setGloveStats],
    shoes: [shoesStats, setShoesStats],
    body: [bodyStats, setBodyStats],
    sphere: [sphereStats, setSphereStats],
    rope: [ropeStats, setRopeStats],
  };

  const parts = nextSection
    ? ["sphere", "rope"]
    : ["hat", "glove", "shoes", "body"];

  return (
    // relic/relic -> ornament -> save relic stats in both relics and save ornament stats
    // !nextSection = relic, nextSection = ornament
    !nextSection ? (
      <div className="flex flex-col">
        <div className="flex flex-col m-3">
          <div className="flex justify-start pb-2">
            <Button
              text={"< Back"}
              onClick={() => setNext(false)}
              disable={false}
            />
            <Button text={"Close"} onClick={closePopup} disable={false} />
          </div>
          <div className="text-2xl">{"2pc " + name + " / 2pc " + name2}</div>
        </div>
        <div className="flex flex-row">
          {parts.map((part) => (
            <PartSelector
              key={part}
              part={part}
              stats={stats}
              mainS={partStates[part][0].mainS}
              setMainS={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, mainS: val }))
              }
              sub1={partStates[part][0].sub1}
              setSub1={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub1: val }))
              }
              sub2={partStates[part][0].sub2}
              setSub2={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub2: val }))
              }
              sub3={partStates[part][0].sub3}
              setSub3={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub3: val }))
              }
              sub4={partStates[part][0].sub4}
              setSub4={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub4: val }))
              }
            />
          ))}
        </div>
        <div className="flex flex-row px-3 justify-center">
          <Button
            text="Clear"
            onClick={() =>
              clear(
                setHatStats,
                setGloveStats,
                setShoesStats,
                setBodyStats,
                setSphereStats,
                setRopeStats,
              )
            }
            disable={false}
          />
          <Button
            text={"Next"}
            onClick={() => setNextSection(true)}
            disable={
              !hatStats.mainS ||
              !gloveStats.mainS ||
              !shoesStats.mainS ||
              !bodyStats.mainS
            }
          />
        </div>
      </div>
    ) : (
      <div className="flex flex-col">
        <div className="flex flex-col m-3">
          <div className="flex justify-start pb-2">
            <Button
              text={"< Back"}
              onClick={() => setNextSection(false)}
              disable={false}
            />
            <Button text={"Close"} onClick={closePopup} disable={false} />
          </div>
          <div className="text-2xl">{name3}</div>
        </div>
        <div className="flex flex-row">
          {parts.map((part) => (
            <PartSelector
              key={part}
              part={part}
              stats={stats}
              mainS={partStates[part][0].mainS}
              setMainS={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, mainS: val }))
              }
              sub1={partStates[part][0].sub1}
              setSub1={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub1: val }))
              }
              sub2={partStates[part][0].sub2}
              setSub2={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub2: val }))
              }
              sub3={partStates[part][0].sub3}
              setSub3={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub3: val }))
              }
              sub4={partStates[part][0].sub4}
              setSub4={(val: any) =>
                partStates[part][1]((prev: any) => ({ ...prev, sub4: val }))
              }
            />
          ))}
        </div>
        <div className="flex flex-row px-3 justify-center">
          <Button
            text="Clear"
            onClick={() =>
              clear(
                setHatStats,
                setGloveStats,
                setShoesStats,
                setBodyStats,
                setSphereStats,
                setRopeStats,
              )
            }
            disable={false}
          />
          <Button
            text={"Save"}
            onClick={() =>
              saveAll(
                name,
                name2,
                name3,
                charSelected,
                hatStats,
                gloveStats,
                shoesStats,
                bodyStats,
                sphereStats,
                ropeStats,
              )
            }
            disable={!sphereStats.mainS || !ropeStats.mainS}
          />
        </div>
      </div>
    )
  );
};

const clear = (
  setHatStats: (arg0: {
    mainS: null;
    sub1: null;
    sub2: null;
    sub3: null;
    sub4: null;
  }) => void,
  setGloveStats: (arg0: {
    mainS: null;
    sub1: null;
    sub2: null;
    sub3: null;
    sub4: null;
  }) => void,
  setShoesStats: (arg0: {
    mainS: null;
    sub1: null;
    sub2: null;
    sub3: null;
    sub4: null;
  }) => void,
  setBodyStats: (arg0: {
    mainS: null;
    sub1: null;
    sub2: null;
    sub3: null;
    sub4: null;
  }) => void,
  setSphereStats: (arg0: {
    mainS: null;
    sub1: null;
    sub2: null;
    sub3: null;
    sub4: null;
  }) => void,
  setRopeStats: (arg0: {
    mainS: null;
    sub1: null;
    sub2: null;
    sub3: null;
    sub4: null;
  }) => void,
) => {
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

function save(
  name: string,
  charSelected: string,
  hatStats: any,
  gloveStats: any,
  shoesStats: any,
  bodyStats: any,
  sphereStats: any,
  ropeStats: any,
) {
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

  const type = getTypeByName(name, relics);

  saveRelicToStorage({
    name,
    character: charSelected,
    hatStats: type === "Relic Set" ? extractValues(hatStats) : null,
    gloveStats: type === "Relic Set" ? extractValues(gloveStats) : null,
    shoesStats: type === "Relic Set" ? extractValues(shoesStats) : null,
    bodyStats: type === "Relic Set" ? extractValues(bodyStats) : null,
    sphereStats: type === "Planetary Ornament Set" ? extractValues(sphereStats) : null,
    ropeStats: type === "Planetary Ornament Set" ? extractValues(ropeStats) : null,
  });
}

function saveAll(
  name: string,
  name2: string,
  name3: string,
  charSelected: string,
  hatStats: any,
  gloveStats: any,
  shoesStats: any,
  bodyStats: any,
  sphereStats: any,
  ropeStats: any,
) {
  save(name, charSelected, hatStats, gloveStats, shoesStats, bodyStats, sphereStats, ropeStats);
  if (name2 !== "") {
    save(name2, charSelected, hatStats, gloveStats, shoesStats, bodyStats, sphereStats, ropeStats);
  }
  if (name3 !== "") {
    save(name3, charSelected, hatStats, gloveStats, shoesStats, bodyStats, sphereStats, ropeStats);
  }
  if (typeof window !== "undefined") {
    window.location.href = "/relic-dashboard";
  }
}

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

const AddRelic = ({
  charSelected,
  closePopup,
  backToChar,
}: {
  charSelected: string;
  closePopup: any;
  backToChar: any;
}) => {
  const [next, setNext] = useState(false); // false = select relics page, true = add relic page
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
  const [selectedRelics, setSelectedRelics] = useState<{
    [key: string]: boolean;
  }>({});
  const [relicCounter, setRelicCounter] = useState(1);
  const [ornamentCounter, setOrnamentCounter] = useState(1);
  const [hoveredRelic, setHoveredRelic] = useState<string | undefined>(
    undefined,
  );

  const handleNextClick = () => {
    setNext(true);
    scrollToTop();
  };

  const clickImage = (
    name: string,
    type: string,
    relicCounter: number,
    ornamentCounter: number,
  ) => {
    setSelectedRelics((prevSelectedRelics) => {
      const newSelectedRelics = { ...prevSelectedRelics };
      if (newSelectedRelics[name]) {
        delete newSelectedRelics[name];
        if (type === "Relic Set") {
          setRelicCounter(relicCounter - 1);
        } else {
          setOrnamentCounter(ornamentCounter - 1);
        }
      } else {
        if (type === "Relic Set" && relicCounter <= 2) {
          newSelectedRelics[name] = true;
          setRelicCounter(relicCounter + 1);
        } else if (type === "Planetary Ornament Set" && ornamentCounter <= 1) {
          newSelectedRelics[name] = true;
          setOrnamentCounter(ornamentCounter + 1);
        }
      }
      return newSelectedRelics;
    });
  };

  const clearRelicSelect = () => {
    setSelectedRelics({});
    setRelicCounter(1);
    setOrnamentCounter(1);
  };

  async function BackToCharSelect() {
    if (charSelected === "") {
      closePopup();
    } else {
      await closePopup();
      backToChar();
    }
  }

  if (next === false) {
    return (
      <div className="p-4 flex flex-col">
        <div className="flex gap-2 mb-4">
          <Button text={"< Back"} onClick={BackToCharSelect} disable={false} />
          <Button text={"Close"} onClick={closePopup} disable={false} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Select up to 2 relics and 1 ornament to add.
        </h2>
        <div className="h-0.5 w-12 rounded-full bg-gradient-accent mb-4" />
        <h3 className="text-lg font-semibold mb-3">Relics</h3>
        <div className="flex flex-wrap">
          {relics.map((relic: any) =>
            relic.type === "Relic Set" ? (
              <div
                key={relic.name}
                className="flex flex-row items-center p-2 cursor-pointer"
                onClick={() =>
                  clickImage(
                    relic.name,
                    relic.type,
                    relicCounter,
                    ornamentCounter,
                  )
                }
                onMouseEnter={() => setHoveredRelic(relic.name)}
                onMouseLeave={() => setHoveredRelic(undefined)}
                style={{
                  background:
                    selectedRelics[relic.name] || hoveredRelic === relic.name
                      ? "rgba(108, 99, 255, 0.12)"
                      : "var(--bg-surface)",
                  border: selectedRelics[relic.name]
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 6,
                  margin: 2,
                  transition: "all 0.2s ease",
                }}
              >
                <Image
                  src={relic.local}
                  alt={relic.name}
                  width={50}
                  height={50}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: 8,
                  }}
                />
                <div className="text-xs ml-3 font-medium" style={{ width: 80, color: "var(--foreground-muted)" }}>
                  {relic.name}
                </div>
              </div>
            ) : null,
          )}
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-3">Ornaments</h3>
        <div className="flex flex-wrap">
          {relics.map((relic: any) =>
            relic.type === "Planetary Ornament Set" ? (
              <div
                key={relic.name}
                className="flex flex-row items-center p-2 cursor-pointer"
                onClick={() =>
                  clickImage(
                    relic.name,
                    relic.type,
                    relicCounter,
                    ornamentCounter,
                  )
                }
                onMouseEnter={() => setHoveredRelic(relic.name)}
                onMouseLeave={() => setHoveredRelic(undefined)}
                style={{
                  background:
                    selectedRelics[relic.name] || hoveredRelic === relic.name
                      ? "rgba(108, 99, 255, 0.12)"
                      : "var(--bg-surface)",
                  border: selectedRelics[relic.name]
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 6,
                  margin: 2,
                  transition: "all 0.2s ease",
                }}
              >
                <Image
                  src={relic.local}
                  alt={relic.name}
                  width={50}
                  height={50}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: 8,
                  }}
                />
                <div className="text-xs ml-3 font-medium" style={{ width: 80, color: "var(--foreground-muted)" }}>
                  {relic.name}
                </div>
              </div>
            ) : null,
          )}
        </div>
        <div className="flex justify-center">
          <Button
            text={"Clear"}
            onClick={() => clearRelicSelect()}
            disable={false}
          />
          <Button
            text={"Next"}
            onClick={() => handleNextClick()}
            disable={Object.keys(selectedRelics).length === 0}
          />
        </div>
      </div>
    );
  } else {
    const numberOfRelics = Object.keys(selectedRelics).length;
    if (numberOfRelics === 1) {
      return (
        <RelicListLengthOne
          charSelected={charSelected}
          selectedRelics={selectedRelics}
          hatStats={hatStats}
          gloveStats={gloveStats}
          shoesStats={shoesStats}
          bodyStats={bodyStats}
          sphereStats={sphereStats}
          ropeStats={ropeStats}
          setShoesStats={setShoesStats}
          setBodyStats={setBodyStats}
          setSphereStats={setSphereStats}
          setRopeStats={setRopeStats}
          setHatStats={setHatStats}
          setGloveStats={setGloveStats}
          setNext={setNext}
          closePopup={closePopup}
        />
      );
    } else if (numberOfRelics === 2) {
      return (
        <RelicListLengthTwo
          charSelected={charSelected}
          selectedRelics={selectedRelics}
          hatStats={hatStats}
          gloveStats={gloveStats}
          shoesStats={shoesStats}
          bodyStats={bodyStats}
          sphereStats={sphereStats}
          ropeStats={ropeStats}
          setShoesStats={setShoesStats}
          setBodyStats={setBodyStats}
          setSphereStats={setSphereStats}
          setRopeStats={setRopeStats}
          setHatStats={setHatStats}
          setGloveStats={setGloveStats}
          setNext={setNext}
          closePopup={closePopup}
        />
      );
    } else {
      return (
        <RelicListLengthThree
          charSelected={charSelected}
          selectedRelics={selectedRelics}
          hatStats={hatStats}
          gloveStats={gloveStats}
          shoesStats={shoesStats}
          bodyStats={bodyStats}
          sphereStats={sphereStats}
          ropeStats={ropeStats}
          setShoesStats={setShoesStats}
          setBodyStats={setBodyStats}
          setSphereStats={setSphereStats}
          setRopeStats={setRopeStats}
          setHatStats={setHatStats}
          setGloveStats={setGloveStats}
          setNext={setNext}
          closePopup={closePopup}
        />
      );
    }
  }
};

export default AddRelic;
