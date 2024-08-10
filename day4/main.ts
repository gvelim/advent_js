import fs from "node:fs/promises";
import { pipe } from "effect/Function";

interface ScratchCard {
    card: number;
    draw: Set<number>;
    numbers: Set<number>;
}

const str_num_array = (line :string): number[] => line
    .trim()
    .split(/\s+/)
    .filter((l) => l.length != 0)
    .map((l) => parseInt(l));

const parse_scratch_card = (line :string): ScratchCard => pipe(
    line
        .split(/^Card|:|\|/)
        .filter((l) => l.length),
    (ns): ScratchCard => ({
            card: str_num_array(ns[0].trim())[0],
            draw: new Set(str_num_array(ns[1].trim())),
            numbers: new Set(str_num_array(ns[2].trim())),
    })
);

const data = await fs.readFile("./day4/sample.txt", {encoding: "ascii"});
const cards = data.split("\n").map(parse_scratch_card);
// console.log(cards);

cards.forEach(
    (card) => {
        const wins = card.numbers.intersection(card.draw);
        console.log(wins, Math.pow(2,wins.size-1))
    }
)
