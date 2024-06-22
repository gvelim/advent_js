import * as fs from "node:fs/promises";
import { InputParse } from "./parser";

let buf = await fs.readFile("./day2/sample.txt", { encoding: "ascii" });

let games = new InputParse().parse(buf);
if (games._tag === "Some")
    games.value.forEach((game) => console.log(game));
