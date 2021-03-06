# Meeting 5

განსახილველი თემები:

* General asynchronous programming concepts

  * Asynchronous?
  * Blocking code
  * Threads
  * Asynchronous code
* Introducing asynchronous JavaScript

  * Synchronous JavaScript
  * Asynchronous JavaScript
  * Async callbacks
  * Promises
  * The basics of async/await
* Quick introduce with examples (Callbacks, Promises & Async/Await)
* Callbacks | nested Callbacks | Promises | async/await

## General asynchronous programming concepts

### Asynchronous?

Normally, a given program's code runs straight along, with only one thing happening at once. If a function relies on the result of another function, it has to wait for the other function to finish and return, and until that happens, the entire program is essentially stopped from the perspective of the user.

There's no sense sitting there waiting for something when you could let the other task chug along on another processor core and let you know when it's done. This lets you get other work done in the meantime, which is the basis of **asynchronous programming**. It is up to the programming environment you are using (web browsers, in the case of web development) to provide you with APIs that allow you to run such tasks asynchronously.

### Blocking code

Asynchronous techniques are very useful, particularly in web programming. When a web app runs in a browser and it executes an intensive chunk of code without returning control to the browser, the browser can appear to be frozen. This is called **blocking**; the browser is blocked from continuing to handle user input and perform other tasks until the web app returns control of the processor.

Let's look at a couple of examples that show what we mean by blocking.

In [simple-sync.html](https://github.com/mdn/learning-area/tree/master/javascript/asynchronous/introducing/simple-sync.html) example ([see it running live](https://mdn.github.io/learning-area/javascript/asynchronous/introducing/simple-sync.html)), we add a click event listener to a button so that when clicked, it runs a time-consuming operation (calculates 10 million dates then logs the final one to the console) and then adds a paragraph to the DOM:

```js
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  let myDate;
  for(let i = 0; i < 10000000; i++) {
    let date = new Date();
    myDate = date
  }

  console.log(myDate);

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

When running the example, open your JavaScript console then click the button — you'll notice that the paragraph does not appear until after the dates have finished being calculated and the console message has been logged. The code runs in the order it appears in the source, and the later operation doesn't run till the earlier operation has finished running.

> **Note**:
>
> The previous example is very unrealistic. You would never calculate 10 million dates on a real web app! It does, however, serve to give you the basic idea.

P.S ინტერესისთვის, ასევე შეგვიძლია გამოვთვალოთ რამდენი მილიწამი დასჭირდა ჩვენს პროცესორს 10 მილიონი ახალი თარიღის შესაქმნელად, შემდეგნაირად:

```js
let firstTime = new Date().getTime();
let lastTime;
for(let i = 0; i < 10000000; i++) {
    lastTime = new Date().getTime();
}
console.log(`It took ${lastTime-firstTime}ms`)
```

In second example, [simple-sync-ui-blocking.html](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/introducing/simple-sync-ui-blocking.html) ([see it live](https://mdn.github.io/learning-area/javascript/asynchronous/introducing/simple-sync-ui-blocking.html)), we simulate something slightly more realistic that you might come across on a real page. We block user interactivity with the rendering of the UI. In this example, we have two buttons:

* A "Fill canvas" button that when clicked fills the available [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) with 1 million blue circles.
* A "Click me for alert" button that when clicked shows an alert message.

```js
function expensiveOperation() {
  for(let i = 0; i < 1000000; i++) {
    ctx.fillStyle = 'rgba(0,0,255, 0.2)';
    ctx.beginPath();
    ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false);
    ctx.fill();
  }
}

fillBtn.addEventListener('click', expensiveOperation);

