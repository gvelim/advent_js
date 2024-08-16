import { pipe, HashMap , Option } from "effect";

interface ScratchCard {
    card: number;
    draw: Set<number>;
    numbers: Set<number>;
}

const break_down = (x:string) => x.split(/^Card|:|\|/).filter((l) => l.length);
const strnums_to_array = (line :string): number[] => line.trim().split(/\s+/).map(Number);
const to_numbers = (x:string[]) => x.map(strnums_to_array);
const calc_wins = (c:ScratchCard) => c.numbers.intersection(c.draw);
const calc_score = (w:Set<number>) => w.size ? Math.pow(2,w.size-1) : 0;
const to_scratchcard = (ns:number[][]): ScratchCard => ({
    card: ns[0][0],
    draw: new Set(ns[1]),
    numbers: new Set(ns[2])
});

export const parse_scratch_card = (line :string): ScratchCard => pipe(line, break_down, to_numbers, to_scratchcard);
export const card_score = (card: ScratchCard): number => pipe(card, calc_wins, calc_score);
export const card_cloner = (cards: ScratchCard[]) => {
    let h = HashMap.beginMutation(
        HashMap.fromIterable(cards.map(card => [card.card,1]))
    );
    return function(card: ScratchCard): number {
        const copies = h.pipe(HashMap.get(card.card), Option.getOrThrow);
        let wins = calc_wins(card).size;
        while(wins > 0)
            h.pipe(HashMap.modify(card.card + wins--, v => v + copies));
        return copies;
    }
}
