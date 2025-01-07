import * as fs from 'node:fs/promises';
import { parse_input } from './parser.ts';
import { Option } from 'effect';
import { Run } from "./game.ts";
import path from "node:path";

const dir = path.dirname(process.argv[1]);
const games = parse_input(
        await fs.readFile(dir + "/input.txt", { encoding: "ascii" })
    );

if( Option.isNone(games) ) {
    console.log("main(): Error loading input data. Check input.txt exists under ./day2");
}
else {
    console.time();
    const ref = Run.fromString("12 red, 13 green, 14 blue");
    let sum = Option.isSome(ref)
        ? games.value
            .map( game => game.runs.every( run => run.is_possible(ref.value)) ? game.id : 0 )
            .reduce( (sum, id) => sum + id )
        : -1;
    console.log("Part 1: " + sum);
    console.timeEnd();

    console.time();
    sum = games.value
        .map( game => game.runs
            .reduce( (few, run) => few.fewest_feasible(run) )
            .power()
        )
        .reduce( (sum, pwr) => sum + pwr )
    console.log("Part 2: " + sum);
    console.timeEnd();
}
