import * as fs from "node:fs/promises";
import { parse_input, parse_run } from "./parser";
import { Run } from "./game";

let games = parse_input(
        await fs.readFile("./day2/input.txt", { encoding: "ascii" })
    );

if( games._tag === "None" ) {}
else {
    console.time();
    const ref_run = parse_run("12 red, 13 green, 14 blue");
    let sum = (ref_run._tag === "Some") ? games.value
        .map( (game) => game.runs.every((r) => r.is_possible(ref_run.value)) ? game.id : 0 )
        .reduce( (sum, id) => sum + id )
        : -1;
    console.log("Part 1: " + sum);
    console.timeEnd();

    console.time();
    sum = games.value
        .map( (game) => game.runs.reduce( (few, run) => few.fewest_feasible(run) ).power() )
        .reduce( (sum, pwr) => sum + pwr )
    console.log("Part 2: " + sum);
    console.timeEnd();
}
