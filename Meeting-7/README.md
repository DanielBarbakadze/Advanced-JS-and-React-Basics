# Meeting 7

განსახილველი თემები:

* How does the Internet work?
* How the Web works?
* What is the difference between webpage, website, web server, and search engine?
* What is a web server?
* Introducing Node
  * Your first running web server


## How does the Internet work?

The **Internet** is the backbone of the Web, the technical infrastructure that makes the Web possible. At its most basic, the Internet is a large network of computers which communicate all together.


### A simple network

When two computers need to communicate, you have to link them, either physically (usually with an [Ethernet cable](https://en.wikipedia.org/wiki/Ethernet_crossover_cable)) or wirelessly (for example with [WiFi](https://en.wikipedia.org/wiki/WiFi) or [Bluetooth](https://en.wikipedia.org/wiki/Bluetooth) systems). All modern computers can sustain any of those connections.

> **Note:**
>
> In this examples we will only talk about physical cables, but wireless networks work the same.

![simple-network](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-1.png)

Such a network is not limited to two computers. You can connect as many computers as you wish. But it gets complicated quickly. If you're trying to connect, say, ten computers, you need 45 cables, with nine plugs per computer!

![simple-network-2](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-2.png)

To solve this problem, each computer on a network is connected to a special tiny computer called a *router*.

This *router* has only one job: like a signaler at a railway station, **it makes sure that a message sent from a given computer arrives at the right destination computer.** To send a message to computer B, computer A must send the message to the router, which in turn forwards the message to computer B and makes sure the message is not delivered to computer C.

Once we add a router to the system, our network of 10 computers only requires 10 cables: a single plug for each computer and a router with 10 plugs.

![simple-network-3](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-3.png)


### A network of networks

So far so good. But what about connecting hundreds, thousands, billions of computers? Of course a single *router* can't scale that far, but, if you read carefully, we said that a *router* is a computer like any other, so what keeps us from connecting two *routers* together? Nothing, so let's do that.

![network-of-networks](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-4.png)

By connecting computers to routers, then routers to routers, we are able to scale infinitely.

![network-of-networks-2](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-5.png)

Such a network comes very close to what we call the Internet, but we're missing something. We built that network for our own purposes. There are other networks out there: your friends, your neighbors, anyone can have their own network of computers. But it's not really possible to set cables up between your house and the rest of the world, so how can you handle this?

Well, there are already cables linked to your house, for example, electric power and telephone. The telephone infrastructure already connects your house with anyone in the world so it is the perfect wire we need.

To connect our network to the telephone infrastructure, we need a special piece of equipment called a *modem*. This *modem* turns the information from our network into information manageable by the telephone infrastructure and vice versa.

![modem](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-6.png)

So we are connected to the telephone infrastructure. The next step is to send the messages from our network to the network we want to reach. To do that, we will connect our network to an Internet Service Provider (ISP). An ISP is a company that manages some special *routers* that are all linked together and can also access other ISPs' routers. So the message from our network is carried through the network of ISP networks to the destination network. The Internet consists of this whole infrastructure of networks.

![ISP](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-7.png)


### Finding computers

If you want to send a message to a computer, you have to specify which one. Thus any computer linked to a network has a unique address that identifies it, called an "IP address" (where IP stands for *Internet Protocol*). It's an address made of a series of four numbers separated by dots, for example: `192.168.2.10`.

That's perfectly fine for computers, but we human beings have a hard time remembering that sort of address. To make things easier, we can alias an IP address with a human readable name called a **domain name**. For example (at the time of writing; IP addresses can change) `google.com` is the domain name used on top of the IP address `173.194.121.32`. So using the domain name is the easiest way for us to reach a computer over the Internet.

![google-ip-dn](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/dns-ip.png)


### Internet and the web

As you might notice, when we browse the Web with a Web browser, we usually use the domain name to reach a website. Does that mean the Internet and the Web are the same thing? It's not that simple.

As we saw, the Internet is a technical infrastructure which allows billions of computers to be connected all together. Among those computers, some computers (called *Web servers*) can send messages intelligible to web browsers.

The **Internet** is an infrastructure, whereas the **Web** is a service built on top of the infrastructure.


## How the Web works

*How the web works* provides a simplified view of what happens when you view a webpage in a web browser on your computer or phone.

Computers connected to the web are called **clients** and **servers**. A simplified diagram of how they interact might look like this:

![client-to-server](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works/simple-client-server.png)


* Clients are the typical web user's internet-connected devices (for example, your computer connected to your Wi-Fi, or your phone connected to your mobile network) and web-accessing software available on those devices (usually a web browser like Firefox or Chrome).
* Servers are computers that store webpages, sites, or apps. When a client device wants to access a webpage, a copy of the webpage is downloaded from the server onto the client machine to be displayed in the user's web browser.

> **Note:**
>
> It's highly recomended to learn this topic deeply. [(one good resource)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)


## What is the difference between webpage, website, web server, and search engine?

It's easy to confuse these terms sometimes since they refer to related but different functionalities.



#### web page

**A document** which can be displayed in a web browser (such as Firefox, Google Chrome, etc). These are also often called just "pages."

#### website

**A collection of web pages** which are grouped together and usually connected together in various ways. Often called a "web site" or a "site."

#### web server

**A computer** that hosts a website on the Internet.

#### search engine

A web **service** that helps you find other web pages, such as Google, Bing, Yahoo, or DuckDuckGo. Search engines are normally accessed through a web browser.


Let's look at a simple analogy — a public library. This is what you would generally do when visiting a library:

1. Find a search index and look for the title of the book you want.
2. Make a note of the catalog number of the book.
3. Go to the particular section containing the book, find the right catalog number, and get the book.


Let's compare the library with a web server:

* The library is like a web server. It has several sections, which is similar to a web server hosting multiple websites.
* The different sections (science, math, history, etc.) in the library are like websites. Each section is like a unique website (two sections do not contain same books).
* The books in each section are like webpages. One website may have several webpages, e.g., the Science section (the website) will have books on heat, sound, thermodynamics, statics, etc. (the webpages). Webpages can each be found at a unique location (URL).
* The search index is like the search engine. Each book has its own unique location in the library (two books cannot be kept at the same place) which is specified by the catalog number.


## What is a web server?

The term *web server* can refer to hardware or software, or both of them working together.

1. On the hardware side, a web server is a computer that stores web server software and a website's component files. (for example, HTML documents, images, CSS stylesheets, and JavaScript files) A web server connects to the Internet and supports physical data interchange with other devices connected to the web.
2. On the software side, a web server includes several parts that control how web users access hosted files. At a minimum, this is an *HTTP server*. An HTTP server is software that understands [URLs](https://developer.mozilla.org/en-US/docs/Glossary/URL) (web addresses) and [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) (the protocol your browser uses to view webpages). An HTTP server can be accessed through the domain names of the websites it stores, and it delivers the content of these hosted websites to the end user's device.

At the most basic level, whenever a browser needs a file that is hosted on a web server, the browser requests the file via HTTP. When the request reaches the correct (hardware) web server, the (software) *HTTP server* accepts the request, finds the requested document, and sends it back to the browser, also through HTTP. (If the server doesn't find the requested document, it returns a [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) response instead.)

![web-server-to-browser](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server/web-server.svg)

To publish a website, you need either a static or a dynamic web server.

A **static web server**, or stack, consists of a computer (hardware) with an HTTP server (software). We call it "static" because the server sends its hosted files as-is to your browser.

A **dynamic web server** consists of a static web server plus extra software, most commonly an *application server* and a *database*. We call it "dynamic" because the application server updates the hosted files before sending content to your browser via the HTTP server.

For example, to produce the final webpages you see in the browser, the application server might fill an HTML template with content from a database. Sites like MDN or Wikipedia have thousands of webpages. Typically, these kinds of sites are composed of only a few HTML templates and a giant database, rather than thousands of static HTML documents. This setup makes it easier to maintain and deliver the content.


### Deeper dive

To review: to fetch a webpage, your browser sends a request to the web server, which searches for the requested file in its own storage space. Upon finding the file, the server reads it, processes it as-needed, and sends it to the browser. Let's look at those steps in more detail.


### Hosting files

First, a web server has to store the website's files, namely all HTML documents and their related assets (including images, CSS stylesheets, JavaScript files, fonts, and video).

Technically, you could host all those files on your own computer, but it's far more convenient to store files all on a dedicated web server because:

* A dedicated web server is typically more available. (up and running)
* Excusing downtime and systems troubles, a dedicated web server is always connected to the Internet.
* A dedicated web server can have the same IP address all the time. This is known as a *dedicated IP address*. (not all [ISPs](https://developer.mozilla.org/en-US/docs/Glossary/ISP) provide a fixed IP address for home lines)
* A dedicated web server is typically maintained by a third-party.

For all these reasons, finding a good hosting provider is a key part of building your website.

Once you have web hosting service, you must upload your files to your web server.


### Communicating through HTTP

Second, a web server provides support for [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) (**H**yper**t**ext **T**ransfer **P**rotocol). As its name implies, HTTP specifies how to transfer hypertext (linked web documents) between two computers.

A [Protocol](https://developer.mozilla.org/en-US/docs/Glossary/Protocol) is a set of rules for communication between two computers. HTTP is a textual, stateless protocol.

#### Textual

All commands are plain-text and human-readable.

#### Stateless

Neither the server nor the client remember previous communications. For example, relying on HTTP alone, a server **can't remember** a password you typed or remember your progress on an incomplete transaction. You need an application server for tasks like that. (We'll cover that sort of technology in other articles.)


HTTP provides clear rules for how a client and server communicate.

* Only *clients* can make HTTP requests, and then only to *servers*. Servers can only *respond* to a *client*'s HTTP request.
* When requesting a file via HTTP, clients must provide the file's [URL](https://developer.mozilla.org/en-US/docs/Glossary/URL).
* The web server *must answer* every HTTP request, at least with an error message.


On a web server, the HTTP server is responsible for processing and answering incoming requests.

1. Upon receiving a request, an HTTP server first checks if the requested URL matches an existing file.
2. If so, the web server sends the file content back to the browser. If not, an application server builds the necessary file.
3. If neither process is possible, the web server returns an error message to the browser, most commonly [`404 Not Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404).


### Static vs dynamic content

Roughly speaking, a server can serve either static or dynamic content. Remember that the term *static* means "served as-is". Static websites are the easiest to set up.

The term *dynamic* means that the server processes the content or even generates it on the fly from a database. This approach provides more flexibility, but the technical stack is more complex, making it dramatically more challenging to build a website.

There are so many application server technologies that it's difficult to suggest a particular one. Some application servers cater to specific website categories like blogs, wikis, or eCommerce; others are more generic.

If you're building a dynamic website, take the time to choose technology that fits your needs. Unless you want to learn web server programming, you don't need to create your own application server. That's just reinventing the wheel.


## Introducing Node

[Node](https://nodejs.org/) (or more formally *Node.js*) is an open-source, cross-platform runtime environment that allows developers to create all kinds of server-side tools and applications in JavaScript. The runtime is intended for use outside of a browser context (i.e. running directly on a computer or server OS).


From a web server development perspective Node has a number of benefits:

* Great performance! Node was designed to optimize throughput and scalability in web applications and is a good solution for many common web-development problems (e.g. real-time web applications).
* Code is written in "plain old JavaScript", which means that less time is spent dealing with "context shift" between languages when you're writing both client-side and server-side code.
* JavaScript is a relatively new programming language and benefits from improvements in language design when compared to other traditional web-server languages (e.g. Python, PHP, etc.) Many other new and popular languages compile/convert into JavaScript so you can also use TypeScript, CoffeeScript, ClojureScript, Scala, LiveScript, etc.
* The node package manager (NPM) provides access to hundreds of thousands of reusable packages. It also has best-in-class dependency resolution and can also be used to automate most of the build toolchain.
* Node.js is portable. It is available on Microsoft Windows, macOS, Linux, Solaris, FreeBSD, OpenBSD, WebOS, and NonStop OS. Furthermore, it is well-supported by many web hosting providers, that often provide specific infrastructure and documentation for hosting Node sites.
* It has a very active third party ecosystem and developer community, with lots of people who are willing to help.

You can use Node.js to create a simple web server using the Node HTTP package.


> Note:
>
> [Download](https://nodejs.org/en/download/) and Install Node on your local machine before continue reading.


### Hello Node.js (Your first running web server)

The following example creates a web server that listens for any kind of HTTP request on the URL `http://127.0.0.1:8080/` — when a request is received, the script will respond with the string: "Hello World". If you have already installed node, you can follow these steps to try out the example:

1. Open Terminal (on Windows, open the command line utility)
2. Create the folder where you want to save the program, for example, `test-node` and then enter it by entering the following command into your terminal:
   ```bash
   cd test-node
   ```
3. Create a file called `hello.js` that contains
   ```js
   // Load HTTP module
   const http = require("http");

   const hostname = "127.0.0.1";
   const port = 8080;

   // Create HTTP server
   const server = http.createServer((req, res) => {

      // Set the response HTTP header with HTTP status and Content type
      res.writeHead(200, {'Content-Type': 'text/plain'});

      // Send the response body "Hello World"
      res.end('Hello World\n');
   });

   // Prints a log once the server starts listening
   server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
   })
   ```
4. Save the file in the folder you created above.
5. Go back to the terminal and type the following command:
   ```bash
   node hello.js
   ```

Finally, navigate to `http://localhost:8000` in your web browser; you should see the text "**Hello World**" in the upper left of an otherwise empty web page.


თუ გვინდა ჩვენს სერვერს დავუკავშირდეთ სხვა მოწყობილობიდან, რომელიც ამავე ქსელშია ჩართული, სიმარტივისთვის ამ ეტაპისთვის შევცვალოთ hostname ჩვენი მოწყობილობის ლოკალური IP მისამართით ამ ქსელში.

on Linux & Mac

```bash
ifconfig 
```

inet ის გასწვრივ ჩვენი ლოკალური მისამართი (იწყება 192.168./--/./--/).

on Windows

```bash
ipconfig
```

IPv4 Address.


გავუშვათ სერვერი თავიდან და შევამოწმოთ სხვა, ამ ქსელში ჩართული, მოწყობილობიდან წვდომა.


ტექსტის მაგივრად დავაბრუნოთ html დოკუმენტი.

```js
const http = require("http");
const fs = require("fs");
const port = 8080;

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("./index.html", function (error, data) { // index.html must be in the same directory
    if (error) {
      res.writeHead(404);
      res.write("Error: File Not Found");
    } else {
      res.write(data);
    }
    res.end();
  });
});

server.listen(port, function (error) {
  if (error) console.log("Something went wrong", error);
  else console.log("Server is listening on port " + port);
});

```


### Web Frameworks

Other common web-development tasks are not directly supported by Node itself. If you want to add specific handling for different HTTP verbs (e.g. `GET`, `POST`, `DELETE`, etc.), separately handle requests at different URL paths ("routes"), serve static files, or use templates to dynamically create the response, Node won't be of much use on its own. You will either need to write the code yourself, or you can avoid reinventing the wheel and use a web framework! (e.i Express.Js)


## References

[How does the internet work :MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work)

[How the Web works :MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)

[What is the difference between webpage, website, web server, and search engine? :MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines)

[What is a web server? :MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server)

[Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#introducing_node)


## Recomendations

[Server-side website programming first steps :MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps)

[Client-Server Overview :MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview)

[Node.js Tutorials :w3Schools](https://www.w3schools.com/nodejs/nodejs_get_started.asp)
