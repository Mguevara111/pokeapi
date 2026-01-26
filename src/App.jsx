
import React from 'react'
import { Main } from './component/main';
import {Buscador} from './component/buscador';
import { Menu } from './component/menu';
import { useState,useEffect,useRef } from 'react';
import { Message } from './component/message.jsx';
import { Pokelist } from './component/pokelist.jsx';
import { Whoispokemon } from './component/whoispokemon.jsx';
import './App.css'

const initialmessage={
  message:'',
  color:''
}


function App() {
 const [router,setRouter]=useState('menu'); //cambiar esto por main al final solo salto por la animacion
  const [message,setMessage]=useState(initialmessage);    //mensaje de aviso
  const [pokemonpassed,setPokemonpassed]=useState('');    //pokemon pasado de list a buscar para dibujarlo

useEffect(()=>{
  if(message){
     setTimeout(()=>{
      setMessage(initialmessage)
    },3000)
  }
},[message])


 const handlechangeroute=(route)=>{
    setRouter(route)
    if(route === 'menu' || route === 'main'){
      setPokemonpassed('')
    }
    
 }

 const handlesetmessage=(messa)=>{
  console.log('messa',messa)
  setMessage(messa)
 }

 const handleselectpokemon=(pokemon)=>{
  //aqui ponemos en el estado pokemonpassed el pokemon deseado para que muestre estadisticas en buscar
  setPokemonpassed(pokemon)
 }
 

 if (router === 'main'){
    return (
    
    <Main handlechangeroute={handlechangeroute}></Main>
  );
 }

 if (router === 'search'){
    return (
    <>
    <Message message={message}></Message>
    <Buscador 
        handlechangeroute={handlechangeroute} 
        handlesetmessage={handlesetmessage} 
        pokemonpassed={pokemonpassed}
        handleselectpokemon={handleselectpokemon}
    ></Buscador>
    </>
  );
 }

 if (router === 'menu'){
    return (
    <Menu handlechangeroute={handlechangeroute}></Menu>
  );
 }

  if (router === 'pokelist'){
    return (
    <>
      <Message message={message}></Message>
    <Pokelist 
        handlechangeroute={handlechangeroute} 
        handlesetmessage={handlesetmessage} 
        handleselectpokemon={handleselectpokemon}>
        
    </Pokelist>
    </>
  );
 }

 if(router === 'who'){
  return(
    <>
    <Message message={message}></Message>
    <Whoispokemon handlechangeroute={handlechangeroute} handlesetmessage={handlesetmessage} ></Whoispokemon>
    </>
  );
 }
}

export default App
