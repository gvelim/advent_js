import * as fs from "node:fs/promises";
import { Blueprint } from "./blueprint";

let buf = await fs.readFile("./day3/input.txt", { encoding: "ascii"});

let bp = Blueprint.parse(buf);
let sum = bp.parts
    .map((p) => bp.symbols.some((s) => p.is_touching(s, bp.step)) ? p.id : "0")
    .map((id) => parseInt(id))
    .reduce((sum,id) => sum + id);
console.log("Part 1:", sum);

let product = bp.symbols
    .filter((s) => s.id === "*")
    .map(
        (s) => bp.parts
            .filter((p) => p.is_touching(s,bp.step))
            .map((p) => p)
    )
    .filter((parts) => parts.length === 2)
    .map((parts) => parts.map((p) => parseInt(p.id)))
    .map((parts) => parts.reduce((p,a) => p * a))
    .reduce((sum, parts) => sum + parts);
console.log("Part 2:", product);
