import * as fs from "node:fs/promises";
import { InputParse } from "./parser";
import { Run } from "./game";

let games = new InputParse()
    .parse(
        await fs.readFile("./day2/input.txt", { encoding: "ascii" })
    );

if( games._tag === "None" ) {}
else {
    const ref_run = new Run("12 red, 13 green, 14 blue");
    let sum = games.value
        .map((game) => game.runs.every((r) => r.possible(ref_run)) ? game.id : 0)
        .reduce((sum, id) => sum + id);
    console.log("Part 1: " + sum);

    sum = games.value
        .map((game) => game.runs.reduce((max, run) => max.maximum(run)).power())
        .reduce((sum, pwr) => sum + pwr)
    console.log("Part 2: " + sum);
}
