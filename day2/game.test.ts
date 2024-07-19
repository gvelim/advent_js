import {test, expect} from "vitest";
import {parse_run} from "./parser.js";
import {Option, some, none} from "fp-ts/Option";
import {Run} from "./game.js";

function unwrap<T>(val: Option<T>) : T | undefined {
    return val._tag === "Some" ? val.value : undefined;
}

test("game::is_possible", () => {
    const r: Array<{in:Run, out:boolean}> = [
        {in : unwrap(parse_run("3 blue, 4 red")), out : true},
        {in : unwrap(parse_run("1 red, 2 green, 6 blue")), out : true},
        {in : unwrap(parse_run("2 green")), out : true},
        {in : unwrap(parse_run("4 red, 22 green, 6 blue")), out : false},
        {in : unwrap(parse_run("14 red, 22 green, 16 blue")), out : false},
        {in : unwrap(parse_run("4 red, 2 green, 16 blue")), out : false}
    ]
    .filter((r) => r.in !== undefined);

    const t = unwrap(parse_run("12 red, 13 green, 14 blue"));
    for( let d of r)
        expect(t && d.in.is_possible(t)).toBe(d.out);
});
