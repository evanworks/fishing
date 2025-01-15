let enteredShop = true;

let baitPrice = 5;

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
      ["Bait ------------------ $5 <i>(A simple and easy way to catch fish.)</i>", "buyBait"], 
      ["Worms ---------------- $10 <i>(Higher quality, attracts larger fish and collects less trash.)</i>", "buyWorms"],
      ["??? ------------------ $15 <i>You ain't ready for this one yet.</i>"],
      ["??? ------------------ $25 <i>You ain't ready for this one yet.</i>"],
      ["Never mind.", "shop"],
    ]);
  }, 1500)
}

function gear() {}

function gadgets() {}

function buyItem(item) {
  log("<br/>How many " + item + " would you like?", 20);
  createInput(item);
}

function purchase(amount, item) {
  let pay = 0;
  if (item == "bait") {
    amount = parseInt(amount);
    pay = amount * baitPrice;
    if (!pay > money) {
      money -= pay;
      bait += amount;
    }
  } else {
    alert("Yay, you have encountered a fatal error!")
  }

  if (pay > money) {
    log("<br/>You don't have enough money to buy this.", 20)
    setTimeout(()=>{
      shop();
    }, 2000)
  } else {
    log("<br/>- "+pay+"$");
    log("<br/>+ "+amount+" "+ String(item[0]).toUpperCase() + String(item).slice(1));
    setTimeout(()=>{
      shop();
    }, 1500)
  }
}

// shop();