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
        let area = new Range(this.pos.start-1, this.pos.end+1);
        return area.contains(p.pos, offset) // under + diagonal
            || area.contains(p.pos, -offset) // above + diagonal
            || area.contains(p.pos) // left or right
    }
}

export type Symbol = EnginePart;

export class Blueprint {
    readonly _step: number;
    parts: Array<EnginePart>;
    symbols: Array<Symbol>;

    constructor(step: number, parts: EnginePart[], symbols: Symbol[]) {
        this._step = step;
        this.parts = parts;
        this.symbols = symbols
    }

    get step() { return this._step; }

    engine_parts(): IterableIterator<EnginePart> {
        let iter = this.parts.values();
        let bp = this;

        return {
            next(): IteratorResult<EnginePart> {
                let p = iter.next();
                while(!p.done && !bp.symbols.some((s) => p.value.is_touching(s, bp._step)) ) {
                    p = iter.next();
                }
                return {
                    done: p.done,
                    value: p.value
                }
            },
            [Symbol.iterator]() { return this }
        }
    }

    gears(symbol:string): IterableIterator<EnginePart[]> {
        let iter = this.symbols[Symbol.iterator]();
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
                }
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
