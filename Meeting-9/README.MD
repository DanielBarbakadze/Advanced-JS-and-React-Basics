# Meeting 9

განსახილველი თემები:

* Introduction to client-side frameworks

  * A brief history
  * What frameworks are out there?
  * Why do frameworks exist?
  * The verbosity of DOM changes
  * Another way to build UIs
  * Other things frameworks give us
  * Things to consider when using frameworks
  * How to choose a framework
* Getting started with React

  * Hello React
  * Use cases
  * How does React use JavaScript?
  * Setting up your first React to a Website (CDN)


## Introduction to client-side frameworks

We begin our look at frameworks with a general overview of the area, looking at a brief history of JavaScript and frameworks, why frameworks exist and what they give us, how to start thinking about choosing a framework to learn, and what alternatives there are to client-side frameworks.


### A brief history

When JavaScript debuted in 1996, it added occasional interactivity and excitement to a web that was, up until then, composed of static documents. The web became not just a place to *read things*, but to *do things*. JavaScript’s popularity steadily increased. Developers who worked with JavaScript wrote tools to solve the problems they faced, and packaged them into reusable packages called **libraries**, so they could share their solutions with others. This shared ecosystem of libraries helped shape the growth of the web.



Now, JavaScript is an essential part of the web, used on 95% of all websites, and the web is an essential part of modern life. The web allows us to do things that used to be possible only in native applications installed on our computers. These modern, complex, interactive websites are often referred to as **web applications**.


The advent of modern JavaScript frameworks has made it much easier to build highly dynamic, interactive applications. A **framework** is a library that offers opinions about how software gets built. These opinions allow for predictability and homogeneity in an application; predictability allows software to scale to an enormous size and still be maintainable; predictability and maintainability are essential for the health and longevity of software.


### What frameworks are out there?

There are many frameworks out there, but currently the "big four" are considered to be the following.


#### **Ember**

