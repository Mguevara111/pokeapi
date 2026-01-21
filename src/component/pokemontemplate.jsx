import React from "react";
import { Charts } from "./charts"; 

import './pokemontemplate.css';

export function Pokemontemplate({pokemon}){
    if(!pokemon){
        return;
    }

    const eachstat=pokemon.stats.map(el=>el.base_stat)
    //console.log('stat',eachstat)

    return(
        <section className="pokemontemplate">
            <h2>{String(pokemon.name).toUpperCase()}</h2>
            <div className="pokemontemplate__image">
                <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
            </div>
            <div className="pokemontemplate__data">
                <p><span><b>Type:</b></span> {pokemon.types[0].type.name}</p>
                <p><b>STATS</b></p>
                <Charts statssend={eachstat}></Charts>
            </div>
        </section>
    );
}