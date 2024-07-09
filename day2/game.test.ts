import {test, expect} from "vitest";
import {parse_run} from "./parser.js";
import {Option} from "fp-ts/Option";
import {Run} from "./game.js";

test("game::is_possible", () => {
    let runs = [
        parse_run("3 blue, 4 red"),
        parse_run("1 red, 2 green, 6 blue"),
        parse_run("2 green"),
        parse_run("14 red, 2 green, 16 blue")
    ]
        .filter((r) => r._tag === "Some")
        .map((r) => r.value);

    let unwrap = <T>(val: Option<T>) => val._tag === "Some" ? val.value : new Run();

    let test = unwrap(parse_run("12 red, 13 green, 14 blue"));

    expect(runs[0].is_possible(test)).toBe(true);
    expect(runs[1].is_possible(test)).toBe(true);
    expect(runs[2].is_possible(test)).toBe(true);
    expect(runs[3].is_possible(test)).toBe(false);
});
