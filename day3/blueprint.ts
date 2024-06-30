export class Range {
    start: number;
    end: number;
    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
    contains(r: Range, offset: number = 0): boolean {
        return (this.start <= r.start + offset)
            && (this.end >= r.end + offset)
    }
}

export class Part {
    id: string;
    pos: Range;
    constructor(id: string, start:number, end:number) {
        this.id = id;
        this.pos = new Range(start,end);
    }
    is_touching(p: Part, step: number): boolean {
        let area = new Range(this.pos.start-1, this.pos.end+1)
        return area.contains(p.pos, step) // under + diagonal
            || area.contains(p.pos, -step) // above + diagonal
            || area.contains(p.pos) // left or right
    }
}

export type Symbol = Part;

export class Blueprint {
    step: number;
    parts: Array<Part>;
    symbols: Array<Symbol>;

    constructor(step: number, parts: Part[], symbols: Symbol[]) {
        this.step = step;
        this.parts = parts;
        this.symbols = symbols
    }

    static parse(input: string): Blueprint {
        let part = "";
        let parts = new Array<Part>;
        let symbols = new Array<Symbol>;

        let map = input.split("\n").reduce((arr, line) => arr+line);

        for(let i = 0; i < map.length; i++) {
            let c = map[i];

            if( c>='0' && c<='9') part += c;
            else {
                if( part.length > 0 ) {
                    parts.push( new Part(part,i - part.length, i-1));
                    part = "";
                }
                if(c !== '.') symbols.push(new Part(c,i,i));
            }
        }

        return new Blueprint( input.search("\n"), parts, symbols );
    }
};
