class Run {
    red? :number;
    green? :number;
    blue? :number;

    // 1 red, 2 green, 6 blue
    constructor(input: string) {
        input
            .split(",")
            .forEach(
                (marbles) => {
                    const r = marbles.trim().split(" ");
                    switch(r[1]) {
                        case "red": this.red = parseInt(r[0]); break;
                        case "green": this.green = parseInt(r[0]); break;
                        case "blue": this.blue = parseInt(r[0]); break;
                    }
                }
            )
    }
}

export class Game {
    id: number;
    runs: Array<Run> = [];

    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    constructor(input: string) {
        let g = input.split(":");
        // Game 1
        this.id = parseInt(g[0].split(" ")[1]);
        // 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        g[1].trim()
            .split(";")
            .forEach(
                // 3 blue, 4 red
                (run) => this.runs.push(new Run(run))
            )
    }
}
