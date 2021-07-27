const pokemons = [
    {   name: "bulbasaur",
        stats:[{base_stat: 45, stat:{name:"hp"}}, {base_stat: 49, stat:{name:"attack"}}, {base_stat: 49, stat:{name:"defense"}}, {base_stat: 45, stat:{name:"speed"}} ],
        sprites:{
            back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
            front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        },
        types:[{slot: 1, type:{name:"grass"}}, {slot: 2, type:{name:"poison"}}],
        weigth: 69
    },
    {   name: "charmander",
        stats:[{base_stat: 39, stat:{name:"hp"}}, {base_stat: 52, stat:{name:"attack"}}, {base_stat: 49, stat:{name:"defense"}}, {base_stat: 65, stat:{name:"speed"}} ],
        sprites:{
            back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
            front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
        },
        types:[{slot: 1, type:{name:"fire"}}],
        weigth: 85
    },
    {   name: "pikachu",
        stats:[{base_stat: 35, stat:{name:"hp"}}, {base_stat: 55, stat:{name:"attack"}}, {base_stat: 40, stat:{name:"defense"}}, {base_stat: 90, stat:{name:"speed"}} ],
        sprites:{
            back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
            front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        },
        types:[{slot: 1, type:{name:"electric"}}],
        weigth: 60
    },];