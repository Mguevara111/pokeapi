import React from "react";
import { useRef,useEffect,useState } from "react";

export function fatherpokelist(){
    const [offset,setoffset]=useState('');
    const refdiv=useRef(null);

    useEffect(() => {
            const observerCallback = (entries) => {
            // Get the first entry (we are only observing one element here)
            const [entry] = entries;
            console.log('se activa')
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
        <section>
            <p>fatherpokelist</p>
            {/* si interseciton oberver llega a este div carga los demas */}
           <div className="pokelist__loader" ref={refdiv}></div>
        </section>
    );
}