import fs from "node:fs/promises";
import { ScratchCard, parse_scratch_card, calc_card_score, card_cloner } from "./scratchcard.ts";
import { pipe, Array } from "effect";
import path from "node:path";

const calculate_sum = (scoring_fn: (card: ScratchCard) => number) => (cards: ScratchCard[]): number =>
    pipe(
        cards,
        Array.map(scoring_fn),
        Array.reduce(0, (acc, n) => acc + n)
    );

const dir = path.dirname(process.argv[1]);
const data = await fs.readFile(dir+"/input.txt", { encoding: "ascii" });
const cards = data.split("\n").map(parse_scratch_card);

console.time();
console.log("Part 1 - Total wins: ", calculate_sum(calc_card_score)(cards));
console.timeEnd();

const cloner = card_cloner(cards);

console.time();
console.log("Part 2 - Total cards: ", calculate_sum(cloner)(cards));
console.timeEnd();
