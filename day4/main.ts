import fs from "node:fs/promises";
import { pipe } from "effect/Function";

interface ScratchCard {
    card: number;
    draw: number[];
    numbers: number[];
}

const str_num_array = (line:string): number[] => line
    .trim()
    .split(/\s+/)
    .filter((l) => l.length != 0)
    .map((l) => Number(l));

const parse_scratch_card = (line:string): ScratchCard => pipe(
    line
        .split(/^Card|:|\|/)
        .filter((l) => l.length),
    (ns): ScratchCard => ({
            card: str_num_array(ns[0].trim())[0],
            draw: str_num_array(ns[1].trim()),
            numbers: str_num_array(ns[2].trim()),
    })
);

const data = await fs.readFile("./day4/sample.txt", {encoding: "ascii"});

console.log(
    data.split("\n").map(parse_scratch_card)
);
