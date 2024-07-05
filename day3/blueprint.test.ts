import {expect, test} from "vitest";
import * as fs from "node:fs/promises";
import { Blueprint } from "./blueprint";

async function load_data() {
    return await fs.readFile("./day3/sample.txt",{ encoding: "ascii"})
}

test("Blueprint::Iterator", async () => {
    let iter = Blueprint.parse(await load_data()).gears("*");
    expect(iter.next().value).toHaveLength(2);
    expect(iter.next().value).toHaveLength(2);
    expect(iter.next().value).toHaveLength(0);
});

test("Blueprint::parse", async () => {
    return load_data().then((input) => {
        let bp = Blueprint.parse(input)
        expect(bp.parts.length).toBe(10);
        expect(bp.symbols.length).toBe(6);
    });
});

test( "Part::is_touching()", async () => {
    let bp = Blueprint.parse(await load_data());

    expect(bp.parts[0].is_touching(bp.symbols[0], bp.step)).toBe(true);
    expect(bp.parts[1].is_touching(bp.symbols[0], bp.step)).toBe(false);
    expect(bp.parts[4].is_touching(bp.symbols[2], bp.step)).toBe(true);
    expect(bp.parts[2].is_touching(bp.symbols[2], bp.step)).toBe(false);
});
