import React from "react";

export default function Verinfo({pokemon}){
    if(!pokemon){
        return;
    }
    return(
        <>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt="frontal pokemon" />
        <img src={pokemon.sprites.front_shiny} alt="frontal pokemon" />
        <img src={pokemon.sprites.back_default} alt="frontal pokemon" />
        <img src={pokemon.sprites.back_shiny} alt="frontal pokemon" />
        <img src={pokemon.sprites.front_female||'front_female'} alt="frontal pokemon" />
        <img src={pokemon.sprites.other.showdown.front_default} alt="frontal pokemon" />
        </>
        
    );
}