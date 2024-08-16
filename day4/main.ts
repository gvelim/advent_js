import fs from "node:fs/promises";
import { parse_scratch_card, card_score, card_cloner } from "./scratchcard.ts";

const data = await fs.readFile("./day4/input.txt", {encoding: "ascii"});
const cards = data.split("\n").map(parse_scratch_card);
let sum = cards.map(card_score).reduce((acc,n) => acc + n);

console.time();
console.log("Part 1 - Total wins: ",sum);
console.timeEnd();

const cloner = card_cloner(cards);
sum = cards.map(cloner).reduce((acc,num) => acc + num);

console.time();
console.log("Part 2 - Total cards: ",sum);
console.timeEnd();
