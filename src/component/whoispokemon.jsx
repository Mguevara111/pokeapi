import React from "react";
import letters from './images/who-is-that-pokemon-23-1-2026.png';
import pokeball from './images/pokeball.png';
import { useState,useEffect } from "react";
import './whoispokemon.css';

const generaterandom=()=>{
    let ran=Math.floor(Math.random()*1025);
    return ran;
}

export function Whoispokemon({handlechangeroute,handlesetmessage}){
    const [random,setRandom]=useState('');      //numero que determina pokemon a lazar
    const [pokemonchosed,setPokemonchosed]=useState('');    //pokemon seleccionado randomicamente
    const [pokename,setPokename]=useState('');      //nombre de ingreso al input
    const [state,setEstate]=useState('check');       //comprobar o intentar de nuevo

    useEffect(()=>{
        let ran1=generaterandom();
        //console.log(ran)
        setRandom(ran1)
        
    },[])

    useEffect(()=>{
        const searchrandom=async ()=>{
            try {
                let res=await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
                //console.log(`fetch https://pokeapi.co/api/v2/pokemon/${random}`)
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

    useEffect(()=>{
        
    },[state])

    const handlereload=()=>{
        //console.log('reload')
        let ran1=generaterandom();
        setRandom(ran1)
    }

    const handlechange=(e)=>{
        setPokename(e.target.value)
    }

    const handlecheckname=()=>{
        if(!pokename){
            const initialmessage={
                        message:'Please input a pokemon name',
                        color:'orange'
            }
            handlesetmessage(initialmessage);
            setEstate('check')
            return;
        }
        if(pokename.toLowerCase().trim() !== String(pokemonchosed.name).toLowerCase()){
            //console.log('incorrecto')
             const initialmessage={
                        message:'Incorrect, please try again!',
                        color:'orange'
            }
            handlesetmessage(initialmessage);
            setEstate('again');
            setPokename('');
            return;
        }
        const initialmessage={
                        message:'Correct!',
                        color:'green'
            }
        handlesetmessage(initialmessage);
        setEstate('again')
        setPokename('');
        //muestra pokemon y nombre
    }

    const handletest=()=>{
        if(state === 'check'){
            handlecheckname();
            
            return;
        }else{
            handlereload();
            setEstate('check')
            setPokename('')
        }
    }

    if(!pokemonchosed){
        return(
            <section className="spinnerc">
                <span className="loader"></span>
                <p>Loading...</p>
            </section>
        );
    }

    return(
        <section className="whoispokemon">
            <h2>Who is Pokemon?</h2>
            <div>
                <button className="whoispokemon__returnbtn" onClick={()=>handlechangeroute('menu')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>Return</button>
            </div>
            <article className="whoispokemon__content">
                <div className="whoispokemon__container">
                    <img className={`whoispokemon__pokephoto ${state === 'again'?'whoispokemon__pokephoto--show':''}`} src={pokemonchosed.sprites.other["official-artwork"].front_default} alt={pokemonchosed.name} />
                    
                    <img className="whoispokemon__lettersimg" src={letters} alt="who is that pokemon?" />
                </div>
                <div>
                   <p className={`whoispokemon__p ${state === 'again'?'whoispokemon__p--show':''}`}>{pokemonchosed.name}</p>
                </div>
                <div className="whoispokemon__answercont">
                    <input type="text" onChange={handlechange} value={pokename} placeholder="pokemon name"/>
                    <div className="whoispokemon__btn" onClick={handletest}>
                        <img src={pokeball} alt="pokeball" />
                        {state === 'check'?<p>Check</p>:<p>Try Again!</p>}
                    </div>
                    
                </div>
            </article>
        </section>
    );
}