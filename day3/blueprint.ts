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

export class EnginePart {
    id: string;
    pos: Range;
    constructor(id: string, start:number, end:number) {
        this.id = id;
        this.pos = new Range(start,end);
    }
    is_touching(p: Symbol, offset: number): boolean {
        let area = new Range(this.pos.start-1, this.pos.end+1)
        return area.contains(p.pos, offset) // under + diagonal
            || area.contains(p.pos, -offset) // above + diagonal
            || area.contains(p.pos) // left or right
    }
}

export type Symbol = EnginePart;

export class Blueprint {
    #step: number;
    parts: Array<EnginePart>;
    symbols: Array<Symbol>;

    constructor(step: number, parts: EnginePart[], symbols: Symbol[]) {
        this.#step = step;
        this.parts = parts;
        this.symbols = symbols
    }

    get step() { return this.#step }

    sum_parts(): number {
        return this.parts
            .map((p) => this.symbols.some((s) => p.is_touching(s, this.#step)) ? p.id : "0")
            .map((id) => parseInt(id))
            .reduce((sum,id) => sum + id)
    }

    sum_gears_product(): number {
        let sum = 0;
        for(let gear of this.gears("*")) {
            sum += gear
                .map((p) => parseInt(p.id))
                .reduce((p,a) => p * a);
        }
        return sum;
        // return this.symbols
        //     .filter((s) => s.id === "*")
        //     .map((s) => this.parts.filter((p) => p.is_touching(s,this.#step)))
        //     .filter((parts) => parts.length === 2)
        //     .map((parts) => parts.map((p) => parseInt(p.id)))
        //     .map((parts) => parts.reduce((p,a) => p * a))
        //     .reduce((sum, parts) => sum + parts)
    }

    gears(symbol:string): IterableIterator<EnginePart[]> {
        let iter = this.symbols.values();
        let bp = this;

        return {
            next(): IteratorResult<EnginePart[]> {
                let ret: EnginePart[] = [];
                let s = iter.next();
                while(!s.done) {
                    ret = (s.value.id === symbol) ? bp.parts.filter((p) => p.is_touching(s.value,bp.step)) : ret;
                    if( ret.length === 2 )
                        break;
                    else
                        s = iter.next();
                };
                return {
                    done: s.done,
                    value: ret,
                };
            },
            [Symbol.iterator]() { return this; }
        }
    }

    static parse(input: string): Blueprint {
        let part = "";
        let parts = new Array<EnginePart>;
        let symbols = new Array<Symbol>;

        let map = input.split("\n").reduce((arr, line) => arr+line);

        for(let i = 0; i < map.length; i++) {
            let c = map[i];

            if( c>='0' && c<='9') part += c;
            else {
                if( part.length > 0 ) {
                    parts.push( new EnginePart(part,i - part.length, i-1));
                    part = "";
                }
                if(c !== '.') symbols.push(new EnginePart(c,i,i));
            }
        }

        return new Blueprint( input.search("\n"), parts, symbols );
    }
}
