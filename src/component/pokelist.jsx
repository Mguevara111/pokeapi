import React, { useEffect } from "react";
import { Pokelistcard } from "./pokelistcard";
import { useState,useRef} from "react";
import './pokelist.css';

export function Pokelist({handlesetmessage,handlechangeroute}){
    const [pokelist,setPokelist]=useState([]);
    const [scrollvalue,setScrollvalue]=useState(0);   //empiezo en -40 porque cuando se renderiza ya empieza a obervar y aumenta mientras se cargan 
    const refdiv=useRef(null);

    useEffect(()=>{
        const filllist=async ()=>{
            try {
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


    /****************************poner boton para que suba al inicio******************************************************/
    
    useEffect(() => {
                const observerCallback = (entries) => {
                // Get the first entry (we are only observing one element here)
                const [entry] = entries;
                //para que no se active si esta cargando el elemento
                if (entry.isIntersecting && !entry.isLoading) {  
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
            observer.unobserve(targetRef.current);
          }
          
          observer.disconnect(); 
        };
      }, []); 


    return(
        <section className="pokelist" >
            <h2>POKELIST</h2>
            <div>
                <button className="buscador__returnbtn" onClick={()=>handlechangeroute('menu')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>Return</button>
            </div>
            <article className="pokelist__list">
                    {pokelist.map((el,i)=>
                        <Pokelistcard key={i} pokemon={el}></Pokelistcard>
                    )}
           </article>
           {/* si interseciton oberver llega a este div carga los demas */}
           <div className="pokelist__loader" ref={refdiv}></div>
        </section>
    );
}