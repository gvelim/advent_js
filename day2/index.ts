import * as fs from "node:fs/promises";
import { parse_input, parse_run } from "./parser.ts";
import { Game } from "./game.ts";

const games = parse_input(
        await fs.readFile("./day2/input.txt", { encoding: "ascii" })
    );

if( games._tag === "None" ) {
    console.log("main(): Error loading input data. Check input.txt exists under ./day2");
}
else {
    console.time();
    const ref_run = parse_run("12 red, 13 green, 14 blue");
    let sum = (ref_run._tag === "Some")
        ? games.value
            .map(
                (game:Game) => game.runs.every(
                    (r) => r.is_possible(ref_run.value)
                ) ? game.id : 0
            )
            .reduce( (sum:number, id:number) => sum + id )
        : -1;
    console.log("Part 1: " + sum);
    console.timeEnd();

    console.time();
    sum = games.value
        .map(
            (game:Game) => game.runs.reduce(
                (few, run) => few.fewest_feasible(run)
            ).power()
        )
        .reduce( (sum:number, pwr:number) => sum + pwr )
    console.log("Part 2: " + sum);
    console.timeEnd();
}
