import * as fs from 'node:fs/promises';
import {Parser, Part1ParserGen, Part2ParserGen, Part2ParserIter} from './parser.ts';

const lines = (await fs.readFile("./day1/input.txt", { encoding: "ascii" })).split("\n");

const parse_sum = (parser: Parser) => (lines: string[]): number => lines
    .map( line => Array.from(parser.parse(line)) )
    .map( nums => nums[0] ? parseInt(nums[0] + nums.pop()) : 0)
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
