import { Soundex } from "./Soundex";

function soundexFor(name: string): string[] {
    return new Soundex(name).codes;
}

function compare(soundex: Soundex, name: string): number {
    return soundex.compareTo(new Soundex(name));
}

test("generates the correct soundex code", () => {
    expect(soundexFor("Master")[0]).toBe("M236");
    expect(soundexFor("Peterson")[0]).toBe("P362");
    expect(soundexFor("JUE")[0]).toBe("J000");
});

test("generates correct codes for full names", () => {
    let masterPeterson = soundexFor("Master Peterson");

    expect(masterPeterson.length).toBe(2);
    expect(masterPeterson[0]).toBe("M236");
    expect(masterPeterson[1]).toBe("P362");
});

test("clears non-english characters", () => {
    expect(soundexFor("M4S%t@!*)r")[0]).toBe("M236");
});

test("throws error when it doesn't find non-english characters", () => {
    expect(() => soundexFor("!@&#á")).toThrow();
});

test("correctly checks for equality", () => {
    const soundex = new Soundex("Jordan Belford");
    expect(soundex.isEqualTo(soundex)).toBeTruthy();
    expect(soundex.isEqualTo(new Soundex("Jordan Belfort"))).toBeTruthy();
    expect(soundex.isEqualTo(new Soundex("Jordan"))).toBeFalsy();
});

test("compares to another soundex", () => {
    let soundex = new Soundex("George");
    expect(soundex.compareTo(soundex)).toBe(0);
    expect(compare(soundex, "Jorge")).toBe(1);
    expect(compare(soundex, "Jorge Michael")).toBe(5);

    soundex = new Soundex("Samuel");
    expect(compare(soundex, "Samu")).toBe(1);
    expect(compare(soundex, "Manuel")).toBe(1); // S540 vs S500
});

test("sorts by soundex distance", () => {
    const soundex = new Soundex("Samuel");
    const inputs = ["Manuel", "Samuel", "Joseph", "Silva"];
    const want = ["Samuel", "Manuel", "Silva", "Joseph"];

    const got = soundex.sortByDistance(inputs);
    got.forEach((_, index) => expect(want[index]).toBe(got[index]));
});
