import {Option, some, none, isSome, map} from 'effect/Option';
import {pipe, Array as Arr, String as Str} from 'effect';

const isDigit = (char: string): boolean => char >= '0' && char<= '9';

const TXT = ["zero","one","two","three","four","five","six","seven","eight","nine"];
const word_to_numeric = (buf: string): Option<string> =>
    pipe(
        TXT,
        Arr.findFirstIndex(word => buf.endsWith(word)),
        map(i => i.toString())
    );

const some_result = <T>(value:T): IteratorResult<T> => { return { done: false, value: value }}
const no_result = (): IteratorResult<any> => { return { done: true, value: undefined }}

// Given a string, return one number at a time
// Generator implementation
function* parse_part1(line:string): IterableIterator<string> {
    for(const c of line)
        isDigit(c) ? yield c : 0;
}

// Given a string, return one number at a time
// Iterator protocol implementation
function parse_part1_iter(line:string): IterableIterator<string> {
    let chars = line[Symbol.iterator]();
    return {
        next() {
            let result = no_result();

            for(const char of chars)
                if( isDigit(char) ) {
                    result = some_result(char);
                    break;
                };
            return result;
        },
        [Symbol.iterator]() { return this }
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
            const ret = pipe( line, Str.substring(l,i+1), word_to_numeric );
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
            let result = no_result();
            while( result.done && i < line.length) {
                if( isDigit(line[i]) ) {
                    l = i;
                    result = some_result(line[i]);
                } else
                    pipe(
                        line,
                        Str.substring(l,i+1),
                        word_to_numeric,
                        map((num) => {
                            l = i;
                            result = some_result(num)
                        }),
                    );
                i++;
            }
            return result;
        },
        [Symbol.iterator]() { return this }
    }
}

// Parser API
export interface ParserIter {
    parse(line:string): IterableIterator<string>;
}

// Parser API implementation for Part 1
export class Part1ParserGen implements ParserIter {
    parse(line: string): IterableIterator<string> {
        return parse_part1(line);
    }

}

export class Part1ParserIter implements ParserIter {
    parse(line: string): IterableIterator<string> {
        return parse_part1_iter(line);
    }

}

// Parser API implementation for Part 2
export class Part2ParserIter implements ParserIter {
    parse(line: string): IterableIterator<string> {
        return parse_part2_iter(line);
    }
}

// Parser API implementation for Part 2
export class Part2ParserGen implements ParserIter {
    parse(line: string): IterableIterator<string> {
        return parse_part2_gen(line);
    }
}
