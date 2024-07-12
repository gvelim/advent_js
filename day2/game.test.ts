import {test, expect} from "vitest";
import {parse_run} from "./parser.js";
import {Option} from "fp-ts/Option";
import {Run} from "./game.js";
import {some} from "fp-ts/Option";

function unwrap<T>(val: Option<T>) : T | undefined {
    return val._tag === "Some" ? val.value : undefined;
}

test("game::is_possible", () => {
    let r: Array<[Run,boolean]> = [
        [parse_run("3 blue, 4 red"), true],
        [parse_run("1 red, 2 green, 6 blue"), true],
        [parse_run("2 green"), true],
        [parse_run("4 red, 22 green, 6 blue"), false],
        [parse_run("14 red, 22 green, 16 blue"), false],
        [parse_run("4 red, 2 green, 16 blue"), false]
    ]
        .filter((r) => r[0]._tag === "Some")
        .map((r) => [r[0].value, r[1]]);

    let t = unwrap(parse_run("12 red, 13 green, 14 blue"));
    for( let d of r)
        expect(t && d[0].is_possible(t)).toBe(d[1]);
});
