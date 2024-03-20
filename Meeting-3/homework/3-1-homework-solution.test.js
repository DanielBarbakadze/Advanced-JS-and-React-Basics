const { Person, Car } = require("./3-1-homework-solution");

describe("Car", () => {
  let duti_picoti;
  let stodevianosto;

  beforeEach(() => {
    duti_picoti = new Car("BMW", "525", 1999);
    stodevianosto = new Car("Mercedes", "E190", 1991);
  });

  test("Constructor initializes correctly", () => {
    expect(duti_picoti.make).toBe("BMW");
    expect(duti_picoti.model).toBe("525");
    expect(duti_picoti.year).toBe(1999);
    expect(duti_picoti.owners).toEqual([]);

    expect(stodevianosto.make).toBe("Mercedes");
    expect(stodevianosto.model).toBe("E190");
    expect(stodevianosto.year).toBe(1991);
    expect(stodevianosto.owners).toEqual([]);
  });

  test("addOwner adds owner correctly", () => {
    const owner = new Person("Daniel", "Barbakadze", 21, "M");
    duti_picoti.addOwner(owner);
    expect(duti_picoti.owners).toContain(owner);
  });

  test("removeOwner removes owner correctly", () => {
    const owner = new Person("Daniel", "Barbakadze", 21, "M");
    duti_picoti.addOwner(owner);
    duti_picoti.removeOwner(owner);
    expect(duti_picoti.owners).not.toContain(owner);
  });

  test("getOwnerNames returns correct names", () => {
    const owner1 = new Person("Daniel", "Barbakadze", 21, "M");
    const owner2 = new Person("Elon", "Musk", 30, "M");
    duti_picoti.addOwner(owner1);
    duti_picoti.addOwner(owner2);
    expect(duti_picoti.getOwnerNames()).toEqual([
      "Daniel Barbakadze",
      "Elon Musk",
    ]);
  });

  test("getOwnersCount returns correct count", () => {
    const owner1 = new Person("Daniel", "Barbakadze", 21, "M");
    const owner2 = new Person("Elon", "Musk", 30, "M");
    duti_picoti.addOwner(owner1);
    duti_picoti.addOwner(owner2);
    expect(duti_picoti.getOwnersCount()).toBe(2);
  });

  test("getFullInfo returns correct information", () => {
    const owner1 = new Person("Daniel", "Barbakadze", 21, "M");
    const owner2 = new Person("Elon", "Musk", 30, "M");
    duti_picoti.addOwner(owner1);
    duti_picoti.addOwner(owner2);
    expect(duti_picoti.getFullInfo()).toBe(
      "BMW 525 from 1999. 2 person owns this car. These are - Daniel Barbakadze, Elon Musk."
    );
  });

  test("getCarInfo returns correct information", () => {
    expect(duti_picoti.getCarInfo()).toBe("BMW 525 released in 1999");
  });
});

describe("Person", () => {
  let daniel916;
  let ilona;

  beforeEach(() => {
    daniel916 = new Person("Daniel", "Barbakadze", 21, "M", []);
    ilona = new Person("Elon", "Musk", 30, "M");
  });

  test("Constructor initializes correctly", () => {
    expect(daniel916.name).toBe("Daniel");
    expect(daniel916.surname).toBe("Barbakadze");
    expect(daniel916.age).toBe(21);
    expect(daniel916.gender).toBe("M");
    expect(daniel916.cars).toEqual([]);

    expect(ilona.name).toBe("Elon");
    expect(ilona.surname).toBe("Musk");
    expect(ilona.age).toBe(30);
    expect(ilona.gender).toBe("M");
    expect(ilona.cars).toEqual([]);
  });

  test("fullName returns correct full name", () => {
    expect(daniel916.fullName()).toBe("Daniel Barbakadze");
  });

  test("buysCar adds car correctly", () => {
    const car = new Car("BMW", "525", 1999);
    daniel916.buysCar(car);
    expect(daniel916.cars).toContain(car);
    expect(car.owners).toContain(daniel916);
  });

  test("sellsCar removes car correctly", () => {
    const car = new Car("BMW", "525", 1999);
    daniel916.buysCar(car);
    daniel916.sellsCar(car);
    expect(daniel916.cars).not.toContain(car);
    expect(car.owners).not.toContain(daniel916);
  });

  test("countCars returns correct count", () => {
    const car1 = new Car("BMW", "525", 1999);
    const car2 = new Car("Mercedes", "E190", 1991);
    daniel916.buysCar(car1);
    daniel916.buysCar(car2);
    expect(daniel916.countCars()).toBe(2);
  });

  test("getAllCarsInfo returns correct information", () => {
    const car1 = new Car("BMW", "525", 1999);
    const car2 = new Car("Mercedes", "E190", 1991);
    daniel916.buysCar(car1);
    daniel916.buysCar(car2);
    expect(daniel916.getAllCarsInfo()).toBe(
      "Daniel owns these cars: BMW 525 released in 1999, Mercedes E190 released in 1991."
    );
  });
});
