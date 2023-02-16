# სილაბუსი 📃

___

# სამუშაო გარემო 💻⌨🖱

რეკომენდებული code editor ები: ● Vis

● Visual Studio [Code](https://code.visualstudio.com/download)

● JetBrains [WebStorm](https://www.jetbrains.com/webstorm/download/?source=google&medium=cpc&campaign=9641686245&gclid=Cj0KCQjwqKuKBhCxARIsACf4XuHkJjS3MeTHOXmEfLv8LltUKKVzKbGoY_8uGtd8NGdBocaNnXhgx3AaAguhEALw_wcB#section=linux)

___

# Javascript საწყისები 🧮
### სწრაფი მიმოხილვა 🔎
   
   
## [Var, Let, and Const  🧩](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)

### var (Example 1)

```js
var tester = "hey hi";
function newFunction() {
var hello = "hello";
}
console.log(hello); // error: hello is not defined
```

### var (Example 2)
```js
var greeter = "hey hi";
var times = 4;
if (times > 3) {
var greeter = "say Hello instead";
}
console.log(greeter) // "say Hello instead"
```
 
### let (Example 1)
```js
let greeting = "say Hi";
let times = 4;
if (times > 3) {
let hello = "say Hello instead";
console.log(hello);// "say Hello instead"
}
console.log(hello) // hello is not defined
```

### let (Example 2)
```js
let greeting = "say Hi";
if (true) {
let greeting = "say Hello instead";
console.log(greeting); // "say Hello instead"
}
console.log(greeting); // "say Hi"
```

### const (Example 1)
```js
const greeting = "say Hi";
greeting = "say Hello instead";// error: Assignment to constant variable.
const greeting = "say Hi";
const greeting = "say Hello instead";// error: Identifier 'greeting' has already
been declared
```

### const (Example 2)
```js
// არ შეგვიძლია მთლიანი ობიექტის მნიშვნელობის შეცვლა:
greeting = {
words: "Hello",
number: "five",
}; // error:
 Assignment to constant variable.
// თუმცა შეგვიძლია ობიექტის რომელიმე key-ს მნიშვნელობის შეცვლა:
greeting.message = "say Hello instead";
```

___

## [Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) Data Types 🧩

პრიმიტივი ეწოდება მონაცემთა ტიპს, რომელიც არ არის
**ობიექტი** და არ აქვს **მეთოდები**

- string (სიმბოლოების თანმიმდევრობა ტექსტის წარმოსადგენად)
- number (მცურავ-მძიმიანი 64ბიტი შემცველობის მონაცემთა ტიპი)
- bigint (შეთანხმებული ზუსტი ფორმატი, დიდი მთელი რიცხვებისთვის)
- boolean (ლოგიკური მონაცემთა ტიპი ორად ორი მნიშვნელობით true/false)
- undefined (ავტომატურად ენიჭება ახლად გამოცხადებულ ცვლადებს)
- symbol (უნიკალური იდენტიფიკატორი, ძირითადად გამოიყენება debugingში)
- null (მიმთითებელი არარსებულ ან არასწორ ობიექტზე ან მისამართზე)

___

## Type [coercion](https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/?fbclid=IwAR0nidQIxbe8dmw9thf-XcgxAMw2nkB5JNxFA435nohV0Ab0T5pE6Ssm15E) 💪

რა იქნება შედეგი?

| Question              |  Answer |
| :---                  |   :---: |
| true + false          |    ?    |
| 12 / "6"              |    ?    |
| "number" + 15 + 3     |    ?    |
| 15 + 3 + "number"     |    ?    |
| [1] > null            |    ?    |
| "foo" + + "bar"       |    ?    |
| 'true' == true        |    ?    |
| false == 'false'      |    ?    |
| null == ''            |    ?    |
| !!"false" == !!"true" |    ?    |
| ['x'] == 'x'          |    ?    |
| [] + null + 1         |    ?    |
| [1,2,3] == [1,2,3]    |    ?    |
| {}+[]+{}+[1]          |    ?    |
| !+[]+[]+![]           |    ?    |
| new Date(0) - 0       |    ?    |
| new Date(0) + 0       |    ?    |

პასუხები:


| Question              | Answer              |
| :---                  |    ---:             |
| true + false          | 1                   |
| 12 / "6"              | 2                   |
| "number" + 15 + 3     | 'number153'         |
| 15 + 3 + "number"     | '18number'          |
| [1] > null            | true                |
| "foo" + + "bar"       | 'fooNaN'            |
| 'true' == true        | false               |
| false == 'false'      | false               |
| null == ''            | false               |
| !!"false" == !!"true" | true                |
| ['x'] == 'x'          | true                |
| [] + null + 1         | 'null1'             |
| [1,2,3] == [1,2,3]    | false               |
| {}+[]+{}+[1]          | '0[object Object]1' |
| !+[]+[]+![]           | 'truefalse'         |
| new Date(0) - 0       | 0                   |
| new Date(0) + 0       | 'Thu Jan 01 1970 02:00:00(EET)0' |

___

# Objects (ობიექტები)

### Example 1: როგორ მივწვდეთ მნიშვნელობებს?

```js
let person = {
name: "Daniel",
"&weird property": "weird",
};
```

#### პასუხი:

```jsx
let prop = "name" ;
person .name; // -> Daniel
person ["name" ]; // -> Daniel
person [‘name’ ]; // -> Daniel
person [prop]; // -> Daniel
person ["&weird property" ]; // -> weird
// ERROR
// person.&weird property
```

### Example 2: რა იქნება შედეგი?
```js
let person = { name: "David" };
let otherPerson = person;
person === { name: "David" }; // -> რა იქნება შედეგი?
person === otherPerson; // -> რა იქნება შედეგი?
```

#### შედეგი:
```js
let person = { name: "David" };
let otherPerson = person;
person === { name: "David" }; // -> false, შექმნა ახალი ობიექტი მეხსიერებაში
person === otherPerson; // -> true, მიენიჭა არსებული მისამართი მეხსიერებიდან
```

### Example 3: რა იქნება შედეგი?
```js
// შევქმნათ მსგავსი key-ების მქონე ობიექტი.
var x = { a: "happy", a: "cat" };
console.log(x); //==> რა იქნება "x" ის მნიშვნელობა?
```

#### შედეგი:
```js
console.log(x); //==> { a: "cat" };
```

___

# Functions (ფუნქციები)

### Example 1: რა იქნება შედეგი?
```js
function sum() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

sum(1, 2, 3, 4);
```

#### შედეგი:
```js
sum(1, 2, 3, 4); // -> 10
```


### Example 2: რა იქნება შედეგი?
```js
function learnArgs() {
    let args = arguments;
    args.push(5);
    return args;
}

learnArgs(1, 2, 3, 4);
```

#### შედეგი:
```js
VM537:3 Uncaught TypeError: args.push is not a function
    at learnArgs (<anonymous>:3:8)
    at <anonymous>:7:1

/*
* arguments არ არის ნამდვილი array, ის არის მხოლოდ array-like object
* სიგრძის და ინდექსების მნიშვნელობით. თუ გსურს გამოიყენო მასივის მეთოდები
* მაგალითად push ან pop, ჯერ უნდა გარდაქმნა იგი ნამდვილ მასივად.
*/

```


### Example 3: რა იქნება შედეგი?
```js
function learnArgs() {
    let args = Array.prototype.slice.call(arguments, 0);
    args.push(5);
    return args;
}

learnArgs(1, 2, 3, 4);
```

#### შედეგი:

```js
learnArgs(1, 2, 3, 4); // -> [1, 2, 3, 4, 5]
```

___

# Practical exercise

შექმენით ფუნქცია, რომელიც არგუმენტებად იღებს სვეტებისა და სტრიქონების რაოდენობას და აბრუნებს შესაბამისი ლოგიკით
ზრდად შაბლონურ ცხრილს.

(შაბლონზე მოცემულია სიტუაცია, როცა **n** არის სვეტების რაოდენობა და **m** სტრიქონების):

```js
let row = 4;
let col = 5;

const getTable = (row, col) => {
    // განათავსე შენი კოდი აქ
}

console.log(getTable(row, col));

// Output:
// [
//  [ 1, 8, 9,  16, 17 ],
//  [ 2, 7, 10, 15, 18 ],
//  [ 3, 6, 11, 14, 19 ],
//  [ 4, 5, 12, 13, 20 ]
// ]
```

ვიზუალიზაცია:

| ⇓ Rows / Cols ⇒ | 1  	 |  2  	| 3   | ... 	| n |
| :---------------:	|:---:|:---: |:---:|:----: |:---:|
| 1               	| 1   | ⬆  	| ⬇  | ⬆⬆   | ⬇ |
| 2               	| ⬇  | ⬆  	| ⬇  | ⬆⬆  | ⬇ |
| 3               	| ⬇  | ⬆  	| ⬇  | ⬆⬆  | ⬇ |
| ...             	| ⬇⬇| ⬆⬆   | ⬇⬇| ⬆⬆  | ⬇ |
| n               	| ⬇  | ⬆  	| ⬇	 | ⬆⬆  | ⬇ |

___

# დავალების ატვირთვის ინსტრუქცია

1. შექმენით [GitHub](https://github.com/login) account (ანგარიში)
2. შექმენით ახალი რეპოზიტორია ([დამხმარე](https://docs.github.com/en/get-started/quickstart/create-a-repo))
3. Windows ის მომხმარებლებმა გადმოწერეთ და დააყენეთ GitBash ([დამხმარე](https://git-scm.com/downloads))
4. შექმენით ნებისმიერი ფოლდერი თქვენს კომპიუტერში და დაუკავშირეთ ახლად შექმნი რეპოს. (დაკავშირების ინსტრუქციას დაგიწერთ, როდესაც ახალ რეპოზიტორიას შექმნით)
5. შექმენით ფაილი homework_1.js და განათავსეთ თქვენი კოდი შიგნით.
6. დასრულების შემდეგ დაამატეთ git ში ცვლილებები ([დამხმარე](https://github.com/git-guides/git-add) git add --all)
7. შექმენით ცვლილებების ლოკალური commit მესიჯით ( git commit -m “Done Homework_1” )
8. ამის შემდეგ გა push ეთ ცვლილებები (git push)
9.შეამოწმეთ რომ ნამდვილად აისახა ცვლილებები რეპოზიტორიაში

_თუ რაიმე მიზეზით გაიჭედებით რომელიმე ეტაპზე მიუხედავად ბევრი მცდელობისა, ალტერნატიულ ვარიანტად შეგიძლიათ
გამომიგზავნოთ მეილზე_
