import * as fs from "node:fs/promises";

let buf = await fs.readFile("./day2/sample.txt", { encoding: "ascii" });

console.log(buf);
