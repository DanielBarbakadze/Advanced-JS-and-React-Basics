> # Meeting 2

განსახილველი თემები:

* ↗ [What is 'This'](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/edit/master/Meeting-2/README.md#what-is-this)
* 🔃 [.bind() | .call() | .apply()](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/edit/master/Meeting-2/README.md#bind--call--apply)
* 🏗 [Constructor Functions](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/edit/master/Meeting-2/README.md#constructor-functions)
* 🧬 [Object prototype](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/edit/master/Meeting-2/README.md#object-prototypes)

## ↗ What is '**This**'

`this` მიგვითითებს **კონტექსტზე** სადაც მიმდინარედ ვიმყოფებით.

(**კონტექსტად** მოიხსენიება ის ობიექტი, რომელსაც ეკუთვნის ფუნქცია)

მას აქვს განსხვავებული მნიშვნელობები იმისდა მიხედვით, თუ სად გამოიყენება:

* მეთოდში, `this` წარმოადგენს **მფლობელ ობიექტს**.
* დამოუკიდებლად, `this` წარმოადგენს **გლობალურ ობიექტს**.
* ფუნქციაში, `this` წარმოადგენს **გლობალურ ობიექტს**
* ფუნქციაში, მაგრამ **strict mode** ის შემთხვევაში, არის `undefined`
* event-ში, `this` წარმოადგენს **ელემენტს** რომელიც იღებს event-ს.
* მეთოდებში `call()` და `apply()`` შეიძლება მიუთითებდეს **ნებისმიერ ობიექტზე**.

---

### Global Context

In the global execution context (outside of any function), `this` refers to the global object whether in strict mode or not.

```js
// In web browsers, the window object is also the global object:
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)         // "MDN"
```

> **Note:** You can always easily get the global object using the global [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) property, regardless of the current context in which your code is running.

---

### Function context

Inside a function, the value of `this` **depends on how the function is called**.

Since the following code is not in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), and because the value of `this` is not set by the call, `this` will default to the global object, which is [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window "window") in a browser.

```js
function f1() {
  return this;
}

// In a browser:
f1() === window; // true

// In Node:
f1() === globalThis; // true
```

In strict mode, however, if the value of `this` is not set when entering an execution context, it remains as `undefined`, as shown in the following example:

```js
function f2() {
  'use strict'; // see strict mode
  return this;
}

f2() === undefined; // true
```

> **Note:** To set the value of `this` to a particular value when calling a function, we need to use [`call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), or [`apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) (we will discuss about them very soon)

---

### **this** in a Method

In an object method, `this` refers to the "**owner**" of the method.

In the example on the top of this page, `this` refers to the **person** object.

The **person** object is the **owner** of the **fullName** method.

```js
var person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName; // John Doe
  }
};
```

---

### this in Event Handlers

In HTML event handlers, `this` refers to the HTML element that received the event.

```js
function changeColor() {
    this.style.color = 'red';
}

document.getElementById('test').addEventListener('click', changeColor);
```

another example:

```html
<button onclick="this.style.display='none'">
  Click to Remove Me!
</button>
```

---

### this in a Method vs this in a nested Method

In this example, `this` in the **person.sayHello** is not the same as in **person.inner.sayHello**

```js
let person = {
  sayHello : function() {
    return this;
  },
  inner : {
  	sayHello : function() {
    	return this
    }
  }
};

person.sayHello() // Context is 'person' object

person.inner.sayHello() // Context is 'inner' object
```

## 🔃 .bind() | .call() | .apply()

ნებისმიერ ფუნქციას შეგვიძლია შევუცვალოთ კონტექსტი შემდეგი სამი დამხმარე ფუნქციით.

> **Note:** `bind()` უკვე შეცვლილი კონტექსტით ამზადებს ფუნქციას გამოსაძახებლად მაგრამ არ იძახებს მას, ხოლო დანარჩენი ორი მოცემული ფუნქცია `call()` და `apply()` პირველისგან განსხვავებით მაშინვე ეშვება.
>
> ასევე `bind()` და `call()` იღებს მეორე და შემდგომ პარამეტრად გადასაცემ არგუმენტებს, როცა `apply()` იღებს მხოლოდ მეორე პარამეტრს - გადასაცემი არგუმენტების მასივს

გამოვიყენოთ ეს კოდი ქვედა მაგალითებისთვის

```js
const module = {
  x: 42,
  getX: function(a,b,c) {
  	console.log("test",this) // look at the context
    return { x: this.x, sum: a + b + c };
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX(2,3,4)); // The function gets invoked at the global scope
// expected output: {x: undefined, sum: 9}
```

## bind
ეს მეთოდი **ქმნის** ახალ ფუნქციას (“ამზადებს”) ისე რომ, **როცა გამოვიძახებთ** საკუთარი this-ის მნიშვნელობა ექნება ის, რასაც გადავცემთ პირველ პარამეტრად, ასევე ექნება წინასწარ განსაზღვრული ფუნქციის არგუმენტიც, რომელიც წინ უსწრებს შემდეგ გადაცემულებს.

```js
const boundGetX = unboundGetX.bind(module,2);
console.log(boundGetX(3,4));
// expected output: {x: '42, sum: 9}
```

## call
ეს მეთოდი **იძახებს** ახალ ფუნქციას გადაცემული **კონტექსტის** მნიშვნელობითა და **არგუმენტებით**

```js
const boundGetX = unboundGetX.call(module,2,3,4);
console.log(boundGetX);
// expected output: {x: '42, sum: 9}
```

## apply
ეს მეთოდი **იძახებს** ახალ ფუნქციას გადაცემული **კონტექსტის** მნიშვნელობითა და **არგუმენტების მასივით** (array-like object)

```js
const boundGetX = unboundGetX.apply(module,[2,3,4]);
console.log(boundGetX);
// expected output: {x: '42, sum: 9}
```

## 🏗 Constructor Functions

კონსტრუქტორის ფუნქცია არის ნორმალური ფუნქცია.

განსხვავება ამ შემთხვევაში არის new ოპერატორის გამოყენება, რაც ფუნქციაში ქმნის ახალი კონტექსტს (`this`), რითაც შესაძლებლობას აძლევს მას მიიღოს წინასწარ განსაზღვრული პარამეტრები და დააბრუნოს ახალი instance.

`new` ოპერატორის გარეშე კონტექსტი იქნებოდა იგივე რაც ამ scope-ს გარეთ (`window` თუ კოდი არის global scope-ში და loose mode-ით, ხოლო `undefined` strict mode-ით)

სხვა სიტყვებით რომ ვთქვათ, **ფუნქცია *ხდება* კონსტრუქტორი (constructor) როცა ის გამოიძახება new ოპერატორით**

### new operator

---

The **`new` operator** lets developers create **an instance** of a user-defined object type or of one of the built-in object types that has a constructor function.

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const car1 = new Car('Tesla', 'Model S', 2015);

console.log(car1.make);
// expected output: "Tesla"
```

The **`new`** keyword does the following things:

1. Creates a blank, plain JavaScript object.
2. Adds a property to the new object (`__proto__`) that links to the constructor function's prototype object
   *Properties/objects added to the construction function prototype are therefore accessible to all instances created from the constructor function (using `new`).*
3. Binds the newly created object instance as the `this` context (i.e. all references to `this` in the constructor function now refer to the object created in the first step).
4. Returns `this` if the function doesn't return an object.

When the code `new Foo(...)` is executed, the following things happen:

1. A new object is created, inheriting from `Foo.prototype`.
2. The constructor function `Foo` is called with the specified arguments, and with `this` bound to the newly created object. `new Foo` is equivalent to `new Foo()`, i.e. if no argument list is specified, `Foo` is called without arguments.
3. The object (not null, false, 3.1415 or other primitive types) returned by the constructor function becomes the result of the whole `new` expression. If the constructor function doesn't explicitly return an object, *this* is used instead.

### Object property that is itself another object

---

წარმოვიდგინოთ, შევქმენით კონსტრუქტორ ფუნქცია სახელად `Person`

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
```

და შემდეგ ორი new `Person` ობიექტი, შედმეგნაირად:

```js
var rand = new Person('Rand McNally', 33);
var ken = new Person('Ken Jones', 39);
```

ასევე დავარედაქტირეთ ზემოთ აღწერილი კონსტრუქტორ ფუნქცია `Car`, რომ ახლა უკვე გადავაწოდოთ `Person` ობიექტი როგორც `owner` პარამეტრი, შემდეგნაირად:

```js
function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}
```

მაგალითისთვის შევქმნათ ორი ახალი ობიექტის `instance`:

```js
var car1 = new Car('Tesla', 'Model S', 2015, rand);
var car2 = new Car('Nissan', '300ZX', 1992, ken);
```

ნაცვლად `string` ტიპად მფლობელის გადაცემისა, `owner` პარამეტრი გადავცეთ როგორც ობიექტები `rand` და `ken`.

ეს სტრუქტურა საშუალებას გვაძლევს `car` -ის მფლობელის `name` -ს მივწვდეთ შემდეგნაირად:

```js
car2.owner.name // Ken Jones
```

## 🧬 Object prototypes

პროტოტიპები წარმოადგენენ მექანიზმს, რომლის საშუალებითაც ჯავასკრიპტის ერთი ობიექტი შთამომავლობით გადასცემს მეორე ობიექტს მის თვისებებს.

JavaScript -ს ხშირად მოიხსენიებენ როგორც **პროტოტიპზე-დაფუძნებულ** ენას - რომ წარმოვიდგინოთ შთამომავლობა, ობიექტებს შეიძლება ჰქონდეთ **`prototype` ობიექტი**, რომელიც იქცევა როგორც "შაბლონური ობიექტი", საიდანაც იგი იღებს method ებს და property ებს.

### Understanding prototype objects

აღვწეროთ კონსტრუქტორ ფუნქცია `Person`:

```js
function Person(first, last, age, gender, interests) {

  // property and method definitions
  this.name = {
    'first': first,
    'last' : last
  };
  this.age = age;
  this.gender = gender;
  //...see link in summary above for full definition
}
```

ასევე აღვწეროთ ობიექტის `instance`:

```js
let person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
```

თუ დავწერთ კონსოლში `person1.`, ჩვენ დავინახავთ, რომ ბრაუზერი ეცდება ავტომატურად შემოგვთავაზოს არსებული ფროფერთიები, რომელიც ამ ობიექტს გააჩნია:

<img src="https://user-images.githubusercontent.com/49524283/227318402-53c6ebc3-220e-42f2-b79d-1b7bf107672c.png" width="400px" />

ამ სიაში დავინახავთ `person1` ის კონსტრუქტორის მიერ განსაზღვრულ ფროფერთებს და მეთოდებს — `Person()` — `name`, `age`, `gender`, `interests`, `bio`, და `greeting`. თუმცა ასევე დავინახავთ სხვა ფროფერთებს, როგორებიცაა — `toString`, `valueOf` და ა.შ — ეს ყოველივე განსაზღვრულია `person1` ის **prototype ობიექტის prototype ობიექტში**, რომელიც არის `Object.prototype`.

<img src="https://user-images.githubusercontent.com/49524283/227320364-ab7c3ae4-5e62-4619-a25e-e460081f9ae0.png" width="700px" />

მას ეს ფროფერთები გადმოეცა შთამომავლობით Object სგან, ამ პროცესს კი ეწოდება — `prototype chain`.

## References

[This keyword :w3schools](https://www.w3schools.com/js/js_this.asp)

[This keyword :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

[.bind() :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

[.call() :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

[.apply() :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

[new operator :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

[Object prototypes :MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)

[problems ideas :Rain Geometrics](https://www.youtube.com/watch?v=Ed_tAHVDhSU&list=PLPEgRYGCP6EMximoiR0LVMx7FCuUIO9Np&index=5&ab_channel=RainGeometrics)
