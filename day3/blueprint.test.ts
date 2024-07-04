import * as fs from "node:fs/promises";
import { Blueprint } from "./blueprint";

async function load_data() {
    return await fs.readFile("./day3/sample.txt",{ encoding: "ascii"})
}

test("Blueprint::Iterator", () => {
    load_data().then( (input) => {
        let iter = Blueprint.parse(input).gears("*");
        expect(iter.next().value).toHaveLength(2);
        expect(iter.next().value).toHaveLength(2);
        expect(iter.next().value).toHaveLength(2);
        expect(iter.next().value).toHaveLength(2);
        expect(iter.next().value).toHaveLength(2);
        expect(iter.next().value).toHaveLength(2);
        expect(iter.next().value).toHaveLength(2);
    })
});

test("Blueprint::parse", () => {
    load_data().then(
        (input) => {
            let bp = Blueprint.parse(input);
            expect(bp.parts.length && bp.symbols.length).toBeGreaterThan(0);
        })
});

test( "Part::is_touching()", () => {
    load_data().then(
        (input) => {
            let bp = Blueprint.parse(input);
            expect(bp.parts.length && bp.symbols.length).toBeGreaterThan(0);

            expect(bp.parts[0].is_touching(bp.symbols[0], bp.step)).toBe(true);
            expect(bp.parts[1].is_touching(bp.symbols[0], bp.step)).toBe(false);
            expect(bp.parts[4].is_touching(bp.symbols[2], bp.step)).toBe(true);
            expect(bp.parts[2].is_touching(bp.symbols[2], bp.step)).toBe(false);
        });
});
