import Soundex from "./Soundex";

function soundexFor(name: string): string[] {
    return new Soundex(name).codes;
}

test("generates the correct soundex code", () => {
    expect(soundexFor("Master")[0]).toBe("M236");
    expect(soundexFor("Peterson")[0]).toBe("P362");
    expect(soundexFor("JUE")[0]).toBe("J000");
});

test("generates correct codes for full names", () => {
    let masterPeterson = soundexFor("Master Peterson");

    expect(masterPeterson[0]).toBe("M236");
    expect(masterPeterson[1]).toBe("P362");
});
