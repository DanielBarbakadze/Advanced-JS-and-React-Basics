> # Meeting 4

განსახილველი თემები:

* Callback function
* Closures (including Lexical scoping)
* Factory funtion


## Callback function

A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

```js
function myDisplayer(some) {
  console.log(`Answer: ${some}`);
}

function myCalculator(num1, num2, myCallback) {
  let sum = num1 + num2;
  myCallback(sum);
}

myCalculator(5, 5, myDisplayer);
```

In the example above, `myDisplayer` is the name of a function.

It is passed to `myCalculator()` as an argument.

> **Note:**
>
> When you pass a function as an argument, remember not to use parenthesis.
>
> Right: myCalculator(5, 5, myDisplayer);
>
> Wrong: ~myCalculator(5, 5, myDisplayer())~;



### When to Use a Callback?

The examples above are not very exciting. They are simplified to teach you the callback syntax.

Where callbacks really shine are in asynchronous functions, where one function has to wait for another function (like waiting for a file to load).


## Closures

A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**).

In other words, a closure gives you access to an outer function’s scope from an inner function.

In JavaScript, closures are created every time a function is created, at function creation time.


### Lexical scoping

Consider the following example code:

```js
function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}

init();
```

`init()` creates a local variable called `name` and a function called `displayName()`.

The `displayName()` function is an inner function that is defined inside `init()` and is available only within the body of the `init()` function.

Note that the `displayName()` function has no local variables of its own. However, since inner functions have access to the variables of outer functions, `displayName()` can access the variable `name` declared in the parent function, `init()`.

This is an example of **lexical scoping**, which describes how a parser resolves variable names when functions are nested.

> The word **lexical** refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available.

Nested functions have access to variables declared in their outer scope.


### Back to Closure

*Closure is a function that **closes over** another function.*

> **urbandictionary:** [closed over](https://www.urbandictionary.com/define.php?term=closed%20over)
>
> When something that can be said to be closeable is closed MOST of the way but not all.
>
> Such as when a door is just barely opened.  *// You didn't close the door all the way, it was just* ***closed over***.



Consider the following code example:

```js
function makeFunc() {
  var name = 'Mozilla';
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();

```

Running this code has exactly the same effect as the previous example of the `init()` function above.

What's different (and interesting) is that the `displayName()` inner function is returned from the outer function *before being executed*.

At first glance, it might seem unintuitive that this code still works. In some programming languages, the local variables within a function exist for just the duration of that function's execution. Once `makeFunc()` finishes executing, you might expect that the name variable would no longer be accessible. However, because the code still works as expected, this is obviously not the case in JavaScript.

The reason is that functions in JavaScript form closures.

A *closure* is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.

In this case, `myFunc` is a reference to the instance of the function `displayName` that is created when `makeFunc` is run.

The instance of `displayName` maintains a reference to its lexical environment, within which the variable `name` exists. For this reason, when `myFunc` is invoked, the variable `name` remains available for use, and "Mozilla" is passed to `alert`.

Here's a slightly more interesting example—a `makeAdder` function:

```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

In this example, we have defined a function `makeAdder(x)`, that takes a single argument `x`, and returns a new function. The function it returns takes a single argument `y`, and returns the sum of `x` and `y`.

In essence, `makeAdder` is a **function factory**. It creates functions that can add a specific value to their argument. In the above example, the **function factory** creates two new functions—one that adds five to its argument, and one that adds 10.

`add5` and `add10` are both closures. They share the same function body definition, but store different lexical environments. In `add5`'s lexical environment, `x` is 5, while in the lexical environment for `add10`, `x` is 10.


### Emulating private methods with closures

JavaScript does not provide a native way to declare private functions, but it is possible to emulate private methods using closures.

Private methods aren't just useful for restricting access to code. They also provide a powerful way of managing your global namespace.

The following code illustrates how to use closures to define public functions that can access private functions and variables.

```js
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment: function() {
      changeBy(1);
    },

    decrement: function() {
      changeBy(-1);
    },

    value: function() {
      return privateCounter;
    }
  };
})();

console.log(counter.value());  // 0.

counter.increment();
counter.increment();
console.log(counter.value());  // 2.

counter.decrement();
console.log(counter.value());  // 1.
```

In previous examples, each closure had its own lexical environment. Here though, there is a single lexical environment that is shared by the three functions: `counter.increment`, `counter.decrement`, and `counter.value`.

The shared lexical environment is created in the body of an **anonymous function**, *which is executed as soon as it has been defined* (also known as an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)).

The lexical environment contains two private items: a variable called `privateCounter`, and a function called `changeBy`.

You can't access either of these private members from outside the anonymous function. Instead, you can access them using the three public functions that are returned from the anonymous wrapper.

**Those three public functions are closures** that share the same lexical environment. Thanks to JavaScript's lexical scoping, they each have access to the `privateCounter` variable and the `changeBy` function.

Look another example:

```js
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },

    decrement: function() {
      changeBy(-1);
    },

    value: function() {
      return privateCounter;
    }
  }
};

var counter1 = makeCounter();
var counter2 = makeCounter();

alert(counter1.value());  // 0.

counter1.increment();
counter1.increment();
alert(counter1.value()); // 2.

