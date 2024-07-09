import {test,expect} from "vitest";
import {parse_run} from "./parser.js";
import {some} from "fp-ts/Option";

test("parser::parse_run", () => {
    expect(parse_run("1 green, 3 red, 6 blue")._tag).toBe("Some");
    expect(parse_run("3 green, 6 red")._tag).toBe("Some");
    expect(parse_run("1 green")._tag).toBe("Some");
    expect(parse_run("1 green 3 red, 6 blue")._tag).toBe("Some");
    expect(parse_run("1 green red, 6 blue")._tag).toBe("None");
    expect(parse_run("green, 3 red, 6 blue")._tag).toBe("None");
    expect(parse_run("1 green, 3 red, 6")._tag).toBe("None");
})
