import {test, expect} from 'vitest';
import {parse_run} from './parser.ts';
import {Option, Equal, Data, pipe} from 'effect';
import {Run} from './game.ts';

const parse_unwrap = (run: string) => pipe( parse_run(run),Option.getOrThrow );

// try test case as nested array
test.each([
    ["3 blue, 4 red", true],
    ["1 red, 2 green, 6 blue", true],
    ["2 green", true],
    ["4 red, 22 green, 6 blue", false],
    ["14 red, 22 green, 16 blue", false],
    ["4 red, 2 green, 16 blue", false]
])('game::is_possible: %o => %o', (run:string, out:boolean) => {
        const ref = parse_unwrap("12 red, 13 green, 14 blue");
        expect(
            parse_unwrap(run).is_possible(ref)
        ).toBe(out);
})

test("game::fewest_feasible", () => {
    const r: Array<Run> = [
        parse_unwrap("3 blue, 4 red"),
        parse_unwrap("1 red, 2 green, 6 blue"),
        parse_unwrap("2 green"),
        parse_unwrap("4 red, 22 green, 6 blue"),
        parse_unwrap("14 red, 21 green, 15 blue"),
        parse_unwrap("4 red, 2 green, 16 blue"),
    ];

    const t = parse_unwrap("14 red, 22 green, 16 blue");
    const f = r.reduce( (fewest, run) => fewest.fewest_feasible(run) );

    expect(Equal.equals(Data.struct(f),Data.struct(t))).toBe(true);
    expect(Equal.equals(f,t)).toBe(true);
});

interface IO<IN,OUT> { in:IN, out:OUT };

// try test case as object
test.each([
    {in : parse_unwrap("3 red, 3 green, 3 blue"), out : 27},
    {in : parse_unwrap("3 green, 3 blue"), out : 9},
    {in : parse_unwrap("3 red,3 blue"), out : 9},
    {in : parse_unwrap("3 red, 3 green"), out : 9},
    {in : parse_unwrap("3 green"), out : 3},
    {in : parse_unwrap("3 red"), out : 3},
    {in : parse_unwrap("3 blue"), out : 3},
])("game::power %o",(d: IO<Run,number>) => {
    expect(d.in.power()).toBe(d.out);
});
