export default class Soundex {
    readonly codes: string[];

    public constructor(readonly name: string) {
        this.codes = name.split(" ").map(this.encode);
    }

    public isEqualTo(soundex: Soundex): boolean {
        const { codes } = soundex;

        if (this.codes.length !== codes.length) return false;

        this.codes.forEach((code, index) => {
            if (code !== codes[index]) return false;
        });

        return true;
    }

    public compareTo(soundex: Soundex): number {
        let counter = 0;
        const codes = soundex.codes;

        this.codes.forEach((code, index) => {
            counter += this.codeDistance(code, codes[index]);
        });

        counter += 4 * Math.abs(this.codes.length - codes.length);

        return counter;
    }

    private codeDistance(code1: string, code2: string): number {
        let counter = 0;

        for (let i = 0; i < 4; i++) {
            if (code1[i] !== code2[i]) counter++;
        }

        return counter;
    }

    private encode(name: string): string {
        let code = "";

        name = name
            .toUpperCase()
            .replace(/[^A-Z]/g, "");

        if (name.length === 0)
            throw new Error("string doesn't contain any valid characters: .");

        code = code.concat(name[0]);
        name = name.substring(1);

        for (let char of name) {
            if (code.length >= 4) break;

            let digit = "";

            if ("BFPV".includes(char)) {
                digit = "1";
            } else if ("CGJKQSXZ".includes(char)) {
                digit = "2";
            } else if ("DT".includes(char)) {
                digit = "3";
            } else if ("L" === char) {
                digit = "4";
            } else if ("MN".includes(char)) {
                digit = "5";
            } else if ("R" === char) {
                digit = "6";
            } else {
                continue;
            }

            if (digit !== code[code.length - 1])
                code = code + digit;
        }

        while (code.length < 4) code = code + "0";

        return code;
    }
}
