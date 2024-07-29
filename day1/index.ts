import * as fs from 'node:fs/promises';
import {Parser, Part1ParserGen, Part2ParserGen, Part2ParserIter} from './parser.ts';

const lines = (await fs.readFile("./day1/input.txt", { encoding: "ascii" })).split("\n");

const summarise = (lines: string[], parser: Parser): number => {
    let sum = 0;
    lines.forEach( (line) => {
        const buf = new Array<string>;
        for(const n of parser.parse(line)) buf.push(n);
        sum += buf[0] ? parseInt(buf[0] + buf.pop()) : 0;
        // console.log(line + " = " + sum);
    });
    return sum;
};

console.time();
console.log("\nPart1ParserGen Total = " + summarise(lines, new Part1ParserGen()));
console.timeEnd();

console.time();
console.log("\nPart2ParserIter Total = " + summarise(lines, new Part2ParserIter()));
console.timeEnd();

console.time();
console.log("\nPart2ParserGen Total = " + summarise(lines, new Part2ParserGen()));
console.timeEnd();
