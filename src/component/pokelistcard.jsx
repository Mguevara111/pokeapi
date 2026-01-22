import React from "react";
import { useEffect,useState } from "react";
import './pokelistcard.css';

export function Pokelistcard({pokemon,handleselectpokemon,handlechangeroute}){
    const [singlepokemon,setSinglepokemon]=useState({});
    const [pokename,setPokename]=useState('');
    const [pokesend,setPokesend]=useState('');      //datos del pokemon que se envia para verlos en buscador

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
                setPokesend(data)
                //**********paso solo imagenes que es lo que uso, nada mas */
                setSinglepokemon(data.sprites.other.dream_world.front_default)
                setPokename(data.name)
            } catch (error) {
                

            }
        }
        getpokemondata();
    },[])

    const handlesendpokemon=()=>{
        console.log('intento mandar')
        handlechangeroute('search')
        handleselectpokemon(pokesend)
        setPokesend('')
    }

    if(Object.entries(singlepokemon) === 0){
        return(<span className="loader"></span>);
        
    }

    
    return(
        <figure className="pokelistcard__figure" onClick={handlesendpokemon}>
            <img src={singlepokemon} alt={singlepokemon.name} />
            <figcaption>
                {String(pokename).toUpperCase()}
            </figcaption>
        </figure>
    );
}