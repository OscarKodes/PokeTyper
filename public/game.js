
// array of pokemon from GitHub
const pokemon = [ "Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle",
"Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey",
"Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu",
"Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy",
"Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume",
"Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck",
"Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam",
"Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel",
"Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetchd",
"Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix",
"Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak",
"Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan",
"Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","MrMime","Scyther","Jynx","Electabuzz","Magmar",
"Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon",
"Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini",
"Dragonair","Dragonite","Mewtwo","Mew"
];

let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
abc += abc.toLowerCase();

let seconds = 60;
let score = 0;
let caught = [];
let randomNum, word, userWord;


function newPokemon() {


  $(".score").text("Score: " + score);

  userWord = "";
  $(".user-type").text(userWord);


  randomNum = Math.floor(Math.random() * 151);
  word = pokemon[randomNum];

  let sprite = "https://projectpokemon.org/images/normal-sprite/" + word.toLowerCase() + ".gif";
  $(".word").text(word);
  $(".sprite").attr("src", sprite);
}

$(document).on("keydown", function(event){
  let pressedKey = event.key;

  if (abc.includes(pressedKey)) {

    userWord += pressedKey;
    $(".user-type").text(userWord);
  }

  else if (pressedKey === "Shift") {}

  else if (pressedKey === "Enter") {
    checkWord();
  }

  else if (pressedKey === "Backspace" || "Delete") {
    userWord = userWord.slice(0, -1);
    $(".user-type").text(userWord);
  };
});

function checkWord() {
  if (userWord === word) {
    score++;
    caught.push(word);
    cry();
    newPokemon();
  }

  else {
    userWord = "";
    $(".user-type").text(userWord);
  }
}

function cry(){
  let pokeNum;

  if (randomNum < 99) {
    pokeNum = (randomNum + 1) < 10 ? "00" + String(randomNum + 1) : "0" + String(randomNum + 1);
  }

  else {
    pokeNum = String(randomNum + 1);
  }

  let audio = new Audio ("/sounds/" + pokeNum + " - " + word + ".wav");
  audio.play();
}

function timer() {
  $(".timer").text("Time: " + seconds);

  setTimeout(function(){
    if (seconds > 0) {
      seconds--;
      $(".timer").text("Time: " + seconds);
      timer();
    }
    else {
      gameover();
    }
  }, 1000);
}

function gameover() {
  let audio = new Audio("/sounds/gameover.mp3");
  audio.play();
  $(".results").css("display","inline-block");
  caught.forEach(function(pokemon){
    let sprite = "https://projectpokemon.org/images/normal-sprite/" + pokemon.toLowerCase() + ".gif";
    $(".results").after("<img src='" + sprite + "'>")
  });

  $(document).off("keydown");
}

newPokemon();
timer();
