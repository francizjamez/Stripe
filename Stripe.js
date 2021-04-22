const stripe = require("stripe")(
  "sk_test_51Iit1oCsfGqU4HPEpCulhIuvIp6GQBm5T5FCmworsaITv5Qg87L5ZOgSRvec6oFmlSPzmFojWRksWaJFfMFud3Kb00ookBG8C7"
);

async function tokenize(num, month, year, cvc) {
  try {
    const token = await stripe.tokens.create({
      card: {
        number: num,
        exp_month: month,
        exp_year: year,
        cvc: cvc,
      },
    });
    console.log(token.id);
    return false;
  } catch (err) {
    console.log(err.type);
    return true;
  }
}

async function charge() {
  const charge = await stripe.charges.create({
    amount: 360,
    currency: "usd",
    source: "tok_visa",
    description: "test charge",
  });

  console.log(charge.id);
}

module.exports = { tokenize, charge };