alertBtn.addEventListener('click', () =>
  alert('You clicked me!')
);
```

If you click the first button and then quickly click the second one, you'll see that the alert does not appear until the circles have finished being rendered. The first operation blocks the second one until it has finished running.

> **Note**:
>
> OK, in our case, it is ugly and we are faking the blocking effect, but this is a common problem that developers of real apps fight to mitigate all the time.

Why is this? The answer is because JavaScript, generally speaking, is **single-threaded**. At this point, we need to introduce the concept of **threads**.

### Threads

A **thread** is basically a single process that a program can use to complete tasks. Each thread can only do a single task at once:

```bash
Task A --> Task B --> Task C
```

Each task will be run sequentially; a task has to complete before the next one can be started.

As we said earlier, many computers now have multiple cores, so can do multiple things at once. Programming languages that can support multiple threads can use multiple cores to complete multiple tasks simultaneously:

```bash
Thread 1: Task A --> Task B
Thread 2: Task C --> Task D
```

#### JavaScript is single-threaded

JavaScript is traditionally single-threaded. *Even with multiple cores,* you could only get it to run tasks on a single thread, called the **main thread**. Our example from above is run like this:

```bash
Main thread: Render circles to canvas --> Display alert()
```

> **Quick Note**:
>
> **Web Workers** makes it possible to run a script operation in a background thread separate from the main execution thread of a web application. The advantage of this is that laborious processing can be performed in a separate thread, allowing the main (usually the UI) thread to run without being blocked/slowed down.

After some time, JavaScript gained some tools to help with such problems. [Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) allow you to send some of the JavaScript processing off to a separate thread, called a worker so that you can run multiple JavaScript chunks simultaneously. You'd generally use a worker to run expensive processes off the main thread so that user interaction is not blocked.

```bash
  Main thread: Task A --> Task C
Worker thread: Expensive task B
```

With this in mind, have a look at [simple-sync-worker.html](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/introducing/simple-sync-worker.html) ([see it running live](https://mdn.github.io/learning-area/javascript/asynchronous/introducing/simple-sync-worker.html)), again with your browser's JavaScript console open. This is a rewrite of our previous example that calculates the 10 million dates in a separate worker thread. Now when you click the button, the browser is able to display the paragraph before the dates have finished calculating. The first operation no longer blocks the second.

### Asynchronous code

Web workers are pretty useful, but **they do have their limitations**. A major one is they are not able to access the **DOM** — you can't get a worker to directly do anything to update the UI. We couldn't render our 1 million blue circles inside our worker; it can basically just do the number crunching.

The second problem is that although code run in a worker is not blocking, it is still basically synchronous. This becomes a problem when a function relies on the results of multiple previous processes to function. Consider the following thread diagrams:

```bash
Main thread: Task A --> Task B
```

In this case, let's say Task A is doing something like fetching an image from the server and Task B then does something to the image like applying a filter to it. If you start Task A running and then immediately try to run Task B, you'll get an error, because the image won't be available yet.

```bash
  Main thread: Task A --> Task B --> |Task D|
Worker thread: Task C -----------> |      |
```

In this case, let's say Task D makes use of the results of both Task B and Task C. If we can guarantee that these results will both be available at the same time, then we might be OK, but this is unlikely. If Task D tries to run when one of its inputs is not yet available, it will throw an error.

To fix such problems, browsers allow us to run certain operations asynchronously. Features like [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) allow you to set an operation running (e.g. the fetching of an image from the server), and then wait until the result has returned before running another operation:

```bash
Main thread: Task A                   Task B
    Promise:      |__async operation__|
```

Since the operation is happening somewhere else, the main thread is not blocked while the async operation is being processed.

## Introducing asynchronous JavaScript

Let's take a first look at some of the different asynchronous techniques, showing how they can help us solve such problems.

### Synchronous JavaScript

To allow us to understand what **[asynchronous](https://developer.mozilla.org/en-US/docs/Glossary/Asynchronous)** JavaScript is, we ought to start off by making sure we understand what **[synchronous](https://developer.mozilla.org/en-US/docs/Glossary/Synchronous)** JavaScript is.

A lot of the functionality we have looked at in previous section is synchronous and the result is returned as soon as the browser can do so. Let's look at a simple example ([see it live here](https://mdn.github.io/learning-area/javascript/asynchronous/introducing/basic-function.html), and [see the source](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/introducing/basic-function.html)):

```js
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

In this block, the lines are executed one after the other:

