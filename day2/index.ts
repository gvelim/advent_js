import * as fs from "node:fs/promises";
import { InputParse } from "./parser";
import * as game from "./game";


let buf = await fs.readFile("./day2/sample.txt", { encoding: "ascii" });

let games = new InputParse().parse(buf);

console.log(games);
