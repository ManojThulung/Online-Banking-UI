"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////

// const totalBalance = function (account) {
//   const balance = account.reduce((acc, mov) => acc + mov, 0);

//   labelBalance.textContent = `${balance} €`;
// };

const totalBalance = function (accounts) {
  accounts.forEach(function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  });
  return accounts;
};

//////////////////////// DISPLAY MOVEMENTS FUNCTION ////////////////////////
const displayMovements = function (movement, sort = false) {
  containerMovements.innerHTML = "";

  const mov = sort ? movement.slice().sort((a, b) => a - b) : movement;

  mov.forEach(function (amt, i) {
    const type = amt > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${amt} €</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const displayInfo = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  totalBalance(accounts);
  labelBalance.textContent = `${acc.balance} €`;

  // Display summary
  calcDisplaySummary(acc.movements, acc.interestRate);
};

const calcDisplaySummary = function (ary, intRate) {
  // Display INCOME
  const income = ary
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  // DISPLAY OUTCOME
  const outcome = ary
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  // DISPLAY INTEREST
  const interest = ary
    .filter((deposit) => deposit > 0)
    .map((deposit) => (deposit * intRate) / 100)
    .filter((deposit) => deposit > 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const movementDescription = account1.movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
  // THE ABOVE CODE is short form of below
  // if (mov > 0) {
  //   return `Movement ${i + 1}: You desposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  // }
);

//////////////////////////////////////
const createUsernames = function (accs) {
  accs.forEach(function (user) {
    user.userId = user.owner
      .toLowerCase()
      .split(" ")
      .map((letter) => letter[0])
      .join("");
  });
  return accs;
};

createUsernames(accounts);

////////////////////////////////////////////////////////////
//          LOGIN FUNCTION                            //////
////////////////////////////////////////////////////////////
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent from form submitting (To prevent from auto reload features of submit btn)
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.userId === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Message
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Display movements and balance
    displayInfo(currentAccount);
  }
});

////////////////  TRANSFER MONEY FUNCTION ////////////////////////////
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.userId === inputTransferTo.value
  );

  if (
    receiverAcc?.userId !== currentAccount.userId &&
    receiverAcc && // prevent error when receiver userId is empty
    amount > 0 &&
    currentAccount.balance >= amount
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    totalBalance(accounts);

    // Display movements and balance
    displayInfo(currentAccount);
  }
});

///////////////////// CLOSE ACCOUNT FUNCTION //////////////////////////
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userId &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // Find current account index
    const index = accounts.findIndex(
      (acc) => acc.userId === currentAccount.userId
    );

    // Remove current account from array
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = "";
});

////////////////////// REQUEST LOAD FUNCTION ////////////////////////
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    // Display movements and balance
    displayInfo(currentAccount);
  }
});

///////////////////// SORT FUNCTION /////////////////////////////////
let sort = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
});

/////////////  FILTER METHOD ////////////////////
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

//////////// FROM METHOD TO CREATE NEW ARRAY OF UPDATED MOVEMENTS/////////////
labelBalance.addEventListener("click", function () {
  const movementUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (element) => Number(element.textContent.replace("€", ""))
  );
  console.log(movementUI);
});

////////////////////////////////////////////////////////////////////////
///////           EXERCISE                                //////////////
////////////////////////////////////////////////////////////////////////
// Same function for withdrawal bt using ARROW FUNCTION
const withdrawals = movements.filter((mov) => mov <= 0);
// THE BELOW IS THE SIMILAR FUCNTION
// const withdrawals = movements.filter(function (mov) {
//   return mov <= 0;
// });

//////////////// CONVERT NORMAL TEXT OT TITLE //////////////
const word = "a hello my naMe is Manoj rai";
const exception = ["a", "is"];

const capitalize = function (text) {
  const word2 = text
    .toLowerCase()
    .split(" ")
    .map((letr) =>
      exception.includes(letr) ? letr : letr[0].toUpperCase() + letr.slice(1)
    )
    .join(" ");
  return word2[0].toUpperCase() + word.slice(1); // In case when 'a' is at the first place so to convert into capital letter
};

// console.log(deposits);
// console.log(withdrawals);

//////////////////////////////////////////////////////
//                REDUCE METHOD                     //
//////////////////////////////////////////////////////

// This is the normal REDUCE METHOD FUNCTION
// const balance = movements.reduce(function (acc, mov) {
//   return acc + mov;
// },0);

// This the REDUCE METHOD ARROW FUNCTION
const balance = movements.reduce((acc, mov) => acc + mov, 0);
