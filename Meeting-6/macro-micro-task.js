console.log(1);
setTimeout(() => {
  queueMicrotask(() => {
    console.log(2);
  });
  console.log(3);
});
Promise.resolve().then(() => console.log(4));
queueMicrotask(() => {
  console.log(5);
  queueMicrotask(() => {
    console.log(6);
  });
});
console.log(7);
