import {test,expect} from 'vitest';
import {parse_run} from './parser.ts';
import { Option } from 'effect';

test.each([
    Option.isSome(parse_run("1 green, 3 red, 6 blue")),
    Option.isSome(parse_run("3 green, 6 red")),
    Option.isSome(parse_run("1 green")),
    Option.isSome(parse_run("1 green 3 red, 6 blue")),
    Option.isNone(parse_run("1 green red, 6 blue")),
    Option.isNone(parse_run("green, 3 red, 6 blue")),
    Option.isNone(parse_run("1 green, 3 red, 6"))
])("parser::parse_run", (c) => expect(c).toBe(true))
