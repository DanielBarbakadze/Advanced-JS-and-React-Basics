class Vehicle {
  constructor(make, model) {
    this.make = make; // string
    this.model = model; // string
  }
}

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model);
    this.year = year; // number
  }

  owners = [];

  addOwner(owner) {
    this.owners.push(owner);
  }

  removeOwner(owner) {
    this.owners = this.owners.filter((oldOwner) => oldOwner !== owner);
  }

  getOwnerNames() {
    return this.owners.map((owner) => owner.fullName());
  }

  getOwnersCount() {
    return this.owners.length;
  }

  getFullInfo() {
    return `${this.make} ${this.model} from ${
      this.year
    }. ${this.getOwnersCount()} person owns this car. These are - ${this.getOwnerNames().join(
      ", "
    )}.`;
  }

  getCarInfo() {
    return `${this.make} ${this.model} released in ${this.year}`;
  }
}

class Person {
  constructor(name, surname, age, gender, cars = []) {
    this.name = name; // string
    this.surname = surname; // string
    this.age = age; // number
    this.gender = gender; // 'M' or 'F'
    this.cars = cars; // array of Car objects[]
  }

  fullName() {
    return `${this.name} ${this.surname}`;
  }

  buysCar(car) {
    this.cars.push(car);
    car.addOwner(this);
  }

  sellsCar(car) {
    this.cars = this.cars.filter((el) => el !== car);
    car.removeOwner(this);
  }

  countCars() {
    return this.cars.length;
  }

  getAllCarsInfo() {
    return `${this.name} owns these cars: ${this.cars
      .map((car) => car.getCarInfo())
      .join(", ")}.`;
  }
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
