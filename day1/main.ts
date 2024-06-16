import * as fs from "node:fs/promises";
import {Parser, Part1ParserGen, Part2ParserGen, Part2ParserIter} from "../day1/parser";

let buf = await fs.readFile("./day1/input.txt", { encoding: "ascii" });

const summarise = (buffer: string, parser: Parser) => {
    let sum = 0;
    for (const line of buffer.split("\n")) {
        let buf = [];
        for (let n of parser.parse(line)) buf.push(n);
        sum += buf[0] ? parseInt(buf[0] + buf.pop()) : 0;
        // console.log(line + " = " + sum);
    }
    return sum;
};

console.time();
console.log("\nPart1ParserGen Total = " + summarise(buf, new Part1ParserGen()));
console.timeEnd();

console.time();
console.log("\nPart2ParserIter Total = " + summarise(buf, new Part2ParserIter()));
console.timeEnd();

console.time();
console.log("\nPart2ParserGen Total = " + summarise(buf, new Part2ParserGen()));
console.timeEnd();
