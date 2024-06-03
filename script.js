/**
 * Function to calculate change from a cash register transaction.
 *
 * @param {number} price - The purchase price.
 * @param {number} cash - The payment provided by the customer.
 * @param {Array} cid - A 2D array representing the cash-in-drawer.
 * @returns {Object} - An object containing the status of the cash register and the change to be returned.
 */
function checkCashRegister(price, cash, cid) {
  // Define the currency units and their values
  const currencyUnits = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1.0],
    ["FIVE", 5.0],
    ["TEN", 10.0],
    ["TWENTY", 20.0],
    ["ONE HUNDRED", 100.0],
  ];

  // Calculate the change due
  let changeDue = parseFloat((cash - price).toFixed(2));

  // If the change due is less than 0, return INSUFFICIENT_FUNDS immediately
  if (changeDue < 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // Calculate the total cash-in-drawer
  let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2);

  // Check if the cash-in-drawer is less than the change due
  if (parseFloat(totalCid) < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  // Check if the cash-in-drawer is exactly equal to the change due
  else if (parseFloat(totalCid) === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  // Array to store the change to be returned
  let changeArray = [];

  // Iterate over the currency units from highest to lowest
  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    let coinName = currencyUnits[i][0]; // Name of the coin/bill
    let coinValue = currencyUnits[i][1]; // Value of the coin/bill
    let coinTotal = cid[i][1]; // Total amount of this coin/bill in the drawer
    let coinChange = 0; // Amount of this coin/bill to be returned as change

    // While loop to determine how many of this coin/bill can be used for change
    while (changeDue >= coinValue && coinTotal >= coinValue) {
      changeDue = parseFloat((changeDue - coinValue).toFixed(2)); // Subtract coin value from change due
      coinTotal -= coinValue; // Subtract coin value from total in drawer
      coinChange += coinValue; // Add coin value to change to be returned
    }

    // If any of this coin/bill is used, add it to the change array
    if (coinChange > 0) {
      changeArray.push([coinName, parseFloat(coinChange.toFixed(2))]);
    }
  }

  // If after the loop we still have change due, return INSUFFICIENT_FUNDS
  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // Return the status and the change array
  return { status: "OPEN", change: changeArray };
}

/**
 * Function to calculate the change and display it in the HTML document.
 */
function calculateChange() {
  const price = parseFloat(document.getElementById("price").value);
  const cash = parseFloat(document.getElementById("cash").value);
  const cid = JSON.parse(document.getElementById("cid").value);

  const result = checkCashRegister(price, cash, cid);
  document.getElementById("output").textContent = JSON.stringify(
    result,
    null,
    2,
  );
}
