import {test,expect} from 'vitest';
import {parse_run} from './parser.ts';
import { Option, pipe } from 'effect';

test.each([
    [pipe(parse_run("1 green, 3 red, 6 blue"),Option.isSome),true],
    [pipe(parse_run("3 green, 6 red"),Option.isSome),true],
    [pipe(parse_run("1 green"),Option.isSome),true],
    [pipe(parse_run("1 green 3 red, 6 blue"),Option.isSome),true],
    [pipe(parse_run("1 green red, 6 blue"),Option.isNone),true],
    [pipe(parse_run("green, 3 red, 6 blue"),Option.isNone),true],
    [pipe(parse_run("1 green, 3 red, 6"),Option.isNone),true],
])("parser::parse_run", (d1: boolean, d2: boolean) => expect(d1).toBe(d2))