1. We grab a reference to a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) element that is already available in the DOM.
2. We add a `click` event listener to it so that when the button is clicked:
   1. An `alert()` message appears.
   2. Once the alert is dismissed, we create a [`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) element.
   3. We then give it some text content.
   4. Finally, we append the paragraph to the document body.

While each operation is being processed, nothing else can happen — **rendering is paused**.

This is because as we said [JavaScript is single threaded](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts#javascript_is_single_threaded). Only one thing can happen at a time, on a single main thread, and everything else is blocked until an operation completes.

So in the example above, after you've clicked the button the paragraph won't appear until after the OK button is pressed in the alert box. You can try it for yourself

> **Note**:
>
> It is important to remember that `alert()`, while being very useful for demonstrating a synchronous blocking operation, is terrible for use in real world applications.

### Asynchronous JavaScript

For reasons illustrated earlier (e.g. related to blocking), many Web API features now use asynchronous code to run, especially those that access or fetch some kind of resource from an external device, such as fetching a file from the network, accessing a database and returning data from it, accessing a video stream from a web cam, or broadcasting the display to a VR headset.

Why is this difficult to get to work using synchronous code? Let's look at a quick example. When you fetch an image from a server, you can't return the result immediately. That means that the following (pseudocode) wouldn't work:

```js
let response = fetch('myImage.png'); // fetch is asynchronous
let blob = response.blob();
// display your image blob in the UI somehow
```

That's because you don't know how long the image will take to download, so when you come to run the second line it will throw an error (possibly intermittently, possibly every time) because the `response` is not yet available. Instead, you need your code to wait until the `response` is returned before it tries to do anything else to it.

There are three main types of asynchronous code style you'll come across in JavaScript code, **old-style callbacks**, **promise-style code** and newer **async/await**.

#### Async callbacks

Async callbacks are functions that are specified as arguments when calling a function which will start executing code in the background. When the background code finishes running, it calls the callback function to let you know the work is done, or to let you know that something of interest has happened. Using callbacks is slightly old-fashioned now, but you'll still see them in use in a number of older-but-still-commonly-used APIs.

An example of an async callback is the second parameter of the [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener "addEventListener()") method (as we saw in action above):

```js
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

The first parameter is the type of event to be listened for, and the second parameter is a callback function that is invoked when the event is fired.

When we pass a callback function as an argument to another function, we are only passing the function's reference as an argument, i.e, the callback function is **not** executed immediately. It is “called back” (hence the name) asynchronously somewhere inside the containing function’s body. The containing function is responsible for executing the callback function when the time comes.

#### Promises

Promises are little new style of async code. A good example is the `fetch()` API, which is basically like a modern, more efficient version of [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). Let's look at a quick example, from our [Fetching data from the server](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data) article:

```js
fetch('products.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        products = json;
        initialize();
    })
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });
```

Here we see `fetch``()` taking a single parameter — the URL of a resource you want to fetch from the network — and returning a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). The promise is an object representing the completion or failure of the async operation. It represents an intermediate state, as it were. In essence, it's the browser's way of saying "I promise to get back to you with the answer as soon as I can," hence the name "promise."

We've then got three further code blocks chained onto the end of the `fetch()`:

* Two `then()` blocks. Both contain a callback function that will run if the previous operation is successful, and each callback receives as input the result of the previous successful operation, so you can go forward and do something else to it. Each `.then()` block returns another promise, meaning that you can chain multiple `.then()` blocks onto each other, so multiple asynchronous operations can be made to run in order, one after another.
* The `catch()` block at the end runs if any of the `.then()` blocks fail — in a similar way to synchronous `try...catch` blocks, an error object is made available inside the `catch()`, which can be used to report the kind of error that has occurred. Note however that synchronous `try...catch` won't work with promises, although it will work with [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await), as you'll learn later on.

#### The event queue

Async operations like promises are put into an **event queue**, which runs after the main thread has finished processing so that they *do not block* subsequent JavaScript code from running. The queued operations will complete as soon as possible then return their results to the JavaScript environment.

## Quick introduce with examples (Callbacks, Promises & Async/Await)

Let’s say you have a function that will print a string after a random amount of time:

```js
function printString(string){
  setTimeout(
    () => {
      console.log(string)
    }, 
    Math.floor(Math.random() * 100) + 1
  )
}
```

Let’s try to print the letters A, B, C in that order:

```js
function printAll(){
  printString("A");
  printString("B");
  printString("C");
}

printAll();
```

You will notice that A, B, and C print in a different and random order each time you call *printAll!*

