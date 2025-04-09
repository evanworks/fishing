const bass = {
  name: "a bass",
  img: "res/img/fish/bass.png",
  price: 4,
  desc: "The core of any band. You laugh.",
  canBeHighQuality: true
}
const trout = {
  name: "a trout",
  img: "res/img/fish/trout.png",
  price: 3,
  desc: "Such beautiful colors!",
  canBeHighQuality: true
}
const salmon = {
  name: "a salmon",
  img: "res/img/fish/salmon.png",
  price: 5,
  desc: "A beautiful fish like this is just begging to be set on fire.",
  canBeHighQuality: true
}
const walleye = {
  name: "a walleye",
  img: "res/img/fish/walleye.png",
  price: 6,
  desc: "Its wide-open mouth makes you chuckle slightly.",
  canBeHighQuality: true
}
const sturgeon = {
  name: "a sturgeon",
  img: "res/img/fish/sturgeon.png",
  price: 2,
  desc: "It's kind of a boring catch but would be nice grilled.",
  canBeHighQuality: true
}
const crappie = {
  name: "a crappie",
  img: "res/img/fish/crappie.png",
  price: 4,
  desc: "It's frowning at you.",
  canBeHighQuality: true
}
const halibut = {
  name: "a halibut",
  img: "res/img/fish/halibut.png",
  price: 6,
  desc: "It's so... heavy. You ponder whether it could eat you.",
  canBeHighQuality: true
}
const tuna = {
  name: "a tuna",
  img: "res/img/fish/tuna.png",
  price: 3,
  desc: "Dreaming of tuna sandwiches.",
  canBeHighQuality: true
}
const bream = {
  name: "a bream",
  img: "res/img/fish/bream.png",
  price: 6,
  desc: "Thick, strong, and big. You nod for its sacrifice.",
  canBeHighQuality: true
}
const pike = {
  name: "a pike",
  img: "res/img/fish/pike.png",price: 4,
  desc: "It's the most disproportionately long fish you've seen.",
  canBeHighQuality: true
}
const trash = {
  name: "trash",
  img: "res/img/fish/trash.png",price: 0,
  desc: "It's a wad of something gross, perhaps seaweed.",
  canBeHighQuality: false
}


const jim = {
  name: "Jim",
  img: "res/img/fish/default.png",price: 15,
  desc: "This one with the chin was my friend once.",
  canBeHighQuality: false
}

const pearl = {
  name: "a pearl",
  img: "res/img/fish/pearl.png",
  price: 50,
  desc: "Parted with its oyster long ago.",
  canBeHighQuality: true
}

const scottfish = {
  name: "a scottfish",
  img: "res/img/fish/default.png",price: 60,
  desc: "my god, it's full of thumbnails",
  canBeHighQuality: false
}

let fishingPlace = "dock";

// decimal values must share a common factor (0.5, 0.25) (0.33, 0.66)
const dockTable = [
  [bass, 3], [trout, 5], [salmon, 2], [walleye, 2], 
  [sturgeon, 7], [crappie, 5], [halibut, 4], [tuna, 3], 
  [bream, 2], [pike, 4], [trash, 20], [pearl, 0.5], [scottfish, 0.25], [jim, 0.25]
];

function dock() {
  fishingPlace = "dock";
  clearTerminal();
  log("The dock overlooks a small pond. The scent of water lilies drifts in the fresh air.<br/>", 30);

  setTimeout(() => {
    if (bait > 0) {
      log("<br/>You're feeling refreshed.");
      setTimeout(()=>{
        createPicker([["Cast line", "castLine"], ["Change bait", "fish"], ["Eat something", "shop"], ["Leave", "home"]])
      }, 800)
    }
  }, 5000)
}

function fish() {
  console.log(event.key)
  if (event.key == "Enter") {
    setTimeout(() => {
      if (fishingPlace == "dock") {
        caughtFish = doLootTable(dockTable);
      } else {
        alert("Yay, you have encountered a fatal error! Please contact evanwarnerlee@gmail.com so I can fix it.")
      }
      fishImg = "<br/><br/><div class='fishImg'><img src='"+caughtFish.img+"'></div>";

      caughtMsg = "You caught " + caughtFish.name + "!";
      log(fishImg)
      log(caughtMsg, 70);
      window.scrollTo(0, document.body.scrollHeight);
      desc = "<br/><i>" + caughtFish.desc + "</i>"

      let qualityOdds = Math.floor(Math.random() * 101);
      if (qualityOdds < 25 && caughtFish.canBeHighQuality) {
        pricething = Math.floor(caughtFish.price * 1.3);
        moneyamountorsomethingsimilar = "<br/><span class='flashing'>(<img src='res/img/coin.png' class='icon'>"+pricething+") Quality Catch!</span> (<img src='res/img/bait.png' class='icon'>-1)";
      } else {
        pricething = caughtFish.price;
        moneyamountorsomethingsimilar = "<br/>(<img src='res/img/coin.png' class='icon'>"+caughtFish.price+") (<img src='res/img/bait.png' class='icon'>-1)";
      }
      
      setTimeout(() => {
        //log(desc, 20);
        log(moneyamountorsomethingsimilar, 10);

        money += pricething;
        bait -= 1;

        stamina--;
        
        window.scrollTo(0, document.body.scrollHeight);
      }, 2000)
      setTimeout(() => {
        greyOutTerminal();
        if (bait > 0) {
          let msg = "<br/>"
          if (stamina > 3) {
            msg += randFromArray(["You're feeling refreshed.", "You're feeling happy.", "You're spacing out."])
          } else if (stamina <= 3 && stamina >=2 ) {
            msg += randFromArray(["You're feeling sentimental.", "You're slightly sunburnt.", "You're feeling slightly thirsty."])
          } else {
            msg += randFromArray(["You're feeling tired.", "You're very thirsty.", "You're ready to go home."])
          }
          //log(msg);
          setTimeout(()=>{
            createPicker([["Cast line", "castLine"], ["Change bait", "fish"], ["Eat something", "shop"], ["Leave", "home"]])
          }, 800)
        } else {
          log("<br/>You feel annoyed. You're out of bait.");
          setTimeout(()=>{
            createPicker([["Change bait", "fish"], ["Eat something", "shop"], ["Leave", "home"]])
          }, 800)
        }
      }, 5000)
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

function randFromArray(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
} 