counter1.decrement();
alert(counter1.value()); // 1.
alert(counter2.value()); // 0.
```

Notice how the two counters maintain their independence from one another.

Each closure references a different version of the `privateCounter` variable through its own closure.

Each time one of the counters is called, its lexical environment changes by changing the value of this variable.

Changes to the variable value in one closure don't affect the value in the other closure.

> **Note:**
>
> Using closures in this way provides benefits that are normally associated with object-oriented programming. In particular, *data hiding* and *encapsulation*.


### Closure Scope Chain

Every closure has three scopes:

* Local Scope (Own scope)
* Outer Functions Scope
* Global Scope

A common mistake is not realizing that in the case where the outer function is itself a nested function, access to the outer function's scope includes the enclosing scope of the outer function—effectively creating a chain of function scopes. To demonstrate, consider the following example code.

```js
// global scope
var e = 10;
function sum(a){
  return function(b){
    return function(c){
      // outer functions scope
      return function(d){
        // local scope
        return a + b + c + d + e;
      }
    }
  }
}

console.log(sum(1)(2)(3)(4)); // log 20

// You can also write without anonymous functions:

// global scope
var e = 10;
function sum(a){
  return function sum2(b){
    return function sum3(c){
      // outer functions scope
      return function sum4(d){
        // local scope
        return a + b + c + d + e;
      }
    }
  }
}

var s = sum(1);
var s1 = s(2);
var s2 = s1(3);
var s3 = s2(4);
console.log(s3) //log 20
```

In the example above, there's a series of nested functions, all of which have access to the outer functions' scope. In this context, we can say that closures have access to **all** outer function scopes.


## Factory Function

A **factory function** is any function which is not a class or constructor that returns an object.

In JavaScript, any function can return an object. When it does so without the `new` keyword, it’s a factory function.


The following creates a person object named `john`:

```js
let john = {
    firstName: 'John',
    lastName: 'Doe',
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
};

console.log(john.getFullName()); // John Doe
```

The `john` object has two properties: `firstName` and `lastName`, and one method `getFullName()` that returns the full name.

Suppose that you need to create another similar object called `jane`, you can duplicate the code as follows:

```js
let jane = {
    firstName: 'Jane',
    lastName: 'Doe',
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
};

console.log(jane.getFullName()); // Jane Doe
```

The `jane` object has the same properties and method as the `john` object.

The more object you want to create, the more *duplicate* code you need to copy.


To avoid copying the same code all over again and again, you can develop a function that creates the `person` object:

```js
function createPerson(firstName, lastName) {
    return {
        firstName: firstName,
        lastName: lastName,
        getFullName() {
            return firstName + ' ' + lastName;
        }
    }
}
```

When a function creates an object, it is called a **factory function**. The `createPerson()` is a factory function because it returns a new `person` object.


The following code uses the `createPerson()` factory function to create two objects `john` and `jane`:

```js
let john = createPerson('John', 'Doe'),
    jane = createPerson('Jane', 'Doe');

console.log(john.getFullName()); // John Doe
console.log(jane.getFullName()); // Jane Doe
```

With the factory function, you create any number of the `person` objects you want without duplicating code.


When you create an object, that **object requires a space in the memory**. If you have a thousand `person` objects, you need one thousand spaces in the memory to store these objects. These person objects, however, have *the same* `getFullName()` *method*.


**To avoid repeating** the same `getFullName()` function in the memory, you can remove the `getFullName()` method from the `person` object:

```js
function createPerson(firstName, lastName) {
    return {
        firstName: firstName,
        lastName: lastName
    }
}
```

And move this method to another object:

```js
const behavior = {
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
```

And before calling the `getFullName()` method on the `person` object, you can assign the method of the `behavior` object to the `person` object as follows:

```js
let john = createPerson('John', 'Doe'),
    jane = createPerson('Jane', 'Doe');

john.getFullName = behavior.getFullName;
jane.getFullName = behavior.getFullName;

console.log(john.getFullName()); // John Doe
console.log(jane.getFullName()); // Jane Doe
```

It’ll more difficult if you have many methods and have to assign them manually.

This is why the `Object.create()` method comes into play.


### The Object.create() method

The `Object.create()` method creates a new object using an existing object as the prototype of the new object:

```
Object.create(proto, [propertiesObject])
```

So you can use the `Object.create()` as follows:

```js
const behavior = {
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}

function createPerson(firstName, lastName) {
    let person = Object.create(behavior);
    person.firstName = firstName;
    person.lastName = lastName;
    return person;
}
```

Now, you can create `person` objects and call the methods of the `behavior` object:

```js
let john = createPerson('John', 'Doe'),
    jane = createPerson('Jane', 'Doe');

console.log(john.getFullName()); // John Doe
console.log(jane.getFullName()); // Jane Doe
```

The code works perfectly fine. However, in practice, you will **rarely see the factory functions**. Instead, you will see the **function constructors** or the **classes**.


## References

[Callback :MDN](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

[Callback :w3schools](https://www.w3schools.com/js/js_callback.asp)

[Closures :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

[Factory functions :javascripttutorial](https://www.javascripttutorial.net/javascript-factory-functions/)


## Recomendations

[Demystifying JavaScript Closure :All Things JavaScript, LLC](https://www.youtube.com/watch?v=TznpOmv2BQM&t=0s&ab_channel=AllThingsJavaScript%2CLLC)

[06. closure :Rain Geometrics](https://www.youtube.com/watch?v=VChVOhXQ62k&list=PLPEgRYGCP6EMximoiR0LVMx7FCuUIO9Np&index=6&ab_channel=RainGeometrics)

[JavaScript Question: What is a Factory Function? :All Things JavaScript, LLC](https://www.youtube.com/watch?v=OjAwnwZNDg0&ab_channel=AllThingsJavaScript%2CLLC)
