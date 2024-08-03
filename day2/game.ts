import { Equal as Eq, Hash } from 'effect';

export class Game {
    id: number = -1;
    runs: Array<Run> = [];
}

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
}
