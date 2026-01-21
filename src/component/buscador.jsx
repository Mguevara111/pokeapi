import React from "react";
import logo from './images/logo.png';
import pokeball from './images/pokeball.png';
import { useState } from "react";
import { Pokemontemplate } from "./pokemontemplate";
import './buscador.css';

export function Buscador({handlechangeroute,handlesetmessage}){
    const [pokesearched,setPokesearched]=useState('');
    const [pokemonpassed,setPokemonpassed]=useState('');    //pokemon pasado al template para dibujarlo

const handlesearch=async ()=>{
    //console.log(pokesearched)
    try {
        let res=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokesearched}`)
        if(!res.ok){
            console.log('status')
          throw {
            status:res.status,
            messa:'No response from pokeapi'
            }
        }
        let data= await res.json();
        setPokemonpassed(data);
        //console.log(data)
    } catch (error) {
        //console.log('no se encontro el pokemon')
        if(error.status){
            handlesetmessage({
                message:error.messa,
                color:'red'
            })
        }
        handlesetmessage({
            message:'Pokemon not found, please try again',
            color:'yellow'
        })
    }
}

const handleputpokemon=(e)=>{
    setPokesearched(e.target.value)
}
    return(
        <>
        <section className="buscador">
            
            <article className="buscador__header">
                <img className="buscador__logo" src={logo} alt="logo" onClick={()=>handlechangeroute('main')}/>
                <div className="buscador__search">
                    <input type="text" placeholder="search pokemon" onChange={handleputpokemon} value={pokesearched}/>
                    <img className="buscador__btn" src={pokeball} alt="pokeball" onClick={handlesearch}/>
                </div>
            </article>
            <div>
                <button className="buscador__returnbtn" onClick={()=>handlechangeroute('menu')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>Return</button>
                <Pokemontemplate pokemon={pokemonpassed}></Pokemontemplate>
            </div>

        </section>
        
        </>
    );
}