The verbosity of DOM changes[Ember](https://emberjs.com/) was initially released in December 2011 as a continuation of work that started in the [SproutCore](https://en.wikipedia.org/wiki/SproutCore) project. It is an older framework that has less users than more modern alternatives such as React and Vue, but it still enjoys a fair amount of popularity due to its stability, community support, and some clever coding principles.


#### **Angular**

[Angular](https://angular.io/) is an open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. It is a complete rewrite from the same team that built [AngularJS](https://angularjs.org/). Angular was officially released on the 14th of September 2016.

Angular is a component-based framework which uses declarative HTML templates. At build time, transparently to developers, the framework's compiler translates the templates to optimized JavaScript instructions. Angular uses [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript.


#### **Vue**

Evan You first released [Vue](https://vuejs.org/) in 2014, after working on and learning from the original [AngularJS](https://angularjs.org/) project. Vue is the youngest of the big four, but has enjoyed a recent uptick in popularity.

Vue, like [AngularJS](https://angularjs.org/), extends HTML with some of its own code. Apart from that, it mainly relies on modern, standard JavaScript.


#### **React**

Facebook released [React](https://reactjs.org/) in 2013. By this point, it had already been using React to solve many of its problems internally.

React itself is *not* technically a framework; it's a library for rendering UI components.

React is used in combination with *other* libraries to make applications — React and [React Native](https://reactnative.dev/) enable developers to make mobile applications; React and [ReactDOM](https://reactjs.org/docs/react-dom.html) enable them to make web applications, etc.

Because React and ReactDOM are so often used together, React is colloquially understood as a JavaScript framework.

React extends JavaScript with HTML-like syntax, known as [JSX](https://reactjs.org/docs/introducing-jsx.html).


### Why do frameworks exist?

We've discussed the environment that inspired the creation of frameworks, but not really *why* developers felt the need to make them. Exploring the why requires first examining the challenges of software development.


Consider a common kind of application: A to-do list creator.

This application should allow users to do things like render a list of tasks, add a new task, and delete a task;

and it must do this while reliably tracking and updating the data underlying the application. In software development, this underlying data is known as state.


Each of our goals is theoretically simple in isolation.

We can iterate over the data to render it;

we can add to an object to make a new task;

we can use an identifier to find, edit, or delete a task.

When we remember that the application has to let the user to do *all* of these things through the browser, however, some cracks start to show. **The real problem is this: every time we change our application’s state, we need to update the UI to match.**

We can examine the difficulty of this problem by looking at just *one* feature of our todo list app: rendering a list of tasks.




### The verbosity of DOM changes

Building HTML elements and rendering them in the browser at the appropriate time takes a surprising amount of code. Let's say that our state is an array of objects structured like this:

```js
const state = [
  {
    id: 'todo-0',
    name: 'Learn some frameworks!'
  }
]
```

How do we show one of those tasks to our user? We want to represent each task as a list item – an HTML `<li>` element inside of an unordered list element (a `<ul>`). How do we make it? That could look something like this:

```js
function buildTodoItemEl(id, name) {
  const item = document.createElement('li');
  const span = document.createElement('span');
  const textContent = document.createTextNode(name);

  span.appendChild(textContent);

  item.id = id;
  item.appendChild(span);
  item.appendChild(buildDeleteButtonEl(id));

  return item;
}
```

Here, we use the `document.createElement()` method to make our `<li>`, and several more lines of code to create the properties and children it needs.

The tenth line of this snippet references another build function: `buildDeleteButtonEl()`. It follows a similar pattern to the one we used to build a list item element:

```js
function buildDeleteButtonEl(id) {
  const button = document.createElement('button');
  const textContent = document.createTextNode('Delete');

  button.setAttribute('type', 'button');
  button.appendChild(textContent);

  return button;
}
```

This button doesn't do anything yet, but it will later once we decide to implement our delete feature. The code that will render our items on the page might read something like this:

```js
function renderTodoList() {
  const frag = document.createDocumentFragment();
  state.tasks.forEach(task => {
    const item = buildTodoItemEl(task.id, task.name);
    frag.appendChild(item);
  });

  while (todoListEl.firstChild) {
    todoListEl.removeChild(todoListEl.firstChild);
  }
  todoListEl.appendChild(frag);
}
```

We've now got well over thirty lines of code dedicated *just* to the UI – *just* to the step of rendering something in the DOM – and at no point do we add classes that we could use later to style our list-items!

Working directly with the DOM, as in this example, requires understanding many things about how the DOM works: how to make elements; how to change their properties; how to put elements inside of each other; how to get them on the page. None of this code actually handles user interactions, or addresses adding or deleting a task. If we add those features, we have to remember to update our UI in the right time and in the right way.

JavaScript frameworks were created to make this kind of work a little easier — they exist to provide a better *developer experience*. They don't bring brand-new powers to JavaScript; they give you easier access to JavaScript's powers so you can build for today's web.

If you want to see code samples from this section in action, you can check out a [working version of the app on CodePen](https://codepen.io/dengeist/pen/XWbPNmw), which also allows users to add and delete new tasks.


### Another way to build UIs

Every JavaScript framework offers a way to write user interfaces more *declaratively*. That is, they allow you to write code that describes how your UI should look, and the framework makes it happen in the DOM behind the scenes.

The vanilla JavaScript approach to building out new DOM elements in repetition was difficult to understand at a glance.  By contrast, the following block of code illustrates the way you might use Vue to describe our list of tasks:

```js
<ul>
  <li v-for="task in tasks" v-bind:key="task.id">
    <span>{{task.name}}</span>
    <button type="button">Delete</button>
  </li>
</ul>
```

That's it. This snippet reduces approximately thirty-two lines of code down to six lines. If the curly braces and `v-` attributes here are unfamiliar to you, that's okay; The thing to take away here is that this code looks like the UI it represents, whereas the vanilla JavaScript code does not.


### Other things frameworks give us

Let's look at some of the other advantages conferred upon us by frameworks. As we've alluded to before, the advantages of frameworks are achievable in vanilla JavaScript, but using a framework takes away all of the cognitive load of having to solve these problems yourself.


#### **Tooling**

Because each of the frameworks in this module have a large, active community, each framework's ecosystem provides tooling that Improves the developer experience.

These tools make it easy to add things like testing (to ensure that your application behaves as it should) or linting (to ensure that your code is error-free and stylistically consistent).


> **Note**:
>
> If you want to find out more details about web tooling concepts, have a read of our [Client-side tooling overview](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview).


#### **Compartmentalization**

Most major frameworks encourage developers to abstract the different parts of their user interfaces into *components* — maintainable, reusable chunks of code that can communicate with one another.

All the code related to a given component can live in one file (or a couple of specific files), so that you as a developer know exactly where to go to make changes to that component.

In a vanilla JavaScript app, you'd have to create your own set of conventions to achieve this in an efficient, scalable way.

Many JavaScript developers, if left to their own devices, could end up with all the code related to one part of the UI being spread out all over a file — or in another file altogether.


#### **Routing**

The most essential feature of the web is that it allows users to navigate from one page to another – it is, after all, a network of interlinked documents. When you follow a link on this very website, your browser communicates with a server and fetches new content to display for you. As it does so, the URL in your address bar changes. You can save this new URL and come back to the page later on, or share it with others so they can easily find the same page. Your browser remembers your navigation history and allows you to navigate back and forth, too. This is called **server-side routing**.

Modern web applications typically do not fetch and render new HTML files — they load a single HTML shell, and continually update the DOM inside it (referred to as **single page apps**, or **SPAs**) without navigating users to new addresses on the web. Each new pseudo-webpage is usually called a *view*, and by default, no routing is done.

When an SPA is complex enough, and renders enough unique views, it's important to bring routing functionality into your application. People are used to being able to link to specific pages in an application, travel forward and backward in their navigation history, etc., and their experience suffers when these standard web features are broken. When routing is handled by a client application in this fashion, it is aptly called **client-side routing**.

It's *possible* to make a router using the native capabilities of JavaScript and the browser, but popular, actively developed frameworks have companion libraries that make routing a more intuitive part of the development process.


### Things to consider when using frameworks

Being an effective web developer means using the most appropriate tools for the job. JavaScript frameworks make front-end application development easy, but they are not a silver bullet that will solve all problems. This section talks about some of the things you should consider when using frameworks. Bear in mind that you might not need a framework at all — beware that you don't end up using a framework just for the sake of it.



#### **Familiarity with the tool**

Just like vanilla JavaScript, frameworks take time to learn and have their quirks. Before you decide to use a framework for a project, be sure you have time to learn enough of its features for it to be useful to you rather than it working against you, and be sure that your teammates are comfortable with it as well.


#### **Overengineering**

If your web development project is a personal portfolio with a few pages, and those pages have little or no interactive capability, a framework (and all of its JavaScript) may not be necessary at all. That said, frameworks are not a monolith, and some of them are better-suited to small projects than others.


#### **Larger code base and abstraction**

Frameworks allow you to write more declarative code – and sometimes *less* code overall – by dealing with the DOM interactions for you, behind the scenes. This abstraction is great for your experience as a developer, but it isn't free. In order to translate what you write into DOM changes, frameworks have to run their own code, which in turn makes your final piece of software larger and more computationally expensive to operate.

Some extra code is inevitable, and a framework that supports tree-shaking (removal of any code that isn't actually used in the app during the build process) will allow you to keep your applications small, but this is still a factor you need to keep in mind when considering your app's performance, especially on more network/storage-constrained devices, like mobile phones.

The abstraction of frameworks affects not only your JavaScript, but your relationship with the very nature of the web. No matter how you build for the web, the end result, the layer that your users ultimately interact with, is HTML. Writing your whole application in JavaScript can make you lose sight of HTML and the purpose of its various tags, and lead you to produce an HTML document that is un-semantic and inaccessible. In fact, it's possible to write a fragile application that depends entirely on JavaScript and will not function without it.


### How to choose a framework

Each of the frameworks discussed in this module take different approaches to web application development. Each is regularly improving or changing, and each has its pros and cons. Choosing the right framework is a team- and project-dependent process, and you should do your own research to uncover what suits your needs.

That said, we've identified a few questions you can ask in order to research your options more effectively:

1. The size of the project and its business goals
2. Availability of Learning Resources
3. Development team
4. Does the framework have a strong community and good docs (and other support) available?
5. Web optimization, etc.



## Getting started with React

In this article we will say hello to React. We'll discover a little bit of detail about its background and use cases, set up a basic React toolchain on our local computer, and create and play with a simple starter app — learning a bit about how React works in the process.


| Prerequisites: | Objective: |
| - | - |
| Familiarity with the core HTML, CSS, and JavaScript languages, knowledge of the terminal/command line.<br />React uses an HTML-in-JavaScript syntax called JSX (JavaScript and XML).<br />Familiarity with both HTML and JavaScript will help you to learn JSX, and better identify whether bugs in your application are related to JavaScript or to the more specific domain of React. | To set up a local React development environment, create a start app, and understand the basics of how it works |


### Hello React

As its official tagline states, [React](https://reactjs.org/) is **a library** for building user interfaces. React is **not a framework** – it's not even exclusive to the web. It's used with other libraries to render to certain environments.

> For instance, [React Native](https://reactnative.dev/) can be used to build mobile applications; [React 360](https://facebook.github.io/react-360/) can be used to build virtual reality applications; and there are other possibilities besides.

To build for the web, developers use React in tandem with [ReactDOM](https://reactjs.org/docs/react-dom.html). React and ReactDOM are often discussed in the same spaces as — and utilized to solve the same problems as — other true web development frameworks. When we refer to React as a "framework", we’re working with that colloquial understanding.

React's primary goal is to minimize the bugs that occur when developers are building UIs. It does this through the use of components — self-contained, logical pieces of code that describe a portion of the user interface. These components can be composed together to create a full UI, and React abstracts away much of the rendering work, leaving you to concentrate on the UI design.


### Use cases

Unlike the other frameworks covered in this module, React does not enforce strict rules around code conventions or file organization. This allows teams to set conventions that work best for them, and to adopt React in any way they would like to. React can handle a single button, a few pieces of an interface, or an app's entire user interface.

While React *can* be used for [small pieces of an interface](https://reactjs.org/docs/add-react-to-a-website.html), it's not as easy to "drop into" an application as a library like jQuery, or even a framework like Vue — it is more approachable when you build your entire app with React.

In addition, many of the developer-experience benefits of a React app, such as writing interfaces with JSX, require a compilation process. Adding a compiler like Babel to a website makes the code on it run slowly, so developers often set up such tooling with a build step. React arguably has a heavy tooling requirement, but it can be learned.

This article is going to focus on the use case of using React to render the entire user interface of an application, using tooling provided by Facebook’s own [create-react-app](https://create-react-app.dev/) tool.


### How does React use JavaScript?

React utilizes features of modern JavaScript for many of its patterns. Its biggest departure from JavaScript comes with the use of [JSX](https://reactjs.org/docs/introducing-jsx.html) syntax. JSX extends JavaScript's syntax so that HTML-like code can live alongside it. For example:

```js
const heading = <h1>Mozilla Developer Network</h1>;
```

This heading constant is known as a **JSX expression**. React can use it to render that `<h1>` tag in our app.

Suppose we wanted to wrap our heading in a `<header>` tag, for semantic reasons? The JSX approach allows us to nest our elements within each other, just like we do with HTML:

```js
const header = (
  <header>
    <h1>Mozilla Developer Network</h1>
  </header>
);
```

> **Note**: The parentheses in the previous snippet aren't unique to JSX, and don’t have any effect on your application. They're a signal to you (and your computer) that the multiple lines of code inside are part of the same expression. You could just as well write the header expression like this:
>
> ```js
> const header = <header>
>     <h1>Mozilla Developer Network</h1>
> </header>
> ```
>
> However, this looks kind of awkward, because the `<header>` tag that starts the expression is not indented to the same position as its corresponding closing tag.



Of course, your browser can't read JSX without help. When compiled (using a tool like [Babel](https://babeljs.io/) or [Parcel](https://parceljs.org/)), our header expression would look like this:

```
const header = React.createElement("header", null,
  React.createElement("h1", null, "Mozilla Developer Network")
);
```

It's *possible* to skip the compilation step and use `React.createElement()` to write your UI yourself. In doing this, however, you lose the declarative benefit of JSX, and your code becomes harder to read. Compilation is an extra step in the development process, but many developers in the React community think that the readability of JSX is worthwhile. Plus, popular tooling makes the JSX-to-JavaScript compilation part of its setup process. You don't have to configure compilation yourself unless you want to.

Because JSX is a blend of HTML and JavaScript, some developers find it intuitive. Others say that its blended nature makes it confusing. Once you're comfortable with it, however, it will allow you to build user interfaces more quickly and intuitively, and allow others to better understand your codebase at a glance.

To read more about JSX, check out the React team's [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html) article.


### Setting up your first React to a Website (CDN)

There are many ways to use React, but we're going to use the command-line interface (CLI) tool `create-react-app`, as mentioned earlier, which expedites the process of developing a React application by installing some packages and creating some files for you, handling the tooling described above.

It's possible to [add React to a website without create-react-app](https://reactjs.org/docs/add-react-to-a-website.html) by copying some `<script>` elements into an HTML file, but the create-react-app CLI is a common starting point for React applications. Using it will allow you spend more time building your app, and less time fussing with setup.


#### **Requirements**

In order to use create-react-app, you need to have [Node.js](https://nodejs.org/en/) installed. It's recommended that you use the long-term support (LTS) version. Node includes npm (the node package manager), and npx (the node package runner).

You may also use the Yarn package manager as an alternative, but we'll assume you are using npm in this set of tutorials. 

> If you're using Windows, you will need to install some software to give you parity with Unix/macOS terminal in order to use the terminal commands mentioned in this tutorial. **Gitbash** (which comes as part of the [git for Windows toolset](https://gitforwindows.org/)) or **[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about)** (**WSL**) are both suitable.

Also bear in mind that React and ReactDOM produce apps that only work on a fairly modern set of browsers — IE9+ by way of some polyfills. It is recommended that you use a modern browser like Firefox, Microsoft Edge, Safari, or Chrome when working through these tutorials.


#### [Add React to a Website](https://reactjs.org/docs/add-react-to-a-website.html)


## References

[Introduction to client-side frameworks :MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/introduction)

[Getting started with React :MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)


## Recomendations

[Getting Started :ReactJS.org](https://reactjs.org/docs/getting-started.html)
