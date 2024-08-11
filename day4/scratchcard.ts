import { pipe } from "effect/Function";

export interface ScratchCard {
    card: number;
    draw: Set<number>;
    numbers: Set<number>;
}

const break_down =(x:string) => x.split(/^Card|:|\|/).filter((l) => l.length);
const strnums_to_array = (line :string): number[] => line.trim().split(/\s+/).map(Number);
const to_numbers = (x:string[]) => x.map(strnums_to_array);
const calc_wins = (c:ScratchCard) => c.numbers.intersection(c.draw);
const calc_score = (w:Set<number>) => w.size ? Math.pow(2,w.size-1) : 0;
const BuildCard = (ns:number[][]): ScratchCard => ({
    card: ns[0][0],
    draw: new Set(ns[1]),
    numbers: new Set(ns[2])
});

export const parse_scratch_card = (line :string): ScratchCard => pipe(line, break_down, to_numbers, BuildCard);
export const wins = (card: ScratchCard): number => pipe(card, calc_wins, calc_score);
