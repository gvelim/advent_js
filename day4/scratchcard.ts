import { pipe } from "effect/Function";

export interface ScratchCard {
    card: number;
    draw: Set<number>;
    numbers: Set<number>;
}

const str_num_array = (line :string): number[] => line
    .trim()
    .split(/\s+/)
    .filter((l) => l.length != 0)
    .map((l) => parseInt(l));

export const parse_scratch_card = (line :string): ScratchCard => pipe(
    line
        .split(/^Card|:|\|/)
        .filter((l) => l.length),
    (ns): ScratchCard => ({
            card: str_num_array(ns[0].trim())[0],
            draw: new Set(str_num_array(ns[1].trim())),
            numbers: new Set(str_num_array(ns[2].trim())),
    })
);

export const wins = (card: ScratchCard): number => pipe(
    card.numbers.intersection(card.draw),
    (w) => w.size ? Math.pow(2,w.size-1) : 0
);
