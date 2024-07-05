import * as fs from "node:fs/promises";
import {Blueprint} from "./blueprint";

let buf = await fs.readFile("./day3/input.txt", {encoding: "ascii"});

let bp = Blueprint.parse(buf);

console.log("Part 1:", sum_parts(bp), sum_parts_raw(bp));
console.log("Part 2:", sum_gears_product(bp),sum_gears_product_raw(bp));

// End of program here
// ========== function declarations =========

function sum_gears_product(bp:Blueprint): number {
    let sum = 0;
    for(let gear of bp.gears("*")) {
        sum += gear
            .map((p) => parseInt(p.id))
            .reduce((p,a) => p * a);
    }
    return sum;
}

function sum_gears_product_raw(bp:Blueprint): number {
    return bp.symbols
        .filter((s) => s.id === "*")
        .map((s) => bp.parts.filter((p) => p.is_touching(s,bp.step)))
        .filter((parts) => parts.length === 2)
        .map((parts) => parts.map((p) => parseInt(p.id)))
        .map((parts) => parts.reduce((p,a) => p * a))
        .reduce((sum, parts) => sum + parts)
}

function sum_parts(bp:Blueprint): number {
    let sum = 0;
    for(let part of bp.engine_parts())
        sum += parseInt(part.id)
    return sum;
}

function sum_parts_raw(bp:Blueprint): number {
    return bp.parts
        .map((p) => bp.symbols.some((s) => p.is_touching(s, bp.step)) ? p.id : "0")
        .map((id) => parseInt(id))
        .reduce((sum,id) => sum + id)
}
