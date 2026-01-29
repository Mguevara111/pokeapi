import React, { useEffect } from "react";
import { Pokelistcard } from "./pokelistcard";
import { useState,useRef} from "react";
import './pokelist.css';

export function Pokelist({handlesetmessage,handlechangeroute,handleselectpokemon}){
    const [pokelist,setPokelist]=useState([]);  //lista de pokiemons
    const [scrollvalue,setScrollvalue]=useState(0);   //valor del offset para intersection observer, no es scroll
    //const [isloading,setIsloading]=useState(false);

    const refdiv=useRef(null);
    const refscroll=useRef(window.innerHeight);     //valor del tamaño vh
    const refupbutton=useRef(null);

    useEffect(()=>{
        const filllist=async ()=>{
            
            try {
                
                //console.log(`https://pokeapi.co/api/v2/pokemon?offset=${scrollvalue}&limit=20`)
            let res=await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${scrollvalue}&limit=20`)
            if(!res.ok){
                throw new Error('There was a problem connecting pokeapi')
            }
            let datalist=await res.json();
            
            if(pokelist.length === 0){
                setPokelist(datalist.results)
                return;
            }  
          
            setPokelist(prev=>[...prev,...datalist.results])
        } catch (error) {
            const errormessage={
                    message:error.message,
                    color:'red'
            }
            handlesetmessage(errormessage)
        } 
        }
        filllist();
       
    },[scrollvalue])

    
    useEffect(() => {
                const observerCallback = (entries) => {
                if(pokelist.length === 0){
                    return;
                }
                const [entry] = entries;
                //para que no se active si esta cargando el elemento
                if (entry.isIntersecting) {  
                    console.log('aumenta 20')
                    setScrollvalue(prev=>prev+20)
                  
                }
                
            };
    
        // Optional: Configure the observer (e.g., threshold, rootMargin)
        const observerOptions = {
          root: null, // defaults to the browser viewport
          rootMargin: '0px',
          threshold: 1, // 100% of the target element must be visible
        };
    
        const observer = new IntersectionObserver(observerCallback, observerOptions);
    
        // Start observing the target element once it's mounted
        if (refdiv.current) {
          observer.observe(refdiv.current);
        }
    
        // Cleanup function: stop observing when the component unmounts
        return () => {
          if (refdiv.current) {
            observer.unobserve(refdiv.current);
          }
          
          observer.disconnect(); 
        };
      }, [pokelist.length]); 

      useEffect(()=>{
         const handlescroll=(e)=>{
        const currentScrollPosition = window.scrollY;
        
            if(currentScrollPosition > refscroll.current){
                //console.log('paso 100vh')
                refupbutton.current.classList.add('pokelist__upbutton--show')
            }else{
                refupbutton.current.classList.remove('pokelist__upbutton--show')
            }
        }
        window.addEventListener('scroll',handlescroll)

        return ()=> window.removeEventListener('scroll', handlescroll);
        
      },[])


   
     

    return(
        <section className="pokelist" >
            
            <div ref={refupbutton} className="pokelist__upbutton">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-320h80v-168l64 64 56-56-160-160-160 160 56 56 64-64v168Zm40 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </a>
            </div>
            <h2>POKELIST</h2>
            <div>
                <button className="buscador__returnbtn" onClick={()=>handlechangeroute('menu')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>Return</button>
            </div>
            <article className="pokelist__list">
                    {pokelist.map((el,i)=>
                        <Pokelistcard key={i} pokemon={el} handleselectpokemon={handleselectpokemon} handlechangeroute={handlechangeroute}></Pokelistcard>
                    )}
           </article>
           {/* si interseciton oberver llega a este div carga los demas */}
           <div className="pokelist__loader" ref={refdiv}></div>
        </section>
    );
}