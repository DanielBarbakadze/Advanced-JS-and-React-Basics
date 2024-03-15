function Car(make, model, year) {
  this.make = make; // string
  this.model = model; // string
  this.year = year; // number
  this.owners = [];

  this.addOwner = function (owner) {
    this.owners.push(owner);
  };

  this.removeOwner = function (owner) {
    this.owners = this.owners.filter((oldOwner) => oldOwner !== owner);
  };

  this.getOwnerNames = function () {
    return this.owners.map((owner) => owner.fullName());
  };

  this.getOwnersCount = function () {
    return this.owners.length;
  };

  this.getFullInfo = function () {
    return `${this.make} ${this.model} from ${
      this.year
    }. ${this.getOwnersCount()} person owns this car. These are - ${this.getOwnerNames().join(
      ", "
    )}.`;
  };

  this.getCarInfo = function () {
    return `${this.make} ${this.model} released in ${this.year}`;
  };
}

function Person(name, surname, age, gender, cars = []) {
  this.name = name; // string
  this.surname = surname; // string
  this.age = age; // number
  this.gender = gender; // 'M' or 'F'
  this.cars = cars; // array of Car objects[]

  this.fullName = function () {
    return `${this.name} ${this.surname}`;
  };

  this.buysCar = function (car) {
    this.cars.push(car);
    car.addOwner(this);
  };

  this.sellsCar = function (car) {
    this.cars = this.cars.filter((el) => el !== car);
    car.removeOwner(this);
  };

  this.countCars = function () {
    return this.cars.length;
  };

  this.getAllCarsInfo = function () {
    return `${this.name} owns these cars: ${this.cars
      .map((car) => car.getCarInfo())
      .join(", ")}.`;
  };
}

let daniel916 = new Person("Daniel", "Barbakadze", 21, "M", []);
let ilona = new Person("Elon", "Musk", 30, "M");
let duti_picoti = new Car("BMW", "525", "1999");
let stodevianosto = new Car("Mercedes", "E190", 1991);

daniel916.buysCar(duti_picoti); // adds passed car
daniel916.buysCar(stodevianosto); // adds passed car
daniel916.sellsCar(duti_picoti); // removes passed car
ilona.buysCar(stodevianosto); // adds passed car
ilona.buysCar(duti_picoti); // adds passed car

module.exports = { Person, Car };
