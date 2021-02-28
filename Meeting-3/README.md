> # Meeting 3

განსახილველი თემები:

* What is OOP (Object-oriented programming)
* Encapsulation
* Abstraction
* Inheritance
* Polymorphism
* Classes in JS
* Code Examples of Abstraction, Inheritance and Polymorphism
* instanceof and typeof

## What is OOP

The basic idea of OOP is that we use objects **to model real world things** that we want to represent inside our programs, and/or provide a simple way to access functionality that would otherwise be hard or impossible to make use of.

Procedural programming is about writing procedures or **functions that perform operations on the data**, while object-oriented programming is about **creating objects that contain both** data and functions.

Object-oriented programming has several advantages over procedural programming:

* OOP is faster and easier to execute
* OOP provides a clear structure for the programs
* OOP helps to keep the code DRY "Don't Repeat Yourself", and makes the code easier to maintain, modify and debug
* OOP makes it possible to create full reusable applications with less code and shorter development time

> **Tip:**
>
> The "Don't Repeat Yourself" (DRY) principle is about reducing the repetition of code. You should extract out the codes that are common for the application, and place them at a single place and reuse them instead of repeating it.

## Encapsulation

When talking about encapsulation, private class members are often mentioned, and that is correct, but it covers just a part of this principle.

More advanced and high-level explanations are associated with meaning Encapsulation as a concept of bundling data related variables and properties with behavioral methods in one class or code unit.
But if we are still talking about privacy, we can give another definition.

Encapsulation is an approach for restricting direct access to some of the data structure elements (fields, properties, methods, etc).

If you want to change encapsulated state, **you don’t reach out and directly mutate** some object’s props. **Instead, you call a method on the object**, and *maybe* the object will respond by updating its state.

Let’s look at an example.

![encapsulation-example](https://miro.medium.com/max/700/1*fBuojCESyN8ib8hJIrKWQw.jpeg)

We have a real-life component - car. Usage of the abstraction principle defines the context of data that will be needed in our application. In this case, we will need a car properties model name, current speed, max speed, and boolean engine prop that will be responsible for a state if a car is turned on or off.

Encapsulation principle means that we should add to the same class behavioral methods (drive, stop, etc.). Those may be used in our application and also to provide restricted access to changes in class instance’s state. We don’t want a client of our class to be able to turn off the car and then still be able to set its speed value to 100 miles per hour.

In more complex applications you may need more properties that describe the other car subsystems like lights or wheel.

In that case, you will have to make few abstractions for those subsystems that will encapsulate its state and behavior, and then you’ll be able to compose car Class with all that functionality.

## Abstraction

Let's consider a simple program that displays information about the students and teachers at a school. Here we'll look at OOP theory in general, not in the context of any specific programming language.

There are lots of things you *could* know about a person (their address, height, shoe size, DNA profile, passport number, significant personality traits ...), but in this case we are only interested in showing their `name`, `age`, `gender`, and `interests`, and we also want to be able to write a short introduction(`bio`) about them based on this data, and get them to say hello.

This is known as **abstraction** — creating a simple model of a more complex thing, which represents its most important aspects in a way that is easy to work with for our program's purposes.

### Defining an object template

![oop-abstraction](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS/person-diagram.png)

### Creating actual objects

From our class, we can create **object instances** — objects that contain the data and functionality defined in the class. From our Person class, we can now create some actual people:

![oop-instantiation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS/mdn-graphics-instantiation-2-fixed.png)

When an object instance is created from a class, the class's **constructor function** is run to create it. This process of creating an object instance from a class is called **instantiation** — the object instance is **instantiated** from the class.

## Inheritence

In this case we don't want generic people — we want teachers and students, which are both more specific types of people. In OOP, we can create new classes based on other classes — these new **child classes** (also known as **subclasses**) can be made to **inherit** the data and code features of their **parent class**, so you can reuse functionality common to all the object types rather than having to duplicate it.  Where functionality differs between classes, you can define specialized features directly on them as needed.

![inheritance-oop](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS/mdn-graphics-inherited-3.png)

## Polymorphism

Continue talking about previous picture  — teachers and students share many common features such as name, gender, and age, so it is convenient to only have to define those features once. You can also define the same feature separately in different classes, as each definition of that feature will be in a different namespace. For example, a student's greeting might be of the form "Yo, I'm [firstName]" (e.g *Yo, I'm Sam*), whereas a teacher might use something more formal, such as "Hello, my name is [Prefix] [lastName], and I teach [Subject]." (e.g *Hello, My name is Mr Griffiths, and I teach Chemistry*).

> **Note**:
>
> The fancy word for the ability of multiple object types to implement the same functionality is **polymorphism**. Just in case you were wondering.

**Polymorphism** in Object-Oriented Programming is an ability to create a property, a function, or an object that has more than one realization.

Polymorphism is an ability to substitute classes that have common functionality in sense of methods and data. In other words, **it is an ability of multiple object types to implement the same functionality** that can work in a different way but supports a common interface.

For example, function that expects a super class instance as an argument can work correctly with subclass instance as well, without the function needs to know about any of the subclasses types.

## Classes in JS

**Classes are a template** for creating objects. They encapsulate data with code to work on that data. Classes in JS are built on prototypes but also have some syntax and semantics that are not shared with ES5 class-like semantics.

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

## Code Examples of Abstraction, Inheritance and Polymorphism

### Abstraction

**Abstraction** is a way of creating a simple model of a more complex real-world entities, which contains the only important properties from the perspective of the context of an application.

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

Inheritance is an approach of sharing common functionality within a collection of classes. It provides an ability to avoid code duplication in a class that needs the same data and functions which another class already has. At the same time, it allows us to override or extend functionality that should have a different behavior.

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

Polymorphism** in Object-Oriented Programming is an ability to create a property, a function, or an object that has more than one realization.

Polymorphism is an ability to substitute classes that have common functionality in sense of methods and data. In other words, it is an ability of multiple object types to implement the same functionality that can work in a different way but supports a common interface.

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

## References

[oop - the basics :MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)

[cpp oop :w3schools](https://www.w3schools.com/cpp/cpp_oop.asp)

[Encapsulation in JS :medium](https://medium.com/javascript-scene/encapsulation-in-javascript-26be60e325b4)

[Polymorphism in JS :medium](https://medium.com/@viktor.kukurba/object-oriented-programming-in-javascript-3-polymorphism-fb564c9f1ce8)

[Abstraction in JS :medium](https://medium.com/@viktor.kukurba/object-oriented-programming-in-javascript-1-abstraction-c47307c469d1)

[Classes :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

[instanceof :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)

[typeof :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
