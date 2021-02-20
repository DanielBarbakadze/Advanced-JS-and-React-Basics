"use strict";

let person = {
  name: "Daniel",
  sayHello: function () {
    console.log(this);
  },
  child: {
    sayHello: function () {
      console.log(this.name);
    },
  },
};

person.sayHello(); // person object
person.child.sayHello(); // undefined

/*
 * PROBLEM:
 *
 * How to change context in 'child' object?
 *
 */

/*
 * SOLUTIONS:
 *
 * USING .bind():
 * person.child.sayHello.bind(person)(); // output -> `Daniel`
 *
 * USING .call():
 * person.child.sayHello.call(person); // output -> `Daniel`
 *
 * USING .apply():
 * person.child.sayHello.apply(person); // output -> `Daniel`
 *
 * or change this.name -- to --> person.name
 *
 */
