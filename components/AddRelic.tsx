import React, { useState, useEffect } from "react";
import Select from "react-select";
import relics from "@/app/relic-sets/relics.json";
import stats from "@/app/relic-sets/stats.json";
import styled from "@emotion/styled";
import Image from "next/image";
import Button from "@/components/ButtonWithDisable";
import AddCharacter from "@/components/AddCharacter";

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
}) => {
  const name = Object.keys(selectedRelics)[0];
  const type = getTypeByName(name, relics);
  async function saveAll(
    name: string,
    charSelected: string,
    hatStats: any,
    gloveStats: any,
    shoesStats: any,
    bodyStats: any,
    sphereStats: any,
    ropeStats: any,
  ) {
    await save(
      name,
      charSelected,
      hatStats,
      gloveStats,
      shoesStats,
      bodyStats,
      sphereStats,
      ropeStats,
    );

    if (typeof window !== "undefined") {
      window.location.href = "/relic-dashboard";
    }
  }

  if (type === "Relic Set") {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row m-3 items-center">
          <Button
            text={"< Back"}
            onClick={() => setNext(false)}
            disable={false}
          />
          <div className="text-2xl">{name}</div>
        </div>
        <div className="flex flex-row">
          <PartSelector
            part={"hat"}
            stats={stats}
            mainS={hatStats.mainS}
            setMainS={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={hatStats.sub1}
            setSub1={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={hatStats.sub2}
            setSub2={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={hatStats.sub3}
            setSub3={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={hatStats.sub4}
            setSub4={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"glove"}
            stats={stats}
            mainS={gloveStats.mainS}
            setMainS={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={gloveStats.sub1}
            setSub1={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={gloveStats.sub2}
            setSub2={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={gloveStats.sub3}
            setSub3={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={gloveStats.sub4}
            setSub4={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"shoes"}
            stats={stats}
            mainS={shoesStats.mainS}
            setMainS={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={shoesStats.sub1}
            setSub1={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={shoesStats.sub2}
            setSub2={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={shoesStats.sub3}
            setSub3={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={shoesStats.sub4}
            setSub4={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"body"}
            stats={stats}
            mainS={bodyStats.mainS}
            setMainS={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={bodyStats.sub1}
            setSub1={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={bodyStats.sub2}
            setSub2={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={bodyStats.sub3}
            setSub3={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={bodyStats.sub4}
            setSub4={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
        </div>
        <div className="flex flex-row px-3 justify-center">
          <Button
            text={"Clear"}
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
              save(
                name,
                charSelected,
                hatStats,
                gloveStats,
                shoesStats,
                bodyStats,
                sphereStats,
                ropeStats,
              )
            }
            disable={false}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row m-3 items-center">
          <Button
            text={"< Back"}
            onClick={() => setNext(false)}
            disable={false}
          />
          <div className="text-2xl">{name}</div>
        </div>
        <div className="flex flex-row">
          <PartSelector
            part={"sphere"}
            stats={stats}
            mainS={sphereStats.mainS}
            setMainS={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={sphereStats.sub1}
            setSub1={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={sphereStats.sub2}
            setSub2={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={sphereStats.sub3}
            setSub3={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={sphereStats.sub4}
            setSub4={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"rope"}
            stats={stats}
            mainS={ropeStats.mainS}
            setMainS={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={ropeStats.sub1}
            setSub1={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={ropeStats.sub2}
            setSub2={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={ropeStats.sub3}
            setSub3={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={ropeStats.sub4}
            setSub4={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
        </div>
        <div className="flex flex-row px-3 justify-center">
          <Button
            text={"Clear"}
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
              save(
                name,
                charSelected,
                hatStats,
                gloveStats,
                shoesStats,
                bodyStats,
                sphereStats,
                ropeStats,
              )
            }
            disable={false}
          />
        </div>
      </div>
    );
  }
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
}) => {
  const [nextSection, setNextSection] = useState(false);
  const [relicCounter, setRelicCounter] = useState(0);
  const name = Object.keys(selectedRelics)[0];
  const name2 = Object.keys(selectedRelics)[1];

  useEffect(() => {
    for (let relic in selectedRelics) {
      if (getTypeByName(relic, relics) === "Relic Set") {
        setRelicCounter((prev) => prev + 1);
      }
    }
  }, [selectedRelics]);

  async function saveAll(
    charSelected: any,
    hatStats: any,
    gloveStats: any,
    shoesStats: any,
    bodyStats: any,
    sphereStats: any,
    ropeStats: any,
  ) {
    await save(
      name,
      charSelected,
      hatStats,
      gloveStats,
      shoesStats,
      bodyStats,
      sphereStats,
      ropeStats,
    );
    await save(
      name2,
      charSelected,
      hatStats,
      gloveStats,
      shoesStats,
      bodyStats,
      sphereStats,
      ropeStats,
    );

    if (typeof window !== "undefined") {
      window.location.href = "/relic-dashboard";
    }
  }

  if (relicCounter === 1) {
    return (
      // relic -> ornament -> save both
      // !nextSection = relic, nextSection = ornament
      !nextSection ? (
        <div className="flex flex-col">
          <div className="flex flex-row m-3 items-center">
            <Button
              text={"< Back"}
              onClick={() => setNext(false)}
              disable={false}
            />
            <div className="text-2xl">{name}</div>
          </div>
          <div className="flex flex-row">
            <PartSelector
              part={"hat"}
              stats={stats}
              mainS={hatStats.mainS}
              setMainS={(val: any) =>
                setHatStats((prev: any) => ({ ...prev, mainS: val }))
              }
              sub1={hatStats.sub1}
              setSub1={(val: any) =>
                setHatStats((prev: any) => ({ ...prev, sub1: val }))
              }
              sub2={hatStats.sub2}
              setSub2={(val: any) =>
                setHatStats((prev: any) => ({ ...prev, sub2: val }))
              }
              sub3={hatStats.sub3}
              setSub3={(val: any) =>
                setHatStats((prev: any) => ({ ...prev, sub3: val }))
              }
              sub4={hatStats.sub4}
              setSub4={(val: any) =>
                setHatStats((prev: any) => ({ ...prev, sub4: val }))
              }
            />
            <PartSelector
              part={"glove"}
              stats={stats}
              mainS={gloveStats.mainS}
              setMainS={(val: any) =>
                setGloveStats((prev: any) => ({ ...prev, mainS: val }))
              }
              sub1={gloveStats.sub1}
              setSub1={(val: any) =>
                setGloveStats((prev: any) => ({ ...prev, sub1: val }))
              }
              sub2={gloveStats.sub2}
              setSub2={(val: any) =>
                setGloveStats((prev: any) => ({ ...prev, sub2: val }))
              }
              sub3={gloveStats.sub3}
              setSub3={(val: any) =>
                setGloveStats((prev: any) => ({ ...prev, sub3: val }))
              }
              sub4={gloveStats.sub4}
              setSub4={(val: any) =>
                setGloveStats((prev: any) => ({ ...prev, sub4: val }))
              }
            />
            <PartSelector
              part={"shoes"}
              stats={stats}
              mainS={shoesStats.mainS}
              setMainS={(val: any) =>
                setShoesStats((prev: any) => ({ ...prev, mainS: val }))
              }
              sub1={shoesStats.sub1}
              setSub1={(val: any) =>
                setShoesStats((prev: any) => ({ ...prev, sub1: val }))
              }
              sub2={shoesStats.sub2}
              setSub2={(val: any) =>
                setShoesStats((prev: any) => ({ ...prev, sub2: val }))
              }
              sub3={shoesStats.sub3}
              setSub3={(val: any) =>
                setShoesStats((prev: any) => ({ ...prev, sub3: val }))
              }
              sub4={shoesStats.sub4}
              setSub4={(val: any) =>
                setShoesStats((prev: any) => ({ ...prev, sub4: val }))
              }
            />
            <PartSelector
              part={"body"}
              stats={stats}
              mainS={bodyStats.mainS}
              setMainS={(val: any) =>
                setBodyStats((prev: any) => ({ ...prev, mainS: val }))
              }
              sub1={bodyStats.sub1}
              setSub1={(val: any) =>
                setBodyStats((prev: any) => ({ ...prev, sub1: val }))
              }
              sub2={bodyStats.sub2}
              setSub2={(val: any) =>
                setBodyStats((prev: any) => ({ ...prev, sub2: val }))
              }
              sub3={bodyStats.sub3}
              setSub3={(val: any) =>
                setBodyStats((prev: any) => ({ ...prev, sub3: val }))
              }
              sub4={bodyStats.sub4}
              setSub4={(val: any) =>
                setBodyStats((prev: any) => ({ ...prev, sub4: val }))
              }
            />
          </div>
          <div className="flex flex-row px-3 justify-center">
            <Button
              text={"Clear"}
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
              disable={false}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row m-3 items-center">
            <Button
              text={"< Back"}
              onClick={() => setNextSection(false)}
              disable={false}
            />
            <div className="text-2xl">{name2}</div>
          </div>
          <div className="flex flex-row">
            <PartSelector
              part={"sphere"}
              stats={stats}
              mainS={sphereStats.mainS}
              setMainS={(val: any) =>
                setSphereStats((prev: any) => ({ ...prev, mainS: val }))
              }
              sub1={sphereStats.sub1}
              setSub1={(val: any) =>
                setSphereStats((prev: any) => ({ ...prev, sub1: val }))
              }
              sub2={sphereStats.sub2}
              setSub2={(val: any) =>
                setSphereStats((prev: any) => ({ ...prev, sub2: val }))
              }
              sub3={sphereStats.sub3}
              setSub3={(val: any) =>
                setSphereStats((prev: any) => ({ ...prev, sub3: val }))
              }
              sub4={sphereStats.sub4}
              setSub4={(val: any) =>
                setSphereStats((prev: any) => ({ ...prev, sub4: val }))
              }
            />
            <PartSelector
              part={"rope"}
              stats={stats}
              mainS={ropeStats.mainS}
              setMainS={(val: any) =>
                setRopeStats((prev: any) => ({ ...prev, mainS: val }))
              }
              sub1={ropeStats.sub1}
              setSub1={(val: any) =>
                setRopeStats((prev: any) => ({ ...prev, sub1: val }))
              }
              sub2={ropeStats.sub2}
              setSub2={(val: any) =>
                setRopeStats((prev: any) => ({ ...prev, sub2: val }))
              }
              sub3={ropeStats.sub3}
              setSub3={(val: any) =>
                setRopeStats((prev: any) => ({ ...prev, sub3: val }))
              }
              sub4={ropeStats.sub4}
              setSub4={(val: any) =>
                setRopeStats((prev: any) => ({ ...prev, sub4: val }))
              }
            />
          </div>
          <div className="flex flex-row px-3 justify-center">
            <Button
              text={"Clear"}
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
                  charSelected,
                  hatStats,
                  gloveStats,
                  shoesStats,
                  bodyStats,
                  sphereStats,
                  ropeStats,
                )
              }
              disable={false}
            />
          </div>
        </div>
      )
    );
  } else {
    return (
      // relic 2pc -> save both
      <div className="flex flex-col">
        <div className="flex flex-row m-3 items-center">
          <Button
            text={"< Back"}
            onClick={() => setNext(false)}
            disable={false}
          />
          <div className="text-2xl">{"2pc " + name + " / 2pc " + name2}</div>
        </div>
        <div className="flex flex-row">
          <PartSelector
            part={"hat"}
            stats={stats}
            mainS={hatStats.mainS}
            setMainS={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={hatStats.sub1}
            setSub1={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={hatStats.sub2}
            setSub2={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={hatStats.sub3}
            setSub3={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={hatStats.sub4}
            setSub4={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"glove"}
            stats={stats}
            mainS={gloveStats.mainS}
            setMainS={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={gloveStats.sub1}
            setSub1={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={gloveStats.sub2}
            setSub2={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={gloveStats.sub3}
            setSub3={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={gloveStats.sub4}
            setSub4={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"shoes"}
            stats={stats}
            mainS={shoesStats.mainS}
            setMainS={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={shoesStats.sub1}
            setSub1={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={shoesStats.sub2}
            setSub2={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={shoesStats.sub3}
            setSub3={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={shoesStats.sub4}
            setSub4={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"body"}
            stats={stats}
            mainS={bodyStats.mainS}
            setMainS={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={bodyStats.sub1}
            setSub1={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={bodyStats.sub2}
            setSub2={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={bodyStats.sub3}
            setSub3={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={bodyStats.sub4}
            setSub4={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
        </div>
        <div className="flex flex-row px-3 justify-center">
          <Button
            text={"Clear"}
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
                charSelected,
                hatStats,
                gloveStats,
                shoesStats,
                bodyStats,
                sphereStats,
                ropeStats,
              )
            }
            disable={false}
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
}) => {
  const [nextSection, setNextSection] = useState(false);
  const name = Object.keys(selectedRelics)[0];
  const name2 = Object.keys(selectedRelics)[1];
  const name3 = Object.keys(selectedRelics)[2];

  async function saveAll(
    charSelected: string,
    hatStats: any,
    gloveStats: any,
    shoesStats: any,
    bodyStats: any,
    sphereStats: any,
    ropeStats: any,
  ) {
    try {
      await save(
        name,
        charSelected,
        hatStats,
        gloveStats,
        shoesStats,
        bodyStats,
        sphereStats,
        ropeStats,
      );
      await save(
        name2,
        charSelected,
        hatStats,
        gloveStats,
        shoesStats,
        bodyStats,
        sphereStats,
        ropeStats,
      );
      await save(
        name3,
        charSelected,
        hatStats,
        gloveStats,
        shoesStats,
        bodyStats,
        sphereStats,
        ropeStats,
      );
    } catch (error) {
      console.error("Error during save:", error);
    }
    if (typeof window !== "undefined") {
      window.location.href = "/relic-dashboard";
    }
  }

  return (
    // relic/relic -> ornament -> save relic stats in both relics and save ornament stats
    // !nextSection = relic, nextSection = ornament
    !nextSection ? (
      <div className="flex flex-col">
        <div className="flex flex-row m-3 items-center">
          <Button
            text={"< Back"}
            onClick={() => setNext(false)}
            disable={false}
          />
          <div className="text-2xl">{"2pc " + name + " / 2pc " + name2}</div>
        </div>
        <div className="flex flex-row">
          <PartSelector
            part={"hat"}
            stats={stats}
            mainS={hatStats.mainS}
            setMainS={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={hatStats.sub1}
            setSub1={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={hatStats.sub2}
            setSub2={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={hatStats.sub3}
            setSub3={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={hatStats.sub4}
            setSub4={(val: any) =>
              setHatStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"glove"}
            stats={stats}
            mainS={gloveStats.mainS}
            setMainS={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={gloveStats.sub1}
            setSub1={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={gloveStats.sub2}
            setSub2={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={gloveStats.sub3}
            setSub3={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={gloveStats.sub4}
            setSub4={(val: any) =>
              setGloveStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"shoes"}
            stats={stats}
            mainS={shoesStats.mainS}
            setMainS={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={shoesStats.sub1}
            setSub1={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={shoesStats.sub2}
            setSub2={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={shoesStats.sub3}
            setSub3={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={shoesStats.sub4}
            setSub4={(val: any) =>
              setShoesStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"body"}
            stats={stats}
            mainS={bodyStats.mainS}
            setMainS={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={bodyStats.sub1}
            setSub1={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={bodyStats.sub2}
            setSub2={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={bodyStats.sub3}
            setSub3={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={bodyStats.sub4}
            setSub4={(val: any) =>
              setBodyStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
        </div>
        <div className="flex flex-row px-3 justify-center">
          <Button
            text={"Clear"}
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
            disable={false}
          />
        </div>
      </div>
    ) : (
      <div className="flex flex-col">
        <div className="flex flex-row m-3 items-center">
          <Button
            text={"< Back"}
            onClick={() => setNextSection(false)}
            disable={false}
          />
          <div className="text-2xl">{name3}</div>
        </div>
        <div className="flex flex-row">
          <PartSelector
            part={"sphere"}
            stats={stats}
            mainS={sphereStats.mainS}
            setMainS={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={sphereStats.sub1}
            setSub1={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={sphereStats.sub2}
            setSub2={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={sphereStats.sub3}
            setSub3={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={sphereStats.sub4}
            setSub4={(val: any) =>
              setSphereStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
          <PartSelector
            part={"rope"}
            stats={stats}
            mainS={ropeStats.mainS}
            setMainS={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, mainS: val }))
            }
            sub1={ropeStats.sub1}
            setSub1={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, sub1: val }))
            }
            sub2={ropeStats.sub2}
            setSub2={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, sub2: val }))
            }
            sub3={ropeStats.sub3}
            setSub3={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, sub3: val }))
            }
            sub4={ropeStats.sub4}
            setSub4={(val: any) =>
              setRopeStats((prev: any) => ({ ...prev, sub4: val }))
            }
          />
        </div>
        <div className="flex flex-row px-3 justify-center">
          <Button
            text={"Clear"}
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
                charSelected,
                hatStats,
                gloveStats,
                shoesStats,
                bodyStats,
                sphereStats,
                ropeStats,
              )
            }
            disable={false}
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

async function save(
  name: string,
  charSelected: string,
  hatStats: any,
  gloveStats: any,
  shoesStats: any,
  bodyStats: any,
  sphereStats: any,
  ropeStats: any,
) {
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
  } catch (error) {
    console.error("Error saving relic:", error);
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
      <div className="p-2 flex flex-col">
        <div style={{ marginBottom: 5 }}>
          <Button text={"< Back"} onClick={BackToCharSelect} disable={false} />
        </div>
        <h1 className="text-3xl">
          Select up to 2 relics and 1 ornament to add.
        </h1>
        <h1 className="text-2xl">Relics</h1>
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
                      ? "#5d737e"
                      : "none",
                  border: selectedRelics[relic.name]
                    ? "1px solid #fcfcfc"
                    : "none",
                  borderRadius: 10,
                  padding: 2,
                  margin: 2,
                }}
              >
                <Image
                  src={relic.local}
                  alt={relic.name}
                  width={50}
                  height={50}
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                />
                <div className="text-xs ml-3" style={{ width: 80 }}>
                  {relic.name}
                </div>
              </div>
            ) : null,
          )}
        </div>
        <h1 className="text-2xl">Ornaments</h1>
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
                      ? "#5d737e"
                      : "none",
                  border: selectedRelics[relic.name]
                    ? "1px solid #fcfcfc"
                    : "none",
                  borderRadius: 10,
                  padding: 2,
                  margin: 2,
                }}
              >
                <Image
                  src={relic.local}
                  alt={relic.name}
                  width={50}
                  height={50}
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                />
                <div className="text-xs ml-3" style={{ width: 80 }}>
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
        />
      );
    }
  }
};

export default AddRelic;
