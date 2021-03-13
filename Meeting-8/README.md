# Meeting 8

განსახილველი თემები:

* What is npm?

  * package.json (+npm init)
  * npm scripts
  * dependencies vs devDependencies
  * package-lock.json
  * npm install
  * npm ci
  * npm audit
* Introducing Express

  * Where did Node and Express come from?
  * Is Express opinionated?
  * What does Express code look like?
  * Helloworld Express
  * Importing and creating modules
* nodemon

  * Installation
  * Usage


## What is NPM

NPM – or "Node Package Manager" – is the default package manager for JavaScript's runtime Node.js.

A **Package manager** is a collection of software tools which keeps track of what software is installed on your computer, and allows you to easily install new software, upgrade software to newer versions, or remove software that you previously installed

NPM consists of two main parts:

* a CLI (command-line interface) tool for publishing and downloading packages, and
* an [online repository](https://www.npmjs.com/) that hosts JavaScript packages

For a more visual explanation, we can think of the repository [npmjs.com](https://npmjs.com/) as a fulfillment center that receives packages of goods from sellers (npm package authors) and distributes these goods to buyers (npm package users).

To facilitate this process, the [npmjs.com](https://npmjs.com/) fulfillment center employs an army of hardworking wombats (npm CLI) who will be assigned as personal assistants to each individual [npmjs.com](https://npmjs.com/) customer. So dependencies are delivered to JavaScript developers like this:

![npm-1](https://www.freecodecamp.org/news/content/images/2020/06/wombat-install.png)

and the process of publishing a package for your JS mates would be something like this:

![npm-2](https://www.freecodecamp.org/news/content/images/2020/06/wombat-publish.png)

Let's look at how this army of wombats assist developers who want to use JavaScript packages in their projects. We'll also see how they help open-source wizards get their cool libraries out into the world.

### package.json

Every project in JavaScript – whether it's Node.js or a browser application – can be scoped as an npm package with its own package information and its `package.json` job to describe the project.

We can think of `package.json` as stamped labels on those npm good boxes that our army of Wombats delivers around.

`package.json` will be generated when `npm init` is run to initialise a JavaScript/Node.js project, with these basic metadata provided by developers:

* `name`: the name of your JavaScript library/project
* `version`: the version of your project. Often times, for application development, this field is often neglected as there's no apparent need for versioning opensource libraies. But still, it can come handy as a source of the deployment's version.
* `description`: the project's description
* `license`: the project's license

```json
{
  "name": "Meeting-8",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Daniel Barbakadze",
  "license": "ISC"
}

```

Every NODE JS project should have this file in the root directory to describe its metadata in plain json object format. Why this json filename is package? It is because every Node Js platform manages every features as package.

Does package.json helps in the the execution of your project? - No.

Then who uses this file? NPM (Node Package Manager) uses this package.json file information about Node JS Application information or Node JS Package details.

When we need any package(need to install some dependencies) then we type

**npm install — save [dependency name]** and **npm install — save -dev [dev dependency name].**

By doing so it will automatically be added in the package.json file.

We push the project on any version control like git, then we don’t push the node_module folder. Because that will be taken care by package.json. Whosoever wants to run the project then he should clone that project run **npm install **command, then all the dependencies and dev dependencies will be install locally for your project, and a node_module named folder will also be created. There is a script section in it, it is very powerful one can use it as a replacement of task runner for his project. This is the power of package.jso


### npm scripts

`package.json` also supports a `scripts` property that can be defined to run command-line tools that are installed in the project's local context. For example, the `scripts` portion of an npm project can look something like this:

```json
{
  "scripts": {
    "build": "tsc",
    "format": "prettier --write **/*.ts",
    "format-check": "prettier --check **/*.ts",
    "lint": "eslint src/**/*.ts",
    "pack": "ncc build",
    "test": "jest",
    "all": "npm run build && npm run format && npm run lint && npm run pack && npm test"
  }
}
```

with `eslint`, `prettier`, `ncc`, `jest` not necessarily installed as global executables but rather as local to your project inside `node_modules/.bin/`.

The recent introduction of [npx](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/) allows us to run these `node_modules` project-scoped commands just like a globally installed program by prefixing `npx ...` (i.e. `npx prettier --write **/*.ts`).


### dependencies vs devDependencies

These two come in form of key-value objects with npm libraries' names as the key and their [semantic-formatted](https://semver.org/) versions as the value. (This is an example from [Github's TypeScript Action template](https://github.com/actions/typescript-action))

```json
{
  "dependencies": {
    "@actions/core": "^1.2.3",
    "@actions/github": "^2.1.1"
  },
  "devDependencies": {
    "@types/jest": "^25.1.4",
    "@types/node": "^13.9.0",
    "@typescript-eslint/parser": "^2.22.0",
    "@zeit/ncc": "^0.21.1",
    "eslint": "^6.8.0",
    "eslint-plugin-github": "^3.4.1",
    "eslint-plugin-jest": "^23.8.2",
    "jest": "^25.1.0",
    "jest-circus": "^25.1.0",
    "js-yaml": "^3.13.1",
    "prettier": "^1.19.1",
    "ts-jest": "^25.2.1",
    "typescript": "^3.8.3"
  }
}
```

These dependencies are installed via the `npm install` command with `--save` and `--save-dev` flags. They're meant to be used for production and development/test environments respectively.


Meanwhile, it's important to understand the possible signs that come before the semantic versions (assuming you have read up on `major.minor.patch` model of [semver](https://semver.org/)):

* `^`: latest minor release. For example, a `^1.0.4` specification might install version `1.3.0` if that's the latest minor version in the `1` major series.
* `~`: latest patch release. In the same way as `^` for minor releases, `~1.0.4` specification might install version `1.0.7` if that's the latest minor version in the `1.0` minor series.

All of these exact package versions will be documented in a generated `package-lock.json` file.


### package-lock.json

This file describes the exact versions of the dependencies used in an npm JavaScript project. If `package.json` is a generic descriptive label, `package-lock.json` is an ingredient table.

And just like how we don't usually read the ingredient table of a product (unless you are too bored or need to know), `package-lock.json` is not meant to be read line-by-line by developers (unless we're desperate to resolve "works in my machine" issues).

`package-lock.json` is usually generated by the `npm install` command, and is also read by our NPM CLI tool to ensure reproduction of build environments for the project with `npm ci`.


### npm install

This is the most commonly used command as we develop JavaScript/Node.js applications nowadays.

By default, `npm install <package-name>` will install the latest version of a package with the `^` version sign. An `npm install` within the context of an npm project will download packages into the project's `node_modules` folder according to `package.json` specifications, upgrading the package version (and in turn regenerating `package-lock.json`) wherever it can based on `^` and `~` version matching.

You can specify a global flag `-g` if you want to install a package in the global context which you can use anywhere across your machine.

npm has made installing JavaScript packages so easy that this command is often used incorrectly. This results in npm being the butt of a lot of programmers' jokes like these:

![memes](https://www.freecodecamp.org/news/content/images/2020/06/npm-jokes.png)

This is where the `--production` flag comes to the rescue! In the previous section, we discussed `dependencies` and `devDependencies` meant for usage in production and development/test environment respectively. This `--production` flag is how the differences in `node_modules` are made.

By attaching this flag to the `npm install` command, we will only install packages from `dependencies`, thus drastically reducing the size of our `node_modules` to whatever is absolutely necessary for our applications to be up and running.

Just like how as boy and girl scouts we didn't bring lemon squeezers to our lemonade booth, we shouldn't bring `devDependencies` to production!


### npm ci

So if `npm install --production` is optimal for a production environment, must there be a command that's optimal for my local development, testing setup?

The answer is `npm ci`.

Just like how if `package-lock.json` doesn't already exist in the project it's generated whenever `npm install` is called, `npm ci` consumes this file to download the exact version of each individual package that the project depends on.

This is how we can make sure that the our project's context stays exactly the same across different machines, whether it's our laptops used for development or CI (Continuous Integration) build environments like Github Actions.


### npm audit

`npm audit` gives developers information about the vulnerabilities and whether there're versions with remediations to upgrade to. For example,

![npm-audit](https://www.freecodecamp.org/news/content/images/2020/06/npm-audit-result.png)

If the remediations are available in the next non-breaking version upgrades, `npm audit fix` can be used to upgrade the affected dependencies' versions automatically.


## Introducing Express

Express is the most popular *Node* web framework, and is the underlying library for a number of other popular Node web frameworks.

Features of Express.js

#### 1. Faster Server side development

Express.js provides many commonly used features of Node.js in the form of functions that can be readily used anywhere in the program. This removes the need to code for several hours and thus saves time.

#### 2. Middleware

Middleware is a part of the program that has access to the database, client request, and the other middlewares. It is mainly responsible for the systematic organization of different functions of Express.js.

#### 3. Routing

ExpressJS provides a highly advanced routing mechanism which helps to preserve the state of the webpage with the help of their URLs.

#### 4. Templating

ExpressJS provides templating engines that allow the developers to build dynamic content on the web pages by building HTML templates on the server-side.

#### 5. Debugging

Debugging is crucial for the successful development of web applications. ExpressJS makes debugging easier by providing a debugging mechanism that has the ability to pinpoint the exact part of the web application which has bugs.

While *Express* itself is fairly minimalist, developers have created compatible middleware packages to address almost any web development problem. There are libraries to work with cookies, sessions, user logins, URL parameters, `POST` data, security headers, and *many* more. You can find a list of middleware packages maintained by the Express team at [Express Middleware](http://expressjs.com/en/resources/middleware.html) (along with a list of some popular 3rd party packages).


### Where did Node and Express come from?

* Node was initially released, for Linux only, in 2009.
* The NPM package manager was released in 2010, and native Windows support was added in 2012.
* At time of writing the current LTS release is Node v12.18.4 while the latest release is Node 14.13.0.
* Express was initially released in November 2010.

This is a tiny snapshot of a rich history.


### Is Express opinionated?

Web frameworks often refer to themselves as "opinionated" or "unopinionated".

Opinionated frameworks are those with opinions about the "right way" to handle any particular task. They often support rapid development *in a particular domain* (solving problems of a particular type) because the right way to do anything is usually well-understood and well-documented. However they can be less flexible at solving problems outside their main domain, and tend to offer fewer choices for what components and approaches they can use.

Unopinionated frameworks, by contrast, have far fewer restrictions on the best way to glue components together to achieve a goal, or even what components should be used. They make it easier for developers to use the most suitable tools to complete a particular task, albeit at the cost that you need to find those components yourself.

Express is unopinionated. You can insert almost any compatible middleware you like into the request handling chain, in almost any order you like. You can structure the app in one file or multiple files, and using any directory structure. You may sometimes feel that you have too many choices!


### What does Express code look like?

Express provides methods to specify what function is called for a particular HTTP verb (`GET`, `POST`, `SET`, etc.) and URL pattern ("Route"), and methods to specify what template ("view") engine is used, where template files are located, and what template to use to render a response. You can use Express middleware to add support for cookies, sessions, and users, getting `POST`/`GET` parameters, etc. You can use any database mechanism supported by Node (Express does not define any database-related behavior).



### Helloworld Express

First lets consider the standard Express [Hello World](https://expressjs.com/en/starter/hello-world.html) example (we discuss each part of this below, and in the following sections).

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
```

If you have Node and Express already installed, you can save this code in a text file called **app.js** and run it in a bash command prompt by calling:

```bash
node ./app.js
```

The first two lines `require()` (import) the express module and create an [Express application](https://expressjs.com/en/4x/api.html#app). This object, which is traditionally named `app`, has methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and modifying [application settings](https://expressjs.com/en/4x/api.html#app.settings.table) that control how the application behaves (e.g. the environment mode, whether route definitions are case sensitive, etc.)

The middle part of the code (the three lines starting with `app.get`) shows a *route definition*. The `app.get()` method specifies a callback function that will be invoked whenever there is an HTTP `GET` request with a path (`'/'`) relative to the site root. The callback function takes a request and a response object as arguments, and calls `send()` on the response to return the string "Hello World!"

The final block starts up the server on a specified port ('3000') and prints a log comment to the console. With the server running, you could go to `localhost:3000` in your browser to see the example response returned.



### Importing and creating modules

A module is a JavaScript library/file that you can import into other code using Node's `require()` function. *Express* itself is a module, as are the middleware and database libraries that we use in our *Express* applications.

The code below shows how we import a module by name, using the *Express* framework as an example. First we invoke the `require()` function, specifying the name of the module as a string (`'express'`), and calling the returned object to create an [Express application](https://expressjs.com/en/4x/api.html#app). We can then access the properties and functions of the application object.

```js
const express = require('express');
const app = express();
```

You can also create your own modules that can be imported in the same way.



To make objects available outside of a module you just need to expose them as additional properties on the `exports` object. For example, the **square.js** module below is a file that exports `area()` and `perimeter()` methods:

```js
exports.area = function(width) { return width * width; };
exports.perimeter = function(width) { return 4 * width; };
```

We can import this module using `require()`, and then call the exported method(s) as shown:

```js
const square = require('./square');
// Here we require() the name of the file without the (optional) .js file extension
console.log('The area of a square with a width of 4 is ' + square.area(4));
```

If you want to export a complete object in one assignment instead of building it one property at a time, assign it to `module.exports` as shown below (you can also do this to make the root of the exports object a constructor or other function):

```js
module.exports = {
  area: function(width) {
    return width * width;
  },

  perimeter: function(width) {
    return 4 * width;
  }
};
```

> **Note:**
>
> You can think of `exports` as a [shortcut](https://nodejs.org/api/modules.html#modules_exports_shortcut) to `module.exports` within a given module.
>
> In fact, `exports` is just a variable that gets initialized to the value of `module.exports` before the module is evaluated.
>
> That value is a reference to an object (empty object in this case). This means that `exports` holds a reference to the same object referenced by `module.exports`.
>
> It also means that by assigning another value to `exports` it's no longer bound to `module.exports`.


## nodemon

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

nodemon does **not** require *any* additional changes to your code or method of development. nodemon is a replacement wrapper for `node`. To use `nodemon`, replace the word `node` on the command line when executing your script.


### Installation

Execute in terminal:

```shell
npm install -g nodemon
```

And nodemon will be installed globally to your system path.

You can also install nodemon as a development dependency:

```shell
npm install --save-dev nodemon
```

With a local installation, nodemon will not be available in your system path. Instead, the local installation of nodemon can be run by calling it from within an npm script (such as `npm start`) or using `npx nodemon`.


### Usage

nodemon wraps your application, so you can pass all the arguments you would normally pass to your app:

```shell
nodemon [your node app]
```

for our example:

```shell
nodemon ./app.js
```


## References

[What is npm? A Node Package Manager Tutorial for Beginners :FreeCodeCamp](https://www.freecodecamp.org/news/what-is-npm-a-node-package-manager-tutorial-for-beginners/)

[Package.Json in node js :Medium](https://medium.com/@riteeksrivastava/package-json-in-node-js-c01df5eed230)

[Docs :ExpressJs](https://expressjs.com/en/4x/api.html#express.json)


## Recomendations

[npm vs npx :FreeCodeCamp](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)

[What is ExpressJS :BesantTechnologies](https://www.besanttechnologies.com/what-is-expressjs)
