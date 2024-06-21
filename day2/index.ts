import * as fs from "node:fs/promises";


class Run {
    red? :number;
    green? :number;
    blue? :number;

    constructor(input: string) {
        input
            .split(",")
            .forEach(
                (run) => {
                    const r = run.trim().split(" ");
                    switch(r[1]) {
                        case "red": this.red = parseInt(r[0]); break;
                        case "green": this.green = parseInt(r[0]); break;
                        case "blue": this.blue = parseInt(r[0]); break;
                    }
                }
            )
    }
}

class Game {
    id: number;
    runs: Array<Run> = [];

    constructor(input: string) {
        let g = input.split(":");
        this.id = parseInt(g[0].split(" ")[1]);
        g[1].trim()
            .split(";")
            .forEach(
                (run) => this.runs.push(new Run(run))
            )
    }
}


let buf = await fs.readFile("./day2/sample.txt", { encoding: "ascii" });

buf
  .split("\n")
  .forEach(
        (line) => console.log(new Game(line))
    );
