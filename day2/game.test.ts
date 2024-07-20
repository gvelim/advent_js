import {test, expect, assert} from "vitest";
import {parse_run} from "./parser.js";
import {Option} from "fp-ts/Option";
import {Run} from "./game.js";

function unwrap<T>(val: Option<T>) : T | undefined {
    return val._tag === "Some" ? val.value : undefined;
}

test("game::is_possible", () => {
    const r: Array<{in:Run|undefined, out:boolean}> = [
        {in : unwrap(parse_run("3 blue, 4 red")), out : true},
        {in : unwrap(parse_run("1 red, 2 green, 6 blue")), out : true},
        {in : unwrap(parse_run("2 green")), out : true},
        {in : unwrap(parse_run("4 red, 22 green, 6 blue")), out : false},
        {in : unwrap(parse_run("14 red, 22 green, 16 blue")), out : false},
        {in : unwrap(parse_run("4 red, 2 green, 16 blue")), out : false}
    ];

    const t = unwrap(parse_run("12 red, 13 green, 14 blue"));
    for( const d of r) {
        assert.ok(d.in, "game::is_possible => Ops! got undefined instead of Run object");
        expect(t && d.in && d.in.is_possible(t)).toBe(d.out);
    }
});

test("game::fewest_feasible", () => {
    const r: Array<Run|undefined> = [
        unwrap(parse_run("3 blue, 4 red")),
        unwrap(parse_run("1 red, 2 green, 6 blue")),
        unwrap(parse_run("2 green")),
        unwrap(parse_run("4 red, 22 green, 6 blue")),
        unwrap(parse_run("14 red, 21 green, 15 blue")),
        unwrap(parse_run("4 red, 2 green, 16 blue"))
    ];

    const t = unwrap(parse_run("14 red, 22 green, 16 blue"));
    const f = r.reduce((fewest, run) => {
        assert.ok(run);
        return run && fewest?.fewest_feasible(run);
    });
    assert.ok(f && t?.equals(t,f));
});

test("game::power",() => {
    const r: Array<{in:Run|undefined, out:number}> = [
        {in : unwrap(parse_run("3 red, 3 green, 3 blue")), out : 27},
        {in : unwrap(parse_run("3 green, 3 blue")), out : 9},
        {in : unwrap(parse_run("3 red,3 blue")), out : 9},
        {in : unwrap(parse_run("3 red, 3 green")), out : 9},
        {in : unwrap(parse_run("3 green")), out : 3},
        {in : unwrap(parse_run("3 red")), out : 3},
        {in : unwrap(parse_run("3 blue")), out : 3}
    ];

    for( const d of r) {
        assert.ok(d.in, "game::power => Ops! got undefined instead of Run object");
        expect( d.in && d.in.power()).toBe(d.out);
    }
});