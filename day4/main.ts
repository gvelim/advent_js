import fs from "node:fs/promises";
import { pipe } from "effect/Function";

interface ScratchCard {
    card: number;
    draw: number[];
    numbers: number[];
}

const data = await fs.readFile("./day4/sample.txt", {encoding: "ascii"});
const lines = data.split("\n");

const parse_scratch_card = (line:string): ScratchCard => pipe(
    line
        .split(/Card|\s+|:|\|/)
        .filter((l) => l.length != 0)
        .map((l) => Number(l)),
    (ns): ScratchCard => ({
            card: ns[0],
            draw: ns.slice(1,6),
            numbers: ns.slice(6,),
    })
);

console.log(lines.map(parse_scratch_card));
