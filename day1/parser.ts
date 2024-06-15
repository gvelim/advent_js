import {Option, some, none, map} from "fp-ts/Option";
import {pipe} from "fp-ts/function";

const isDigit = (char: string): boolean => {
    return char >= '0' && char<= '9'
}

const scan_word = (buf: string): Option<string> => {
    const TXT = ["one","two","three","four","five","six","seven","eight","nine"];

    for( let i = 0; i < TXT.length; i++ ) {
        if( buf.endsWith(TXT[i]) )
            return some((i+1).toString());
    }
    return none;
}

export function* parse_part1(line:string): IterableIterator<string> {
    for(let c of line) {
        if( isDigit(c) ) yield c;
    }
}

export function parse_part2(line:string): IterableIterator<string> {
    let l = 0;
    let i = 0;

    return {
        next(): IteratorResult<string> {
            let ret: string = "";
            while( ret === "" && i < line.length) {
                if( isDigit(line[i]) ) {
                    l = i+1,
                    ret = line[i]
                } else
                    pipe(
                    line.substring(l,i+1),
                    scan_word,
                    map((val) => { l = i; ret = val }),
                    );
                i++;
            }
            return {
                done: !ret,
                value: ret
            };
        },
        [Symbol.iterator]() { return this },
    }
}


export interface Parser {
    parse(line:string): IterableIterator<string>;
}

export class Part1 implements Parser {
    parse(line: string): IterableIterator<string> {
        return parse_part1(line);
    }

}

export class Part2 implements Parser {
    parse(line: string): IterableIterator<string> {
        return parse_part2(line);
    }

}
