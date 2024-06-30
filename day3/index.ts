import * as fs from "node:fs/promises";
import { Blueprint } from "./blueprint";

let buf = await fs.readFile("./day3/input.txt", {encoding: "ascii"});

let bp = Blueprint.parse(buf);

console.log("Part 1:", bp.sum_parts());
console.log("Part 2:", bp.sum_gears_product());
