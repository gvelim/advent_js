import {Option, some, none, isSome, map} from 'effect/Option';
import {pipe} from 'effect';

const isDigit = (char: string): boolean => char >= '0' && char<= '9';

const word_to_numeric = (buf: string): Option<string> => {
    const TXT = ["zero","one","two","three","four","five","six","seven","eight","nine"];
    return pipe(
        TXT.findIndex(word => buf.endsWith(word)),
        (i) => i > 0 ? some(i.toString()) : none()
    );
}


// Given a string, return one number at a time
// Generator implementation
function* parse_part1(line:string): IterableIterator<string> {
    for(const c of line) {
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
            l = i+1;
            yield line[i];
        } else {
            const ret = pipe( line.substring(l,i+1), word_to_numeric );
            if( isSome(ret) ) {
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
                    l = i+1;
                    ret = line[i]
                } else
                    pipe(
                        line.substring(l,i+1),
                        word_to_numeric,
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
