
import * as fs from "node:fs/promises";
import * as p from "../day1/parser";

let buf = await fs.readFile("./day1/input.txt", {encoding: 'ascii'});

const summarise = (
    buffer :string,
    parser :(_:string) => IterableIterator<string>
) => {
    let sum = 0;
    for( const line of buffer.split("\n") ) {
        let buf = [];
        for(let n of parser(line)) buf.push(n);
        sum += buf[0] ? parseInt(buf[0] + buf.pop()) : 0;
        // console.log(line + " = " + sum);
    }
    return sum;
}

console.time();
console.log("\nTotal = " + summarise(buf, p.parse_part1));
console.timeEnd();

console.time();
console.log("\nTotal = " + summarise(buf, p.parse_part2));
console.timeEnd();
