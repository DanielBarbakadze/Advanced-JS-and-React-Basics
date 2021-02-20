var application = {
  alertBox: function (value) {
    alert(value);
  },
  initialize: function () {
    setTimeout(function () {
      // at this moment setTimeout is called by window, that's why context is window
      this.alertBox("hello world");
    }, 2000);
  },
};

/*
 * SOLUTIONS:
 *
 * USING .bind():
 * setTimeout(function(){
 *      this.alertBox('hello world');
 * }.bind(this), 2000)
 *
 * Note: if we use .call() instead of .bind(), it will imeadiatelly execute the function (ignores setTimeout)
 *
 * USING arrow function:
 * setTimeout(() => this.alertBox('hello world'), 2000));
 *
 * USING helper variable (i.e self):
 * before setTimeout declare: var self = this; // works but it's not the best way.
 *
 */
