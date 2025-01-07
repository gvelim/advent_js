import * as fs from 'node:fs/promises';
import {ParserIter, Part1ParserGen, Part1ParserIter, Part2ParserGen, Part2ParserIter} from './parser.ts';
import path from "node:path";

const dir = path.dirname(process.argv[1]);
const lines = (await fs.readFile(dir+"/input.txt", { encoding: "ascii" })).split("\n");

const parse_sum = (parser: ParserIter) => (lines: string[]): number => lines
    .map( line => Array.from(parser.parse(line)) )
    .map( nums => nums[0] ? parseInt(nums[0] + nums.pop()) : 0)
    .reduce((acc, sum) => acc + sum);

console.time();
console.log("\nPart1ParserGen Total = " + parse_sum(new Part1ParserGen())(lines));
console.timeEnd();

console.time();
console.log("\nPart1ParserIter Total = " + parse_sum(new Part1ParserIter())(lines));
console.timeEnd();

console.time();
console.log("\nPart2ParserIter Total = " + parse_sum(new Part2ParserIter())(lines));
console.timeEnd();

console.time();
console.log("\nPart2ParserGen Total = " + parse_sum(new Part2ParserGen())(lines));
console.timeEnd();
