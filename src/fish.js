let fishingPlace = "dock";

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
        pricething = Math.floor(caughtFish.price * 1.5);
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
        if (stamina == 0) {
          log("<br/><br/>You fall asleep due to exhaustion.", 50);
          setTimeout(newDay, 300);
        } else {
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
            log("<br/><br/>")
            setTimeout(()=>{
              createPicker([["Cast line", "castLine"], ["Change bait", "fish"], ["Eat something", "shop"], ["Leave", "home"]])
            }, 200)
          } else {
            log("<br/>You feel annoyed. You're out of bait.");
            setTimeout(()=>{
              createPicker([["Change bait", "fish"], ["Eat something", "shop"], ["Leave", "home"]])
            }, 800)
          }
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
      return loot[i][0];
    } else {
      combinedNumbers += loot[i][1] * mult;
    }
  }
}

function randFromArray(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
} 

function testRarity(fish) {
  let x = 0;

  for (let i = 0; i < 1000; i++) {
    let a = doLootTable(dockTable);
    if (a == fish) {
      x += 1;
    }
  }

 return "Pearl: " + x/10 + "%";
}