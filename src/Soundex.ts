export default class Soundex {
    public code: string;

    public constructor(name: string) {
        let code = "";

        name = name
            .toUpperCase()
            .replace(/[^A-Z]/g, "");

        if (name.length === 0)
            throw new Error("string doesn't contain any valid characters: .");

        code = code.concat(name[0]);
        name = name.substring(1);

        for (let char of name) {
            let digit = "";

            if ("AEIOUWY".includes(char)) {
                continue; // Remove all zeroes
            } else if ("BFPV".includes(char)) {
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
                code = code.concat(digit);
        }

        while (code.length < 4) code = code.concat("0");
        this.code = code.substring(0, 4);
    }
}
