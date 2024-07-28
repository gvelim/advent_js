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
        const area = new Range(this.pos.start-1, this.pos.end+1);
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
        const iter = this.parts.values();
        const symbols = this.symbols;
        const step = this._step;
        return {
            next(): IteratorResult<EnginePart> {
                let p: IteratorResult<EnginePart>;
                do p = iter.next();
                while(!p.done && !symbols.some((s) => p.value.is_touching(s, step)) );
                return {
                    done: p.done,
                    value: p.value
                }
            },
            [Symbol.iterator]() { return this }
        }
    }

    gears(symbol:string): IterableIterator<EnginePart[]> {
        const iter = this.symbols[Symbol.iterator]();
        const parts = this.parts;
        const step = this._step;

        return {
            next(): IteratorResult<EnginePart[]> {
                let ret: any = undefined;
                let s = iter.next();
                while(!s.done) {
                    ret = (s.value.id === symbol)
                        ? parts.filter(
                            (p) => p.is_touching(s.value, step)
                        )
                        : ret;
                    if ( ret && ret.length === 2 ) break;
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

    *gears_gen(sym: string): IterableIterator<EnginePart[]> {
        for(const s of this.symbols) {
            if( s.id !== sym ) continue;
            const ret = this.parts.filter((p) => p.is_touching(s,this.step));
            if( ret.length !== 2 ) continue;
            yield ret;
        }
    }

    static parse(input: string): Blueprint {
        let part = "";
        const parts = new Array<EnginePart>;
        const symbols = new Array<Symbol>;

        const map = input.split("\n").reduce((arr, line) => arr+line);

        for(let i = 0; i < map.length; i++) {
            const c = map[i];

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
