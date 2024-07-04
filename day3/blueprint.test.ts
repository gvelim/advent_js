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
    let bp = Blueprint.parse(await load_data());
    expect(bp.parts.length && bp.symbols.length).toBeGreaterThan(0);
});

test( "Part::is_touching()", async () => {
    let bp = Blueprint.parse(await load_data());
    expect(bp.parts.length && bp.symbols.length).toBeGreaterThan(0);

    expect(bp.parts[0].is_touching(bp.symbols[0], bp.step)).toBe(true);
    expect(bp.parts[1].is_touching(bp.symbols[0], bp.step)).toBe(false);
    expect(bp.parts[4].is_touching(bp.symbols[2], bp.step)).toBe(true);
    expect(bp.parts[2].is_touching(bp.symbols[2], bp.step)).toBe(false);
});
