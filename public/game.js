// ARRAY OF POKEMON FROM GITHUB =================================
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


// DECLARE GLOBAL VARIABLES HERE =================================
let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  abc += abc.toLowerCase();
let seconds = 60;
let score = 0;
let pokemonCaught = [];
let gameOver = false;
let currPokemon, userWord, spriteURL, pokeNationalDexId, muted;


// STARTS THE BACKGROUND MUSIC - Adjusts muted audio accordingly
let battleMusic = new Audio ("/sounds/battle.mp3");

battleMusic.play();
battleMusic.muted = true;
muted = true;

$(".audio-control").on("click", function(){
  $(".audio-control").toggleClass("fa-volume-mute");
  $(".audio-control").toggleClass("fa-volume-up");
  muted = !muted;
  battleMusic.muted = !battleMusic.muted;
});


// GENERATES A NEW POKEMON =================================
function newPokemon() {

  // UPDATE SCORE TEXT
  $(".score").text("Caught: " + score);

  // SELECT NEW POKEMON WITH RANDOM NUMBER
  let randomNum = Math.floor(Math.random() * 151);
  currPokemon = pokemon[randomNum];

  // UPDATE THE POKEMON NAME DISPLAYED
  $(".curr-pokemon").text(currPokemon);

  // USES THE RANDOMNUM TO MAKE THE POKEMON'S NATIONALDEX ID NUMBER AS A STR
  if (randomNum < 99) {
    pokeNationalDexId = (randomNum + 1) < 10 ? "00" + String(randomNum + 1) : "0" + String(randomNum + 1);
  } else {
    pokeNationalDexId = String(randomNum + 1);
  }

  // GENERATE SPRITE URL BASED ON NEW POKEMON
  let pokeUrlName;

  if (pokeNationalDexId === "029") {
    pokeUrlName = "nidoran_f";
  } else if (pokeNationalDexId === "032") {
    pokeUrlName = "nidoran_m";
  } else if (pokeNationalDexId === "122") {
    pokeUrlName = "mr._mime";
  } else {
    pokeUrlName = currPokemon.toLowerCase();
  }

  spriteURL = "/sprites/" + pokeUrlName + ".gif";

  // UPDATE THE POKEMON SPRITE
  $(".sprite").attr("src", spriteURL);
}



// CHECK THE USER'S ENTERED INPUT =================================
function checkWord() {

  // IF CORRECT MATCH, UPDATE SCORE, POKEMON CAUGHT
  // PLAY CRY, AND GENERATE NEW POKEMON
  if (userWord === currPokemon) {
    score++;
    pokemonCaught.push(spriteURL);
    if (!muted) {
      cry();
    }
    newPokemon();
  }

  // IF INCORRECT, PLAY AUDIO, CLEAR USER CACHE, UPDATE USER TEXT ON SCREEN
  else {

    if (!muted){
      let audio = new Audio ("/sounds/wrong.mp3");
      audio.play();
    }
  }
}

// PLAYS CURRENT POKEMON'S CRY AUDIO =================================
function cry() {

  let audio = new Audio("/sounds/" + pokeNationalDexId + " - " + currPokemon + ".wav");
  audio.play();
}

// KEEPS TRACK OF THE TIME =================================
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


// ONCE TIME'S UP, REMOVE KEY LISTENERS, SHOW PLAYER RESULTS, =================================
// PLAY SOUND, SHOW ALL POKEMON CAUGHT ========================================================
function gameover() {

  gameOver = true;

  $("#game-screen").css("display", "none");
  $(".results-container").css("display", "block");
  $(".result-score").html("Congratulations!<br>You caught " + score + " Pokemon!<br><br>");

  battleMusic.pause();

  if (!muted) {
    let audio = new Audio("/sounds/gameover.wav");
    audio.play();
  }

  pokemonCaught.forEach(function(spriteURL) {
    $(".result-score").append("<img src='" + spriteURL + "'>");
  });
}

newPokemon();
timer();
