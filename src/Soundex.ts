export default class Soundex {
    public codes: string[];

    public constructor(name: string) {
        this.codes = name.split(" ").map(this.encode);
    }

    public isEqualTo(soundex: Soundex): boolean {
        const { codes } = soundex;

        if (this.codes.length !== codes.length) return false;

        this.codes.forEach((value, index) => {
            if (value !== codes[index]) return false;
        });

        return true;
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
