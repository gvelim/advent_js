import * as fs from 'node:fs/promises';
import {Blueprint} from './blueprint.ts';
import path from "node:path";

const dir = path.dirname(process.argv[1]);
const buf = await fs.readFile(dir + "/input.txt", {encoding: "ascii"});
const bp = Blueprint.parse(buf);

console.time();
console.log("Part 1:", sum_parts(bp), sum_parts_raw(bp));
console.timeEnd();
console.time();
console.log("Part 2:", sum_gears_product(bp), sum_gears_product_raw(bp));
console.timeEnd();

// End of program here
// ========== function declarations =========

function sum_gears_product(bp:Blueprint): number {
    let sum = 0;
    for(const gear of bp.gears("*"))
        sum += gear.reduce((acc, p) => acc * parseInt(p.id), 1);
    return sum;
}

function sum_gears_product_raw(bp:Blueprint): number {
    return bp.symbols
        .filter( s => s.id === "*")
        .map( s => bp.parts.filter( p => p.is_touching(s,bp.step)))
        .filter( parts => parts.length === 2)
        .map( parts => parts.reduce((acc, p) => acc * parseInt(p.id), 1))
        .reduce((sum, parts) => sum + parts, 0);
}

function sum_parts(bp:Blueprint): number {
    let sum = 0;
    for(const part of bp.engine_parts())
        sum += parseInt(part.id)
    return sum;
}

function sum_parts_raw(bp:Blueprint): number {
    return bp.parts
        .map(p => bp.symbols.some(s => p.is_touching(s, bp.step)) ? parseInt(p.id) : 0)
        .reduce((sum, id) => sum + id, 0);
}
