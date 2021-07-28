const colors = ["#B97A95", "#F6AE99", "#B5CDA3", "#F38BA0", "#C1AC95", "#5F939A", "#94D0CC", "#F1CA89", "#CC9B6D", "#FAF0AF", "#F69E7B"];

let pokemonAPI = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=14";

const container = document.getElementById("app");

async function getPokemonList (url){
    try{
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    }
    catch(e){
        return e;
    }
}

async function getPokemonData (url){
    try{
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    }
    catch (e){
        return e;
    }
}

function fillContent(pokemon){
        container.innerHTML += `
            <div class="card">
                <div class="card__header">
                    <div class="card__header--top"></div>
                    <div class="card__header--num">${pokemon.id}</div>
                    <img src="${pokemon.sprites.front_default}" class="card__header--img">
                    <h2>${pokemon.name}</h2>
                    <small>WEIGHT: ${pokemon.weight}Kg</small>
                </div>
                
                <div class="card__body">
                    <h4>Stats</h4>
                    <div class="card__body__stat stat--hp" style="width:${pokemon.stats[0].base_stat >= 100 ?  100 : pokemon.stats[0].base_stat}%;">
                        <i class="fas fa-heart"></i>
                        ${pokemon.stats[0].base_stat}
                    </div>
                    <div class="card__body__stat stat--attack" style="width:${pokemon.stats[1].base_stat >= 100 ?  100 : pokemon.stats[1].base_stat}%;">
                        <i class="fas fa-crosshairs"></i>
                        ${pokemon.stats[1].base_stat}
                    </div>
                    <div class="card__body__stat stat--defense" style="width:${pokemon.stats[2].base_stat >= 100 ?  100 : pokemon.stats[2].base_stat}%;">
                        <i class="fas fa-shield-alt"></i>
                        ${pokemon.stats[2].base_stat}
                    </div>
                    <div class="card__body__stat stat--speed" style="width:${pokemon.stats[3].base_stat >= 100 ?  100 : pokemon.stats[3].base_stat}%;">
                        <i class="fas fa-wind"></i>
                        ${pokemon.stats[3].base_stat}
                    </div>
                </div>

            </div>
        `;
        
    const tops = document.querySelectorAll(".card__header--top");
    for (let top of tops){
        let rand = Math.floor(Math.random() * colors.length);
        top.style.background = colors[rand];
    }
}

var showSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "block";
  }
  
  var hideSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "none";
  }

let loader = function (url){
    try {
        getPokemonList(url).then(res =>{
            pokemonAPI = res;

            res.results.forEach(pokemon =>{
                getPokemonData(pokemon.url).then(data => fillContent(data));
            });
            hideSpinner();
        });
    } catch (e) {
        console.log(e);
    }
}
document.addEventListener("DOMContentLoaded", (evt) =>{
    
    showSpinner();
    loader(pokemonAPI)
});


document.getElementById("next").addEventListener("click", (evt) =>{
    evt.preventDefault();
    container.innerHTML = "";
    
    if(pokemonAPI && pokemonAPI.next != null){
        container.innerHTML = "";
        showSpinner();
        loader(pokemonAPI.next);
    }
});

document.getElementById("prev").addEventListener("click", (evt) =>{
    evt.preventDefault();
    
    if(pokemonAPI && pokemonAPI.previous != null){
        container.innerHTML = "";
        showSpinner();
        loader(pokemonAPI.previous);
    }
});
