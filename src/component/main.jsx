import React from "react";
import { useState } from "react";
import './main.css';


export function Main({handlechangeroute}){
    const [seebtn,setSeebtn]=useState(false);

    const handleseebtn=()=>{
        setSeebtn(true)
    }

    return(
        <section className="mainhistory">
            {!seebtn?<div className="maininner" onAnimationEnd={handleseebtn}>
                {/* <h2>Pokemon</h2> */}
                <p>
                    Pokémon (short for "Pocket Monsters") are 
                    fictional creatures that live in a world 
                    shared with humans. They come in all shapes
                     and sizes—some look like animals, 
                    others like plants, or even inanimate objects.
                </p>
                <p>
                   The main idea is that people, known as Trainers, 
                   catch these creatures using special devices called Poké Balls.
                   Trainers bond with their Pokémon, help them grow stronger, 
                   and sometimes participate in friendly battles. 
                   Many Pokémon can also "evolve," which means they 
                   transform into bigger, 
                   more powerful versions of themselves.
                </p>
                <p>
                    It started as a video game in the 90s, 
                    but today it’s a massive world that 
                    includes cards, movies, and TV shows, 
                    all centered around the theme of 
                    friendship and adventure.
                </p>
                
            </div>:
            <button className="maininner__btn" onClick={()=>handlechangeroute('menu')}>START ADVENTURE</button>
            }
        </section>
    );
}