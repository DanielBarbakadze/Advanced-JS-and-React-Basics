# Table of Contents

- [Table of Contents](#table-of-contents)
  - [დესტრუქტურიზაცია](#დესტრუქტურიზაცია)
  - [for ...in \& for ...of](#for-in--for-of)
  - [ternary ოპერატორი](#ternary-ოპერატორი)
  - [if esle](#if-esle)
  - [switch](#switch)
  - [შეამოკლეთ კოდი იქ, სადაც ამის საშუალება გაქვთ](#შეამოკლეთ-კოდი-იქ-სადაც-ამის-საშუალება-გაქვთ)
  - [DRY Code (do not repeat yourself)](#dry-code-do-not-repeat-yourself)
  - [კონსტანტები და მათი აღწერა](#კონსტანტები-და-მათი-აღწერა)
  - [ცვლადებისთვის სახელის დარქმევა](#ცვლადებისთვის-სახელის-დარქმევა)
  - [camelCase \& PascalCase](#camelcase--pascalcase)
  - [Template literals](#template-literals)
  - [== vs ===](#-vs-)
  - [keycodes \& Keydown events](#keycodes--keydown-events)
  - [trim()](#trim)
  - [multiple state updates](#multiple-state-updates)
  - [try catch throw finally](#try-catch-throw-finally)
  - [კომენტარები](#კომენტარები)
  - [Prettier](#prettier)

## დესტრუქტურიზაცია

დესტრუქტურიზაციის გარეშე:

```javascript
array.map((item) => (
  <button key={item.id} onClick={handleSomeFunction}>
    {item.title}
  </button>
));
```

დესტრუქტურიზაციით:

```javascript
array.map(({ id, title }) => (
  <button key={id} onClick={handleSomeFunction}>
    {title}
  </button>
));
```

თუმცა, არის გარკვეული მომენტები, როდესაც map-ში არსებული ელემენტისთვის გვჭირდება მთლიანი ობიექტის გადაცემა. მაგ.:

```javascript
array.map((item) => (
  <button key={item.id} onClick={() => handleSomeFunction(item)}>
    {item.title}
  </button>
));
```

ამ შემთხვევაში, ან არ ვაკეთებთ დესტრუქტურიზაციას, ან მას ვახდენთ ელემენტის დაბრუნებამდე:

```javascript
array.map((item) => {
  const { id, title } = item;
  return (
    <button key={id} onClick={() => handleSomeFunction(item)}>
      {title}
    </button>
  );
});
```

## for ...in & for ...of

ორივე for..of და for..in ოპერატორი ახდენს სიის იტერაციას, თუმცა იტერირებადი მნიშვნელობები განსხვავდება: for..in აბრუნებს სიის გასაღებს, ხოლო for..of - შესაბამისი გასაღების ქვეშ არსებულ მნიშვნელობას.

```javascript
let list = [4, 5, 6];

for (let i in list) {
  console.log(i); // expected output: 0, 1, 2,
}

for (let i of list) {
  console.log(i); // expected output: 4, 5, 6
}
```

## ternary ოპერატორი

კოდის მაგალითი if else-ით:

```javascript
if (condition) {
  // exprIfTrue
} else {
  // exprIfFalse
}
```

კოდის მაგალითი ternary-ით:

```javascript
condition ? exprIfTrue : exprIfFalse;
```

გაითვალისწინეთ, რომ turnary ოპერატორის გამოყენება მიზანშეწონილია მხოლოდ მაშინ, როდესაც აღსაწერი გაქვთ მარტივი ლოგიკა. სხვა შემთხვევაში მისი გამოყენება კოდს ხდის რთულად აღქმადს. მაგალითად:

```javascript
if (dayOfWeek === "Sunday") {
  return "Weekand";
} else {
  return "Working day";
}
```

უკეთესია დაიწეროს შემდეგნაირად:

```javascript
const displayText = dayOfWeek === "Sunday" ? "Weekend" : "Working day";
```

მაგრამ უფრო რთული ლოგიკების აღსაწერად, ჯობია გამოვიყენოთ if statement-ი:

```javascript
if (number % 3 === 0 && number % 5 === 0) {
  return "FizzBuzz";
}
if (number % 3 === 0) {
  return "Fizz";
}
if (number % 5 === 0) {
  return "Buzz";
}
return number;
```

და არა მსგავსი კოდი:

```javascript
const output =
  number % 3 === 0 && number % 5 === 0
    ? "FizzBuzz"
    : number % 3 === 0
    ? "Fizz"
    : number % 5 === 0
    ? "Buzz"
    : number;
```

საკითხთან დაკავშირებული მასალა იხილეთ [ამ ბმულზე](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

## if esle

მეტი სიმარტივისთვის else ები რომ არ იყოს, უბრალოდ if ები ჩაწერეთ და ფუნქცია დაარეთარნეთ ყველა if ში. ასე კოდი მეტად აღქმადი იქნება:

```javascript
function myFunck() {
  if (condition) {
    // do something
    return;
  }

  if (condition) {
    // do something
    return;
  }

  // rest goes here...
}
```

## switch

იმ შემთხვევაში თუ აღსაწერი ლოგიკა მოითხოვს გრძელი if else statment-ების გამოყენებას, უმჯობესია მივმართოთ switch-ს. მაგალითად:

```javascript
const foo = 0;

switch (foo) {
  case -1:
    console.log("negative 1");
    break;
  case 0:
    console.log(0);
    break;
  case 1:
    console.log(1);
    break;
  case 2:
    console.log(2);
    break;
  default:
    console.log("default");
}
```

საკითხთან დაკავშირებით უფრო ვრცლად [ამ ბმულზე](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)

## შეამოკლეთ კოდი იქ, სადაც ამის საშუალება გაქვთ

მაგალითი:

```javascript
array.length !== 0 ? false : true;
```

იგივეა რაც:

```javascript
array.length === 0;
```

ასევე იგივეა რაც:

```javascript
!array.length;
```

განვიხილოთ ფუნქცია, რომელიც ამოწმებს ახალი ობიექტის title key-ის მასივში (notes) დამატებული სხვა ობიექტების შესაბამის პარამეტრს:

```javascript
const checkTitle = (newTitle) => {
  const isTitle = notes?.some((existingTitles) => {
    return existingTitles.title === newTitle;
  });
  return isTitle;
};
```

isTitle აღვწერთ და მერე პირდაპირ ვაბრუნებთ, ამიტომ უმჯობესია პირდაპირ დავაბრუნოთ:

```javascript
const checkTitle = (newTitle) => {
  return notes?.some((existingTitles) => {
    return existingTitles.title === newTitle;
  });
};
```

checkTitle პირდაპირ რაღაცას აბრუნებს ამიტომ გარე ფიგურული ფრჩხილები და return შეგვიძლია მოვაშოროთ:

```javascript
const checkTitle = (newTitle) =>
  notes?.some((existingTitles) => {
    return existingTitles.title === newTitle;
  });
```

.some ის ქოლბექშიც პირდაპირ მხოლოდ return გვაქვს და ამიტომ ამის მოშორებაც შეგვიძლია:

```javascript
const checkTitle = (newTitle) =>
  notes?.some((existingTitles) => existingTitles.title === newTitle);
```

რადგან ობიექტია notes თითოეული item-ი შეგვიძლია პირდაპირ დესტრუქტურიზაციით key ს მივწვდეთ:

```javascript
const checkTitle = (newTitle) => notes?.some(({ title }) => title === newTitle);
```

## DRY Code (do not repeat yourself)

WET (Write Everything Twice) code:

```javascript
function App() {
  const [counter, setCounter] = useState(0);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <div>
      <button onClick={increaseCounter}>increase</button>
      <button onClick={decreaseCounter}>decrease</button>
      <h1>{counter}</h1>
    </div>
  );
}
```

DRY (Do not Repeat Yourself) code:

```javascript
function App() {
  const [counter, setCounter] = useState(0);

  const handleCounter = (digit) => {
    setCounter(counter + digit);
  };

  return (
    <div>
      <button onClick={() => handleCounter(+1)}>increase</button>
      <button onClick={() => handleCounter(-1)}>decrease</button>
      <h1>{counter}</h1>
    </div>
  );
}
```

## კონსტანტები და მათი აღწერა

- თუ ცვლადი(ან ფუნქცია) ფუნქციის/კომპონენტის შიდა ცვლადზე არ არის დამოკიდებული, ის უნდა აღვწეროთ კომპონენტს/ფუნქციის გარეთ;
- გამოიყენეთ შესაბამისი [style guid-ები](https://google.github.io/styleguide/jsguide.html#naming-constant-names) მათი აღწერისას;

style guid-ების უგულებელყოფით აღწერილი კონსტანტა:

```javascript
const up = -1;
const down = 1;
```

style guid-ების მიხედვით არწერილი კონსტანტა:

```javascript
const UP = -1;
const DOWN = 1;
```

- იმ შემთხვევაში, თუ კონსტანტები ერთმანეთთან კავშირშია, ლოგიკურია მათი ერთ ობიექტში გაერთიანება:

```javascript
const MOVEMENTS = {
  UP: -1,
  DOWN: 1,
};
```

## ცვლადებისთვის სახელის დარქმევა

შეეცადეთ ცვლადების სახელები აღწეროთ ისეთნაირად, რომ მათი წაკითხვისას გასაგები იყოს ის ფუნქციური დატვირთვა, რომლის გამოც შეიქმნა ესა თუ ის ცვლადი. მაგალითად:

```javascript
const btn;
const usrAdd;
const psw;
```

უფრო გასაგები იქნება შემდეგნაირად:

```javascript
const actionButton;
const userAddress;
const password;
```

## camelCase & PascalCase

ცვლადებისთვის, კომპონენტებისა და ფუნქციებისთვის სახელების დარქმევისას გაითვალისწინეთ შესაბამისი კონვენცია.

- ცვლადების და ფუნქციების სახელები იწერება camelCase-ით. მაგ.:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
};
```

- ფაილისა და კომპონენტების სახელები იწერება PascalCase-ით. მაგ.:

```javascript
import UserForm from "components/UserForm/UserForm";

<UserForm />;
```

## Template literals

თანამედროვე ჯავასკრიპტის სინტაქსი საშუალებას გვაძლევს გამოვიყენოთ Template literal-ები და ამით უფრო მარტივი/აღქმადი გავხადოთ კოდი. მაგალითად:

```javascript
const car = "Tesla";
const model = "Model X 100D";
const year = 2015;
const price = 97000;

console.log(
  car +
    " " +
    model +
    " was developed in " +
    year +
    " and it's price varies from $" +
    price
);
```

შესაძლებელია დაიწეროს შემდეგნაირად:

```javascript
console.log(
  `${car} ${model} was developed in ${year} and it's price varies from $${price}`
);
```

საკითხთან დაკავშირებული ინფორმაცია შეგიძლიათ იხილოთ [ამ ბმულზე](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

## == vs ===

JavaScript ითვალისწინებს შედარების სამ განსხვავებულ ოპერაციას:

```javascript
- === — strict equality // triple equals
- == — loose equality // double equals
- Object.is()
```

ძირითადი სხვაობა == -სა და === შორის ის არის რომ == არ აქცევს ყურადღებას შესადარებელი ობიექტის ტიპს (data type), ხოლო === -სთვის მნიშვნელოვანია მათ შორის მონაცემის ტიპი. მაგალითად:

```javascript
'2' == 2 //expected output: true
'' == 0 //expected output: true

'2' ==== 2 //expected output: false
'' === 0 //expected output: false
```

აქედან გამომდინარე, რეკომენდებულია, ყველგან სადაც კი ამის საშუალება იქნება გამოვიყენოთ === შედარება, რადგანაც ეს გვაძლევს საშუალებას თავი ავარიდოთ მოსალოდნელ შეცდომებს შედარების ოპერაციებისას.

საკითხთან დაკავშირებით ამომწურავი ინფორმაცია შეგიძლიათ იხილოთ [ამ ბმულზე](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#:~:text=JavaScript%20provides%20three%20different%20value,%E2%80%94%20loose%20equality%20(double%20equals)>)

## keycodes & Keydown events

ცუდი პრაქტიკაა, როდესაც ინპუტში შეყვანილი ტექსტის დამატება ხდება მხოლოდ mouse click-ით. იქ, სადაც ამის საშუალება გაქვთ, გამოიყენეთ შესაბამისი keycode-ები (ძირითადად esc და enter). მაგ.:

```javascript
handleKeyDown(event) {
    if(event.key === "Enter") {
        console.log('Enter key pressed')
  }
}
```

## trim()

trim() მეთოდი აშორებს თეთრ სივრცეს (სიცარიელეს) სტიქონის დასაწყისიდან და ბოლოდან და აბრუნებს ახალ სტრიქონს ორიგინალური სტრიქონის შეცვლის გარეშე.

```javascript
const greeting = "   Hello world!   ";

console.log(greeting);
// expected output: "   Hello world!   ";

console.log(greeting.trim());
// expected output: "Hello world!";
```

იმისთვის, რომ გაასუფთავოთ სტრიქონი თავიდან, გამოიყენეთ trimStart() მეთოდი, ხოლო სიცარიელის სტრიქონის ბოლოდან მოსაცილებლად, შესაბამისად - trimEnd() მეთოდი.

string-ებთან დაკავშირებული ყველა მეთოდის ნახვა შესაძლებელია [ამ ბმულზე](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## multiple state updates

Batching React-ში აღწერს React-ის იმპლემენტაციის დეტალებს, რომელიც აღიქვამს რამდენიმე state-ის განახლებას, როგორც ერთი state-ის განახლებას. რამდენიმე state განახლებები გროვდება, როგორც ერთი განახლება და შესაბამისად იწვევს კომპონენტის მხოლოდ ერთ ხელახლა rerender-ს, რაც, განსაკუთრებით დიდი აპლიკაციების მუშაობას ხდის უფრო მოქნილსა და ეფექტურს.

მაგალითი:

```javascript
const [counter, setCounter] = useState(0);
const [clicked, setClicked] = useState(0);

const handleCounter = (digit) => {
  setCounter(counter + digit);
  setClicked(clicked + 1);
};

console.log("component rendering");
```

თუ დააკვირდებით კონსოლში გამოტანილ შეტყობინებას, დარწნუნდებით, რომ ფუნქცია handleCounter-ის გაშვებისას, კომპონენტი რენდრედება მხოლოდ ერთხელ (ფუნქციის გამოძახებისას). აქედან გამომდინარე სავსებით შესაძლებელია ამ ორი state-ის ერთ useState-ში გაერთიანება:

```javascript
function App() {
  const [batchedState, setBatchedState] = useState({ counter: 0, clicked: 0 });

  const handleCounter = (digit) => {
    setBatchedState((prev) => ({
      ...prev,
      counter: prev.counter + digit,
      clicked: prev.clicked + 1,
    }));
  };
  return (
    <>
      <button onClick={() => handleCounter(+1)}>Increase</button>
      <button onClick={() => handleCounter(-1)}>Decrease</button>

      <h2>Counter: {batchedState.counter}</h2>
      <div>Clicked: {batchedState.clicked}</div>
    </>
  );
}
```

ზოგადად, ცუდი პრაქტიკაა ერთ კომპონენტში 3 (მაქსიმუმ 4) -ზე მეტი state არსებობა. მათ შორის ამიტომაც შეეცადეთ დაშალოთ თქვენი აპლიკაცია იმდენ ლოგიკურ კომპონენტად, რამდენის საშუალებაც გაქვთ.

## try catch throw finally

- try {} - the try statement lets you test a block of code for errors;
- catch {} - the catch statement lets you handle the error;
- throw {} the trow statement lets you create custom errors;
- finally {} and the finally statement lets you execute the code after try and catch reagardless of the result;

მაგალითი:

```javascript
const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catchedError, setCatchedError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();

        if (!data.name) {
          throw new Error("Incomplete data: no name");
        }

        setFetchedData(data);
      } catch (error) {
        setCatchedError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
  return { fetchedData, loading, catchedError };
};
```

## კომენტარები

შეეცადეთ თავი აარიდოთ კოდში ვრცელი კომენტარების დაწერას. კოდი თავად უნდა აღწერდეს საკუთარ თავს.

## Prettier

გამოიყენეთ prettier კოდის ფორმატირებისთვის. ასე თქვენი დოკუმენტი უფრო აღქმადი და ადვილად წასაკითხი გახდება.

- prettier-ის გადმოწერა შესაძლებელია [ამ ბმულიდან](https://prettier.io/)
- prettier-ის გამართვასთან დაკავშირებული ვიდეო ინსტრუქციის ნახვა შესაძლებელია [ამ ბმულზე](https://www.youtube.com/watch?v=__eiQumLOEo&t=80s)
