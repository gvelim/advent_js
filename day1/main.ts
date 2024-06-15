
import * as fs from "node:fs/promises";
import {Option, some, none, map} from "fp-ts/Option";
import {pipe} from "fp-ts/function";
import { nextTick } from "node:process";

const isDigit = (char: string): boolean => {
    return char >= '0' && char<= '9'
}

const scan_word = (buf: string): Option<string> => {
    const TXT = ["one","two","three","four","five","six","seven","eight","nine"];

    for( let i = 0; i < TXT.length; i++ ) {
        if( buf.endsWith(TXT[i]) )
            return some((i+1).toString());
    }
    return none;
}

let buf = await fs.readFile("./day1/sample.txt", {encoding: 'ascii'});
let sum = 0;

function ParseIterator(line:string) {
    let l = 0;
    let i = 0;

    return {
        next: () => {
            let ret: string = "";
            while( ret === "" && i < line.length) {
                if( isDigit(line[i]) ) {
                    l = i+1,
                    ret = line[i]
                } else
                    pipe(
                    line.substring(l,i+1),
                    scan_word,
                    map((val) => { l = i; ret = val }),
                    );
                i++;
            }
            return {
                done: !ret,
                value: ret !== "" ? ret: undefined
            };
        }
    }
}

console.time();
for( const line of buf.split("\n") ) {
  let buf = [];
  let l = 0;

    for( let i = 0; i < line.length; i++ ) {
        if( isDigit(line[i]) ) {
            l = i+1;
            buf.push(line[i]);
        } else
            pipe(
                line.substring(l,i+1),
                scan_word,
                map((val) => { l = i; buf.push(val) }),
            );
    }
    sum += buf[0] ? parseInt(buf[0] + buf.pop()) : 0;
    console.log(line + " = " + sum);
}

console.log("Total = " + sum);
console.timeEnd();

let p = ParseIterator("abcone2threexyz");

console.log(p.next())
console.log(p.next())
console.log(p.next())
console.log(p.next())
