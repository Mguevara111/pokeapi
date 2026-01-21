import React from "react";
import newtwo from './images/newtwo.jpg';
import pikachu from './images/pikachucard.jpg';
import lugia from './images/lugia.jpg';
import './menu.css';

export function Menu({handlechangeroute}){
    return(
        <section className="menu">
            <figure className="menu__figure" onClick={()=>handlechangeroute('search')}>
                <img className="menu__img" src={newtwo} alt="newtwo" />
                <h2>Pokemon Info</h2>
            </figure>
            <figure className="menu__figure" onClick={()=>handlechangeroute('pokelist')}>
                <img className="menu__img" src={pikachu} alt="pikachu" />
                <h2>Pokemon List</h2>
            </figure>
            <figure className="menu__figure">
                <img className="menu__img" src={lugia} alt="lugia" />
                <h2>Pokemon History</h2>
            </figure>
        </section>
    );
}