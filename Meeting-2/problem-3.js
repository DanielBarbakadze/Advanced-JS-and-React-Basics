let colors = ["red", "green", "yellow", "blue", "violet"];

function changeColor(color) {
  //   this.style.color = color; // Problem: here 'this' refers to window object, fix it to work
  this.style.color = "red"; // delete this line and uncomment code at line 4
  console.log(this);
}

for (let i = 1; i <= 5; i++) {
  document.getElementById("div" + i).addEventListener("click", changeColor);
}

/*
 * SOLUTION:
 *
 * let element = document.getElementById("div" + i);
 * element.addEventListener("click", changeColor.bind(element, colors[i - 1]));
 *
 */
