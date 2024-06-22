import * as fs from "node:fs/promises";
import { InputParse } from "./parser";
import { Run } from "./game";

let games = new InputParse()
    .parse(
        await fs.readFile("./day2/sample.txt", { encoding: "ascii" })
    );

if( games._tag === "None" ) {}
else {
    console.time();
    const ref_run = new Run("12 red, 13 green, 14 blue");
    let sum = games.value
        .map( (game) => game.runs.every((r) => r.is_possible(ref_run)) ? game.id : 0 )
        .reduce( (sum, id) => sum + id );
    console.log("Part 1: " + sum);
    console.timeEnd();

    console.time();
    sum = games.value
        .map( (game) => game.runs.reduce( (few, run) => few.fewest_feasible(run) ).power() )
        .reduce( (sum, pwr) => sum + pwr )
    console.log("Part 2: " + sum);
    console.timeEnd();
}
