import {Option, some, none, map} from "fp-ts/Option";
import {pipe} from "fp-ts/function";

const isDigit = (char: string): boolean => {
    return char >= '0' && char<= '9'
}

const scan_word = (buf: string): Option<string> => {
    const TXT = ["zero","one","two","three","four","five","six","seven","eight","nine"];

    for( let i = 0; i < TXT.length; i++ ) {
        if( buf.endsWith(TXT[i]) )
            return some(i.toString());
    }
    return none;
}

// Given a string, return one number at a time
// Generator implementation
function* parse_part1(line:string): IterableIterator<string> {
    for(let c of line) {
        if( isDigit(c) ) yield c;
    }
}

// Given a string, return one number at a time
// Number is represented as digit or a word
// Generator implementation
function* parse_part2_gen(line:string): IterableIterator<string> {
    let l = 0;

    for( let i = 0; i < line.length; i++ ) {
        if( isDigit(line[i]) ) {
            l = i+1,
            yield line[i];
        } else {
            let ret = pipe( line.substring(l,i+1), scan_word );
            if( ret._tag === "Some" ) {
                l = i;
                yield ret.value;
            }
        }
    }
}
// Given a string, return one number at a time
// Number is represented as digit or a word
// Iterator protocol implementation
function parse_part2_iter(line:string): IterableIterator<string> {
    let l = 0;
    let i = 0;

    // return an iterate object; implements next() and has Symbol.iterator value set
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
            }
        },
        [Symbol.iterator]() { return this }
    }
}

// Parser API
export interface Parser {
    parse(line:string): IterableIterator<string>;
}

// Parser API implementation for Part 1
export class Part1ParserGen implements Parser {
    parse(line: string): IterableIterator<string> {
        return parse_part1(line);
    }

}

// Parser API implementation for Part 2
export class Part2ParserIter implements Parser {
    parse(line: string): IterableIterator<string> {
        return parse_part2_iter(line);
    }
}

// Parser API implementation for Part 2
export class Part2ParserGen implements Parser {
    parse(line: string): IterableIterator<string> {
        return parse_part2_gen(line);
    }
}
