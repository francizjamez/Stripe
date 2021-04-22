const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let number, month, year, cvc;

rl.question("Enter your card number: ", (res) => {
  number = res;
  rl.question("Enter card expiry month:", (res) => {
    month = res;
    rl.question("Enter card expiry year:", (res) => {
      year = res;
      rl.question("Enter card CVC code:", (res) => {
        cvc = res;
        rl.close();
        afterPrompts();
      });
    });
  });
});

const { tokenize, charge } = require("./Stripe.js");

async function afterPrompts() {
  let err = await tokenize(number, month, year, cvc);

  if (!err) {
    charge();
  }
}
