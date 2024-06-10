
import * as fs from "node:fs/promises";

let buf = await fs.readFile("./day1/sample.txt", {encoding: 'ascii'});

for (const line of buf.split("\n")) {
    let buf = [];
    for (const char of line) {
        isDigit(char) ? buf.push(char) : 0;
    }
    console.log(line + " = " + buf[0] + buf.pop());
}

function isDigit(char: string): boolean {
    return char >= '0' && char<= '9'
}