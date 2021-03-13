function logIt() {
  return new Promise((resolve, reject) => {
    resolve();
  });
}
function logIt2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 0);
  });
}

setTimeout(() => console.log("1"), 0);

Promise.resolve().then(() => console.log("2"));

console.log("3");

logIt2().then(() => console.log("4"));
logIt().then(() => console.log("5"));

console.log("6");
