import Image from "next/image";
import path from "path";

import relics from "./relics.json";

function RelicCardTemplate(id: number) {
    const relicName = relics[id].name;
    const relic2Pc = relics[id].bonus2pc;
    const relic4Pc = relics[id].bonus4pc;
    const relicImage = path.join('/set-images', `${relicName.replace(/\s+/g, '_')}.png`);

    return (
        <><div className="flex flex-row">
            <Image
                src={relicImage}
                alt={relicName}
                width={100}
                height={100}
                className="flex-shrink-0"
                priority />
                
                <div className="flex flex-col py-4">
                    <h6 className="text-xl">{relicName}</h6>
                    <p className="mt-3">2-Piece Bonus: {relic2Pc}</p>
                    <p className="mt-3">4-Piece Bonus: {relic4Pc}</p>
                </div>
        </div>
        </>
    );
}

function OrnamentCardTemplate(id: number) {
    const ornamentName = relics[id].name;
    const ornament2Pc = relics[id].bonus2pc;
    const ornamentImage = path.join('/set-images', `${ornamentName.replace(/\s+/g, '_')}.png`);

    return (
        <><div className="flex flex-row">
            <Image
                src={ornamentImage}
                alt={ornamentName}
                width={100}
                height={100}
                className="flex-shrink-0"
                priority />
                
                <div className="flex flex-col py-4">
                    <h6 className="text-xl">{ornamentName}</h6>
                    <p className="mt-3">2-Piece Bonus: {ornament2Pc}</p>
                </div>
        </div>
        </>
    );
}

export default function Page() {
    return (
        <>
            <div className="flex flex-col items-center min-h-screen py-2">
                <h4 className="text-3xl">Relic & Ornament Sets</h4>
                <h4 className="text-3xl">Relics</h4>
                <RelicCardTemplate />
                <h4 className="text-3xl">Ornaments</h4>
                <OrnamentCardTemplate />
            </div>
        </>
    );
}