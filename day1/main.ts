import * as fs from "node:fs/promises";
import {Parser, Part1Parser, Part2Parser} from "../day1/parser";

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
console.log("\nTotal = " + summarise(buf, new Part1Parser()));
console.timeEnd();

console.time();
console.log("\nTotal = " + summarise(buf, new Part2Parser()));
console.timeEnd();
