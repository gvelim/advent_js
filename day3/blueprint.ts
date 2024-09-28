export class Range {
    start: number;
    end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    contains(r: Range, offset: number = 0): boolean {
        return (this.start <= r.start + offset) && (this.end >= r.end + offset)
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
        return area.contains(p.pos, offset)  // under + diagonal
            || area.contains(p.pos, -offset) // above + diagonal
            || area.contains(p.pos)          // left or right
    }
}

const result = <T>(value?: T): IteratorResult<T> => ({ done: value === undefined, value: value as T})

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
        const parts = this.parts.values();
        const symbols = this.symbols;
        const step = this._step;

        return {
            next(): IteratorResult<EnginePart> {
                for(const part of parts)
                    if( symbols.some(symbol => part.is_touching(symbol,step)) )
                        return result(part);
                return result();
            },
            [Symbol.iterator]() { return this }
        }
    }

    gears(code:string): IterableIterator<EnginePart[]> {
        const symbols = this.symbols[Symbol.iterator]();
        const parts = this.parts;
        const step = this._step;

        return {
            next(): IteratorResult<EnginePart[]> {
                for(const symbol of symbols) {
                    if (symbol.id !== code) continue;
                    const touchingParts = parts.filter(p => p.is_touching(symbol,step));
                    if (touchingParts.length !== 2) continue;
                    return result(touchingParts);
                }
                return result();
            },
            [Symbol.iterator]() { return this; }
        }
    }

    *gears_gen(code: string): IterableIterator<EnginePart[]> {
        for(const symbol of this.symbols) {
            if( symbol.id !== code ) continue;
            const touchinParts = this.parts.filter((p) => p.is_touching(symbol,this.step));
            if( touchinParts.length !== 2 ) continue;
            yield touchinParts;
        }
    }

    static parse(input: string): Blueprint {
        let part = "";
        const parts: Array<EnginePart> = [];
        const symbols: Array<Symbol> = [];

        const map = input.split(/\n/).reduce((acc, s) => acc + s);

        for (let i = 0; i < map.length; i++) {
            const c = map[i];

            if (c>='0' && c<='9') part += c;
            else {
                if (part.length > 0) {
                    parts.push( new EnginePart(part,i - part.length, i-1));
                    part = "";
                }
                if (c !== '.') symbols.push(new EnginePart(c,i,i));
            }
        }

        return new Blueprint( input.indexOf("\n"), parts, symbols );
    }
}
