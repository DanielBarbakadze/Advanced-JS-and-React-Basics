# Homeworks

დაბლა მოცემულია ამ შეხვედრის დავალებასთან დაკავშირებით დეტალური ინფორმაცია.

## Homework-1

1. [Meeting-2 Homework](https://github.com/DanielBarbakadze/Advanced-JS-and-React-Basics/blob/master/Meeting-2/homework/README.MD) - ის ანალოგიური დავალება შეასრულეთ Factory Function ების გამოყენებით.
2. `Car` და `Person` ფუნქციებს შეუცვალეთ სახელი შემდეგნაირად -> `createCar` და `createPerson`.
3. გაითვალისწინეთ, რომ საერთო ფუნქციონალი უნდა იყოს გატანილი ცალკე და ყოველი ობიექტის შექმნისას ახალი ადგილი არ უნდა გამოიყოფოდეს მეხსიერებაში ერთი და იგივე ფუნქციონალის მისანიჭებლად, არამედ მას უნდა დავუსტოთ პროტოტიპში (როგორც ეს შეხვედრის მასალებშია მოცემული).


## Homework-1 Test

use this code to test your homework.

```js
let daniel916 = createPerson("Daniel", "Barbakadze", 21, "M", []);
let ilona = createPerson("Elon", "Musk", 30, "M");
let duti_picoti = createCar("BMW", "525", "1999");
let stodevianosto = createCar("Mercedes", "E190", 1991);

daniel916.buysCar(duti_picoti); // adds passed car
daniel916.buysCar(stodevianosto); // adds passed car
daniel916.sellsCar(duti_picoti); // removes passed car
ilona.buysCar(stodevianosto); // adds passed car
ilona.buysCar(duti_picoti); // adds passed car

console.log({
  daniel: {
    fullName: daniel916.fullName(),
    countCars: daniel916.countCars(),
    getAllCarsInfo: daniel916.getAllCarsInfo(),
  },
  elon: {
    fullName: ilona.fullName(),
    countCars: ilona.countCars(),
    getAllCarsInfo: ilona.getAllCarsInfo(),
  },
  duti_picoti: {
    getOwnersCount: duti_picoti.getOwnersCount(),
    getOwnerNames: duti_picoti.getOwnerNames(),
    getFullInfo: duti_picoti.getFullInfo(),
    getCarInfo: duti_picoti.getCarInfo(),
  },
  stodevianosto: {
    getOwnersCount: stodevianosto.getOwnersCount(),
    getOwnerNames: stodevianosto.getOwnerNames(),
    getFullInfo: stodevianosto.getFullInfo(),
    getCarInfo: stodevianosto.getCarInfo(),
  },
});

```

Result must be:

```js
{
  daniel: {
    countCars: 1,
    fullName: "Daniel Barbakadze",
    getAllCarsInfo: "Daniel owns these cars: Mercedes E190 released in 1991.",
  },
  elon: {
    countCars: 2,
    fullName: "Elon Musk",
    getAllCarsInfo: "Elon owns these cars: Mercedes E190 released in 1991, BMW 525 released in 1999.",
  },
  duti_picoti: {
    getCarInfo: "BMW 525 released in 1999",
    getFullInfo: "BMW 525 from 1999. 1 person owns this car. These are - Elon Musk.",
    getOwnerNames: ["Elon Musk"],
    getOwnersCount: 1,
  },
  stodevianosto: {
    getCarInfo: "Mercedes E190 released in 1991",
    getFullInfo: "Mercedes E190 from 1991. 2 person owns this car. These are - Daniel Barbakadze, Elon Musk.",
    getOwnerNames: (2)[("Daniel Barbakadze", "Elon Musk")],
    getOwnersCount: 2,
  },
}
```

# Uploading My Homework

დავალების ატვირთვისთვის იხელმძღვანელეთ შემდეგი მითითებით.

> **Note:** თუ ეს თქვენი პირველი დავალება არ არის გამოტოვეთ ნაბიჯი 1.

1. შექმენით `GitHub` ის `repository` სახელად `eAcademy-advanced-js-homeworks` და ლინკი დაწერეთ ჩვენს `Discord` ში `#homework-repos` thread ში.
2. თქვენს რეპოში შექმენით დირექტორიები შესაბამისად `/meeting-3/homework-1/` სადაც განათავსებთ თქვენს ამოხსნას სახელით `1-homework-solution.js`.
