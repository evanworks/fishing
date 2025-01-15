const bass = {
  name: "a bass",
  price: 4,
  desc: "The core of any band. You laugh."
}
const trout = {
  name: "a trout",
  price: 3,
  desc: "Such beautiful colors!"
}
const salmon = {
  name: "a salmon",
  price: 5,
  desc: "A beautiful fish like this is just begging to be set on fire."
}
const walleye = {
  name: "a walleye",
  price: 6,
  desc: "Its wide-open mouth makes you chuckle slightly."
}
const sturgeon = {
  name: "a sturgeon",
  price: 2,
  desc: "It's kind of a boring catch but would be nice grilled."
}
const crappie = {
  name: "a crappie",
  price: 4,
  desc: "It's frowning at you."
}
const halibut = {
  name: "a halibut",
  price: 6,
  desc: "It's so... heavy. You ponder whether it could eat you."
}
const tuna = {
  name: "a tuna",
  price: 3,
  desc: "Dreaming of tuna sandwiches."
}
const bream = {
  name: "a bream",
  price: 6,
  desc: "Thick, strong, and big. You nod for its sacrifice."
}
const pike = {
  name: "a pike",
  price: 4,
  desc: "It's the most disproportionately long fish you've seen."
}
const trash = {
  name: "trash",
  price: 0,
  desc: "It's a wad of something gross, perhaps seaweed."
}


const jim = {
  name: "Jim",
  price: 15,
  desc: "This one with the chin was my friend once."
}

const pearl = {
  name: "a pearl",
  price: 50,
  desc: "Parted with its oyster long ago."
}

const scottfish = {
  name: "a scottfish",
  price: 50,
  desc: "my god, it's full of thumbnails"
}



// [name, chance, desc., ]
// decimal values must share a common factor (0.5, 0.25) (0.33, 0.66)
const dockTable = [
  [bass, 3], [trout, 5], [salmon, 2], [walleye, 2], 
  [sturgeon, 7], [crappie, 5], [halibut, 4], [tuna, 3], 
  [bream, 2], [pike, 4], [trash, 20], [pearl, 0.5], [scottfish, 0.25], [jim, 0.25]
];


let fishingPlace = "dock";

function dock() {
  let fishingPlace = "dock";
  clearTerminal();
  log("The dock overlooks a small pond. The scent of water lilies drifts in the fresh air.<br/>", 30);

  setTimeout(() => {
    if (bait > 0) {
      log("<br/>Press [ENTER] to cast your line.");
      document.addEventListener('keypress', fish)
    }
  }, 4000)
}

function fish() {
  console.log(event.key)
  if (event.key == "Enter") {
    document.removeEventListener('keypress', fish);
    setTimeout(() => {
      if (fishingPlace == "dock") {
        caughtFish = doLootTable(dockTable);
      } else {
        alert("Yay, you have encountered a fatal error! Please contact evanwarnerlee@gmail.com so I can fix it.")
      }
      let qualityOdds = Math.floor(Math.random() * 101);

      


      caughtMsg = "<br/><br/>You caught " + caughtFish.name + "!";
      log(caughtMsg, 70);
      window.scrollTo(0, document.body.scrollHeight);
      desc = "<br/><i>" + caughtFish.desc + "</i>"
      if (qualityOdds < 25) {
        pricething = caughtFish.price + 1;
        moneyamountorsomethingsimilar = "<br/><span class='flashing'>(+$"+pricething+") Quality Catch!</span> (-1 Bait)";
      } else {
        pricething = caughtFish.price;
        moneyamountorsomethingsimilar = "<br/>(+$"+caughtFish.price+") (-1 Bait)";
      }
      
      setTimeout(() => {
        log(desc, 20);
        log(moneyamountorsomethingsimilar, 40);

        money += pricething;
        bait -= 1;
        
        window.scrollTo(0, document.body.scrollHeight);
      }, 2000)
      setTimeout(() => {
        if (bait > 0) {
          log("<br/><br/>Press [ENTER] to cast your line.");
          document.addEventListener('keypress', fish)
        } else {
          log("<br/><br/>Looks like you're out of bait! You can buy more at the shop.", 40);
          setTimeout(() => {
            newDay();
          }, 4000)
        }
      }, 4000)
    }, 500);
  }
}

function doLootTable(loot) {
  let totalSize = 0;
  let mult = 1;
  let lowestValue = 1;

  for (i in loot) {
    if (loot[i][1] < 1) {
      if (loot[i][1] < lowestValue) {
        lowestValue = loot[i][1];
      }
    }
  }
  mult = 1 / lowestValue;

  for (i in loot) {
    totalSize += loot[i][1];
  }
  totalSize = totalSize * mult;
  luckyNumber = Math.floor(Math.random() * totalSize) + 1;

  let combinedNumbers = 0;

  for (i in loot) {
    if (luckyNumber > combinedNumbers && luckyNumber <= (loot[i][1] * mult) + combinedNumbers) {
      console.log(loot[i][0])
      return loot[i][0];
    } else {
      combinedNumbers += loot[i][1] * mult;
    }
  }
}

let scottfishcount = 0;

for (let i = 0; i < 1000; i++) {
  let a = doLootTable(dockTable);
  if (a == pearl) {
    scottfishcount += 1;
  }
}

console.log("Pearl: " + scottfishcount/10 + "%");