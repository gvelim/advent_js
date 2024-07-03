import * as fs from "node:fs/promises";
import {Blueprint} from "./blueprint";

let buf = await fs.readFile("./day3/sample.txt", {encoding: "ascii"});

let bp = Blueprint.parse(buf);

for(let g of bp.gears()) console.log(g);

console.log("Part 1:", bp.sum_parts());
console.log("Part 2:", bp.sum_gears_product());