This is because these functions are asynchronous. Each function gets executed in order, but each one is independent with it’s own setTimeout. They won’t wait for the last function to finish before they start.

This is super annoying, so let’s fix it with a **callback**.

### Callbacks

A callback is a function that is passed to another function. When the first function is done, it will run the second function.

```js
function printString(string, callback){
  setTimeout(
    () => {
      console.log(string)
      callback()
    }, 
    Math.floor(Math.random() * 100) + 1
  )
}
```

You can see that is is super easy to modify the original function to work with callbacks.

Again, let’s try to print the letters A, B, C in that order:

```js
function printAll(){
  printString("A", () => {
    printString("B", () => {
      printString("C", () => {})
    })
  })
}

printAll();
```

Well, the code is a lot uglier now, but at least it works! Each time you call printAll, you get the same result.

> The problem with callbacks is it creates something called “Callback Hell.” Basically, you start nesting functions within functions within functions, and it starts to get really hard to read the code.

### Promises

Promises try to fix this nesting problem. Let’s change our function to use Promises

```js
function printString(string){
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
       console.log(string)
       resolve()
      }, 
     Math.floor(Math.random() * 100) + 1
    )
  })
}
```

You can see that it still looks pretty similar. You wrap the whole function in a Promise, and instead of calling the callback, you call resolve (or reject if there is an error). The function returns this Promise object.

Again, let’s try to print the letters A, B, C in that order:

```js
function printAll(){
  printString("A")
  .then(() => {
    return printString("B")
  })
  .then(() => {
    return printString("C")
  })
}

printAll();
```

This is called a Promise Chain. You can see that the code returns the result of the function (which will be a Promise), and this gets sent to the next function in the chain.

The code is no longer nested but it still looks messy!

By using features of arrow functions, we can remove the “wrapper” function. The code becomes cleaner, but still has a lot of unnecessary parenthesis:

```js
function printAll(){
  printString("A")
  .then(() => printString("B"))
  .then(() => printString("C"))
}

printAll();
```

### Async/Await

Await is basically syntactic sugar for Promises. It makes your asynchronous code look more like synchronous/procedural code, which is easier for humans to understand.

The *printString* function doesn’t change at all from the promise version.

Again, let’s try to print the letters A, B, C in that order:

```js
async function printAll(){
  await printString("A")
  await printString("B")
  await printString("C")
}

printAll();
```

Yeah…. MUCH better!

You might notice that we use the “async” keyword for the wrapper function *printAll*. This let’s JavaScript know that we are using async/await syntax, and is necessary if you want to use Await. This means you can’t use Await at the global level; it always needs a wrapper function. Most JavaScript code runs inside a function, so this isn’t a big deal.

### BUT WAIT THERE'S MORE

The `printString` function doesn’t return anything and is independent, all we cared about was the order. But what if you wanted to take the output of the first function, do something with it in the second function, and then pass it to the third function?

Instead of printing the string each time, let’s make a function that will concatenate the string and pass it on.

### Callbacks

Here it is in callback style:

```js
function addString(previous, current, callback){
  setTimeout(
    () => {
      callback((previous + ' ' + current))
    }, 
    Math.floor(Math.random() * 100) + 1
  )
}
```

And in order to call it:

```js
function addAll(){
  addString('', 'A', result => {
    addString(result, 'B', result => {
      addString(result, 'C', result => {
       console.log(result) // Prints out " A B C"
      })
    })
  })
}

addAll();
```

Not so nice.

### Promises

Here it is in Promise style:

```js
function addString(previous, current){
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(previous + ' ' + current)
      }, 
      Math.floor(Math.random() * 100) + 1
    )
  })
}
```

And in order to call it:

```js
function addAll(){  
  addString('', 'A')
  .then(result => {
    return addString(result, 'B')
  })
  .then(result => {
    return addString(result, 'C')
  })
  .then(result => {
    console.log(result) // Prints out " A B C"
  })
}

addAll();
```

Using arrow functions means we can make the code a little nicer:

```js
function addAll(){  
  addString('', 'A')
  .then(result => addString(result, 'B'))
  .then(result => addString(result, 'C'))
  .then(result => {
    console.log(result) // Prints out " A B C"
  })
}

addAll();
```

