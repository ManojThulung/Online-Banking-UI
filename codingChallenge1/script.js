//////////////////////////////////////////////////
// Coding Challage #1
/*
Julia and kate are doing a study on dogs. So each of them asked 5 dog owners about thier
dog's age, and stored the data into an array (one array for each). For now, they are
just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if
it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulis' and 'dogKate'), and does the following things.

1. Julia found out that the owners of the FIRST and the LAST TWO dogs acutally
have cats, not dogs. so, create a shallow copy of Julia's array, and remove the cat 
ages from the copied array (because it's a bad practice to mutate function pararmeters)
2. Create an array with both Julia's (corrected) and kate's data
3. For each remaining dog, log to the console whether it;s an adult ("Dog number 1 is
an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
4. Run the function for both text datasets 

HINT: Use tools from all lectures in this section so far.

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK
*/

//////////////////////////////////////////////////
/// SOLUTION

const checkDogs = function (juliaData, kateData) {
  const correctedJuliaData = juliaData.slice();

  correctedJuliaData.splice(0, 1);
  correctedJuliaData.splice(-2);

  const dogs = correctedJuliaData.concat(kateData);

  dogs.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];

checkDogs(julia, kate);

// TESTING MAP METHOD IN julia array
const newMethod = julia.map(function (val) {
  return val * 2;
});

// TESTING CALL BACK fuction with an ARROW function
const secondMethod = julia.map((val) => val * 2);

// console.log(julia);
// console.log(newMethod);
// console.log(secondMethod);

////////////////////////////////////////////////////////////
// Coding Challage #2
///////////////////////////////////////////////////////////

/*
Let's go back to Julia and Kate's study about dogs, 
This time, they want to convert dog ages to human ages and 
calculate the average age of the dogs in their study.

Create a functiono "calcAverageHumanAge", which accepts an
 arrays of dog's ages ("ages"), and does the following things
 in order:

 1. Calculate the dog age in human years using the following 
 formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the 
 dog is < 2 years old, humanAge = 16 + dogAge * 4.
 2. Exclude all dogs that are less than 18 human years old (Which is 
  the same as keeping dogs that are at least 18 yeasrs old)
3. Calculate the average human age of all adult dogs (you should alreadyy 
  knwo from other challeges how we calculates)
  4. Run the fucntion for both test datasets

  TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
  TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

  GOOD LUCK
  */

const calcAverageHumanAge = function (ary) {
  const humanAge = ary.map((dogAge) => {
    if (dogAge <= 2) {
      return 2 * dogAge;
    } else {
      return 16 + dogAge * 4;
    }
  });

  const refineHumanAge = humanAge.filter((age) => age >= 18);

  const aveHumanAge =
    refineHumanAge.reduce((acc, age) => acc + age, 0) / refineHumanAge.length;

  return aveHumanAge;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

////////////////////////////////////////////////////////////////////////////
//            CODING CHALLEGE 3
////////////////////////////////////////////////////////////////////////////
/*
Rewrite the 'calcAverageHumanAge' function from the preivious challange, but
this time as an arrow previous challenge, but this time as an arrow function,
and using chaining!

  TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
  TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK
*/

const calcAverageHumanAge2 = function (arr) {
  const avg = arr
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return avg;
};

console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));

////////////////////////////////////////////////////////////////////////////
//////////////////////   CODING CHALLANGE 4 ////////////////////////////////
////////////////////////////////////////////////////////////////////////////

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs 
are eating too much or too little.
Eating too much means the dog's current food portion is larger 
than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within 
a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, 
calculate the recommended food portion and add it to the object 
as a new property. Do NOT create a new array, simply loop over the array. 
Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams 
of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too 
much or too little. HINT: Some dogs have multiple owners, so you 
first need to find Sarah in the owners array, and so this one is 
a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much 
('ownersEatTooMuch') and an array with all owners of dogs who eat too 
little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: 
"Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and 
Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of 
food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount 
of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of 
food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food 
portion in an ascending order (keep in mind that the portions are inside 
  the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use 
the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion 
means: current > (recommended * 0.90) && current < (recommended * 1.10). 
Basically, the current portion should be between 90% and 110% of the 
recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// Task 1
dogs.forEach((dog) => (dog.foodPortion = Math.floor(dog.weight ** 0.75 * 28)));

console.log(dogs);

// Task 2
const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));

console.log(sarahDog);
console.log(
  `Sarah dog is eating ${
    sarahDog.curFood > sarahDog.foodPortion ? "Too much" : "Little"
  }`
);

// Task 3
const ownersEatTooMuch = dogs.filter((dog) => dog.curFood > dog.foodPortion);
const ownersEatTooLittle = dogs.filter((dog) => dog.curFood <= dog.foodPortion);

console.log(ownersEatTooMuch); //Display the objects of dogs that eat too much
console.log(ownersEatTooLittle);

// Task 4
const ownerNames = ownersEatTooMuch.map((name) => name.owners).flat();
console.log(ownerNames); // Display the all owners name that eat too much in an array
console.log(`${ownerNames.join(" and ")}'s dogs eat too much`);

const ownerNames2 = ownersEatTooLittle.flatMap((name) => name.owners); //flatMap is the combination of map and flat
console.log(`${ownerNames2.join(" and ")}'s dogs eat too less`);

// Task 5
console.log(dogs.some((arr) => arr.curFood === arr.foodPortion));

// Task 6
//Being within a range 10% above and below the recommended portion
//means: current > (recommended * 0.90) && current < (recommended * 1.10).
console.log(
  dogs.some(
    (dog) =>
      dog.curFood > dog.foodPortion * 0.9 && dog.curFood < dog.foodPortion * 1.1
  )
);

// Task 7
const okAmountFood = dogs.filter(
  (dog) =>
    dog.curFood > dog.foodPortion * 0.9 && dog.curFood < dog.foodPortion * 1.1
);
console.log(okAmountFood);

// Task 8
const dogsCopy = dogs.slice().sort((a, b) => a.foodPortion - b.foodPortion);
console.log(dogsCopy);
