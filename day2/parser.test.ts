import {test,expect} from 'vitest';
import {parse_run} from './parser.ts';

test("parser::parse_run", () => {
    expect(parse_run("1 green, 3 red, 6 blue").tag).toBe("Some");
    expect(parse_run("3 green, 6 red").tag).toBe("Some");
    expect(parse_run("1 green").tag).toBe("Some");
    expect(parse_run("1 green 3 red, 6 blue").tag).toBe("Some");
    expect(parse_run("1 green red, 6 blue").tag).toBe("None");
    expect(parse_run("green, 3 red, 6 blue").tag).toBe("None");
    expect(parse_run("1 green, 3 red, 6").tag).toBe("None");
})
