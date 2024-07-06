import {expect, test} from "vitest";
import * as fs from "node:fs/promises";
import { Blueprint } from "./blueprint";

async function load_data() {
    return await fs.readFile("./day3/sample.txt",{ encoding: "ascii"})
}

test("Blueprint::engine_parts", async () => {
    let iter = Blueprint.parse(await load_data()).engine_parts();
    expect(iter.next().value.id).toBe("467");
    expect(iter.next().value.id).toBe("35");
    expect(iter.next().value.id).toBe("633");
    expect(iter.next().value.id).toBe("617");
    expect(iter.next().value.id).toBe("592");
    expect(iter.next().value.id).toBe("755");
    expect(iter.next().value.id).toBe("664");
    expect(iter.next().value.id).toBe("598");
    expect(iter.next().value).toBe(undefined);
});

test("Blueprint::gears", async () => {
    let iter = Blueprint.parse(await load_data()).gears("*");
    expect(iter.next().value).toHaveLength(2);
    expect(iter.next().value).toHaveLength(2);
    expect(iter.next().value).toBe(undefined);
});

test("Blueprint::gears::Generator", async () => {
    let iter = Blueprint.parse(await load_data()).gears_gen("*");
    expect(iter.next().value).toHaveLength(2);
    expect(iter.next().value).toHaveLength(2);
    expect(iter.next().value).toBe(undefined);
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
