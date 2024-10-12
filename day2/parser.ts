import { Game, Run } from './game.ts';
import { Option } from 'effect';

export const parse_input = (input: string): Option.Option<Array<Game>> => {
    const games = new Array<Game>;
    input
        .split("\n")
        .map(Game.fromString)
        .filter( game => game._tag === "Some" )
        .map( game => game.value )
        .forEach( game =>  games.push(game) );

    return games.length ? Option.some(games) : Option.none();
}
