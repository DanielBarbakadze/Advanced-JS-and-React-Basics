# Meeting 6

განსახილველი თემები:

* Stack (as Data Structure)
* Queue (as Data Structure)
* Difference between Runtime and Compile Time
* Concurrency model and the event loop
  * Runtime concepts
  * Event loop
  * Never blocking


## Stack

In our day to day life, we see stacks of plates, coins, etc. All these stacks have one thing in common that a new item is added at the top of the stack and any item is also removed from the top i.e., the most recently added item is removed first.

![stack](https://www.codesdope.com/staticroot/images/ds/stack1.png)

In Computer Science also, a stack is a data structure which follows the same kind of rules i.e., the most recently added item is removed first. It works on **LIFO (Last In First Out)** policy. It means that the item which enters at last is removed first.

![stack-2](https://www.codesdope.com/staticroot/images/ds/stack2.png)

A stack supports few basic operations, These operations are:

**Push** → The push operation adds a new element to the stack. As stated above, any element added to the stack goes at the top, so push adds an element at the top of a stack

![stack-push](https://www.codesdope.com/staticroot/images/ds/stack3.gif)


**Pop** → The pop operation removes and also returns the top-most (or most recent element) from the stack.

![stack-pop](https://www.codesdope.com/staticroot/images/ds/stack4.gif)


**Top** → The Top operations only returns (doesn’t remove) the top-most element of a stack.

![stack-top](https://www.codesdope.com/staticroot/images/ds/stack5.png)


**isEmpty** → This operation checks whether a stack is empty or not i.e., if there is any element present in the stack or not.

![stack-isEmpty](https://www.codesdope.com/staticroot/images/ds/stack6.png)


It also handles two errors, They are **stack underflow** and **stack overflow**.

When we try to pop an element from an empty stack, it is said that the **stack underflowed.**

However, if the number of elements exceeds the stated size of a stack, the **stack** is said to be **overflowed.**


![stack-errors](https://www.codesdope.com/staticroot/images/ds/stack7.png)


## Queue

Similar to stacks, a queue is also an Abstract Data Type or ADT. A **queue** follows **FIFO (First-in, First out)** policy. It is equivalent to the queues in our general life. For example, a new person enters a queue at the last and the person who is at the front (who must have entered the queue at first) will be served first.

![queue](https://www.codesdope.com/staticroot/images/ds/queue1.png)


Similar to a queue of day to day life, in Computer Science also, a new element enters a queue at the last (tail of the queue) and removal of an element occurs from the front (head of the queue).

![queue-2](https://www.codesdope.com/staticroot/images/ds/queue2.png)

A queue supports few basic operations, These operations are:

**Enqueue** → Enqueue is an operation which adds an element to the queue. As stated earlier, any new item enters at the tail of the queue, so Enqueue adds an item to the tail of a queue.

![queue-enqueue](https://www.codesdope.com/staticroot/images/ds/queue3.gif)



**Dequeue** → It is similar to the pop operation of stack i.e., it returns and deletes the front element from the queue.

![queue-dequeue](https://www.codesdope.com/staticroot/images/ds/queue4.gif)



**isEmpty** → It is used to check whether the queue has any element or not.

**isFull** → It is used to check whether the queue is full or not.

**Front** → It is similar to the top operation of a stack i.e., it returns the front element of the queue (but don’t delete it).


## Difference between Runtime and Compile Time

Almost all computer programs written are in high level languages, which is a little closer to English than a sequence of 0's and 1's that is the machine language, so us humans have an easier time understanding and working with the code. To convert this program code into an executable file that can be read and executed by a machine, we use a [Compiler](http://en.wikipedia.org/wiki/Compiler "en.wikipedia.org").

Now when you just use the terms runtime and compile time, the first thing that comes to mind are the compile time errors and runtime errors:



**Compile time errors:** When we feed a bunch of text to the compiler to convert it to machine code.

What can go wrong at compile time:

* Syntax errors
* Typechecking errors
* (Rarely) compiler crashes

If the compiler succeeds, what do we know?

* The program was well formed---a meaningful program in whatever language.
* It's possible to start running the program as it's in a machine readable form. (The program might fail immediately, but at least we can try.)

What are the inputs and outputs?

* Input was the program being compiled, plus any header files, interfaces, libraries, or other voodoo that it needed to import in order to get compiled.
* Output is hopefully assembly code or relocatable object code or even an executable program. Or if something goes wrong, output is a bunch of error messages.



**Runtime errors:**
What can go wrong are run-time errors:

* Division by zero
* Deferencing a null pointer
* Running out of memory

Also there can be errors that are detected by the program itself:

* Trying to open a file that isn't there
* Trying find a web page and discovering that an alleged URL is not well formed

If run-time succeeds, the program finishes (or keeps going) without crashing.



## Concurrency model and the Event Loop

JavaScript has a concurrency model based on an **event loop**, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.


### Runtime concepts

#### Visual representation

![cmatel-vr](https://mdn.mozillademos.org/files/17124/The_Javascript_Runtime_Environment_Example.svg)


#### Stack

Function calls form a stack of *frames*.

```js
function foo(b) {
  let a = 10
  return a + b + 11
}

function bar(x) {
  let y = 3
  return foo(x * y)
}

console.log(bar(7)) //returns 42
```

When calling `bar`, a first frame is created containing `bar`'s arguments and local variables.

When `bar` calls `foo`, a second frame is created and pushed on top of the first one containing `foo`'s arguments and local variables.

When `foo` returns, the top frame element is popped out of the stack (leaving only `bar`'s call frame).

When `bar` returns, the stack is empty.


#### Heap

Objects are allocated in a heap which is just a name to denote a large (mostly unstructured) region of memory.


#### Queue

A JavaScript runtime uses a message queue, which is a list of messages to be processed. Each message has an associated function which gets called in order to handle the message.

At some point during the [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#event_loop), the runtime starts handling the messages on the queue, starting with the oldest one. To do so, the message is removed from the queue and its corresponding function is called with the message as an input parameter. As always, calling a function creates a new stack frame for that function's use.

The processing of functions continues until the stack is once again empty. Then, the event loop will process the next message in the queue (if there is one).


### Event loop

The **event loop** got its name because of how it's usually implemented, which usually resembles:

```js
while (queue.waitForMessage()) {
  queue.processNextMessage()
}
```

`queue.waitForMessage()` waits synchronously for a message to arrive (if one is not already available and waiting to be handled).


#### Run-to-completion

Each message is processed completely before any other message is processed.

This offers some nice properties when reasoning about your program, including the fact that whenever a function runs, it cannot be pre-empted and will run entirely before any other code runs (and can modify data the function manipulates). This differs from C, for instance, where if a function runs in a thread, it may be stopped at any point by the runtime system to run some other code in another thread.

A downside of this model is that if a message takes too long to complete, the web application is unable to process user interactions like click or scroll. The browser mitigates this with the "a script is taking too long to run" dialog. A good practice to follow is to make message processing short and if possible cut down one message into several messages.


#### Adding messages

In web browsers, messages are added anytime an event occurs and there is an event listener attached to it. If there is no listener, the event is lost. So a click on an element with a click event handler will add a message—likewise with any other event.

The function `setTimeout` is called with 2 arguments: a message to add to the queue, and a time value (optional; defaults to `0`). The *time value* represents the (**minimum**) delay after which the message will actually be pushed into the queue.

If there is *no other message in the queue*, and the *stack is empty*, the message is processed right after the delay. However, if there are messages, the `setTimeout` message will have to wait for other messages to be processed. For this reason, the second argument indicates a *minimum* time—not a *guaranteed* time.

Here is an example that demonstrates this concept (`setTimeout` does not run immediately after its timer expires):

```js
const start = new Date().getSeconds();

setTimeout(function() {
  // prints out "2", meaning that the callback is not called immediately after 500 milliseconds.
  console.log("Ran after " + (new Date().getSeconds() - start) + " seconds");
}, 500)

while (true) {
  if (new Date().getSeconds() - start >= 2) {
    console.log("Good, looped for 2 seconds")
    break;
  }
}
```


#### Zero delays

Zero delay doesn't actually mean the call back will fire-off after zero milliseconds. Calling [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout "The documentation about this has not yet been written; please consider contributing!") with a delay of `0` (zero) milliseconds doesn't execute the callback function after the given interval.

The execution depends on the number of waiting tasks in the queue. In the example below, the message `''this is just a message''` will be written to the console before the message in the callback gets processed, because the delay is the *minimum* time required for the runtime to process the request (not a *guaranteed* time).

Basically, the `setTimeout` needs to wait for all the code for queued messages to complete even though you specified a particular time limit for your `setTimeout`.


#### Several runtimes communicating together

A web worker or a cross-origin `iframe` has its own stack, heap, and message queue. Two distinct runtimes can only communicate through sending messages via the [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method. This method adds a message to the other runtime if the latter listens to `message` events.


### Never blocking

A very interesting property of the event loop model is that JavaScript, unlike a lot of other languages, never blocks. Handling I/O is typically performed via events and callbacks, so when the application is waiting for an [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) query to return or an [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) request to return, it can still process other things like user input.


Legacy exceptions exist like `alert` or synchronous XHR, but it is considered a good practice to avoid them. Beware: [exceptions to the exception do exist](http://stackoverflow.com/questions/2734025/is-javascript-guaranteed-to-be-single-threaded/2734311#2734311) (but are usually implementation bugs, rather than anything else).


## More examples for The Event loop


When an asynchronous Web API is used, the rules become more complicated. A built-in API that you can test this with is `setTimeout`, which sets a timer and performs an action after a specified amount of time. `setTimeout` needs to be asynchronous, otherwise the entire browser would remain frozen during the waiting, which would result in a poor user experience.


Add `setTimeout` to the `second` function to simulate an asynchronous request:

```js
// Define three example functions, but one of them contains asynchronous code
function first() {
  console.log(1)
}

function second() {
  setTimeout(() => {
    console.log(2)
  }, 0)
}

function third() {
  console.log(3)
}
```

`setTimeout` takes two arguments: the function it will run asynchronously, and the amount of time it will wait before calling that function. In this code you wrapped `console.log` in an anonymous function and passed it to `setTimeout`, then set the function to run after `0` milliseconds.

Now call the functions:

```js
// Execute the functions
first()
second()
third()
```

You might expect with a `setTimeout` set to `0` that running these three functions would still result in the numbers being printed in sequential order. But because it is asynchronous, the function with the timeout will be printed last:

```bash
Output
1
3
2
```

Whether you set the timeout to zero seconds or five minutes will make no difference—the `console.log` called by asynchronous code will execute after the synchronous top-level functions.

This happens because the JavaScript host environment, in this case the browser, uses a concept called the *event loop* to handle concurrency, or parallel events. Since JavaScript can only execute one statement at a time, it needs the event loop to be informed of when to execute which specific statement. The event loop handles this with the concepts of a *stack* and a *queue*.


### Stack

The *stack*, or call stack, holds the state of what function is currently running.

JavaScript will run the current *frame* (or function call in a specific environment) in the stack, then remove it and move on to the next one.

For the example only containing synchronous code, the browser handles the execution in the following order:

* Add `first()` to the stack, run `first()` which logs `1` to the console, remove `first()` from the stack.
* Add `second()` to the stack, run `second()` which logs `2` to the console, remove `second()` from the stack.
* Add `third()` to the stack, run `third()` which logs `3` to the console, remove `third()` from the stack.

The second example with `setTimout` looks like this:

* Add `first()` to the stack, run `first()` which logs `1` to the console, remove `first()` from the stack.
* Add `second()` to the stack, run `second()`.
  * Add `setTimeout()` to the stack, run the `setTimeout()` Web API which starts a timer and adds the anonymous function to the *queue*, remove `setTimeout()` from the stack.
* Remove `second()` from the stack.
* Add `third()` to the stack, run `third()` which logs `3` to the console, remove `third()` from the stack.
* The event loop checks the queue for any pending messages and finds the anonymous function from `setTimeout()`, adds the function to the stack which logs `2` to the console, then removes it from the stack.

Using `setTimeout`, an asynchronous Web API, introduces the concept of the *queue*, which this tutorial will cover next.


### Queue

The *queue*, also referred to as message queue or task queue, is a waiting area for functions. Whenever the call stack is empty, the event loop will check the queue for any waiting messages, starting from the oldest message. Once it finds one, it will add it to the stack, which will execute the function in the message.

In the `setTimeout` example, the anonymous function runs immediately after the rest of the top-level execution, since the timer was set to `0` seconds.

It’s important to remember that **the timer does not mean that the code will execute in exactly** `0` seconds or whatever the specified time is, but that **it will add the anonymous function to the queue in that amount of time**.

This queue system exists because if the timer were to add the anonymous function directly to the stack when the timer finishes, it would interrupt whatever function is currently running, which could have unintended and unpredictable effects.

> **Note:** There is also another queue called the *job queue* or *microtask queue* that handles promises. Microtasks like promises are handled at a higher priority than macrotasks like `setTimeout`.

Now you know how the event loop uses the stack and queue to handle the execution order of code. 


## References

[Stack Data Structures :CODESDOPE](https://www.codesdope.com/course/data-structures-stacks/)

[Queue Data Structures :CODESDOPE](https://www.codesdope.com/course/data-structures-queue/)

[What is the difference between runtime and compile time? :Quora](https://www.quora.com/What-is-the-difference-between-runtime-and-compile-time)

[Understanding the Event loop :DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript#callback-functions)


## Recomendations

[What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ&ab_channel=JSConf)

[Javascript — How the Engine Compiles? :MEDIUM](https://medium.com/@osmanakar_65575/javascript-how-the-engine-compiles-6df6d5c6439c)
