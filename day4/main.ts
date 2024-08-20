import fs from "node:fs/promises";
import { parse_scratch_card, card_score, card_cloner } from "./scratchcard.ts";
import { pipe } from "effect/Function";
import { Array } from "effect";


const data = await fs.readFile("./day4/input.txt", {encoding: "ascii"});
const cards = data.split("\n").map(parse_scratch_card);

let sum = pipe(
    cards,
    Array.map(card_score),
    Array.reduce(0,(acc,n) => acc + n)
);

console.time();
console.log("Part 1 - Total wins: ",sum);
console.timeEnd();

const cloner = card_cloner(cards);
sum = pipe(
    cards,
    Array.map(cloner),
    Array.reduce(0,(acc,num) => acc + num)
);

console.time();
console.log("Part 2 - Total cards: ",sum);
console.timeEnd();
