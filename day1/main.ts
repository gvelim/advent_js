
import * as fs from "node:fs/promises";

function isDigit(char: string): boolean {
    return char >= '0' && char<= '9'
}

const TXT = ["one","two","three","four","five","six","seven","eight","nine"];
function scan_word(buf: string): (undefined|string) {
    for (let i = 0; i < TXT.length; i++) {
        if(buf.endsWith(TXT[i])) {
            return (i+1).toString()
        }
    }
    return undefined;
}

let buf = await fs.readFile("./day1/sample.txt", {encoding: 'ascii'});


for (const line of buf.split("\n")) {
    let buf = [];
    let last = 0;
    for (let i = 0; i < line.length; i++) {
        if( isDigit(line[i]) ) {
            last = i;
            buf.push(line[i]);
        } else {
            let ret = scan_word(line.substring(last,i+1));
            if( typeof ret === "string"  ) {
                last = i;
                buf.push(ret)
            }
        }
    }
    console.log(line + " = " + buf[0] + buf.pop());
}
