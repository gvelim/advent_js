import { pipe, HashMap, Option } from "effect";

type CardNums = Set<number>;

interface ScratchCard {
    card: number;
    draw: CardNums;
    numbers: CardNums;
}

/// Utility functions
const str_of_nums_to_arr = (line :string): number[] => line.trim().split(/\s+/).map(Number);

/// Parsing functions
const split_parts = (x:string) => x.split(/^Card|:|\|/).filter((l) => l.length);
const parts_to_numbers = (fn_toNum: (_:string) => number[]) => (x:string[]) => x.map(fn_toNum);
const to_scratchcard = (ns:number[][]): ScratchCard => ({
    card: ns[0][0],
    draw: new Set(ns[1]),
    numbers: new Set(ns[2])
});
export const parse_scratch_card = (line :string): ScratchCard => pipe(
    line,
    split_parts,
    parts_to_numbers(str_of_nums_to_arr),
    to_scratchcard
);

/// Part 1 functions
const calc_winning_nums = (c:ScratchCard): CardNums => c.numbers.intersection(c.draw);
const calc_score = (fn_wins: (c:ScratchCard) => CardNums) => (c:ScratchCard) => {
    const w = fn_wins(c);
    return w.size ? Math.pow(2,w.size-1) : 0;
}
export const card_score = (card: ScratchCard): number => pipe(card, calc_score(calc_winning_nums));


/// Part 2 functions
export const card_cloner = (cards: ScratchCard[]): (c:ScratchCard) => number => {
    let h = HashMap.beginMutation(
        HashMap.fromIterable(cards.map(card => [card.card,1]))
    );
    return (card: ScratchCard): number => {
        const copies = h.pipe(HashMap.get(card.card), Option.getOrThrow);
        let wins = calc_winning_nums(card).size;
        while(wins > 0)
            h.pipe(HashMap.modify(card.card + wins--, v => v + copies));
        return copies;
    }
}
