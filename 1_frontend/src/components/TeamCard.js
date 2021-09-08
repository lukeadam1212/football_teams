import React, { useState, useEffect, useRef } from 'react'
import './TeamCard.css';

const TeamCard = (props) => {

    const [teamVote, setTeamVotes] = useState(0)

    useEffect(() => {
        setTeamVotes(0);
    }, []);

    // functions
    let voted = useRef(false);

    const plusHandler = () => {
        if (!voted.current) {
            setTeamVotes(teamVote + 1);
            voted.current = true;
        }
    };

    const minusHandler = () => {
        if (!voted.current) {
            setTeamVotes(teamVote - 1);
            voted.current = true;
        }
    };


    
    return (
        <div className="team-card">
            <h2>{props.title}</h2>
            <h3>{props.city}</h3>
            <h4>{props.country}</h4>
            <div className="team-image">
                <img src={props.image} alt="" />
            </div>
            <p>current score</p>
            <div className="bottom-votes">
                <button onClick={minusHandler}>-</button>
                <span>{teamVote}</span>
                <button onClick = {plusHandler}>+</button>
            </div>
            
        </div>
    )
}

export default TeamCard
