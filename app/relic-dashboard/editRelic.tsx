import React, { useState } from "react";
import Select from "react-select";
import relicSets from "@/app/relic-sets/relics.json";
import stats from "@/app/relic-sets/stats.json";
import styled from "@emotion/styled";
import Button from "@/components/ButtonWithDisable";
import { updateRelic, RelicData } from "@/lib/storage";

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
    "&:hover": { color: "#e8eaed" },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: "rgba(232, 234, 237, 0.4)",
    "&:hover": { color: "#e8eaed" },
  }),
};

function toOption(val: string | null) {
  return val ? { value: val, label: val } : null;
}

function toStatState(block: any) {
  return {
    mainS: toOption(block?.mainS ?? null),
    sub1: toOption(block?.sub1 ?? null),
    sub2: toOption(block?.sub2 ?? null),
    sub3: toOption(block?.sub3 ?? null),
    sub4: toOption(block?.sub4 ?? null),
  };
}

function extractValues(s: any) {
  return {
    mainS: s.mainS?.value ?? null,
    sub1: s.sub1?.value ?? null,
    sub2: s.sub2?.value ?? null,
    sub3: s.sub3?.value ?? null,
    sub4: s.sub4?.value ?? null,
  };
}

function getStatsByPart(part: string, query: string) {
  for (const key in stats) {
    if (stats[key].part === part) {
      return query === "main" ? stats[key].mainStat : stats[key].subStat;
    }
  }
  return null;
}

function getRelicType(name: string): string | null {
  const match = relicSets.find((r) => r.name === name);
  return match?.type ?? null;
}

const PartEditor = ({
  part,
  statState,
  setStatState,
}: {
  part: string;
  statState: any;
  setStatState: (val: any) => void;
}) => {
  const main = getStatsByPart(part, "main") ?? [];
  const sub = getStatsByPart(part, "sub") ?? [];

  const subs = [statState.sub1, statState.sub2, statState.sub3, statState.sub4];
  const filterSubs = (currentIndex: number) => {
    const picked = subs
      .filter((_, i) => i !== currentIndex)
      .map((s: any) => s?.value)
      .filter(Boolean);
    return sub?.filter((opt: any) => !picked.includes(opt.value)) ?? [];
  };

  const portalTarget = typeof document !== "undefined" ? document.body : undefined;

  const set = (field: string, val: any) =>
    setStatState((prev: any) => ({ ...prev, [field]: val }));

  return (
    <div
      className="flex flex-col p-4 rounded-lg"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <span className="text-sm font-semibold mb-2 capitalize" style={{ color: "var(--foreground)" }}>
        {part}
      </span>
      <span className="text-xs font-medium mb-1" style={{ color: "var(--foreground-muted)" }}>
        Main Stat
      </span>
      <PartSelect
        options={main}
        isClearable
        isSearchable
        value={statState.mainS}
        onChange={(v) => set("mainS", v)}
        styles={customStyles}
        menuPortalTarget={portalTarget}
        menuPosition="fixed"
      />
      <span className="text-xs font-medium mt-2 mb-1" style={{ color: "var(--foreground-muted)" }}>
        Sub Stats
      </span>
      {["sub1", "sub2", "sub3", "sub4"].map((field, i) => (
        <PartSelect
          key={field}
          options={filterSubs(i)}
          isClearable
          isSearchable
          value={statState[field]}
          onChange={(v) => set(field, v)}
          styles={customStyles}
          menuPortalTarget={portalTarget}
          menuPosition="fixed"
        />
      ))}
    </div>
  );
};

const EditRelic = ({
  relic,
  closePopup,
}: {
  relic: RelicData;
  closePopup: () => void;
}) => {
  const type = getRelicType(relic.name);
  const isRelic = type === "Relic Set";

  const [hatStats, setHatStats] = useState(toStatState(relic.hatStats));
  const [gloveStats, setGloveStats] = useState(toStatState(relic.gloveStats));
  const [shoesStats, setShoesStats] = useState(toStatState(relic.shoesStats));
  const [bodyStats, setBodyStats] = useState(toStatState(relic.bodyStats));
  const [sphereStats, setSphereStats] = useState(toStatState(relic.sphereStats));
  const [ropeStats, setRopeStats] = useState(toStatState(relic.ropeStats));

  const parts = isRelic
    ? [
        { key: "hat", state: hatStats, setter: setHatStats },
        { key: "glove", state: gloveStats, setter: setGloveStats },
        { key: "shoes", state: shoesStats, setter: setShoesStats },
        { key: "body", state: bodyStats, setter: setBodyStats },
      ]
    : [
        { key: "sphere", state: sphereStats, setter: setSphereStats },
        { key: "rope", state: ropeStats, setter: setRopeStats },
      ];

  const canSave = isRelic
    ? !!hatStats.mainS && !!gloveStats.mainS && !!shoesStats.mainS && !!bodyStats.mainS
    : !!sphereStats.mainS && !!ropeStats.mainS;

  const handleSave = () => {
    const updated: RelicData = {
      ...relic,
      hatStats: isRelic ? extractValues(hatStats) : relic.hatStats,
      gloveStats: isRelic ? extractValues(gloveStats) : relic.gloveStats,
      shoesStats: isRelic ? extractValues(shoesStats) : relic.shoesStats,
      bodyStats: isRelic ? extractValues(bodyStats) : relic.bodyStats,
      sphereStats: !isRelic ? extractValues(sphereStats) : relic.sphereStats,
      ropeStats: !isRelic ? extractValues(ropeStats) : relic.ropeStats,
    };
    updateRelic(updated);
    window.location.reload();
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex gap-2 mb-4">
        <Button text="Close" onClick={closePopup} disable={false} />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-1">{relic.name}</h2>
      {relic.character && (
        <p className="text-sm mb-4" style={{ color: "var(--foreground-muted)" }}>
          {relic.character}
        </p>
      )}
      <div className="flex flex-row">
        {parts.map(({ key, state, setter }) => (
          <PartEditor key={key} part={key} statState={state} setStatState={setter} />
        ))}
      </div>
      <div className="flex flex-row px-3 justify-center mt-2">
        <Button text="Save" onClick={handleSave} disable={!canSave} />
      </div>
    </div>
  );
};

export default EditRelic;
