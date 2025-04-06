let enteredShop = true;

baitPrice = 2;

function shop() {
  document.getElementById("terminal").style.width = "100%";
  clearTerminal();

  waitTime = 0;

  if (enteredShop == false) {
    waitTime = 20000;
    log("You slowly step inside. The owner of the shop is a tall young-looking man. His skin is stained from diving, heavy lids under his eyes.", 40);  
    setTimeout(()=> {
      log("<br/><b>Miles:</b> Hey, the name's Miles. You're the new guy here, aren't you? Well, you don't look too shabby. Come have a look at my stuff, I have plenty of what you need.<br/><br/>", 40);
    }, 9000)  
    enteredShop = true;
  } 

  setTimeout(() => {
    if (enteredShopThisDay == false) {
      log("Welcome to the shop!", 20);
    } else {
      log("See anything you like?", 20)
    }
    enteredShopThisDay = true;
    setTimeout(()=> {
      createPicker([
        ["View bait", "bait"], 
        ["View fishing gear", "gear"], 
        ["View gadgets", "gadgets"],
        ["Leave", "newDay"]
      ]);
    }, 1000);
  }, waitTime)
}



function baitShop() {
  log("<br/>We've got plenty of bait to choose from!", 20);
  setTimeout(() => {
    createPicker([
      ["<img src='res/img/bait.png' class='icon'>Bait ------------------ <img src='res/img/coin.png' class='icon'>2 <i>(A simple and easy way to catch fish.)</i>", "buyBait"], 
      ["<img src='res/img/worms.png' class='icon'>Worms ----------------- <img src='res/img/coin.png' class='icon'>5 <i>(Higher quality, attracts larger fish and collects less trash.)</i>", "buyWorms"],
      ["??? ------------------ <img src='res/img/coin.png' class='icon'>15 <i>You ain't ready for this one yet.</i>"],
      ["??? ------------------ <img src='res/img/coin.png' class='icon'>25 <i>You ain't ready for this one yet.</i>"],
      ["Never mind.", "shop"],
    ]);
  }, 1500)
}

function gear() {}

function gadgets() {}

function buyItem(item) {
  log("<br/>How many " + item + " would you like?", 20);
  setTimeout(() => {
    createInput(item);
  }, 2000)
}

function purchase(amount, item) {
  console.log("purchasing" + amount + " of " + item);
  amount = parseInt(amount);
  let pay = amount * window[item + "Price"]
  if (pay > money) { 
    log("<br/>You don't have enough money to buy this.", 20)
    setTimeout(()=>{
      shop();
    }, 2000)
  } else {
    money -= pay;
    bait += amount;

    log("<br/>- <img src='res/img/coin.png' class='icon'>"+pay);
    log("<br/>+<img src='res/img/"+item+".png' class='icon'>"+amount);

    updateResources();

    setTimeout(()=>{
      shop();
    }, 1500)
  }
}

// shop();