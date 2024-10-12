import { Equal as Eq, Hash, Option } from 'effect';

export class Run implements Eq.Equal {
    red? :number;
    green? :number;
    blue? :number;

    [Eq.symbol](o:Eq.Equal): boolean {
       if( !(o instanceof Run) ) return false;
       return Eq.equals(this.red,o.red) && Eq.equals(this.blue,o.blue) && Eq.equals(this.green,o.green);
    }

    [Hash.symbol](): number {
        return Hash.hash(this.toString())
    }

    is_possible(run: Run): boolean {
        return (this.red && run.red ? this.red <= run.red : true)
            && (this.green && run.green ? this.green <= run.green : true)
            && (this.blue && run.blue ? this.blue <= run.blue : true)
    }

    fewest_feasible(r: Run): Run {
        const m = new Run();
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

    static fromString(inp:string) : Option.Option<Run> {
        // incorrectly formatted game string
        if( !inp.match(/^(\s*\d+\s+(blue|red|green),?)+$/) ) return Option.none();

        const run = new Run();
        inp.split(",")
            // 1 red
            .forEach(
                pick => {
                    const p = pick.trim().split(/\s+/);
                    switch(p[1]) {
                        case "red": run.red = parseInt(p[0]); break;
                        case "green": run.green = parseInt(p[0]); break;
                        case "blue": run.blue = parseInt(p[0]); break;
                    }
                }
            )
        return Option.some(run);
    }
}

const parse_runs = (inp: string): Array<Run> => {
    const runs: Array<Run> = [];
    inp.split(";")
        .map(Run.fromString)
        .filter(r => r._tag === "Some")
        .map(r => r.value)
        .forEach(r => runs.push(r));
    return runs;
}

export class Game {
    id: number = -1;
    runs: Array<Run> = [];

    static fromString(inp: string): Option.Option<Game> {
        // incorrectly formatted game string
        if( !inp.match(/^Game\s+\d+\s*:((\s*\d+\s+(blue|red|green)\s*,?)\s*;?)+$/) ) return Option.none();

        const g = inp.split(":");
        return Option.some({
            id : parseInt(g[0].trim().split(/\s+/)[1]),
            runs : parse_runs(g[1])
        })
    }
}