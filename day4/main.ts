import fs from "node:fs/promises";
import { parse_scratch_card, wins } from "./scratchcard.ts";

const data = await fs.readFile("./day4/sample.txt", {encoding: "ascii"});

const cards = data
    .split("\n")
    .map(parse_scratch_card);

let sum = cards
    .map(wins)
    .reduce((sum,num) => sum + num);

console.log(sum);
