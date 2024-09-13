import * as fs from 'node:fs/promises';
import {Parser, Part1ParserGen, Part2ParserGen, Part2ParserIter} from './parser.ts';

const lines = (await fs.readFile("./day1/input.txt", { encoding: "ascii" })).split("\n");

const parse_sum = (parser: Parser) => (lines: string[]): number => lines
    .map( (line) => {
        const buf = new Array<string>;
        for(const n of parser.parse(line)) buf.push(n);
        return buf[0] ? parseInt(buf[0] + buf.pop()) : 0
        // console.log(line + " = " + sum);
    })
    .reduce((acc, sum) => acc + sum);

console.time();
console.log("\nPart1ParserGen Total = " + parse_sum(new Part1ParserGen())(lines));
console.timeEnd();

console.time();
console.log("\nPart2ParserIter Total = " + parse_sum(new Part2ParserIter())(lines));
console.timeEnd();

console.time();
console.log("\nPart2ParserGen Total = " + parse_sum(new Part2ParserGen())(lines));
console.timeEnd();
