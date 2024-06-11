
import * as fs from "node:fs/promises";
import {Option, some, none, match} from "fp-ts/Option";
import {pipe} from "fp-ts/function";

function isDigit(char: string): boolean {
    return char >= '0' && char<= '9'
}

const TXT = ["one","two","three","four","five","six","seven","eight","nine"];

function scan_word(buf: string): Option<string> {
    for( let i = 0; i < TXT.length; i++ ) {
        if( buf.endsWith(TXT[i]) )
            return some((i+1).toString());
    }
    return none;
}

let buf = await fs.readFile("./day1/sample.txt", {encoding: 'ascii'});

for (const line of buf.split("\n")) {
    let buf = [];
    let l = 0;

    for (let i = 0; i < line.length; i++) {
        if( isDigit(line[i]) ) {
            l = i+1;
            buf.push(line[i]);
        } else {
            pipe(
                scan_word(line.substring(l,i+1)),
                match(
                    () => {},
                    (val) => { l = i; buf.push(val) }
                ),
            )
        }
    }
    console.log(line + " = " + buf[0] + buf.pop());
}
