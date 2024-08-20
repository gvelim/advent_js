import fs from "node:fs/promises";
import { ScratchCard, parse_scratch_card, card_score, card_cloner } from "./scratchcard.ts";
import { pipe, Array } from "effect";

const calculate_sum = (cards: ScratchCard[], scoreFunc: (card: ScratchCard) => number): number =>
    pipe(cards, Array.map(scoreFunc), Array.reduce(0, (acc, n) => acc + n));

const data = await fs.readFile("./day4/input.txt", { encoding: "ascii" });
const cards = data.split("\n").map(parse_scratch_card);

console.time();
console.log("Part 1 - Total wins: ", calculate_sum(cards, card_score));
console.timeEnd();

const cloner = card_cloner(cards);

console.time();
console.log("Part 2 - Total cards: ", calculate_sum(cards, cloner));
console.timeEnd();
