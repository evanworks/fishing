let day = 0;
let year = 1;

let maxStamina = 5;
let stamina = maxStamina;

let money = 100;

let bait = 5;
let worms = 0;

let sleptYesterday = false;
let enteredShopThisDay = false;


function newDay() {
  enteredShopThisDay = false;
  document.getElementById("terminal").style.width = "520px";
  day += 1;

  clearTerminal();
  log("<div style='text-align:center;'>============</div>", 60);
  log("<div style='text-align:center;'>DAY " + day + " YEAR " + year + "</div>", 60);
  log("<div style='text-align:center;'>============</div>", 60);
  setTimeout(() => {length = storyMsg();console.log(length);}, 1000);

  setTimeout(() => {
    home();
  }, 8000)
}
function home() {
  log("<br/><br/>What shall it be today?", 20);
  setTimeout(()=>{
    createPicker([["Go to bed", "bed"], ["Go fishing", "fish"], ["Go shopping", "shop"]])
  }, 1000)
}

function storyMsg() {
  if (day == 1) {
    log("<br/>The townsfolk here do not respect newcomers! Go fishing today to prove your skills as an amazing fisher.", 40);
    return length = 8000;
  } else if (day == 2) {
    log ("You're quite impressed by the fish you caught yesterday, but the people of Fishdale evidently weren't. Maybe you're going to have to try a bit harder today.", 30);
    return length = 9000;
  }
}

function start() {
  // prologue
  newDay();
}

function bed() {
  log("You go to bed early today.", 70);
  log(" (This is mainly for debug purposes but whatever)")
  sleptYesterday = true;
  setTimeout(()=>{
    newDay();
  }, 3000)
}

function fishMenu() {
  log("Where would you like to fish today?", 20);
  setTimeout(()=>{
    createPicker([["Dock", "dock"]])
  }, 1500)
}

start();

//clearTerminal();
//fishMenu();
