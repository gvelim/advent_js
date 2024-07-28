import { Game, Run } from "./game.ts";
import { Option, some, none } from "@baetheus/fun/option";

export const parse_run = (inp:string) : Option<Run>  => {
    // incorrectly formatted game string
    if( inp.search(/^(\s*\d+\s+(blue|red|green),?)+$/) === -1 ) return none;

    const run = new Run();
    inp.split(",")
        // 1 red
        .forEach(
            (pick) => {
                const p = pick.trim().split(/\s+/);
                switch(p[1]) {
                    case "red": run.red = parseInt(p[0]); break;
                    case "green": run.green = parseInt(p[0]); break;
                    case "blue": run.blue = parseInt(p[0]); break;
                }
            }
        )
    return some(run)
}

const parse_runs = (inp: string): Array<Run> => {
    const runs: Array<Run> = [];
    inp.split(";")
        .map(parse_run)
        .filter((r) => r.tag === "Some")
        .map( (r) => r.value )
        .forEach((r) => runs.push(r));
    return runs;
}

const parse_game = (inp: string): Option<Game> => {
    // incorrectly formatted game string
    if( inp.search(/^Game\s+\d+\s*:((\s*\d+\s+(blue|red|green),?)*;?)+$/) === -1 ) return none;

    const g = inp.split(":");
    return some({
        id : parseInt(g[0].trim().split(/\s+/)[1]),
        runs : parse_runs(g[1])
    })
}

export const parse_input = (input: string): Option<Array<Game>> => {
    const games = new Array<Game>;
    input
        .split("\n")
        .map(parse_game)
        .filter( (game) => game.tag === "Some" )
        .map( (game) => game.value )
        .forEach( (game) =>  games.push(game) );

    return games.length !== 0 ? some(games) : none;
}
