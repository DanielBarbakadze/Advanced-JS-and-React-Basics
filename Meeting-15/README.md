# Meeting 15

## Table of Contents

- [Meeting 15](#meeting-15)
  - [Table of Contents](#table-of-contents)
  - [Instalation](#instalation)
  - [Basic setup](#basic-setup)
  - [Link component](#link-component)
  - [NavLink](#navlink)
  - [useNavigate()](#usenavigate)
  - [Grouping Routes](#grouping-routes)
  - [Dynamic routes](#dynamic-routes)
  - [useLocation()](#uselocation)
  - [Recomendations](#recomendations)

React Router DOM is a collection of navigational components that compose declaratively with your application. It provides the components and APIs necessary to navigate through application screens, build dynamic navigation elements, and keep the URL in sync with what's being viewed on the page. It also provides an intuitive programming model for integrating with other libraries and frameworks, including React Navigation and Redux.

## Instalation

In your terminal run:

```
npm install react-router-dom
# or
yarn add react-router-dom
```

## Basic setup

Import BrowserRouter, Routes, Route in your index.js and App.js files.

index.js:

```
import {BrowserRouter} from 'react-router-dom'

root.render(
  <StrictMode>
  	<BrowserRouter>
	    <App />
	<BrowserRouter/>
  </StrictMode>
);
```

App.js:

```

import {Routes, Route} from 'react-router-dom'

export default function App() {
  return (
	<Routes>
		<Route path="/" element={<Home />}>
		<Route path="/products" element={<Products />}>
		<Route path="/admin/dashboard" element={<Dashboard />}>
	</Routes>
  );
}
```

**Takeaways**

- Singla Page Application (SPA) is a type of modern web app where we need to download the static asets for once.
- SPA utilises client-side routing for page navigation.
- React router is a client-side routing library for React applications.
- We use BrowserRouter, Routes and Route to register pages in our app.

<Route> should be the ONLY children of <Routes>

## Link component

The Link component in React Router DOM is used to link different pages in a single page application. It is used to navigate between different routes in the application.

Building a single page application means that we cant's use <a> tag to do our in-app navigation because the moment we click on an <a> tag the whole page will refresh and that defeats the purpose of a single page application.

React router has provided a drop-in replacement for the anchor tag and it is called the <Link> component.

<Link> components accept a to prop which is a string indicating the path to the page you wish to link to. The Link component also accepts other props such as className and style.

Example:

```javascript
import {Link} from "react-router-dom"

<nav>
	<Link to="/">Home<Link>
	<Link to="/products">Products</Link>
<nav>
```

**Takeaways**

- We shouldn't use anchor tags for in-app navigation in a SPA, because clicking on an anchor tag will cause the whole page to refresh.
- Instead, we can use the <Link> component provided by React Router to replace anchor tags.

## NavLink

A <NavLink> is a special kind of <Link> that knows whether or not it is "active". This is useful when building a navigation menu such as a breadcrumb or a set of tabs where you'd like to show which of them is currently selected. It also provides useful context for assistive technology like screen readers.

You can pass a function to either style or className that will allow you to customize the inline styling or the class string based on the component's active state. You can also pass a function as children to customize the content of the <NavLink> component based on their active state, specially useful to change styles on internal elements.

Basic example:

```javascript

import {BrowserRouter, Routes, Route, NavLink}

function App() {
  return (
    <BrowserRouter>
      <>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
          </ul>
        </nav>

	<Routes>
	        <Route path="/" element={<Home />} />
	        <Route path="/about/" element={<About />} />
	        <Route path="/users/" element={<Users />} />
	</Routes>
      </>
    </BrowserRouter>
  );
}

```

The "end" prop in React Router DOM v6 NavLink allows you to specify whether the active class should be applied to the starting element or the ending element of the link. This prop is useful for when you have multiple links in the same container, and you need the active class to apply to the starting or ending element.

<NavLink to="/" end>
  Home
</NavLink>

## useNavigate()

There are instances where we want to do a programatic navigation in other words using JavaScript to navigate the user to a different page without the user clicking on a link. This is particulary usefull when we want to restrict access for certain page in our app. For example if the user tried to access the admin area we might want to kick the user out or if the user tried to visit the app dashboard without logging in we might want to redirect the user to the login page. In these kinds of scenarios we'll need to use JavaScript to run a check and redirect a user to the appropriate page. Let's see how this works:

```javascript
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

useEffect(() => {
  // check if user is admin
  const isAdmin = false;

  // if not redirect the user to /
  if (!isAdmin) {
    navigate("/");
  }
}, []);
```

**Takeaways**

-The useNavigate() hook allows us to programmatically redirect the user.

- useNavigate() will return us the navigate function where we can use it whenever we want to redirect the user.

## Grouping Routes

As we are building our application it is unavoidable that we would have routes that has same prefix. For example let's say we have several admin routes:

```javascript
<Routes>
	<Route path="/admin/dashboard" element={<Dashboard />}>
	<Route path="/admin/manage" element={<Dashboard />}>
	<Route path="/admin/settings" element={<Dashboard />}>
</Routes>
```

Now all of this routes has same prefix called 'admin', however if we write our route component just like what we did here we essentially are repeating ourselves. React router has a solution which is called Route Grouping. Rather then declaring routes one by one what we can do instead is to have a parent route component where we define the admin path prefix on it and within the route component we'll define the individual children routes.

```javascript
<Routes>
	<Route path="/admin">
		<Route path="dashboard" element={<Dashboard />}>
		<Route path="manage" element={<Dashboard />}>
		<Route path="settings" element={<Dashboard />}>
	</Route>
</Routes>
```

One important note here: we can not put a slash in front of our path, because a slash means an absolute path in React Router. If we put a slash in front of a path it means when a user visits the slash dashboard endpoint we would like to serve the user the dashboard component and that defeats the purpose of Route grouping all together.

**Takeaways**

-We can put additional <Route> components within another to group multiple routes together.

## Dynamic routes

In a situation where we need to use dynamic routes. For example in an admin page where we need to manage a spacific user. The routes will look somethin like this: 'admin/users/1'.

```javascript
<Routes>
	<Route path="/admin">
		<Route path="dashboard" element={<Dashboard />}>
		<Route path="manage" element={<Dashboard />}>
		<Route path="settings" element={<Dashboard />}>
		<Route path="users/:userId" element={<Dashboard />}>
	</Route>
</Routes>
```

where ':userId' is a dynamic parameter.

To retrieve a dynamic URL parameter we'll need to use the useParams hook. It will return us an object that represents all the URL parameters in the current React route. The value is whatever we put inside a URL and the key refers to the name of the parameter what is registered within a route component (in this example 'userId').

```javascript
import { useParams } from "react-router-dom";

function Users() {
  const params = useParams();

  return <div>User {params.userId}</div>;
}
```

**Takeaways**

- We can define dynamic route by using ':name'.
- useParams is a hook that allows us to retrieve the dynamic route parameters.

## useLocation()

useLocation in React Router DOM is a hook that allows you to access the current location (URL) of a page in a React app. It returns an object containing information about the current location such as the pathname, search, hash, state, and key. You can use this hook to get the current URL pathname to determine the current page or route, or to get the query string parameters from the search.

```javascript
import { useLocation } from "react-router-dom";

const ExampleComponent = () => {
  const location = useLocation();
  const { pathname, search, hash } = location;

  return (
    <div>
      <h2>Location</h2>
      <p>pathname: {pathname}</p>
      <p>search: {search}</p>
      <p>hash: {hash}</p>
    </div>
  );
};
```

This aslso can be useful if you'd like to perform some side effect whenever the current location changes.

```javascript

import {useEffect} from "react"
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics
    ga('send', 'pageview');
  }, [location]);

  return (
    // ...
  );
}
```

**Takeaways**

- useLocation() hook provides an alternative way to retrieve url information in contrast to window.location.
- We can pass data to another page by utilising the 'state' property in navigation.

## Recomendations

[ReactRouter](https://reactrouter.com/en/6.9.0/start/overview)
