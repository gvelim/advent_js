import {boolean, number} from "fp-ts";

export class Run {
    red? :number;
    green? :number;
    blue? :number;

    // 1 red, 2 green, 6 blue
    constructor(input: string = "") {
        input
            .split(",")
            // 1 red
            .forEach(
                (marbles) => {
                    const r = marbles.trim().split(/\s+/);
                    switch(r[1]) {
                        case "red": this.red = parseInt(r[0]); break;
                        case "green": this.green = parseInt(r[0]); break;
                        case "blue": this.blue = parseInt(r[0]); break;
                    }
                }
            )
    }

    is_possible(run: Run): boolean {
        return (this.red && run.red ? this.red <= run.red : true)
            && (this.green && run.green ? this.green <= run.green : true)
            && (this.blue && run.blue ? this.blue <= run.blue : true)
    }

    fewest_feasible(r: Run): Run {
        let m = new Run();
        m.red = this.red && r.red ? (this.red > r.red ? this.red : r.red) : this.red || r.red;
        m.green = this.green && r.green ? (this.green > r.green ? this.green : r.green) : this.green || r.green;
        m.blue = this.blue && r.blue ? (this.blue > r.blue ? this.blue : r.blue) : this.blue || r.blue;
        return m;
    }

    power(): number {
        return (this.red ? this.red : 1)
            * (this.green ? this.green : 1)
            * (this.blue ? this.blue : 1);
    }
}

export class Game {
    id: number;
    runs: Array<Run> = [];

    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    constructor(input: string) {
        let g = input.split(":");
        // Game 1
        this.id = parseInt(g[0].trim().split(/\s+/)[1]);
        // 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        g[1].trim()
            .split(";")
            .forEach(
                // 3 blue, 4 red
                (run) => this.runs.push(new Run(run))
            )
    }
}
