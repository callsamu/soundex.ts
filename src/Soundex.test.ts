import Soundex from "./Soundex";

function soundexFor(word: string) {
    return new Soundex(word).code;
}

test("generates the correct soundex code", () => {
    expect(soundexFor("Master")).toBe("M236");
    expect(soundexFor("Peterson")).toBe("P362");
    expect(soundexFor("JUE")).toBe("J000");
});

// STREAM PAUSADA TO MUTADO
