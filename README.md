> A simple Typescript library implementing the american soundex algorithm with support for fullnames and an idiomatic API.

# Getting Started
`npm i soundex.ts`
# Usage
For more examples, see the test files inside `/src`

``` typescript
import { Soundex } from "soundex.ts";

const samuel = new Soundex("Samuel Silva");
console.log(samuel.codes); // Output: ["S540", "S410"]

const zanel = new Soundex("Sanel Silfa");
console.log(zanel.codes); // Output: ["S540", "S410"]

const manuel = new Soundex("Manuel Silva");
console.log(manuel.codes); // Output: ["M540", "S410"]

// Self explaining
console.log(samuel.matches(zanel)); // True
console.log(samuel.matches(manuel)); // False

// compareTo method returns the hamming distance between the codes
console.log(samuel.compareTo(zanel)); // 0, since they are equal
console.log(samuel.compareTo(manuel)); // 1
console.log(samuel.compareTo(new Soundex("Samuel"))); // 4, since it lacks the second name

// sortByDistance is an useful method which order names by their soundex representation' distance from the soundex object, which is computed by compareTo
const john = new Soundex("john");
const inputs = ["jonas", "johnny", "jennipher", "jomar"];
console.log(john.sortByDistance(inputs)); // ["jonas", "jomar", "johnny", "jennipher"]
```

