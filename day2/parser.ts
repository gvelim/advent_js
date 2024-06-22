import { Option, none, some } from "fp-ts/lib/Option";
import { Game } from "./game";


interface Parser<T> {
    parse(input: string): Option<T>;
}

class GameParser implements Parser<Game> {
    parse(input: string): Option<Game> {
        return input.split(":").length === 2 ? some(new Game(input)) : none;
    }
}

export class InputParse implements Parser<Array<Game>> {
  parse(input: string): Option<Array<Game>> {
      let games = new Array<Game>;
      let parser = new GameParser;
      input
          .split("\n")
          .forEach(
                (line) => {
                    let game = parser.parse(line);
                    game._tag === "Some" ? games.push(game.value) : {};
                }
            );
      return games.length === 0 ? none : some(games);
  }
}
