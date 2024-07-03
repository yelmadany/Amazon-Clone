import * as money from '../../scripts/utils/money.js';

import * as date from '../../scripts/utils/date.js';




function convertDollarsTests(input, output) {
  if (money.convertToDollars(input) === output) {
    console.log(`${input} passed`);
  }
  else {
    console.log(`${input} failed`);
  }
}

console.log
convertDollarsTests(2095, '20.95');
convertDollarsTests(0, '0.00');
convertDollarsTests(2000.4, '20.00');