import fs from "node:fs/promises";
import { parse_scratch_card, wins } from "./scratchcard.ts";

const data = await fs.readFile("./day4/sample.txt", {encoding: "ascii"});
const cards = data.split("\n").map(parse_scratch_card);
const sum = cards.map(wins).reduce((acc,n) => acc + n);

console.log(sum);
