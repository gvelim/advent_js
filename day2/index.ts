import * as fs from "node:fs/promises";
import { InputParse } from "./parser";
import { Run } from "./game";

let buf = await fs.readFile("./day2/input.txt", { encoding: "ascii" });

let games = new InputParse().parse(buf);

if( games._tag === "None" ) {}
else {
    let run = new Run("12 red, 13 green, 14 blue");
    let sum = games.value
        .map((game) =>
            game.runs
                .map((r) => run.possible(r))
                .reduce((acc, res) => acc && res)
                ? game.id : 0
        )
        .reduce((acc, res) => acc + res);
    console.log(sum);
}