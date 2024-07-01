import * as money from '../../scripts/utils/money.js';
import * as date from '../../scripts/utils/date.js';

describe('1 . Money Related Utilities Testing', () => {
  describe('* Converting Dollars to Cents', () => {

    //Test
    it('works with the base case of 20.95', () => {
      expect(money.convertToDollars(2095)).toEqual('20.95');
    });

    //Test
    it('works with 0', () => {
      expect(money.convertToDollars(0)).toEqual('0.00');
    });

    //Test
    it('works with decimals', () => {
      expect(money.convertToDollars(2000.5)).toEqual('20.01');
    });


  });
});

