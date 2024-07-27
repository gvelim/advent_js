import {Eq} from "fp-ts/Eq";

export class Game {
    id: number = -1;
    runs: Array<Run> = [];
}

export class Run implements Eq<Run> {
    red? :number;
    green? :number;
    blue? :number;

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

    equals(x: Run, y: Run): boolean {
        return (x.red === y.red) && (x.green === y.green) && (x.blue === y.blue);
    }
}
