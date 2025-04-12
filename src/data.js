//.............................................................
//.FFFFFFFFFF.EEEEEEEEEEE.EEEEEEEEEEE..SSSSSSSS...HHHH...HHHH..
//.FFFFFFFFFF.EEEEEEEEEEE.EEEEEEEEEEE.SSSSSSSSSS..HHHH...HHHH..
//.FFFFFFFFFF.EEEEEEEEEEE.EEEEEEEEEEE.SSSSSSSSSS..HHHH...HHHH..
//.FFFF.......EEEE........EEEE.......ESSS...SSSSS.HHHH...HHHH..
//.FFFF.......EEEEEEEEEE..EEEEEEEEEE.ESSSSS.......HHHHHHHHHHH..
//.FFFFFFFFF..EEEEEEEEEE..EEEEEEEEEE..SSSSSSSSS...HHHHHHHHHHH..
//.FFFFFFFFF..EEEEEEEEEE..EEEEEEEEEE..SSSSSSSSSS..HHHHHHHHHHH..
//.FFFFFFFFF..EEEEEEEEEE..EEEEEEEEEE....SSSSSSSSS.HHHHHHHHHHH..
//.FFFF.......EEEE........EEEE.......ESSS..SSSSSS.HHHH...HHHH..
//.FFFF.......EEEE........EEEE.......ESSS....SSSS.HHHH...HHHH..
//.FFFF.......EEEEEEEEEEE.EEEEEEEEEEEESSSSSSSSSSS.HHHH...HHHH..
//.FFFF.......EEEEEEEEEEE.EEEEEEEEEEE.SSSSSSSSSS..HHHH...HHHH..
//.FFFF.......EEEEEEEEEEE.EEEEEEEEEEE..SSSSSSSSS..HHHH...HHHH..
//......................................SSSSSS.................
//.............................................................

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


// decimal values must share a common factor (0.5, 0.25) (0.33, 0.66)
const dockTable = [
  [bass, 3], [trout, 5], [salmon, 2], [walleye, 2], 
  [sturgeon, 7], [crappie, 5], [halibut, 4], [tuna, 3], 
  [bream, 2], [pike, 4], [trash, 20], [pearl, 0.5], [scottfish, 0.25], [jim, 0.25]
];