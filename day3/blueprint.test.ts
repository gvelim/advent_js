import { Part, Blueprint } from "./blueprint";

test( "Part::is_touching()", () => {
    let r1 = new Part("432",0,2);
    let r2 = new Part("*",13,13);
    expect(
        r1.pos.contains(r2.pos,10)
    ).toBe(true);
    expect(
     r1.is_touching(r2, 10)
    ).toBe(true);
});
