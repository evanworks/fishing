let firstpicker = true;

function log(msg, speed) {
  let txt = document.createElement("span");
  terminal.appendChild(txt)

  typed = new Typed(txt, {
    strings: [msg],
    typeSpeed: speed,
    showCursor: false,
    contentType: 'html',
  });
}
function clearTerminal() {
  let terminal = document.getElementById("terminal");
  terminal.innerHTML = "";
}
function greyOutTerminal() {
  //clearTerminal();
  /*const terminal = document.getElementById("terminal");
  for (let i = 0; i < terminal.children.length; i++) {
    terminal.children[i].style.color = "#c0c0c0";
    terminal.children[i].style.userSelect = "none";
    terminal.children[i].style.animation = "none";
  }*/
}


function createPicker(options) {
  if (firstpicker == true) {
    log("Use the up and down arrows to select an option. Press ENTER to confirm.", 10)
    firstpicker = false;
  }

  let onebigstring = "<div>";
  let rand = Math.floor(Math.random() * 10000);
  for (i in options) {
    item = options[i];
    if (i == 0) {
      onebigstring += `
      <label class="container">
      `+item[0]+`
      <input type="radio" id="`+item[1]+rand+`" name="picker" value="`+item[0]+`" checked='checked'>
      <span class="picker"> > </span>
      </label>

      `
    } else {
      onebigstring += `
      <label class="container">
      `+item[0]+`
      <input type="radio" id="`+item[1]+rand+`" name="picker" value="`+item[0]+`">
      <span class="picker"> > </span>
      </label>

      `
    }
  }
  onebigstring += "</div>";
  terminal.innerHTML += onebigstring;
  document.getElementById(options[0][1]+rand).focus();
  document.addEventListener('keypress', handlePickerInputs);
}

function createInput(item) {
  terminal.innerHTML += `
    <form id='`+item.name+`Form'>
    > <input id='`+item.name+`' name='`+item.name+`'>
    </input>
    `
  document.getElementById(item.name).focus();
  document.getElementById(item.name+'Form').addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      let form = document.getElementById(document.activeElement.id + "Form");
      let amnt = form.elements[document.activeElement.id].value; 
      purchase(amnt, item);
    }
  });
}

function handleInputInputs() {
  if (event.key == "Enter") {
    event.preventDefault();

    let item = document.activeElement.id;
    let actualItem = "nullItem";

    let form = document.getElementById(document.activeElement.id + "Form");
    let num = form.elements[document.activeElement.id].value; 

    purchase(num, actualItem);
    document.removeEventListener('keypress', handlePickerInputs);
  }
}


function handlePickerInputs() {
  const keyPressed = event.key; 

  if (event.key == "Enter") {
    let selected = document.activeElement.id;
    selected = removeNumbers(selected);

    // to fix issue of being able to select already selected pickers
    let ohno = document.activeElement.parentElement;
    let ohnoo = ohno.parentElement

    for (let i = 0; i < ohnoo.children.length; i++) {
     let ohnooo = ohnoo.children[i];
     ohnooo.children[0].disabled = true;
    }

    // stupid solution to a hard problem

    if (selected == "bed") {
      bed();
    } else if (selected == "fish") {
      fishMenu();
    } else if (selected == "shop") {
      shop();
    }

    if (selected == "castLine") {
      fish();
    } else if (selected == "newDay") {
      newDay();
    }

    if (selected == "bait") {
      baitShop();
    } else if (selected == "home") {
      clearTerminal();
      home();
    }

    if (selected.startsWith("buy")) {
      let bought = selected.replace("buy", "");
      bought = bought.toLowerCase();
      buyItem(eval(bought + "Item"))
    } 

    if (selected == "dock") {
      dock();
    }
    document.removeEventListener('keypress', handlePickerInputs);
  }
}

// Scrolls the terminal down and updates the resource visuals at all times
setInterval(() => {
  window.scrollTo(0, document.body.scrollHeight);
  updateResources();
}, 100)


function updateResources() {
  resources = document.getElementById("resources");
  
  let staminaLevel;
  if (stamina <= 3 && stamina >= 2/*Math.floor(staminaLevel/3) < stamina < Math.floor(staminaLevel/2) + 1*/) {
    staminaLevel = "half";
  } else if (stamina <= 1) {
    staminaLevel = "empty"
  } else {
    staminaLevel = "full"
  }
  resources.innerHTML = "<img src='res/img/stamina/stamina-"+staminaLevel+".png' class='icon "+staminaLevel+"' style='margin-right:5px;'>"+stamina+" | ";
  resources.innerHTML += "<img src='res/img/coin.png' class='icon'>"+money;
  resources.innerHTML += " | <img src='res/img/bait.png' class='icon'>"+bait;
  if (worms > 0) {
    resources.innerHTML += " <img src='res/img/worms.png' class='icon'>"+worms;
  }
}

/*const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const image = new Image();
image.src = 'lake-waves.png';

const wave = {
    x: 0,
    speed: 1,
};

image.onload = () => {
    const imgWidth = image.width;
    const imgHeight = image.height;

    function drawWave() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const yPosition = canvas.height - imgHeight;

        for (let x = 0; x < canvas.width; x += imgWidth) {
            ctx.drawImage(image, wave.x + x, yPosition, imgWidth, imgHeight);
            ctx.drawImage(image, wave.x + x - imgWidth, yPosition, imgWidth, imgHeight);
        }

        wave.x = (wave.x + wave.speed) % imgWidth;

        requestAnimationFrame(drawWave);
    }

    drawWave();
};*/



// Alex Nazarov on stackoverflow

function executeFunctionByName(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for (var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}

// Steve Hansell + Eduardo Russo on stackoverflow

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

// me
function removeNumbers(str) {
  return str.replace(/[0-9]/g, ''); // oh i love this stuff
}