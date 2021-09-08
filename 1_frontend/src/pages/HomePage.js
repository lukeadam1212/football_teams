import React, {useEffect} from 'react'

// styles
import './HomePage.css';

// media
import  footballer  from '../assets/images/footballer.png';
import ball from '../assets/images/ball.png'

const HomePage = () => {

// page title
    useEffect(() => document.title = 'Home page');

    return (
        <main>
            <h2 className ="home-main-text">Football league</h2>
            <div className="top-text">
                <h2>Sign up and vote for your favorite football teams</h2>
            </div>
            <div className="two-images">
                <div className="footballer">
                    <img src={footballer} alt="footballer" />
                </div>
                <div className="ball">
                    <img src={ball} alt="ball" />
                </div>
            </div>
        </main>
    )
}

export default HomePage
