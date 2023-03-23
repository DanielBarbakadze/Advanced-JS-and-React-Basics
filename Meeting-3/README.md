> # Meeting 3

განსახილველი თემები:

* 🎛 [რა არის OOP ? (Object-oriented programming)](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/tree/master/Meeting-3#-what-is-oop)
  * [Encapsulation](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/tree/master/Meeting-3#encapsulation)
  * [Abstraction](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/tree/master/Meeting-3#abstraction)
  * [Inheritance](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/tree/master/Meeting-3#inheritance)
  * [Polymorphism](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/tree/master/Meeting-3#polymorphism)
* 🛗 [კლასები Javascript-ში](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/tree/master/Meeting-3#-classes-in-js)
* 🪧 [instanceof and typeof](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/tree/master/Meeting-3#instanceof-and-typeof)
* 📚 [Code Examples of Abstraction, Inheritance and Polymorphism](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/tree/master/Meeting-3#-code-examples-of-abstraction-inheritance-and-polymorphism)

## 🎛 What is [OOP](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)

ძირითადი იდეა OOP-სი ისაა, რომ ჩვენ ვიყენებთ ობიექტებს (objects) **რეალური ცხოვრების მაგალითების მოდელირებისთვის**, რისი წარმოდგენაც გვსურს ჩვენს პროგრამებში, ან/და ვუზრუნველყოთ მარტივი გზა ფუნქციონალზე მიწვდომისთვის, რაც მის გარეშე იქნებოდა რთული ან შეუძლებელი.

პროცედურული პროგრამირება (Procedural programming) ეხება წერის პროცედურებს ან **ფუნქციებს, რომლებიც ასრულებენ ოპერაციებს მონაცემებზე**, ხოლო **ობიექტზე ორიენტირებული პროგრამირება გულისხმობს (ორივეს)** ობიექტების შექმნას, რომელიც შეძლება შეიცავდეს როგორც მონაცემებს, ასევე ფუნქციებს.

ობიექტზე ორიენტირებულ პროგრამირებას აქვს რამდენიმე უპირატესობა პროცედურულ პროგრამირებასთან შედარებით:

* OOP უფრო სწრაფი და ადვილად შესრულებადი (execute)
* OOP უზრუნველყოფს მკაფიო სტრუქტურას პროგრამებისთვის
* OOP გეხმარებათ შეინარჩუნოთ კოდი DRY ("Don't Repeat Yourself") და აადვილებს კოდთან შემდგომ მუშაობას, ცვლილებას და პრობემების აღმოფხვრას(debug)
* OOP შესაძლებელს ხდის შექმნათ მრავალჯერადი გამოყენების(reusable) პროგრამები ნაკლები კოდით და დეველოპმენტის მეტად მცირე დროით

> **რჩევა:**
>
> პრინციპი "ნუ გაიმეორებ საკუთარ თავს" (DRY) გულისხმობს გამეორებადი კოდის შემცირებას. თქვენ უნდა ამოიღოთ კოდის ფრაგმენტები, რომლებიც საერთოა პროგრამისთვის და განათავსოთ ისინი ერთ ადგილას. შემდგომ კი მრავალჯერადად გამოიყენოთ იგი მისი გამეორების ნაცვლად.

## Encapsulation

ენკაფსულაციაზე საუბრისას ხშირად ახსენდებათ private class members-ები და ეს სწორია, მაგრამ ის მოიცავს ამ პრინციპის მხოლოდ ნაწილს.

უფრო მაღალფარდოვანი განმარტებით ენკაფსულაცია შეიძლება წარმოდგინდეს, როგორც შეფუთვის კონცეფცია მონაცემთან დაკავშირებული ცვლადებისა და თვისებების(properties) ქცევითი მეთოდების(methods) ერთ კლასში ან კოდის ერთეულში.

მარტივ ენაზე რომ ვთქვათ:

Encapsulation არის მიდგომა მონაცემთა სტრუქტურის ზოგიერთ ელემენტზე (fields, properties, methods, etc) პირდაპირი წვდომის შეზღუდვისათვის.

თუ გსურთ შეცვალოთ ენკაფსულირებული state, **თქვენ პირდაპირ არ ახდენთ წვდომას და მუტაციას** ობიექტის property ზე. **ნაცვლად, თქვენ იძახებთ ობიექტის მეთოდს**, რომელიც აახლებს state-ს, *შესაძლოა* ობიექტმა გვიპასუხოს მისი მდგომარეობის განახლებით.

შევხედოთ მაგალითს:

![encapsulation-example](https://miro.medium.com/max/700/1*fBuojCESyN8ib8hJIrKWQw.jpeg)

ჩვენ გვაქვს რეალური კომპონენტი - მანქანა.

ამ შემთხვევაში, ჩვენ დაგვჭირდება მანქანის თვისებები: მოდელი, სახელი, მიმდინარე სიჩქარე, მაქსიმალური სიჩქარე და boolean ტიპის მახასიათებელი ძრავის მდგომარეობის განსასაზღვრად, დაქოქილია თუ არა.

ენკაფსულაციის პრინციპი ნიშნავს იმას, რომ ჩვენ უნდა დავუმატოთ იმავე კლასის ქცევითი მეთოდები (დაძვრა, გაჩერება და ა.შ.). ეს მახასიათებლები გამოყენებული უნდა იქნას ჩვენს აპლიკაციაში თუმცა შეზღუდული უნდა იყოს გარედან კლასის ასეთ თვისებზე წვდომა / მუტაცია.

ჩვენ არ გვინდა, რომ ჩვენი კლასის კლიენტმა შეძლოს მანქანის ჩაქრობა და შემდეგ კვლავ შეძლოს მისი სიჩქარის მნიშვნელობის განსაზღვრა 100 კმ/სთ-ით.
უფრო რთულ პროგრამებში შეიძლება დაგჭირდეთ მეტი თვისება, რომელიც აღწერს სხვა მანქანის ქვესისტემებს, როგორიცაა განათება ან ბორბალი.

ამ შემთხვევაში, თქვენ მოგიწევთ რამდენიმე აბსტრაქციის გაკეთება იმ ქვესისტემებისთვის, რომლებიც ასახავს მის მდგომარეობას და ქცევას, შემდეგ კი შეძლებთ შეადგინოთ Car კლასი მთელი ამ ფუნქციონალით

## Abstraction 

განვიხილოთ მარტივი პროგრამა, რომელიც აჩვენებს ინფორმაციას სკოლის მოსწავლეებისა და მასწავლებლების შესახებ. აქ ჩვენ განვიხილავთ OOP თეორიას ზოგადად, და არა რაიმე კონკრეტული პროგრამირების ენის კონტექსტში.

ბევრი რამ **შეიძლება** იცოდეთ ადამიანის შესახებ (მისი მისამართი, სიმაღლე, ფეხსაცმლის ზომა, დნმ პროფილი, პასპორტის ნომერი, პიროვნების მნიშვნელოვანი თვისებები ...), მაგრამ ამ შემთხვევაში ჩვენ მხოლოდ მისი სახელის, ასაკის, სქესის, ინტერესების ჩვენება გვაინტერესებს. ჩვენ ასევე გვინდა, რომ ამ მონაცემებზე დაყრდნობით შევძლოთ დავწეროთ მოკლე ბიოგრაფია (bio) მათ შესახებ და რომ მივანიჭოთ მისასალმებელი ტექსტი.

ეს პროცესი ცნობილია როგორც **აბსტრაქცია** - უფრო რთული საგნის მარტივი მოდელის შექმნა, რომელიც წარმოადგენს მის უმნიშვნელოვანეს ასპექტებს ისე, რომ ადვილი იყოს მუშაობა ჩვენი პროგრამის მიზნებისთვის.

### განვსაზღვროთ ობიექტის შაბლონი (Defining an object template)

![person-diagram](https://user-images.githubusercontent.com/49524283/227342420-ea8fa69e-e890-4c3a-97db-198354abeb87.png)

### რეალური ობიექტების შექმნა (Creating actual objects)

ჩვენი კლასიდან ჩვენ შეგვიძლია შევქმნათ **ობიექტის instances** — ობიექტები, რომლებიც შეიცავს კლასში განსაზღვრულ მონაცემებსა და ფუნქციონალს. ამ
Person კლასიდან ჩვენ შეგვიძლია შევქმნათ რამდენიმე რეალური ადამიანი:

![mdn-graphics-instantiation-2-fixed](https://user-images.githubusercontent.com/49524283/227343320-4586aa30-a2bc-43b8-8e33-ae89edc5f251.png)

როდესაც ობიექტის instance იქმნება კლასიდან, კლასის **კონსტრუქტორის ფუნქცია** ეშვება მის შესაქმნელად. ამ
პროცესს ეწოდება **instantiation(ასახვა)** — ობიექტის instance არის **instantiated** კლასიდან

## Inheritence

ამ შემთხვევაში ჩვენ არ გვინდა ზოგადი ადამიანები - ჩვენ გვინდა მასწავლებლები და სტუდენტები, რომლებიც ორივე უფრო კონკრეტული ტიპის ადამიანები არიან.

OOP–ში, ჩვენ შეგვიძლია შევქმნათ ახალი კლასები სხვა კლასებზე დაყრდნობით - ეს ახალი **შვილობილი კლასები** (ასევე ცნობილია როგორც **ქვეკლასები**) **მემკვიდრეობით** იღებს მათი **მშობლების კლასის** მონაცემებისა და მახასიათებლებს. მისი დახმარებით თქვენ შეგიძლიათ ხელახლა გამოიყენოთ მშობლების ჯაჭვში არსებული ფუნქციონალი, რომელიც საერთოა ყველა ტიპის ობიექტისთვის, ვიდრე ყველა შვილობილ კლასს დუბლირებულად მიანიჭოთ.

![mdn-graphics-inherited-3](https://user-images.githubusercontent.com/49524283/227345375-ce264134-69ad-4cf9-8c46-4bfdf263b9dd.png)

თუ ფუნქციონალი განსხვავდება კლასებს შორის, თქვენ შეგიძლიათ განსაზღვროთ სპეციალიზებული მახასიათებლები უშუალოდ იმ კლასებზე სადაც საჭიროა. მაგალითად Greeting

## Polymorphism

გავაგრძელოთ საუბარი წინა სურათზე - მასწავლებლები და მოსწავლეები იზიარებენ ბევრ საერთო მახასიათებელს, როგორიცაა სახელი, სქესი და ასაკი, ამიტომ მოსახერხებელია მხოლოდ ერთხელ განვსაზღვროთ ეს მახასიათებლები.

ჩვენ ასევე შეგიძლიათ განვსაზღვროთ ერთი და იგივე ფუნქცია ცალ-ცალკე სხვადასხვა კლასებში, რადგან ამ მახასიათებლის თითოეული დეფინიცია იქნება სხვადასხვა namespace ში. 

მაგალითად, მოსწავლის მისალმება შეიძლება იყოს:

"Yo, I'm [firstName]" (მაგ. Yo, I'm Sam),

ხოლო მასწავლებელმა შეიძლება გამოიყენოს რაიმე უფრო ოფიციალური:

"გამარჯობა, ჩემი სახელია [prefix] [lastName] და მე ვასწავლი [Subject]."

(მაგ. გამარჯობა, მე მქვია ბატონი გრიფიტსი და ვასწავლი ქიმიას).

> **Note**:
>
> The fancy word for the ability of multiple object types to implement the same functionality is **polymorphism**. Just in case you were wondering.

უფრო "დახვეწილად" რომ ვთქვათ, უნარი მრავალი ობიექტის ტიპი აიმპლემენტირებდეს ერთი და იგივე ფუნქციონალს - არის პოლიმორფიზმი.

![polymorphism-example](https://miro.medium.com/max/700/1*Pu67br76VEd7Aoa5ieMj5Q.jpeg)

პოლიმორფიზმი ობიექტზე ორიენტირებულ პროგრამირებაში არის უნარი შექმნას თვისება, ფუნქცია ან ობიექტი, რომელსაც აქვს ერთზე მეტი რეალიზაცია/გამოყენება

პოლიმორფიზმი არის კლასების შეცვლის უნარი, რომლებსაც აქვთ საერთო ფუნქციონალები მეთოდებისა და მონაცემების თვალსაზრისით.

სხვა სიტყვებით რომ ვთქვათ, ეს არის უნარი მრავალი ობიექტი ტიპები აიმპლემენტირებდნენ ერთი და იგივე ფუნქციონალს, რომლებიც მუშაობენ სხვადასხვაგვარად, მაგრამ გააჩნიათ საერთო ინტერფეისი (მაგალითად, საჭე).

## 🛗 Classes in JS

**კლასები წარმოადგენენ შაბლონს** ობიექტების შესაქმნელად. ისინი მონაცემებს ათავსებენ (encapsulate) კოდით, რომ იმუშაონ ამ მონაცემებზე. JS კლასები აგებულია პროტოტიპებზე (prototypes), მაგრამ აქვს გარკვეული სინტაქსი და სემანტიკა, განსხვავებით ES5 class-like სემანტიკისგან.

### Defining Classes

---

Classes are in fact "special [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)", and just as you can define [function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) and [function declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), the class syntax has two components: [class expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) and [class declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class).

> **Quick revise:**
>
> Example of **function expression:**
>
> ```js
> const calcRectArea = function(width, height) {
>   return width * height;
> };
> ```
>
> Example of **function declarations:**
>
> ```js
> function calcRectArea(width, height) {
>   return width * height;
> }
> ```

### Class declarations

One way to define a class is using a **class declaration**. To declare a class, you use the `class` keyword with the name of the class ("Rectangle" here).

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

#### Hoisting

An important difference between **function declarations** and **class declarations** is that function declarations are [hoisted](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) and class declarations are not. You first need to declare your class and then access it, otherwise code like the following will throw a [`ReferenceError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError):

```js
const p = new Rectangle(); // ReferenceError
class Rectangle {}
```

### Class expressions

A **class expression** is another way to define a class. Class expressions can be named or unnamed.

> **Note:**
>
> The name given to a named class expression is local to the class's body. (it can be retrieved through the class's (not an instance's) [`name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) property, though).

```js
// unnamed
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

// named
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle2"
```

### Class body and method definitions

---

The body of a class is the part that is in curly brackets `{}`. This is where you define class members, such as methods or constructor.

#### Strict mode

The body of a class is executed in [**strict mode**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode). Code written here is subject to stricter syntax for increased performance.

#### Constructor

The [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) method is a special method for creating and initializing an object created with a `class`. There can only be one special method with the name "constructor" in a class.

A [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) will be thrown if the class contains more than one occurrence of a `constructor` method.

A constructor can use the `super` keyword to call the constructor of the super class.

#### Prototype methods

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

#### Static methods and properties

The `static` keyword defines a static method or property for a class. Static members (properties and methods) are called without **instantiating** their class and **cannot** be called through a class instance.

Static methods are often used to create utility functions for an application, whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static displayName = "Point";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance;    // undefined
p2.displayName; // undefined
p2.distance;    // undefined

console.log(Point.displayName);      // "Point"
console.log(Point.distance(p1, p2)); // 7.0710678118654755
```

#### Binding this with prototype and static methods

When a static or prototype method is called without a value for [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this), such as by assigning the method to a variable and then calling it, the `this` value will be `undefined` inside the method. This behavior will be the same even if the [`"use strict"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) directive isn't present, because code within the `class` body's syntactic boundary is always executed in strict mode.

```js
class Animal {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // the Animal object
let speak = obj.speak;
speak(); // undefined

Animal.eat() // class Animal
let eat = Animal.eat;
eat(); // undefined
```

If we rewrite the above using traditional function-based syntax in non–strict mode, then `this` method calls are automatically bound to the initial `this` value, which by default is the [global object](https://developer.mozilla.org/en-US/docs/Glossary/Global_object). In strict mode, autobinding will not happen; the value of `this` remains as passed.

```js
function Animal() { }

Animal.prototype.speak = function() {
  return this;
}

Animal.eat = function() {
  return this;
}

let obj = new Animal();
let speak = obj.speak;
speak(); // global object (in non–strict mode)

let eat = Animal.eat;
eat(); // global object (in non-strict mode)
```

> **Note:**
>
> [What's the difference between this.function and prototype.function ?](https://stackoverflow.com/questions/15659063/whats-the-difference-between-this-function-and-prototype-function)
>
> Functions on the prototype are only created once and shared between each instance. Functions created in the constructor are created as new objects for each new object created with the constructor.
>
> As a general rule functions should be on the prototype since they will generally not be modified for different objects of the same type, and this has a slight memory/performance benefit. Other properties like objects and arrays should be defined in the constructor, unless you want to create a shared, static property, in which case you should use the prototype.

#### Instance properties

Instance properties must be defined inside of class methods:

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

Static (class-side) data properties and prototype data properties must be defined outside of the ClassBody declaration:

```js
Rectangle.staticWidth = 20;
Rectangle.prototype.prototypeWidth = 25;
```

#### Field declarations

---

##### Public field declarations

With the JavaScript field declaration syntax, the above example can be written as:

```js
class Rectangle {
  height = 0;
  width;
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

By declaring fields up-front, class definitions become more self-documenting, and the fields are always present.

As seen above, the fields can be declared with or without a default value.

See [public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields) for more information.

##### Private field declarations

Using private fields, the definition can be refined as below.

```js
class Rectangle {
  #height = 0;
  #width;
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }
}
```

**It's an error to reference private fields from outside of the class**. They can only be read or written within the class body. By defining things that are not visible outside of the class, you ensure that your classes' users can't depend on internals, which may change from version to version.

> **Note:**
>
> Private fields can only be declared up-front in a field declaration.

Private fields cannot be created later through assigning to them, the way that normal properties can.

For more information, see [private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields).

### Sub classing with extends

The [`extends`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) keyword is used in *class declarations* or *class expressions* to create a class as a child of another class.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

If there is a constructor present in the subclass, it needs to first call super() before using "this".

> **Quick revise:
>
> One may also extend traditional function-based "classes":
>
> ```js
> function Animal (name) {
>   this.name = name;
> }
>
> Animal.prototype.speak = function () {
>   console.log(`${this.name} makes a noise.`);
> }
>
> class Dog extends Animal {
>   speak() {
>     console.log(`${this.name} barks.`);
>   }
> }
>
> let d = new Dog('Mitzie');
> d.speak(); // Mitzie barks.
>
> // For similar methods, the child's method takes precedence over parent's method
> ```

Note that classes **cannot extend regula**r (non-constructible) **objects**. If you want to inherit from a regular object, you can instead use [`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf):

```js
const Animal = {
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

// If you do not do this you will get a TypeError when you invoke speak
Object.setPrototypeOf(Dog.prototype, Animal);

let d = new Dog('Mitzie');
d.speak(); // Mitzie makes a noise.
```

### Super class calls with super

The [`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keyword is used to call corresponding methods of super class. This is one advantage over prototype-based inheritance.

```js
class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(`${this.name} roars.`);
  }
}

let l = new Lion('Fuzzy');
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.
```

## instanceof and typeof

The **`instanceof` operator** tests to see if the `prototype` property of a constructor appears anywhere in the prototype chain of an object. The return value is a boolean value.

```js
function Person(name) {
  this.name = name;
}

const daniel916 = new Person('Daniel');

console.log(daniel916 instanceof Person); // expected output: true
console.log(daniel916 instanceof Object); // expected output: true
```

Same works for classes

```js
class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

let daniel916 = new Person("Daniel");

console.log(daniel916.getName()); // expected output: "Daniel"
console.log(daniel916 instanceof Person); // expected output: true
console.log(daniel916 instanceof Object); // expected output: true
```

The **`typeof`** operator returns a string indicating the type of the unevaluated operand.

```js
console.log(typeof 42); // expected output: "number"
console.log(typeof true); // expected output: "boolean"
console.log(typeof 'blubber'); // expected output: "string"
console.log(typeof undeclaredVariable); // expected output: "undefined"
```

To verify the fact that classes are special functions, you can use the `typeof` operator of to check the type of the `Person` class.

```js
console.log(typeof Person); // function
```

---

## 📚 Code Examples of Abstraction, Inheritance and Polymorphism

### Abstraction

Let’s consider an example. We need a list of people in scope of our application, and we need to know their first and last name, skills, their job and salary, but in the same time we don’t need the age, height, weight, we can just skip it.

![abstraction-medium](https://miro.medium.com/max/700/1*D95h8JObfAxrM0b3vxCD8w.jpeg)

On the left side we have real-life entities: Person and Job. In the middle you can see programming abstraction with the only needed properties in our application. The instances of class that represents concrete people and jobs are shown in circles on the right side of the image.

```js
class Person {
    constructor({firstName, lastName, job}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.job = job;
        this.skills = [];
        Person._amount = Person._amount || 0;
        Person._amount++;
    }

    static get amount() {
        return Person._amount;
    }
  
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(fN) {
        [this.firstName, this.lastName] = fN.split(' ');
    }

    learn(skill) {
        this.skills.push(skill);
    }
}

class Job {
    constructor(company, position, salary) {
        this.company = company;
        this.position = position;
        this.salary = salary;
    }
}

const john = new Person({
    firstName: 'John',
    lastName: 'Doe',
    job: new Job('Youtube', 'developer', 200000)
});

const roger = new Person({
    firstName: 'Roger',
    lastName: 'Federer',
    job: new Job('ATP', 'tennis', 1000000)
});

john.fullName = 'Mike Smith';
john.learn('es6');
roger.learn('programming');
john.learn('es7');
```

### Inheritance

![inheritance-medium](https://miro.medium.com/max/700/1*UKdo9OtMxozL7Evz0-vORw.png)

On this diagram, `ClassB` and `ClassD` inherit functionality from `ClassA`. It means that instances of those classes, for example `ObjectB`, will have the same list of properties and methods as `ObjectA` that is an instance of `ClassA`. And still, `ObjectB` has additional properties and methods that are described in `ClassB`.

`ClassA` is called a **super** class or a **parent** class of `ClassB` and `ClassD`, which are called **child** classes.

`ClassC` is a **child** of `ClassB`, and its instance has the same functionality as the instance of `ClassB` that includes also `ClassA` functionality.

Child classes have the same list of properties and methods but are able to override them.

Inheritance of `ClassC`, `ClassB` and `ClassA` calls **multilevel.** But inheritance of `ClassB`, `ClassD` from `ClassA` **hierarchical**.

```js
class ClassA {
    constructor() {
        this.propA = 'A';
    }

    methodA() {
        return this.propA;
    }
}

class ClassB extends ClassA {
    constructor() {
        super();
        this.propB = 'B';
    }

    methodA() {
        return 'NEW B';
    }

    methodB() {
        return this.propB + this.methodA();
    }
}

class ClassC extends ClassB {
    constructor() {
        super();
        this.propC = 'C';
         this.testProp = 1;
    }

    methodC() {
        return this.propC + super.methodB();
    }
}
```

### Polymorphism

Let’s take a look at a real-life example of polymorphism. If you have learned how to drive one car, you’ll be able to drive any other car; it doesn’t depend on the make of car it’s configuration or inner implementation. It has the same driver interface.

![polymorphism-example](https://miro.medium.com/max/700/1*Pu67br76VEd7Aoa5ieMj5Q.jpeg)

The same in programming: if your code is able to work with one implementation of interface, it should work with another as well. Of course, it should have the same list of methods and properties.

```js
class Shape {
    area() {
        return 0;
    }
    toString() {
        return Object.getPrototypeOf(this).constructor.name;
    }
}

class Circle extends Shape {
    constructor(r) {
        super();
        this.radius = r;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(w, h) {
        super();
        this.width = w;
        this.height = h;
    }

    area() {
        return this.width * this.height;
    }
}
```

## References

[oop - the basics :MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)

[cpp oop :w3schools](https://www.w3schools.com/cpp/cpp_oop.asp)

[Encapsulation in JS :medium](https://medium.com/javascript-scene/encapsulation-in-javascript-26be60e325b4)

[Polymorphism in JS :medium](https://medium.com/@viktor.kukurba/object-oriented-programming-in-javascript-3-polymorphism-fb564c9f1ce8)

[Abstraction in JS :medium](https://medium.com/@viktor.kukurba/object-oriented-programming-in-javascript-1-abstraction-c47307c469d1)

[Classes :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

[instanceof :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)

[typeof :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
