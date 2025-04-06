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


function createPicker(options) {
  if (firstpicker == true) {
    log("Use the up and down arrows to select an option. Press ENTER to confirm.", 10)
    firstpicker = false;
  }
  for (i in options) {
    item = options[i];
    if (i == 0) {
      terminal.innerHTML += `
      <label class="container">
      `+item[0]+`
      <input type="radio" id="`+item[1]+`" name="picker" value="`+item[0]+`" checked='checked'>
      <span class="picker"> > </span>
      </label>

      `
    } else {
      terminal.innerHTML += `
      <label class="container">
      `+item[0]+`
      <input type="radio" id="`+item[1]+`" name="picker" value="`+item[0]+`">
      <span class="picker"> > </span>
      </label>

      `
    }
  }
  document.getElementById(options[0][1]).focus();
  document.addEventListener('keypress', handlePickerInputs);
}
function createInput(inputName) {
  terminal.innerHTML += `
    <form id='`+inputName+`Form'>
    > <input id='`+inputName+`' name='`+inputName+`'>
    </input>
    `
  document.getElementById(inputName).focus();
  document.getElementById(inputName+'Form').addEventListener('keypress', handleInputInputs);
}

function handleInputInputs() {
  if (event.key == "Enter") {
    event.preventDefault();

    let item = document.activeElement.id;
    let actualItem = "nullItem";

    let form = document.getElementById(document.activeElement.id + "Form");
    let num = form.elements[document.activeElement.id].value; 

    if (item == "pieces of bait") {
      actualItem = "bait";
    }
  
    purchase(num, actualItem);
    document.removeEventListener('keypress', handlePickerInputs);
  }
}


function handlePickerInputs() {
  const keyPressed = event.key; 

  if (event.key == "Enter") {
    selected = document.activeElement.id;

    // stupid solution to a hard problem

    if (selected == "bed") {
      bed();
    } else if (selected == "fish") {
      fishMenu();
    } else if (selected == "shop") {
      shop();
    }

    if (selected == "bait") {
      baitShop();
    } else if (selected == "newDay") {
      newDay();
    }

    if (selected == "buyBait") {
      buyItem("pieces of bait");
    } else if (selected == "buyWorms") {
      buyItem("worms");
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

  resources.innerHTML = "<img src='res/img/coin.png' class='icon'>"+money;
  resources.innerHTML += " | <img src='res/img/bait.png' class='icon'>"+bait;
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
