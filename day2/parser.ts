import { Game, Run } from './game.ts';
import { Option } from 'effect';

export const parse_run = (inp:string) : Option.Option<Run>  => {
    // incorrectly formatted game string
    if( !inp.match(/^(\s*\d+\s+(blue|red|green),?)+$/) ) return Option.none();

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
    return Option.some(run);
}

const parse_runs = (inp: string): Array<Run> => {
    const runs: Array<Run> = [];
    inp.split(";")
        .map(parse_run)
        .filter((r) => r._tag === "Some")
        .map( (r) => r.value )
        .forEach((r) => runs.push(r));
    return runs;
}

const parse_game = (inp: string): Option.Option<Game> => {
    // incorrectly formatted game string
    if( !inp.match(/^Game\s+\d+\s*:((\s*\d+\s+(blue|red|green)\s*,?)\s*;?)+$/) ) return Option.none();

    const g = inp.split(":");
    return Option.some({
        id : parseInt(g[0].trim().split(/\s+/)[1]),
        runs : parse_runs(g[1])
    })
}

export const parse_input = (input: string): Option.Option<Array<Game>> => {
    const games = new Array<Game>;
    input
        .split("\n")
        .map(parse_game)
        .filter( game => game._tag === "Some" )
        .map( game => game.value )
        .forEach( game =>  games.push(game) );

    return games.length ? Option.some(games) : Option.none();
}
