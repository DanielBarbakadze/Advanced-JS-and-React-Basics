let person = {
  name: "Daniel",
  "&weird property": "weird",
};

let prop = "name";

person.name; // -> Daniel
person["name"]; // -> Daniel
person["name"]; // -> Daniel
person[prop]; // -> Daniel

person["&weird property"]; // -> weird

// ERROR
// person.&weird property

/* _____________________________ */
/* _____________________________ */
/* _____________________________ */

function sum() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
sum(1, 2, 3, 4); // -> 10

/* _____________________________ */
/* _____________________________ */
/* _____________________________ */

/*
 * arguments is not a real array, it is only an array-like object
 * with a length property and indices. If you want to use array methods
 * like push or pop, you can convert it like this:
 */
let args = Array.prototype.slice.call(arguments, 0);

/* _____________________________ */
/* _____________________________ */
/* _____________________________ */

/*
 * Truthy- and falsyness
 * In JavaScript, values other than actual booleans can evaluate as true (truthy) or false (falsy) in a logical expression. The following values will be treated as falsy:
 * false
 * null
 * undefined
 * 0
 * '' // empty string
 * person.undefinedProperty
 */

/* _____________________________ */
/* _____________________________ */
/* _____________________________ */

/*
 * They can, for example, be evaluated in an if statement:
 *
 */

var person = { name: "David" };
if (person.name) {
  /* Do stuff if property exists and is not falsy */
}

/*
 * Note: This does not work for undeclared variable names.
 * If you want to see if a variable exists (and is not undefined) use the typeof operator:
 *
 */
if (typeof myvar !== "undefined") {
}

/* _____________________________ */
/* _____________________________ */
/* _____________________________ */

/*
 * Equality
 *
 */

// ==

1 == 1; // -> true
1 == "1"; // -> true
1 == 2; // -> false
// Now things get weird
"" == false; // -> true
[] == false; // -> true, [] not falsy though
null == undefined; // -> true

// ===
1 === 1; // -> true
1 === "1"; // -> false
1 === parseInt("1"); // -> true
[] === false; // -> false
null === undefined; // -> false

// reference
var person = { name: "David" };
var otherPerson = person;
person === { name: "David" }; // -> false, created new object
person === otherPerson; // -> true, same reference

/* _____________________________ */
/* _____________________________ */
/* _____________________________ */

// 1. Setting a function with the same parameter names
function funny(a, a) {
  console.log("happy");
}

// 2. Establishing an object with the same keys.
var x = { a: "happy", a: "cat" };
x; //==> What would "x" look like?

// 3. Silent failing assignments
NaN = 5;
//or
undefined = 5;

// 4. Deleting plain names or undeletable properties
var x = "happy";
delete x; //==> What happens to "x"?
//or
delete Object.prototype;

// 5. Setting an integer that starts with a zero to a variable
var x = 0123; //<<== what is this?

/*
 * Implementing Strict Mode
 *
 * Strict Mode is a feature in JavaScript that was introduced in ECMAScript 5.
 * It eliminates some JavaScript silent errors by changing them to throw errors.
 * Strict mode applies to entire scripts or to individual functions.
 * It doesn’t apply to block statements enclosed in {} braces.
 * You can implement strict mode by adding “use strict”; to the beginning of a script or a function.
 *
 */
("use strict"); //You're in Strict Mode!