This is definitely more readable, especially if you add more to the chain, but still a mess of parenthesis.

### Async/Await

The function stays the same as the Promise version.

And in order to call it:

```js
async function addAll(){
  let toPrint = await addString('', 'A')
  toPrint = await addString(toPrint, 'B')
  toPrint = await addString(toPrint, 'C')
  console.log(toPrint) // Prints out " A B C"
}

addAll();
```

Yeah. SO MUCH BETTER.

## Callbacks | nested Callbacks | Promises | async/await

Let's dive into details.

### Callbacks

Callback functions do not have special syntax; they are just a function that has been passed as an argument to another function. The function that takes another function as an argument is called a *higher-order function*. According to this definition, any function can become a callback function if it is passed as an argument. Callbacks are not asynchronous by nature, but can be used for asynchronous purposes.

Here is a syntactic code example of a higher-order function and a callback:

```js
// A function
function fn() {
  console.log('Just a function')
}

// A function that takes another function as an argument
function higherOrderFunction(callback) {
  // When you call a function that is passed as an argument, it is referred to as a callback
  callback()
}

// Passing a function
higherOrderFunction(fn) // Output: "Just a function"
```

In this code, you define a function `fn`, define a function `higherOrderFunction` that takes a function `callback` as an argument, and pass `fn` as a callback to `higherOrderFunction`.

Let's take another example:

```js
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

The task is to get the `third` function to always delay execution until after the asynchronous action in the `second` function has completed. This is where callbacks come in.

Instead of executing `first`, `second`, and `third` at the top-level of execution, you will pass the `third` function as an argument to `second`. The `second` function will execute the callback after the asynchronous action has completed.

Here are the three functions with a callback applied:

```js
// Define three functions
function first() {
  console.log(1)
}

function second(callback) {
  setTimeout(() => {
    console.log(2)

    // Execute the callback function
    callback()
  }, 0)
}

function third() {
  console.log(3)
}
```

Now, execute `first` and `second`, then pass `third` as an argument to `second`:

```js
first()
second(third)
```

After running this code block, you will receive the following output:

```js
Output
1
2
3
```

First `1` will print, and after the timer completes (in this case, zero seconds, but you can change it to any amount) it will print `2` then `3`. By passing a function as a callback, you’ve successfully delayed execution of the function until the asynchronous Web API (`setTimeout`) completes.

The key takeaway here is that callback functions are not asynchronous—`setTimeout` is the asynchronous Web API responsible for handling asynchronous tasks. The callback just allows you to be informed of when an asynchronous task has completed and handles the success or failure of the task.

Now that you have learned how to use callbacks to handle asynchronous tasks, the next section explains the problems of nesting too many callbacks and creating a “pyramid of doom.”

### Nested Callbacks and the Pyramid of Doom

Callback functions are an effective way to ensure delayed execution of a function until another one completes and returns with data. However, due to the nested nature of callbacks, code can end up getting messy if you have a lot of consecutive asynchronous requests that rely on each other. This was a big frustration for JavaScript developers early on, and as a result code containing nested callbacks is often called the “pyramid of doom” or “callback hell.”

Here is a demonstration of nested callbacks:

```js
function pyramidOfDoom() {
  setTimeout(() => {
    console.log(1)
    setTimeout(() => {
      console.log(2)
      setTimeout(() => {
        console.log(3)
      }, 500)
    }, 2000)
  }, 1000)
}
```

In this code, each new `setTimeout` is nested inside a higher order function, creating a pyramid shape of deeper and deeper callbacks. Running this code would give the following:

```js
Output
1
2
3
```

In practice, with real world asynchronous code, this can get much more complicated. You will most likely need to do error handling in asynchronous code, and then pass some data from each response onto the next request. Doing this with callbacks will make your code difficult to read and maintain.

```js
// Example asynchronous function
function asynchronousRequest(args, callback) {
  // Throw an error if no arguments are passed
  if (!args) {
    return callback(new Error('Whoa! Something went wrong.'))
  } else {
    return setTimeout(
      // Just adding in a random number so it seems like the contrived asynchronous function
      // returned different data
      () => callback(null, {body: args + ' ' + Math.floor(Math.random() * 10)}),
      500,
    )
  }
}

