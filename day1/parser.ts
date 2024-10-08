import {Option, some, none, isSome, map, filterMap} from 'effect/Option';
import {pipe, Array as Arr, String as Str} from 'effect';

const isDigit = (char: string): boolean => char >= '0' && char<= '9';
const result = <T>(value?: T): IteratorResult<T> => ({ done: value === undefined, value: value as T});

const TXT = ["zero","one","two","three","four","five","six","seven","eight","nine"];
const word_to_numeric = (buf: string): Option<string> =>
    pipe(
        TXT,
        Arr.findFirstIndex(word => buf.endsWith(word)),
        map(i => i.toString())
    );

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
            for(const char of chars)
                if( isDigit(char) )
                    return result(char);
            return result();
        },
        [Symbol.iterator]() { return this }
    }
}

// Given a string, return one number at a time
// Number is represented as digit or a word
// Generator implementation
function* parse_part2_gen(line:string): IterableIterator<string> {
    let seen = "";

    for( const c of line) {
        if( isDigit(c) ) {
            seen = "";
            yield c;
        } else {
            seen += c;
            const ret = word_to_numeric(seen);
            if( isSome(ret) ) {
                seen = c;
                yield ret.value;
            }
        }
    }
}
// Given a string, return one number at a time
// Number is represented as digit or a word
// Iterator protocol implementation
function parse_part2_iter(line:string): IterableIterator<string> {
    let seen = "";
    let chars = line[Symbol.iterator]();

    // return an iterate object; implements next() and has Symbol.iterator value set
    return {
        next(): IteratorResult<string> {
            for(const char of chars) {
                if( isDigit(char) ) {
                    seen = "";
                    return result(char);
                } else {
                    seen += char;
                    const res = word_to_numeric(seen);
                    if( isSome(res) ) {
                        seen = char;
                        return result(res.value);
                    }
                }
            }
            return result();
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
