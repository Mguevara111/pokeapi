import React from "react";
import letters from './images/who-is-that-pokemon-23-1-2026.png';
import pokeball from './images/pokeball.png';
import { useState,useEffect } from "react";
import './whoispokemon.css';

export function Whoispokemon({handlechangeroute,handlesetmessage}){
    const [random,setRandom]=useState('');      //numero que determina pokemon a lazar
    const [pokemonchosed,setPokemonchosed]=useState('');    //pokemon seleccionado randomicamente

    useEffect(()=>{
        
            let ran=Math.floor(Math.random()*1025);
        //console.log(ran)
        setRandom(ran)
    
        
    },[])

    useEffect(()=>{
        const searchrandom=async ()=>{
            try {
                let res=await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
                console.log(`fetch https://pokeapi.co/api/v2/pokemon/${random}`)
                if(!res.ok){
                    throw new Error('There was a problem searchin pokemon')
                }
                let data=await res.json();
                setPokemonchosed(data)
            } catch (error) {
                const initialmessage={
                            message:error.message,
                            color:'orange'
                        }
                handlesetmessage(initialmessage);
            }
        }

        if(random){
            searchrandom();
        }
        
    },[random])

    if(!pokemonchosed){
        return(
            <span className="loader"></span>
        );
    }

    return(
        <section className="whoispokemon">
            <h2>Who is Pokemon?</h2>
            <div>
                <button className="whoispokemon__returnbtn" onClick={()=>handlechangeroute('menu')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>Return</button>
            </div>
            <article>
                <div className="whoispokemon__container">
                    <img className="whoispokemon__pokephoto" src={pokemonchosed.sprites.other["official-artwork"].front_default} alt={pokemonchosed.name} />
                    
                    <img className="whoispokemon__lettersimg" src={letters} alt="who is that pokemon?" />
                </div>
                <div>
                    <p className="whoispokemon__p">{pokemonchosed.name}</p>
                </div>
                <div className="whoispokemon__answercont">
                    <input type="text" />
                    <img src={pokeball} alt="pokeball" />
                </div>
            </article>
        </section>
    );
}