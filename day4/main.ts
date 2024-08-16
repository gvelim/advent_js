import fs from "node:fs/promises";
import { parse_scratch_card, ScratchCard, card_score, calc_wins } from "./scratchcard.ts";
import { pipe, HashMap, Option} from "effect";

const data = await fs.readFile("./day4/input.txt", {encoding: "ascii"});
const cards = data.split("\n").map(parse_scratch_card);
let sum = cards.map(card_score).reduce((acc,n) => acc + n);

console.time();
console.log("Part 1 - Total wins: ",sum);
console.timeEnd();

const card_cloner = (cards: ScratchCard[]) => {
    let h = HashMap.fromIterable(cards.map(card => [card.card,1]));
    return function(id:number, wins: number): number {
        const copies = h.pipe(HashMap.get(id), Option.getOrThrow);
        while(wins > 0)
            h = h.pipe(HashMap.modify(id + wins--, v => v + copies));
        return copies;
    }
}

const cc = card_cloner(cards);
sum = cards
    .map(c => cc(c.card, calc_wins(c).size))
    .reduce( (acc,num) => acc + num);

console.time();
console.log("Part 2 - Total wins: ",sum);
console.timeEnd();
