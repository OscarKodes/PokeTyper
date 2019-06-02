// ARRAY OF POKEMON FROM GITHUB
const pokemon = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle",
  "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey",
  "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu",
  "Sandshrew", "Sandslash", "Nidoran", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino", "Nidoking", "Clefairy",
  "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume",
  "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck",
  "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam",
  "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel",
  "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd",
  "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix",
  "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak",
  "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan",
  "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "MrMime", "Scyther", "Jynx", "Electabuzz", "Magmar",
  "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon",
  "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini",
  "Dragonair", "Dragonite", "Mewtwo", "Mew"
];

// DECLARE VARIABLES HERE
let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
abc += abc.toLowerCase();
let seconds = 60;
let score = 0;
let pokemonCaught = [];
let randomNum, currPokemon, userWord, pokeUrlName, spriteURL, pokeNationalDexId;


// GENERATES A NEW POKEMON
function newPokemon() {

  // UPDATE SCORE TEXT
  $(".score").text("Score: " + score);

  // CLEAR USER'S TYPED INPUT
  userWord = "";
  $(".user-type").text(userWord);

  // SELECT NEW POKEMON WITH RANDOM NUMBER
  randomNum = Math.floor(Math.random() * 151);
  currPokemon = pokemon[randomNum];

  // UPDATE THE POKEMON NAME DISPLAYED
  $(".currPokemon").text(currPokemon);

  // USES THE RANDOMNUM TO MAKE THE POKEMON'S NATIONALDEX ID NUMBER AS A STR
  if (randomNum < 99) {
    pokeNationalDexId = (randomNum + 1) < 10 ? "00" + String(randomNum + 1) : "0" + String(randomNum + 1);
  } else {
    pokeNationalDexId = String(randomNum + 1);
  }

  // GENERATE SPRITE BASED ON NEW POKEMON
  if (pokeNationalDexId === "029") {
    pokeUrlName = "nidoran_f";
  } else if (pokeNationalDexId === "032") {
    pokeUrlName = "nidoran_m";
  } else {
    pokeUrlName = currPokemon.toLowerCase();
  }

  spriteURL = "https://projectpokemon.org/images/normal-sprite/" + pokeUrlName + ".gif";

  // UPDATE THE POKEMON SPRITE
  $(".sprite").attr("src", spriteURL);
}

// CREATE LISTENER FOR USER KEYBOARD INPUT
$(document).on("keydown", function(event) {
  let pressedKey = event.key;

  // IF THE TYPED KEY WAS A LETTER, RECORD IT
  if (abc.includes(pressedKey)) {
    userWord += pressedKey;
    $(".user-type").text(userWord);
  }

  // IF SHIFT, DO NOTHING (THIS IS INTENTIONALLY LEFT EMPTY)
  else if (pressedKey === "Shift") {}

  // IF ENTER, WE CHECK THE ENTIRE WORD
  else if (pressedKey === "Enter") {
    checkWord();
  }

  // BACKSPACE FUNCTIONALITY
  else if (pressedKey === "Backspace" || "Delete") {
    userWord = userWord.slice(0, -1);
    $(".user-type").text(userWord);
  };
});

// CHECK THE USER'S ENTERED INPUT
function checkWord() {

  // IF CORRECT MATCH, UPDATE SCORE, POKEMON CAUGHT
  // PLAY CRY, AND GENERATE NEW POKEMON
  if (userWord === currPokemon) {
    score++;
    pokemonCaught.push(spriteURL);
    cry();
    newPokemon();
  }

  // IF INCORRECT, PLAY AUDIO, CLEAR USER CACHE, UPDATE USER TEXT ON SCREEN
  else {
    let audio = new Audio ("/sounds/wrong.mp3");
    audio.play();
    userWord = "";
    $(".user-type").text(userWord);
  }
}

// PLAYS CURRENT POKEMON'S CRY AUDIO
function cry() {

  let audio = new Audio("/sounds/" + pokeNationalDexId + " - " + currPokemon + ".wav");
  audio.play();
}

// KEEPS TRACK OF THE TIME
function timer() {

  // UPDATE SECONDS TEXT FOR USER TO SEE
  $(".timer").text("Time: " + seconds);

  // EVERY SECOND, UPDATE TIME AND CHECK IF TIME'S UP
  setTimeout(function() {
    if (seconds > 0) {
      seconds--;
      $(".timer").text("Time: " + seconds);
      timer();
    } else {
      gameover();
    }
  }, 1000);
}

// ONCE TIME'S UP, REMOVE KEY LISTENERS, SHOW PLAYER RESULTS,
// PLAY SOUND, SHOW ALL POKEMON CAUGHT
function gameover() {

  $(document).off("keydown");
  $(".results").css("display", "inline-block");
  let audio = new Audio("/sounds/gameover.wav");
  audio.play();

  pokemonCaught.forEach(function(pokemonSpriteURL) {
    $(".results").after("<img src='" + pokemonSpriteURL + "'>");
  });
}

newPokemon();
timer();
