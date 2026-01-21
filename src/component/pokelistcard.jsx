import React from "react";
import { useEffect,useState } from "react";
import './pokelistcard.css';

export function Pokelistcard({pokemon}){
    const [singlepokemon,setSinglepokemon]=useState({});
    
    if(!pokemon){
        
        return;
    }

    useEffect(()=>{
        const getpokemondata=async ()=>{
            try {
                let res=await fetch(pokemon.url)
                if(!res.ok){
                    throw new Error(`There was a problem getting ${pokemon.name} data`)
                }
                let data=await res.json();
                //console.log('single',data)
                //**********paso solo imagenes que es lo que uso, nada mas */
                setSinglepokemon(data.sprites.other.dream_world.front_default)
            } catch (error) {
                

            }
        }
        getpokemondata();
    },[])

    if(Object.entries(singlepokemon) === 0){
        return(<span className="loader"></span>);
        
    }

    
    return(
        <figure className="pokelistcard__figure">
            <img src={singlepokemon} alt={singlepokemon.name} />
            {/* ***************revisar si puedo poner imagen de other */}
            
            <figcaption>
                {String(pokemon.name).toUpperCase()}
            </figcaption>
        </figure>
    );
}