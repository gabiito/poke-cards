// let pokemon = {   
//         id: 1,
//         name: "bulbasaur",
//         stats:[
//             {base_stat: 45, stat:{name:"hp"}}, 
//             {base_stat: 49, stat:{name:"attack"}}, 
//             {base_stat: 49, stat:{name:"defense"}}, 
//             {base_stat: 45, stat:{name:"speed"}} 
//         ],
//         sprites:{
//             back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
//             front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
//         },
//         types:[{slot: 1, type:{name:"grass"}}, {slot: 2, type:{name:"poison"}}],
//         weigth: 69
//     };
const colors = ["#B97A95", "#F6AE99", "#B5CDA3", "#F38BA0", "#C1AC95", "#5F939A", "#94D0CC", "#F1CA89", "#CC9B6D", "#FAF0AF", "#F69E7B"];

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

let pokeNum = 1;
let pokeUrl = baseUrl + pokeNum;

function loadPokemon(url){
    getPokemon(url).then(pokemon =>{
        document.getElementById("pokeName").innerText = pokemon.name;
        document.getElementById("pokeImg").src = pokemon.sprites.front_default;
        
        //chequear si existe un stat > 100
        let statWidths = [];
        let max = Math.max(pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[5].base_stat);
        if (max > 100){
            pokemon.stats.forEach(stat =>{
                statWidths.push(Math.floor((stat.base_stat * 100) / max));
            });
        }
        
        document.getElementById("pokeHp").innerHTML = `<i class="bi bi-heart-fill"></i> ${pokemon.stats[0].base_stat}`;
        document.getElementById("pokeAttack").innerHTML = `<i class="bi bi-box-arrow-in-up-right"></i>${pokemon.stats[1].base_stat}`;
        document.getElementById("pokeDefense").innerHTML = `<i class="bi bi-shield-shaded"></i>${pokemon.stats[2].base_stat}`;
        document.getElementById("pokeSpeed").innerHTML = `<i class="bi bi-speedometer2"></i>${pokemon.stats[5].base_stat}`;

        if (statWidths.length === 0){
            document.getElementById("pokeHp").style.width = `${pokemon.stats[0].base_stat}%` ;
            document.getElementById("pokeAttack").style.width = `${pokemon.stats[1].base_stat}%` ;
            document.getElementById("pokeDefense").style.width = `${pokemon.stats[2].base_stat}%` ;
            document.getElementById("pokeSpeed").style.width = `${pokemon.stats[5].base_stat}%` ;
        }
        else{
            document.getElementById("pokeHp").style.width = `${statWidths[0]}%` ;
            document.getElementById("pokeAttack").style.width = `${statWidths[1]}%` ;
            document.getElementById("pokeDefense").style.width = `${statWidths[2]}%` ;
            document.getElementById("pokeSpeed").style.width = `${statWidths[5]}%` ;
        }

        let color = Math.floor(Math.random() * colors.length)

        document.querySelector(".card-header--top").style.background = colors[color];
    });
}
async function getPokemon(url){
    let res = await fetch(url);
    if (res.ok){
        return await res.json();
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    loadPokemon(pokeUrl);
})

document.getElementById("next").addEventListener("click", evt =>{
    evt.preventDefault();
    if (pokeNum < 1118){
        pokeNum++;
        pokeUrl = baseUrl + pokeNum;
        loadPokemon(pokeUrl);
    }
});

document.getElementById("prev").addEventListener("click", evt =>{
    evt.preventDefault();
    if (pokeNum > 1){
        pokeNum--;
        pokeUrl = baseUrl + pokeNum;
        loadPokemon(pokeUrl);
    }
});

