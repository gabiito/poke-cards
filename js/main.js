const colors = ["#B97A95", "#F6AE99", "#B5CDA3", "#F38BA0", "#C1AC95", "#5F939A", "#94D0CC", "#F1CA89", "#CC9B6D", "#FAF0AF", "#F69E7B"];

let pokemonAPI = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10";

const container = document.getElementById("app");

async function getPokemonList(url){
    try{
        let resp = await fetch(url);
        if (resp.ok){
            try{
                let list = await resp.json();
                pokemonAPI = list;
                for (let pokemon of list.results){
                    await getPokemonData(pokemon.url);
                }
                colorShifter(".card__header--top");
                hideSpinner();
            }
            catch(e){
                console.log(e);
            }
        }
        else{
            throw new Error(`HTTP error!, fetching pokemon list. Status: ${resp.status}`);
        }
    }
    catch (e){
        console.log(e);
    }
}

async function getPokemonData (url){
    let resp = await fetch(url);
    if (!resp.ok){
        throw new Error(`HTTP error!, fetching pokemon data. Status: ${resp.status}`);
    }
    let data = await resp.json();
    fillContent(data);
}

function getStats(pokemon){
    let max = Math.max(pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[5].base_stat);
    if (max > 100){
        let statWidths = [];
        pokemon.stats.forEach(stat =>{
            statWidths.push(Math.floor((stat.base_stat * 100) / max));
        });
        return statWidths;
    }
    return false;
}

function fillContent(pokemon){
        let statWidths = getStats(pokemon);
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
                    <div class="card__body__stat stat--hp" style="width:${statWidths ?  statWidths[0] : pokemon.stats[0].base_stat}%;">
                        <i class="fas fa-heart"></i>
                        ${pokemon.stats[0].base_stat}
                    </div>
                    <div class="card__body__stat stat--attack" style="width:${statWidths ?  statWidths[1] : pokemon.stats[1].base_stat}%;">
                        <i class="fas fa-crosshairs"></i>
                        ${pokemon.stats[1].base_stat}
                    </div>
                    <div class="card__body__stat stat--defense" style="width:${statWidths ?  statWidths[2] : pokemon.stats[2].base_stat}%;">
                        <i class="fas fa-shield-alt"></i>
                        ${pokemon.stats[2].base_stat}
                    </div>
                    <div class="card__body__stat stat--speed" style="width:${statWidths ?  statWidths[5]  : pokemon.stats[5].base_stat}%;">
                        <i class="fas fa-wind"></i>
                        ${pokemon.stats[5].base_stat}
                    </div>
                </div>

            </div>
        `;
}

function colorShifter(topClass){
    const tops = document.querySelectorAll(topClass);
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
    showSpinner();
    getPokemonList(url);
}

function movePage(pokeList, direction){
    if(pokeList){
        switch(direction){
            case 'next':    if(pokeList.next != null){
                                container.innerHTML = "";
                                loader(pokemonAPI.next);
                            }
                break;
            case 'prev':    if(pokeList.previous != null){
                                container.innerHTML = "";
                                loader(pokemonAPI.previous);
                            } 
            break;
            default: (console.log("Direction error"));
        }
    }
}

document.addEventListener("DOMContentLoaded", (evt) =>{
    
    loader(pokemonAPI);
});


document.getElementById("next").addEventListener("click", (evt) =>{
    evt.preventDefault();
    container.innerHTML = "";
    
    movePage(pokemonAPI,'next');
});

document.getElementById("prev").addEventListener("click", (evt) =>{
    evt.preventDefault();
    
    movePage(pokemonAPI, 'prev');
});
