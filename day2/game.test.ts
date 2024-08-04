import {test, expect} from 'vitest';
import {parse_run} from './parser.ts';
import {Option, Equal, Data, pipe} from 'effect';
import {Run} from './game.ts';

// try test case as nested array
test.each([
    [pipe(parse_run("3 blue, 4 red"),Option.getOrThrow), true],
    [pipe(parse_run("1 red, 2 green, 6 blue"),Option.getOrThrow), true],
    [pipe(parse_run("2 green"),Option.getOrThrow), true],
    [pipe(parse_run("4 red, 22 green, 6 blue"),Option.getOrThrow), false],
    [pipe(parse_run("14 red, 22 green, 16 blue"),Option.getOrThrow), false],
    [pipe(parse_run("4 red, 2 green, 16 blue"),Option.getOrThrow), false]
])('game::is_possible: %o => %o', (inp:Run, out:boolean) => {
        const t = Option.getOrThrow(parse_run("12 red, 13 green, 14 blue"));
        expect(inp.is_possible(t)).toBe(out);
    })

test("game::fewest_feasible", () => {
    const r: Array<Run> = [
        pipe(parse_run("3 blue, 4 red"),Option.getOrThrow),
        pipe(parse_run("1 red, 2 green, 6 blue"),Option.getOrThrow),
        pipe(parse_run("2 green"),Option.getOrThrow),
        pipe(parse_run("4 red, 22 green, 6 blue"),Option.getOrThrow),
        pipe(parse_run("14 red, 21 green, 15 blue"),Option.getOrThrow),
        pipe(parse_run("4 red, 2 green, 16 blue"),Option.getOrThrow)
    ];

    const t = Option.getOrThrow(parse_run("14 red, 22 green, 16 blue"));
    const f = r.reduce((fewest, run) => {
        return run && fewest?.fewest_feasible(run);
    });
    expect(Equal.equals(Data.struct(f),Data.struct(t))).toBe(true);
    expect(Equal.equals(f,t)).toBe(true);
});

interface IO<IN,OUT> { in:IN, out:OUT };
// try test case as object
test.each([
    {in : Option.getOrThrow(parse_run("3 red, 3 green, 3 blue")), out : 27},
    {in : Option.getOrThrow(parse_run("3 green, 3 blue")), out : 9},
    {in : Option.getOrThrow(parse_run("3 red,3 blue")), out : 9},
    {in : Option.getOrThrow(parse_run("3 red, 3 green")), out : 9},
    {in : Option.getOrThrow(parse_run("3 green")), out : 3},
    {in : Option.getOrThrow(parse_run("3 red")), out : 3},
    {in : Option.getOrThrow(parse_run("3 blue")), out : 3}
])("game::power %o",(d: IO<Run,number>) => {
    expect( d.in && d.in.power()).toBe(d.out);
});
