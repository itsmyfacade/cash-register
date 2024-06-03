# Cash Register

## Overview
The `checkCashRegister` function is a solution for managing a cash register drawer in a retail environment. It determines the change to be returned based on the purchase price and the payment provided, using the available currency in the drawer.

## Features
- Calculates the change due from a transaction.
- Checks if the cash register has sufficient funds to provide the exact change.
- Returns the status of the cash register drawer: `INSUFFICIENT_FUNDS`, `CLOSED`, or `OPEN`.
- Returns the specific denominations used for the change.

## Usage
The function `checkCashRegister(price, cash, cid)` takes three arguments:
1. `price` (number): The purchase price.
2. `cash` (number): The payment provided by the customer.
3. `cid` (array): A 2D array representing the available currency in the drawer.

The function returns an object with two keys:
- `status` (string): The status of the transaction (`INSUFFICIENT_FUNDS`, `CLOSED`, or `OPEN`).
- `change` (array): An array of the denominations used to provide the change.

## Example
```javascript
checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);
// Returns: { status: "OPEN", change: [["QUARTER", 0.5]] }
