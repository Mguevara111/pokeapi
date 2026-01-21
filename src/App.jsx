
import React from 'react'
import { Main } from './component/main';
import {Buscador} from './component/buscador';
import { Menu } from './component/menu';
import { useState,useEffect,useRef } from 'react';
import { Message } from './component/message.jsx';
import { Pokelist } from './component/pokelist.jsx';
import './App.css'

const initialmessage={
  message:'',
  color:''
}


function App() {
 const [router,setRouter]=useState('menu'); //cambiar esto por main al final solo salto por la animacion
  const [message,setMessage]=useState(initialmessage);    //mensaje de aviso

useEffect(()=>{
  if(message){
     setTimeout(()=>{
      setMessage(initialmessage)
    },3000)
  }
},[message])


 const handlechangeroute=(route)=>{
    setRouter(route)
 }

 const handlesetmessage=(messa)=>{
  console.log('messa',messa)
  setMessage(messa)
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
    <Buscador handlechangeroute={handlechangeroute} handlesetmessage={handlesetmessage}></Buscador>
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
    <Pokelist handlechangeroute={handlechangeroute} handlesetmessage={handlesetmessage}></Pokelist>
    </>
  );
 }
}

export default App
