import { test, expect } from 'vitest';
import { parse_input } from './parser.ts';
import { Option, pipe } from 'effect';
import { Run } from './game.ts';

type fnCheck = <T>(input: Option.Option<T>) => boolean;

test.each([
    ["1 green, 3 red, 6 blue", Option.isSome],
    ["3 green, 6 red", Option.isSome],
    ["1 green", Option.isSome],
    ["1 green 3 red, 6 blue", Option.isSome],
    ["1 green red, 6 blue", Option.isNone],
    ["green, 3 red, 6 blue", Option.isNone],
    ["1 green, 3 red, 6", Option.isNone]
])("parser::parse_run", (input: string, expected: fnCheck ) => {
    expect(
        pipe(input, Run.fromString, expected)
    ).toBe(true)
})

test.each([
    ["Game 1:2 red, 3 blue;", Option.isSome],
    ["Game 2:;", Option.isNone],
    ["Game 2: 1 red ;", Option.isSome],
    ["Game one:2 red, 3 blue;", Option.isNone],
    ["1:2 red, 3 blue;", Option.isNone],
    ["Game   3  :  1 red  ,  2 blue  ;", Option.isSome],
    ["Game 1:1 red, 2 blue;\nGame 2:3 red, 4 green;", Option.isSome],
    ["Game 1:2 red, 3 blue;\nWrong 2:5 red;\nGame 3:1 green;", Option.isSome],
    ["Wrong:1 red;", Option.isNone],
    ["", Option.isNone],
    ["Game 4:;\nGame 5:;", Option.isNone]
])("parser::parse_game", (input: string, expected: fnCheck) => {
    expect(
        pipe(input, parse_input, expected)
    ).toBe(true);
})
