import Image from "next/image";
import relics from "./relics.json";

function RelicCardTemplate({
  relicName,
  relic2Pc,
  relic4Pc,
  relicImage,
}: {
  relicName: string;
  relic2Pc: string;
  relic4Pc: string;
  relicImage: string;
}) {
  return (
    <div className="flex flex-row justify-start">
      <Image
        src={relicImage}
        alt={relicName}
        width={100}
        height={100}
        style={{ width: "auto", height: "100%", padding: 10 }}
        priority
      />

      <div className="flex flex-col py-4" style={{ width: 500 }}>
        <h6 className="text-xl">{relicName}</h6>
        <p className="mt-3">2-Piece Bonus: {relic2Pc}</p>
        {relic4Pc && <p className="mt-3">4-Piece Bonus: {relic4Pc}</p>}
      </div>
    </div>
  );
}

function OrnamentCardTemplate({
  ornamentName,
  ornament2Pc,
  ornamentImage,
}: {
  ornamentName: string;
  ornament2Pc: string;
  ornamentImage: string;
}) {
  return (
    <div className="flex flex-row">
      <Image
        src={ornamentImage}
        alt={ornamentName}
        width={100}
        height={100}
        style={{ width: "auto", height: "100%", padding: 10 }}
        priority
      />

      <div className="flex flex-col py-4" style={{ width: 500 }}>
        <h6 className="text-xl">{ornamentName}</h6>
        <p className="mt-3">2-Piece Bonus: {ornament2Pc}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h4 className="text-3xl">Relic & Ornament Sets</h4>

      <h4 className="text-3xl">Relics</h4>
      {relics.map((relic, index) => {
        if (relic.type === "Relic Set") {
          const relicName = relic.name;
          const relic2Pc = relic.bonus2pc || "";
          const relic4Pc = relic.bonus4pc || "";
          const relicImage = relic.image;
          return (
            <RelicCardTemplate
              key={index}
              relicName={relicName}
              relic2Pc={relic2Pc}
              relic4Pc={relic4Pc}
              relicImage={relicImage}
            />
          );
        } else {
          return null;
        }
      })}

      <h4 className="text-3xl">Ornaments</h4>
      {relics.map((relic, index) => {
        if (relic.type !== "Relic Set") {
          const ornamentName = relic.name;
          const ornament2Pc = relic.bonus2pc;
          const ornamentImage = relic.image;
          return (
            <OrnamentCardTemplate
              key={index}
              ornamentName={ornamentName}
              ornament2Pc={ornament2Pc}
              ornamentImage={ornamentImage}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