// Nested asynchronous requests
function callbackHell() {
  asynchronousRequest('First', function first(error, response) {
    if (error) {
      console.log(error)
      return
    }
    console.log(response.body)
    asynchronousRequest('Second', function second(error, response) {
      if (error) {
        console.log(error)
        return
      }
      console.log(response.body)
      asynchronousRequest(null, function third(error, response) {
        if (error) {
          console.log(error)
          return
        }
        console.log(response.body)
      })
    })
  })
}

// Execute
callbackHell()
```

In this code, you must make every function account for a possible `response` and a possible `error`, making the function `callbackHell` visually confusing.

Running this code will give you the following:

```
Output

First 9 (Actually it's random)
Second 3 (Actually it's random)
Error: Whoa! Something went wrong.
    at asynchronousRequest (<anonymous>:4:21)
    at second (<anonymous>:29:7)
    at <anonymous>:9:13
```

This way of handling asynchronous code is difficult to follow. As a result, the concept of *promises* was introduced in ES6. This is the focus of the next section.

### Promises

A promise represents the completion of an asynchronous function. It is an object that might return a value in the future. It accomplishes the same basic goal as a callback function, but with many additional features and a more readable syntax.

![promises-image](https://bs-uploads.toptal.io/blackfish-uploads/uploaded_file/file/190741/image-1582215000590-ffa807c19d5f6959de485fc66664e123.png)

#### Creating a Promise

You can initialize a promise with the `new Promise` syntax, and you must initialize it with a function. The function that gets passed to a promise has `resolve` and `reject` parameters. The `resolve` and `reject` functions handle the success and failure of an operation, respectively.

Write the following line to declare a promise:

```js
// Initialize a promise
const promise = new Promise((resolve, reject) => {})
```

If you inspect the initialized promise in this state with your web browser’s console, you will find it has a `pending` status and `undefined` value:

```js
Output
__proto__: Promise
[[PromiseStatus]]: "pending"
[[PromiseValue]]: undefined
```

So far, nothing has been set up for the promise, so it’s going to sit there in a `pending` state forever. The first thing you can do to test out a promise is fulfill the promise by resolving it with a value:

```js
const promise = new Promise((resolve, reject) => {
  resolve('We did it!')
})
```

Now, upon inspecting the promise, you’ll find that it has a status of `fulfilled`, and a `value` set to the value you passed to `resolve`:

```js
Output
__proto__: Promise
[[PromiseStatus]]: "fulfilled"
[[PromiseValue]]: "We did it!"
```

As stated in the beginning of this section, a promise is an object that may return a value. After being successfully fulfilled, the `value` goes from `undefined` to being populated with data.

A promise can have three possible states: pending, fulfilled, and rejected.

* **Pending** - Initial state before being resolved or rejected
* **Fulfilled** - Successful operation, promise has resolved
* **Rejected** - Failed operation, promise has rejected

After being fulfilled or rejected, a promise is settled.

Now that you have an idea of how promises are created, let’s look at how a developer may consume these promises.

#### Consuming a Promise

The promise in the last section has fulfilled with a value, but you also want to be able to access the value. Promises have a method called `then` that will run after a promise reaches `resolve` in the code. `then` will return the promise’s value as a parameter.

This is how you would return and log the `value` of the example promise:

```js
promise.then((response) => {
  console.log(response)
})
```

The promise you created had a `[[PromiseValue]]` of `We did it!`. This value is what will be passed into the anonymous function as `response`:

```bash
Output
We did it!
```

So far, the example you created did not involve an asynchronous Web API—it only explained how to create, resolve, and consume a native JavaScript promise. Using `setTimeout`, you can test out an asynchronous request.

The following code simulates data returned from an asynchronous request as a promise:

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Resolving an asynchronous request!'), 2000)
})

// Log the result
promise.then((response) => {
  console.log(response)
})
```

Using the `then` syntax ensures that the `response` will be logged only when the `setTimeout` operation is completed after `2000` milliseconds. All this is done without nesting callbacks.

Now after two seconds, it will resolve the promise value and it will get logged in `then`:

```bash
Output
Resolving an asynchronous request!
```

Promises can also be chained to pass along data to more than one asynchronous operation. If a value is returned in `then`, another `then` can be added that will fulfill with the return value of the previous `then`:

```js
// Chain a promise
promise
  .then((firstResponse) => {
    // Return a new value for the next then
    return firstResponse + ' And chaining!'
  })
  .then((secondResponse) => {
    console.log(secondResponse)
  })
```

The fulfilled response in the second `then` will log the return value:

```bash
Output
Resolving an asynchronous request! And chaining!
```

Since `then` can be chained, it allows the consumption of promises to appear more synchronous than callbacks, as they do not need to be nested. This will allow for more readable code that can be maintained and verified easier.

#### Error Handling

So far, you have only handled a promise with a successful `resolve`, which puts the promise in a `fulfilled` state. But frequently with an asynchronous request you also have to handle an error—if the API is down, or a malformed or unauthorized request is sent. A promise should be able to handle both cases. In this section, you will create a function to test out both the success and error case of creating and consuming a promise.

This `getUsers` function will pass a flag to a promise, and return the promise:

```js
function getUsers(onSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Handle resolve and reject in the asynchronous API
    }, 1000)
  })
}
```

Set up the code so that if `onSuccess` is `true`, the timeout will fulfill with some data. If `false`, the function will reject with an error:

```js
function getUsers(onSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Handle resolve and reject in the asynchronous API
      if (onSuccess) {
        resolve([
          {id: 1, name: 'Jerry'},
          {id: 2, name: 'Elaine'},
          {id: 3, name: 'George'},
        ])
      } else {
        reject('Failed to fetch data!')
      }
    }, 1000)
  })
}
```

For the successful result, you return JavaScript objects that represent sample user data.

In order to handle the error, you will use the `catch` instance method. This will give you a failure callback with the `error` as a parameter.

Run the `getUser` command with `onSuccess` set to `false`, using the `then` method for the success case and the `catch` method for the error:

```js
// Run the getUsers function with the false flag to trigger an error
getUsers(false)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

Since the error was triggered, the `then` will be skipped and the `catch` will handle the error:

```bash
Output
Failed to fetch data!
```

If you switch the flag and `resolve` instead, the `catch` will be ignored, and the data will return instead:

```js
// Run the getUsers function with the true flag to resolve successfully
getUsers(true)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

This will yield the user data:

```
Output
(3) [{…}, {…}, {…}]
0: {id: 1, name: "Jerry"}
1: {id: 2, name: "Elaine"}
3: {id: 3, name: "George"}
```

For reference, here is a table with the handler methods on `Promise` objects:


| Method | Description |
| - | - |
| `then()` | Handles a`resolve`. Returns a promise, and calls `onFulfilled` function asynchronously |
| `catch()` | Handles a`reject`. Returns a promise, and calls `onRejected` function asynchronously |
| `finally()` | Called when a promise is settled. Returns a promise, and calls`onFinally` function asynchronously |

Promises can be confusing, both for new developers and experienced programmers that have never worked in an asynchronous environment before. However as mentioned, it is much more common to consume promises than create them. Usually, a browser’s Web API or third party library will be providing the promise, and you only need to consume it.

In the final promise section, this tutorial will cite a common use case of a Web API that returns promises: [the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

#### Using the Fetch API with Promises

One of the most useful and frequently used Web APIs that returns a promise is the Fetch API, which allows you to make an asynchronous resource request over a network. `fetch` is a two-part process, and therefore requires chaining `then`. This example demonstrates hitting the GitHub API to fetch a user’s data, while also handling any potential error:

```js
// Fetch a user from the GitHub API
fetch('https://api.github.com/users/octocat')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
```

The `fetch` request is sent to the `https://api.github.com/users/octocat` URL, which asynchronously waits for a response. The first `then` passes the response to an anonymous function that formats the response as [JSON data](https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript), then passes the JSON to a second `then` that logs the data to the console. The `catch` statement logs any error to the console.

Running this code will yield the following:

```bash
Output
login: "octocat",
id: 583231,
avatar_url: "https://avatars3.githubusercontent.com/u/583231?v=4"
blog: "https://github.blog"
company: "@github"
followers: 3203
...
```

This is the data requested from `https://api.github.com/users/octocat`, rendered in JSON format.

This section of the tutorial showed that promises incorporate a lot of improvements for dealing with asynchronous code. But, while using `then` to handle asynchronous actions is easier to follow than the pyramid of callbacks, some developers still prefer a synchronous format of writing asynchronous code. To address this need, [ECMAScript 2016 (ES7)](https://www.ecma-international.org/ecma-262/7.0/index.html) introduced `async` functions and the `await` keyword to make working with promises easier.

### Async Functions with `async/await`

An *`async` function* allows you to handle asynchronous code in a manner that appears synchronous. `async` functions still use promises under the hood, but have a more traditional JavaScript syntax. In this section, you will try out examples of this syntax.

You can create an `async` function by adding the `async` keyword before a function:

```js
// Create an async function
async function getUser() {
  return {}
}
```

Although this function is not handling anything asynchronous yet, it behaves differently than a traditional function. If you execute the function, you’ll find that it returns a promise with a `[[PromiseStatus]]` and `[[PromiseValue]]` instead of a return value.

Try this out by logging a call to the `getUser` function:

```js
console.log(getUser())
```

This will give the following:

```js
Output
__proto__: Promise
[[PromiseStatus]]: "fulfilled"
[[PromiseValue]]: Object
```

This means you can handle an `async` function with `then` in the same way you could handle a promise. Try this out with the following code:

```js
getUser().then((response) => console.log(response))
```

This call to `getUser` passes the return value to an anonymous function that logs the value to the console.

You will receive the following when you run this program:

```bash
Output
{}
```

An `async` function can handle a promise called within it using the `await` operator. `await` can be used within an `async` function and will wait until a promise settles before executing the designated code.

With this knowledge, you can rewrite the Fetch request from the last section using `async`/`await` as follows:

```js
// Handle fetch with async/await
async function getUser() {
  const response = await fetch('https://api.github.com/users/octocat')
  const data = await response.json()

  console.log(data)
}

// Execute async function
getUser()
```

The `await` operators here ensure that the `data` is not logged before the request has populated it with data.

Now the final `data` can be handled inside the `getUser` function, without any need for using `then`. This is the output of logging `data`:

```js
Output
login: "octocat",
id: 583231,
avatar_url: "https://avatars3.githubusercontent.com/u/583231?v=4"
blog: "https://github.blog"
company: "@github"
followers: 3203
...
```

> **Note:** In many environments, `async` is necessary to use `await`—however, some new versions of browsers and Node allow using top-level `await`, which allows you to bypass creating an async function to wrap the `await` in.

Finally, since you are handling the fulfilled promise within the asynchronous function, you can also handle the error within the function. Instead of using the `catch` method with `then`, you will use the [`try`/`catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) pattern to handle the exception.

Add the following highlighted code:

```js
// Handling success and errors with async/await
async function getUser() {
  try {
    // Handle success in try
    const response = await fetch('https://api.github.com/users/octocat')
    const data = await response.json()

    console.log(data)
  } catch (error) {
    // Handle error in catch
    console.error(error)
  }
}
```

The program will now skip to the `catch` block if it receives an error and log that error to the console.

Modern asynchronous JavaScript code is most often handled with `async`/`await` syntax, but it is important to have a working knowledge of how promises work, especially as promises are capable of additional features that cannot be handled with `async`/`await`, like combining promises with [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

> **Note:** `async`/`await` can be reproduced by using [generators combined with promises](https://www.digitalocean.com/community/tutorials/understanding-generators-in-javascript#asyncawait-with-generators) to add more flexibility to your code. To learn more, check out our [Understanding Generators in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-generators-in-javascript) tutorial.

## References

[General async concepts :MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts)

[Introducing asynchronous JavaScript :MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)

[Callbacks, Promises and Async/Await :MEDIUM](https://medium.com/front-end-weekly/callbacks-promises-and-async-await-ad4756e01d90)

[Understanding Callbacks, Promises and Async/Await :DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript#callback-functions)

## Recomendations

[Asynchronous JavaScript: From Callback Hell to Async and Await :Toptal](https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial)

[Making asynchronous programming easier with async and await :MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

[Choosing the right approach :MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Choosing_the_right_approach)

[async function :MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
